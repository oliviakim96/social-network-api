const {User, Thought} = require('../models');

const userController = {
    //get all users
    getAllUsers (req,res){
        User.find({})
        .select('-__v')
        .then((dbUserData)=>{
            req.json(dbUserData);
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).json(err);
        });
    },
    //get single user by id 
    getSingleUser(req,res){
        User.findOne({_id:req.params.userId})
        .select('-__v')
        .populate('friends')
        .populate('thoughts')
        .then((dbUserData)=>{
            if(!dbUserData){
                return res.status(404).json({message:'can not find any users with this id.'});
            }
            res.json(dbUserData);
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).json(err);
        });
    },
    //create a new user
    createUser(req, res){
        User.create(req.body)
        .then((dbUserData)=>{
            res.json(dbUserData);
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).json(err);
        });
    },
    //update a user
    updateUser(req,res){
        User.findOneAndUpdate (
            {_id:req.params.userId},
            {$set:req.body},
            {runValidators:true, new:true}
        )
        .then((dbUserData)=>{
            if(!dbUserData){
                return res.status(404).json({message:'can not find any users with this id'});
            }
            res.json(dbUserData);
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).json(err);
        });
    },
    deleteUser(req,res){
        User.findOneAndRemove({_id:req.params.userId})
        .then((dbUserData)=>{
            if(!dbUserData){
                return res.status(404).json({message:'can not find any users with this id.'});
            }
        })
        .then(()=>{
            res.json({message: 'successfully deleted'});
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).json(err);
        });
    },
    // add friend to the list
    addFriend(req,res) {
        User.findByIdAndUpdate(
            {_id:req.params.userId},
            {$addToSet:{
                friends:req.params.friendId
            }},
            {runValidators:true, new:true}
            )
            .then((dbUserData)=>{
                if(!dbUserData){
                    return res.status(404).json({message:'can not find any users with this id.'});
                }
                res.json(dbUserData);
            })
            .catch((err)=>{
                console.log(err);
                res.status(500).json(err);
            });
    },
    //remove friend from the list
    removeFriend(req, res){
        User.findOneAndUpdate(
            {_id:req.params.userId},
            {$pull:{ friends: req.params.friendId}},
            {runValidators:true, new:true}
        )
        .then((dbUserData)=>{
            if(!dbUserData){
                return res.status(404).json({message:'can not find any users with this id.'})
            }
            res.json(dbUserData);
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).json(err);
        });
    }
};

module.exports=userController;