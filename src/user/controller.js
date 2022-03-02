const User = require("./model");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

exports.addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create(req.body);
    const token = await jwt.sign({ _id: user._id }, process.env.SECRET);
    res.status(200).send({
      _id: user._id,
      name: user.name,
      email: user.email,
      message: "Successfully created user",
      token,})
  } catch (error) {
    console.log(error)
    res.status(500).send({error: error.message})
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({})
    res.status(200).send({users: allUsers})
  } catch (error) {
    console.log(error)
    res.status(500).send({error: error.message})
  }
}

exports.login = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await User.findOne({ email });
    if (newUser) {
      const validPass = await bcrypt.compare(password, newUser.password);
      if (validPass) {
        res.status(200).send({message: "Login is successful"})
      } else {
        res.status(500).send({message: "Incorrect password"})
      }
    } else {
      res.status(500).send({message: "Entered wrong email"})
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({error: error.message})
  }
}

exports.updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userToUpdate = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    context: 'query',
  });
    if (userToUpdate) {
      res.status(200).send({user: userToUpdate})
    } else {
      res.status(500).send({message: "User not found"})
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({error: error.message})
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const deteledUser = await User.findByIdAndRemove(req.params.id);
    if (deteledUser) {
      res.status(200).send({ message: "User was deleted" })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({error: error.message})
  }
}