const db = require('../data/db-config')

module.exports = {
    find
}

//------find method----

function find(){
    return db('users').select('id','username')
 }