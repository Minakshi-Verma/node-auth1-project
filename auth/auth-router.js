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

//---POST REQUEST to login------
//(you can login only if your credential matches with what you used at register)

// router.post('/login', (req,res)=>{
//     const {username, password} = req.body

//     Users.findBy({username})
//     .then(([user])=>{
//      if(user && bcrypt.compareSync(password,user.password)){
//        res.status(200).json({message:"Welcome back"})
//      }else{
//        res.status(401).json({ message: "invalid credentials" });
//      }  
//     })
//     .catch(err=>json.send(err))   
    
// })

//---POST REQUEST to login------
//It will not only check user credentials but also add session to remember the client 

router.post('/login', (req,res)=>{
    const {username, password} = req.body

    Users.findBy({username})
    .then(([user])=>{
     if(user && bcrypt.compareSync(password,user.password)){
         //Add session and remember the client
         req.session.user = {
             id: user.id,
             username: user.username
         }
       res.status(200).json({ hello: user.username})
     }else{
       res.status(401).json({ message: "invalid credentials" });
     }  
    })
    .catch(err=>{res.status(500).json({message:"Can not find the user"})})    
})

//


module.exports = router;