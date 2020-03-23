const db = require('../data/db-config');

module.exports = {
    find,
    findById,
     add
}

//------find method----
function find(){
   return db('users').select('id','username')
}

//------findById(id)
 function findById(id){
    return db('users')
    .where({id})
    .select('id','username')
    .first()
 }

 //---findBy(Filter)----//filter can be anything(say username)
 function findBy(filter){
     return db("users")
     .where(filter)
 }


//-----add a user--------

async function add(user){
   const[id] = await db("users")
   .insert(user,"id");
   return findById(id)
}