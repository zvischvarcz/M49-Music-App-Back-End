const { Router } = require("express");

const { hashPass, comparePass, tokenCheck, emailCheck } = require("../middleware")
const { registerUser, login, updateUser, deleteUser, getAllUsers, search, addFavAlbum, addFavArtist, removeFavArtist, removeFavAlbum, addFavTrack, removeFavTrack  } = require("./controllers")
 
const userRouter = Router();


userRouter.post("/users/register", hashPass, registerUser)
userRouter.post("/users/login", comparePass, login)
userRouter.put("/users/update", tokenCheck, emailCheck, updateUser)
userRouter.delete("/users/delete", tokenCheck, deleteUser)
userRouter.get("/users/all", getAllUsers)
userRouter.get("/users/authCheck", tokenCheck, login)
userRouter.get("/users/search", search)


userRouter.put("/users/addFavArtist", addFavArtist)
userRouter.put("/users/addFavAlbum", addFavAlbum)
userRouter.put("/users/removeFavArtist", removeFavArtist)
userRouter.put("/users/removeFavAlbum", removeFavAlbum)

userRouter.put("/users/addFavTrack", addFavTrack)
userRouter.put("/users/removeFavTrack", removeFavTrack)




module.exports = userRouter