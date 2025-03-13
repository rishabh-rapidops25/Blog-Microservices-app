const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const logger = require("../utils/logger");
const { publishMessage } = require("../config/publish");

exports.register = async (req, res) => {
  // const { name, email, password } = req.body;
  try {
    // const userExists = await User.findOne({ email });
    // if (userExists) {
    //   logger.error("User already exists", { email });
    //   return res.status(400).json({ message: "User already exists" });
    // }
    // const hashedPassword = await bcrypt.hash(password, 10);
    // const newUser = new User({
    //   name,
    //   email,
    //   password: hashedPassword,
    // });
    let name = "rishabh";
    let email = "rishi@gmail.com";
    console.log(name, email);
    // await newUser.save();

    // Publish the user created event
    await publishMessage("user.created", JSON.stringify({ name, email }));
    logger.info("User created", { name, email });
    res
      .status(201)
      .json({ message: "User created successfully", data: { name, email } });
  } catch (error) {
    logger.error("Error creating user", { message: error.message });
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      logger.error("Invalid credentials");
      return res.status(404).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      logger.error("Invalid credentials");
      return res.status(404).json({ message: "Invalid credentials" });
    }
    if (!process.env.JWT_SECRET) {
      logger.error("JWT secret is not defined");
      return res.status(500).json({ message: "JWT secret is not defined" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    logger.info("User logged in", { name: user.name, email, token });
    res.status(200).json({
      message: `${user.name} Successfully logged in`,
      name: user.name,
      email,
      token,
    });
  } catch (error) {
    logger.error("Error logging in", { message: error.message });
    res.status(500).json({ message: "Internal server error" });
  }
};
