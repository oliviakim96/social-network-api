const router = require('express').Router();

const {
    getThoughts,
    getThoughtsbyId,
    createThought
} = require ('../../controllers/thought-controller');

router.route('/').get(getThoughts).post(createPizza);

router.route(':/thoughtsbyId').get(getThoughtbyId).put


module.exports=router;
