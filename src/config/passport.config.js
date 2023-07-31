import fetch from "node-fetch";
import passport from "passport";
import GitHubStrategy from "passport-github2";
import local from "passport-local";
import { MongooseUsersModel } from "../DAO/models/mongoose/users.mongoose.js";
import { usersService } from "../services/users.service.js";
import { isValidPassword } from "../utils/bcrypt.js";
import env from "./enviroment.config.js"
const LocalStrategy = local.Strategy;
export function iniPassport() {
  passport.use(
    "github",

    new GitHubStrategy(
      {
        clientID: env.clientID,
        clientSecret: env.clientSecret,
        callbackURL: env.callbackURL,
      },

      async (accesToken, _, profile, done) => {
        try {
          const res = await fetch("https://api.github.com/user/emails", {
            headers: {
              Accept: "application/vnd.github+json",
              Authorization: "Bearer " + accesToken,
              "X-Github-Api-Version": "2022-11-28",
            },
          });
          // console.log(profile)


          const emails = await res.json();
          const emailDetail = emails.find((email) => email.verified == true);

          if (!emailDetail) {
            return done(new Error("cannot get a valid email for this user"));
          }

          profile.email = emailDetail.email;
          let user = await MongooseUsersModel.findOne({ email: profile.email });
          console.log(profile._json.login)

          if (!user) {
            const newUser = {
              email: profile.email,
              firstName: profile._json.login || "noname",
              rol: "user",
              password: "nopass",
            };

            let userCreated = await MongooseUsersModel.create(newUser);
            console.log("User Registration succesful");
            return done(null, userCreated);
          } else {
            console.log("User already exists");
            return done(null, user);
          }
        } catch (e) {
          console.log("Error en auth github");
          console.log(e);
          return done(e);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await MongooseUsersModel.findOne({ email: username });
          if (!user) {
            console.log("User Not Found with username (email) " + username);
            return done(null, false);
          }
          if (!isValidPassword(password, user.password)) {
            console.log("Invalid Password");
            return done(null, false);
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, email, password, done) => {
        try {
          const { firstName, lastName, age } = req.body;
  
          const userExist = await usersService.findUserByEmail(email);
  
          if (userExist) {
            console.log("User already exists");
            return done(null, false);
          }
  
          const userCreated = await usersService.create({
            firstName,
            lastName,
            email,
            age,
            password,
          });
  
          console.log("User Registration successful");
  
          const serializedUser = {
            _id: userCreated._id.toString(),
            firstName: userCreated.firstName,
            email: userCreated.email,
            rol: userCreated.rol,
          };
  
          return done(null, serializedUser);
        } catch (e) {
          console.log("Error in register");
          console.log(e);
          return done(e);
        }
      }
    )
  );
  
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      let user = await usersService.getUserById(id);
  
      if (!user) {
        console.log("User not found in the database");
        return done(null, false);
      }
  
      done(null, user);
    } catch (e) {
      console.log("Error in deserializeUser");
      console.log(e);
      return done(e);
    }
  });
}
