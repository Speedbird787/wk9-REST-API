const { Router } = require("express");
const { addUser, getAllUsers, login, updateUser, deleteUser } = require("./controller");
const { hashPass, tokenCheck } = require("../middlewares/hash");
const userRouter = Router();

userRouter.post("/users", hashPass, addUser);
userRouter.get("/users", getAllUsers);
userRouter.post("/signin", login);
userRouter.patch("/users/:id", updateUser);
userRouter.delete("/users/:id", deleteUser);

userRouter.get("/token", tokenCheck, login);

module.exports = userRouter;