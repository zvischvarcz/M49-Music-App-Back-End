const { Router } = require("express");

const { hashPass, comparePass, tokenCheck } = require("../middleware")
const { registerUser, login, updateUser, deleteUser, getAllUsers, addFavAlbum, addFavArtist, removeFavArtist, removeFavAlbum } = require("./controllers")
 
const userRouter = Router();


userRouter.post("/users/register", hashPass, registerUser)
userRouter.post("/users/login", comparePass, login)
userRouter.put("/users/update", tokenCheck, updateUser)
userRouter.delete("/users/delete", tokenCheck, deleteUser)
userRouter.get("/users/all", getAllUsers)
userRouter.get("/users/authCheck", tokenCheck, login)

userRouter.put("/users/addFavArtist", addFavArtist)
userRouter.put("/users/addFavAlbum", addFavAlbum)
userRouter.put("/users/removeFavArtist", removeFavArtist)
userRouter.put("/users/removeFavAlbum", removeFavAlbum)






module.exports = userRouter