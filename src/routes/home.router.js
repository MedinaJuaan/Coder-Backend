import express from "express";
export const homeRouter = express.Router();

homeRouter.get("/", async (req, res) => {
  try {
    const username = req.session.user;
    const rol = req.session.rol;
    return res.status(200).render("home", { username, rol});
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});