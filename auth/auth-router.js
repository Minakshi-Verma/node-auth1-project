const bcrypt = require("bcryptjs")

const router = require("express").Router();

const Users = require("./auth-model")

//--POST REQUEST to add user credentials to register----

router.post('/register', (req, res)=>{
    const userInfo = req.body;

    //The password will be hashed 8 times if no information is added to .env file
    const ROUNDS = process.env.HASHING_ROUNDS||8 //add this to make the rounds dynamic
    const hash = bcrypt.hashSync(userInfo.password, ROUNDS);

    userInfo.password = hash

    Users.add(userInfo)
    .then(user=>{
      res.status(201).json(user)
    })
    .catch(err=>{
      res.status(400).json(err)
    })
})




module.exports = router;