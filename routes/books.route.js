const controller = require('../controllers/books.controller');
const express = require('express');
const passport = require('passport');

const router = express.Router();

router.use(express.json());

router
    .route('/')
    .get(passport.authenticate('jwt', { session: false}), controller.getAll)
    .post(passport.authenticate('jwt', { session: false}), controller.addOne)
 
router
    .route('/:bookId')
    .get(passport.authenticate('jwt', { session: false}), controller.getOne)
    .put(passport.authenticate('jwt', { session: false}), controller.updateOne)
    .delete(passport.authenticate('jwt', { session: false}), controller.deleteOne);

router
    .route('/:bookId/:comments')
    .get(passport.authenticate('jwt', { session: false}), controller.getAllComments)  
    .post(passport.authenticate('jwt', { session: false}), controller.addOneComments)

router      
    .route('/:bookId/:comments/:commentId')
    .get(passport.authenticate('jwt', { session: false}), controller.getOneComment)
    .put(passport.authenticate('jwt', { session: false}), controller.updateOneComment)
    .delete(passport.authenticate('jwt', { session: false}), controller.deleteOneComment)
    
module.exports = router;