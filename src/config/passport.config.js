import fetch from "node-fetch";
import passport from "passport";
import GitHubStrategy from "passport-github2";
import local from "passport-local";
import { UserModel } from "../DAO/models/mongoose/users.mongoose.js";
import { usersService } from "../services/users.service.js";
import { isValidPassword } from "../utils/bcrypt.js";
import env from "./enviroment.config.js"
const LocalStrategy = local.Strategy;
export function iniPassport() {
  passport.use(
    "github",

    new GitHubStrategy(
      {
        clientID: "Iv1.2f05d710bb535b24",
        clientSecret: "df724608fbe92dc2335d98819ccba5dd3321c7f1",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback",
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
          let user = await UserModel.findOne({ email: profile.email });
          console.log(profile._json.login)

          if (!user) {
            const newUser = {
              email: profile.email,
              firstName: profile._json.login || "noname",
              rol: "user",
              password: "nopass",
            };

            let userCreated = await UserModel.create(newUser);
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
          const user = await UserModel.findOne({ email: username });
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
      async (req, username, password, done) => {
        try {
          const { firstName, lastName, age } = req.body;

          const userExist = await usersService.findUserByEmail(username);

          if (userExist) {
            console.log("User already exists");
            return done(null, false);
          }

          const userCreated = await usersService.create({
            firstName,
            lastName,
            email: username,
            age,
            password,
          });
          console.log("User Registration succesful");
          return done(null, {
            _id: userCreated._id.toString(),
            firstName: userCreated.firstName,
            email: userCreated.email,
            rol: userCreated.rol,
          });
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
    let user = await UserModel.findById(id);
    done(null, user);
  });
}
