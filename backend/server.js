const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const SignupUserModel = require("./models/signupModel");
const bcrypt = require("bcrypt");
const protectedRouter = require("./routes/protectedRoutes.js");
const JWT_SECRET = "FLJADSLKFJSKDHKSJDAFJSLDGHKASDGHKGJ";
mongoose
  .connect(
    "mongodb+srv://mongodbuser:mOo5KPvVJm1ec59D@cluster0.df4w2be.mongodb.net/"
  )
  .then(() => console.log("connected to db"))
  .catch((err) => console.log("error", err));

const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.post("/api/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const { name, email, password } = req.body;
    const exists = await SignupUserModel.exists({ email: email });
    if (exists) {
      return res
        .status(400)
        .json({ message: "User already exists, please sign in" });
    }
    const user = await SignupUserModel.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { userId: email }, //after creating the user mdb send the user object to mongoose and we are usingthat here
      JWT_SECRET,
      {
        expiresIn: "3h",
      }
    );
    console.log(user._id);
    res.status(200).json({ message: "singup successful", token: token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new Error("both are mandatory");
    }
    const user = await SignupUserModel.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "user don't exists, please signup" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res
        .status(404)
        .json({ message: "Please double check you password" });
    }
    const token = jwt.sign({ userId: email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json({ message: "Success! You are logged in", token: token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//express router
app.use("/api/protected", protectedRouter);

app.listen(3000);
