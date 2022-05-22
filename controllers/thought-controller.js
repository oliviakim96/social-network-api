const { Thought, User } = require('../models');

const thoughtController = {
    //get all thoughts
    getThoughts(req,res) {
        Thought.find({})
        .then((dbThoughtData)=> {
            res.json(dbThoughtData);
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).json(err);
        });
        },
    //get one thought by id 
    getThoughtbyId(req, res ) {
        Thought.findById(req._id)
        .then((dbThoughtData)=>{
            if(!dbThoughtData){
                return res.status(404).json({message:'Can not find any thoughts with this id.'});
            }
            res.json(dbThoughtData);
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).json(err);
        });
    },
    // Create a thought
    createThought (req, res){
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
},
//update thought
 updateThought(req,res){
     Thought.findOneAndUpdate(
         {_id: req.params.thoughtId},
         {$set:req.body},
         {runValidators:true, new:true}
         )
     .then((dbThoughtData)=>{
     if(!dbThoughtData){
        return res.status(404).json({message: 'can not find any thoughts with this id.'});
 }
 res.json(dbThoughtData);
})
.catch((err)=>{
    console.log(err);
    res.status(500).json(err);
});
},
//delete thought
deleteThought(req,res) {
    Thought.findOneAndRemove({_id:req.params.thoughtId})
    .then((dbThoughtData)=>{
        if(!dbThoughtData){
            return res.status(404).json({ message:'can not find any thoughts with this id.'});
        }
        //remove thought id from users thought area
        return User.findOneAndUpdate(
            {thought:req.params.thoughtId},
            {$pull:{ thoughts:req.params.thoughtId}},
            {new:true}
        );
    })
    .then((dbUserData)=> {
        if(!dbUserData){
            return res.status(404).json({message:'can not find any thought with this id.'});
        }
        res.json({message:'It is successfully deleted'});
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json(err);
    });
},
//add a reaction to a thought
addReaction(req, res) {
    Thought.findOneAndUpdate(
        {_id:req.params.thoughtId},
        {$addToSet:{ reactions:req.body}},
        {runValidators:true, new:true}
    )
    .then((dbThoughtData)=>{
        if(!dbThoughtData){
            return res.status(404).json({message:'can not find any thoughts with this id.'});
        }
        res.json(dbThoughtData);
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json(err);
    });
},
//remove reaction from a thought
removeReaction (req,res){
    Thought.findOneAndUpdate(
        {_id:req.params.thoughtId},
        {$pull:{ reactions: {reactionId:req.params.reactionId}}},
        {runvalidators:true, new: true}
    )
    .then((dbThoughtData)=>{
        if(!dbThoughtData){
            return res.status(404).json({message: 'can not find any thought with this id.'});
        }
        res.json(dbThoughtData)
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json(err);
    });
}
};

module.exports=thoughtController;
