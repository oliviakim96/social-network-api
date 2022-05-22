const router = require('express').Router();

const {
    getThoughts,
    getThoughtbyId,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require ('../../controllers/thought-controller');

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getThoughtbyId).put(updateThought).delete(deleteThought);

router.route('/:thoughId/reactions').post(addReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);


module.exports=router;
