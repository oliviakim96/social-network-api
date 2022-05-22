const {User} = require('../models');

const userController = {
    //get all users
    getAllUsers (req,res){
        User.find()
        .select()
    }
}