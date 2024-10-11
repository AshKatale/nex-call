import bcrypt, { hash } from "bcrypt";
import crypto from "crypto";
import {User} from "../models/user.model.js";
import { Meeting } from "../models/meeting.model.js";



const login = async (req, res) => {
  const { username, password } = req.body;

  // Improved validation for empty username and password
  if (!username || !password) {
      return res.status(400).json({ message: "Username and Password are required" });
  }

  try {
      const user = await User.findOne({ username });
      if (!user) {
          return res.status(404).json({ message: "User Not Found" });
      }

      let isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (isPasswordCorrect) {
          let token = crypto.randomBytes(20).toString("hex");
          user.token = token;
          await user.save();
          return res.status(200).json({ token: token });
      } else {
          return res.status(401).json({ message: "Invalid Username or Password" });
      }
  } catch (e) {
      return res.status(500).json({ message: `Something went wrong: ${e.message}` });
  }
};



const register = async (req, res) => {
  const { name, username, password } = req.body;

  // Check for empty fields before proceeding
  if (!name || !username || !password) {
      return res.status(400).json({ message: "Name, Username, and Password are required" });
  }

  try {
    let existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(302).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name,
      username: username,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (e) {
    res.status(500).json({ message: `Something went wrong: ${e.message}` });
  }
};

const getUserHistory = async (req, res) =>{
  const {token} = req.query;

  try {
    const user = await User.findOne({token: token})
    const meetings = await Meeting.find({user_id : username})
    res.json(meetings)
  }
  catch(e)
  {
    res.json({message:`Something went wrong ${e}`})
  }
}

const addToHistory = async (req, res) => {
  const { token, meeting_code } = req.body;

  try {
      const user = await User.findOne({ token: token });

      const newMeeting = new Meeting({
          user_id: user.username,
          meetingCode: meeting_code
      })

      await newMeeting.save();

      res.status(201).json({ message: "Added code to history" })
  } catch (e) {
      res.json({ message: `Something went wrong ${e}` })
  }
}

// const a = async (req, res) => {

//   res.json({ message: "Hello World" });
// };



export { login, register, getUserHistory, addToHistory }