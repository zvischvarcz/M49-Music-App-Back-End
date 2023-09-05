const User = require("./model")
const jwt = require ("jsonwebtoken")

const registerUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(201).json({
            message: "Successfully registered",
            user: {username: user.username,
                   email: user.email,
                password: user.password}
        })

    } catch (error) {
        res.status(501).json({
            errorMessage: error.message, error: error
        })
    }
}

const login = async (req, res) => {
    try{

        if (req.authUser) {
            res.status(200).json({message: "success", 
            user: {
                username: req.authUser.username,
                email: req.authUser.email
            }})
            return
        }
       
        const token = jwt.sign({id: req.user.id}, process.env.SECRET_KEY)
        res.status(200).json({
            message: "Success",
            user: {
                username: req.body.username,
                email: req.body.email,
                token: token,
            }
        })
    }
    catch (error) {
        res.status(501).json({errorMessage: error.message, error: error})
    }
}

const  deleteUser = async (req, res) => {
    try {
        const token = req.header("Authorization")
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
        const deletedUser = await User.destroy({
            where: {
                id: decodedToken.id
            }})
        res.status(201).json({
            message: "Successfully deleted",
             amount: deletedUser
            })
    } 
    catch (error) {
        res.status(501).json({ errorMessage: error.message, error: error})
        
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll()
        res.status(200).json({
            message: "Retrieved all users",
            user: users
        })
    } catch (error) {
        res.status(501).json({ errorMessage: error.message, error: error})
    }
}

const updateUser = async (req, res) => {
    try {
        const token = req.header("Authorization")
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
        const updatedUser = await User.update({[req.body.key]: req.body.value}, {
            where: {
                id: decodedToken.id
            }
        });
        res.status(201).json({
            message: "Successfully updated",
            changed: updatedUser
        })
    } catch (error) {
        res.status(501).json({ errorMessage: error.message, error: error})
    }
}

const addFavArtist = async (req, res) => {
    try{
        const token = req.header("Authorization")
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
        const user = await User.findOne({
            where: {
                id: decodedToken.id
            }
        })
            
        if (user.favoriteArtists !== "") {
            await User.update({
                favoriteArtists : user.favoriteArtists + `, ${req.body.newArtist}` 
            }, {
                where: {
                    username: user.username
                }
            });
        } else {
            updatedUser = await User.update({
                favoriteArtists : req.body.newArtist
            }, {
                where: {
                    username: user.username
                }
            });
        }

        res.status(200).json({
            message: "Added a new favourite artist"
        })
    }
    catch (error) {
        res.status(500).json({errorMessage: error.message, error: error})
    }
}

const addFavAlbum = async (req, res) => {
    try{
        const token = req.header("Authorization")
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
        const user = await User.findOne({
            where: {
                id: decodedToken.id
            }
        })
            
        
        if (user.favoriteAlbums !== "") {
            await User.update({
                favoriteAlbums : user.favoriteAlbums + `, ${req.body.newAlbum}` 
            }, {
                where: {
                    username: user.username
                }
            });
        } else {
            updatedUser = await User.update({
                favoriteAlbums : req.body.newAlbum
            }, {
                where: {
                    username: user.username
                }
            });
        }

        res.status(200).json({
            message: "Added a new favourite album"
        })
    }
    catch (error) {
        res.status(500).json({errorMessage: error.message, error: error})
    }
}

const removeFavArtist = async (req, res) => {
    try {
        let commaPosition
        const token = req.header("Authorization")
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
        const user = await User.findOne({
            where: {
                id :decodedToken.id
            }
        })
        let array = user.favoriteArtists.split(", ")
        if (array.indexOf(req.body.removedArtist) === 0 && array.length === 1) {
            commaPosition = `${req.body.removedArtist}`
        } else if (array.indexOf(req.body.removedArtist) === 0) {
            commaPosition = `${req.body.removedArtist}, `
        } else {
            commaPosition = `, ${req.body.removedArtist}`
        } 

        await User.update({
            favoriteArtists: user.favoriteArtists.replace(`${commaPosition}`, "")
        }, {
            where: {
                username: user.username
            }
        })
        res.status(200).json({
            message: "Successfully removed artist"
        })
    }
    catch (error) {
        res.status(500).json({errorMessage: error.message, error: error})
    }
}

const removeFavAlbum = async (req, res) => {
    try {
        let commaPosition
        const token = req.header("Authorization")
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
        const user = await User.findOne({
            where: {
                id :decodedToken.id
            }
        })
        let array = user.favoriteAlbums.split(", ")
        if (array.indexOf(req.body.removedAlbum) === 0 && array.length === 1) {
            commaPosition = `${req.body.removedAlbum}`
        } else if (array.indexOf(req.body.removedAlbum) === 0) {
            commaPosition = `${req.body.removedAlbum}, `
        } else {
            commaPosition = `, ${req.body.removedAlbum}`
        } 

        await User.update({
            favoriteAlbums: user.favoriteAlbums.replace(`${commaPosition}`, "")
        }, {
            where: {
                username: user.username
            }
        })
        res.status(200).json({
            message: "Successfully removed album"
        })
    }
    catch (error) {
        res.status(500).json({errorMessage: error.message, error: error})
    }
}

const getArtist = async (req, res) => {
    try {
        const response = await fetch(`https://api.deezer.com/search/artist/?q=${req.body.name}`, {
            mode: "no-cors",
          method: "GET",
          headers: {
              "Content-Type" : "application/json"
          }
      })
        const data = response.json()
        res.status(200).json({data: data})
    }
    catch (error) {
        res.status(500).json({errorMessage: error.message, error: error})
    }
}



const getAlbum = async (req, res) => {
    try {
        const response = await fetch(`https://api.deezer.com/search/album/?q=${req.body.name}`, {
            mode: "no-cors",
          method: "GET",
          headers: {
              "Content-Type" : "application/json"
          }
      })
        const data = response.json()
        res.status(200).json({data: data})
    }
    catch (error) {
        res.status(500).json({errorMessage: error.message, error: error})
    }
}



module.exports = {
    registerUser,
    login,
    deleteUser,
    getAllUsers,
    updateUser,
    addFavArtist,
    addFavAlbum,
    removeFavArtist,
    removeFavAlbum,
    getArtist,
    getAlbum
}