const { Thought, User } = require('../models');

const thoughtController = {
    //get all thoughts
    getThoughts(req,res) {
        Thought.find({})
        .then((dbThoughtData)=> {
            res.json(dbThoughtData);
        })
        },
    //get one thought by id 
    getThoughtbyId(req, res ) {
        Thought.findById(id)
        .then((dbThoughtData)=>{
            if(!dbThoughtData){
                return res.status(404).json({message:'Can not find any thought with this id'});
            }
            res.json(dbThoughtData);
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).json(err);
        });
    },
    // Create a thought
    CreateThought (req, res){
        Thought.create(req.body)
        .then((dbThoughtData) => {
            return User.findOneAndUpdate(
                {_id:req.body.userId},
                {$push:{ thoughts: dbThoughtData._id}},
                { new:true}
            );
    })
    .then((dbUserData)=> {
        if(!dbUserData){
            return res. status(404).json({message: 'User can not find with this id'});
        }
        res.json(dbThoughtData);
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json(err);
    });
}
}

module.exports=thoughtController;
