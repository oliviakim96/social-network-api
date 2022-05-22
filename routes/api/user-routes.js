const router= require('express').Router();

const {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
}
=require('../../controllers/user-controller');

router.route('/').get(getAllUsers).post(createUser);

router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

router.route('/:userId/friend').post(addFriend);

router.route('/:userId/friend/:friendId').delete(removeFriend);

module.exports =router;