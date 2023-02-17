const BookController = require('../controllers/controller.book');

const router = require('express').Router();

router.route('/')
    .get(BookController.list)
    .post(BookController.store);
router.route('/:id')
    .delete(BookController.destroy)
    .put(BookController.update);

module.exports = router;