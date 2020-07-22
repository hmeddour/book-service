const Book = require("../models/books.model");

const controller = {
    getAll : (req, res, next) => {
        const token = getToken(req.headers);
        if(token) {
            Book.find({})
            .then(
                books => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type","application/json");
                    res.json(books);
                },
                err => next(err)
            )
            .catch(err=>next(err));
        }
        else {
            return res.status(403).send({success: false, msg: 'Unauthorized.'});
        }
    },

    addOne : (req, res, next) => {
        const token = getToken(req.headers);
        if(token) {
            Book.create(req.body)
            .then(
                book => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type","application/json");
                    res.json(book);
                },
                err => next(err)
            )
            .catch(err=>next(err));
        }
        else {
            return res.status(403).send({success: false, msg: 'Unauthorized.'});
        }
    },
    getOne : (req, res, next) => {
        const token = getToken(req.headers);
        if(token) {
            Book.findById(req.params.bookId)
            .then(
                book => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type","application/json");
                    res.json(book);
                },
                err => next(err)
            )
            .catch(err=>next(err));
        }
        else {
            return res.status(403).send({success: false, msg: 'Unauthorized.'});
        }
    },
    updateOne : (req, res, next) => {
        const token = getToken(req.headers);
        if(token) {
            Book.findByIdAndUpdate(
                req.params.bookId, 
                {$set: req.body},
                {new : true}
            )
            .then(
                book => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type","application/json");
                    res.json(book);
                },
                err => next(err)
            )
            .catch(err=>next(err));
        }
        else {
            return res.status(403).send({success: false, msg: 'Unauthorized.'});
        }
        
    },
    deleteOne : (req, res, next) => {
        const token = getToken(req.headers);
        if(token) {
            Book.findByIdAndDelete(req.params.bookId)
            .then(
                book => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type","application/json");
                    res.json(book);
                },
                err => next(err)
            )
            .catch(err=>next(err));
        }
        else {
            return res.status(403).send({success: false, msg: 'Unauthorized.'});
        }
    },

    getAllComments : (req, res, next) => {
        const token = getToken(req.headers);
        if(token) {
            Book.findById(req.params.bookId)
            .then(
                book => {
                    res.statusCode = 200;
                    res.setHeader("Content-type", "application/json");
                    res.json(book.comments);
                },
                err => next(err)
            )
            .catch(err => next(err));
        }
        else {
            return res.status(403).send({success: false, msg: 'Unauthorized.'});
        }
        
    },

    addOneComments : (req, res, next) => {
        const token = getToken(req.headers);
        if(token) {
            var newComment = {"rating": req.body.rating, "comment": req.body.comment, "author": req.body.author};
            Book
                .findByIdAndUpdate(req.params.bookId, { $push: {comments: newComment}}) 
                .then(
                    book => {
                        res.statusCode = 200;
                        res.setHeader("Content-Type","application/json");
                        res.json(book)
                    },
                    err => next(err)
                )
                .catch(err=>next(err));
        }
        else {
            return res.status(403).send({success: false, msg: 'Unauthorized.'});
        }
    },

    getOneComment : (req, res, nex) => {
        const token = getToken(req.headers);
        if(token) {
            Book.findById(req.params.bookId)
            .then(
                book => {
                    res.statusCode = 200;
                    res.setHeader("Content-type", "application/json");
                    res.json(book.comments.id(req.params.commentId));
                },
                err => next(err)
            )
            .catch(err => next(err));
        }
        else {
            return res.status(403).send({success: false, msg: 'Unauthorized.'});
        }
    },

    updateOneComment : (req, res, next) => {
        const token = getToken(req.headers);
        if (token) {
            Book.updateOne(
                { "_id" : req.params.bookId, "comments._id": req.params.commentId },
                { $set: {"comments.$": req.body} }
            )
            .then(
                book => {
                    res.statusCode = 200;
                    res.setHeader("Content-type", "application/json");
                    res.json(book);
                },
                err => next(err)
            )
            .catch(err => next(err));
        } else {
            return res.status(403).send({success: false, msg: 'Non autorisé.'});
        }
    },

    deleteOneComment : (req, res, next) => {
        const token = getToken(req.headers);
        if(token) {
            Book
                .findByIdAndUpdate(req.params.bookId, 
                { $pull: { "comments": { _id: req.params.commentId } } })
                .then(
                    book => {
                        res.statusCode = 200;
                        res.setHeader("Content-type", "application/json");
                        res.json({success: true, msg: 'Delete ' + book.comments.id(req.params.commentId)})
                    },
                    err => next(err)
                )
                .catch(err => next(err));
        }
        else {
            return res.status(403).send({success: false, msg: 'Unauthorized.'});
        }
    }
};

getToken = function (headers) {
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(' ');
      if (parted.length === 2) {
        return parted[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
};

module.exports = controller;