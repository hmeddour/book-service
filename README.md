# Node.js tutoriel

## 1. Node.js
![Semantic description of image](/images/nodejs-logo.png)

Node.js est une plateforme logicielle libre et événementielle en JavaScript
Parmi les modules natifs de Node.js, on retrouve http qui permet le développement de serveur HTTP. Il est donc possible de se passer de serveurs web tels que Nginx ou Apache lors du déploiement de sites et d'applications web développés avec Node.js.
Jusqu'ici, JavaScript avait toujours été utilisé du côté du client, c'est-à-dire du côté du visiteur qui navigue sur notre site. Le navigateur web du visiteur (Firefox, Chrome, IE...) exécute le code JavaScript et effectue des actions sur la page web.
Par contre, Node.js offre un environnement côté serveur qui nous permet aussi d'utiliser le langage JavaScript pour générer des pages web. En gros, il vient en remplacement de langages serveur comme PHP, Java EE, etc.

## 2. NPM
NPM est le gestionnaire de paquets officiel de **Node.js**. Depuis la version 0.6.3 de Node.js, npm fait partie de l'environnement il est donc automatiquement installé par défaut3. npm fonctionne avec un terminal et gère les dépendances pour une application. Il permet également d'installer des applications Node.js disponibles sur le dépôt npm.

**Installer Node.js et NPM**

``` bash
sudo apt install nodejs
```

Voir les versions de **Node.js** et **NPM** installée
``` bash
node -v 
npm -v
```

**Création de l'application**
Créer dans un dossier vide
``` bash
mkdir bookServer
```
Entrer dans le dossier
``` bash
cd bookServer
```
Initialiser le projet avec **NPM** en créant le ficher package.json qui va contenir toutes les dépendances du projet
``` bash
npm init
```

Voir le fichier package.json généré
```
{
  "name": "bookServer",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```
**Lancer l'application**
Dans le package.json, ajouter :
```
"scripts": {
    "start": "nodejs ./bin/www"
    ...
},
```
Lancer l'application avec la commande :
``` bash
npm start
```

## 3. Express.js
Express.js est une infrastructure d'applications Web Node.js minimaliste et flexible qui fournit un ensemble de fonctionnalités robuste pour les applications Web et mobiles.
Express, module HTTP de NodeJS, permet de réaliser rapidement un serveur HTTP dans votre application NodeJS.

**Installer Express**
``` bash
sudo npm install express --save
```

**Créer l'application bookServer avec Express**
``` bash
express bookServer
```
**Créer un route simple avec Express.js**
Créer le fichier index.js 
```
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
```

## 4. MongoDB

Télécharger MongoDB [ici](https://www.mongodb.com/download-center/community)

Exécutez la commande suivante :

`tar -zxvf mongodb-osx-ssl-x86_64-4.0.6.tar`

Editer le fichier .bash_profile
`sudo nano .bash_profile`

Et ajouter :

`export PATH=<mongodb-install-directory>/bin:$PATH`

Puis se placer a la racine et exécuter la commande suivante:

`source .bash_profile`

Ensuite effectuer ces commandes pour créer le répertoire ou les données seront stockées dans mongodb:

`sudo mkdir -p /data/db`

`sudo chown -R <id> -un /data/db`

Demarrer  MongoDB :

`mongod`

#### Accès à la base

Acceder a la console MongoDB:

`mongo`

Création de la base de donnée « Amazon »:

`use amazon`

`db.books.insert({title:"Harry Potter et la coupe de Feu", author:"J.K.Rowling"})`

## 5. Installation et configuration de Mongoose

Installer mongoose avec la commande suivante:

`$ npm install mongoose --save`

Modifier ensuite le fichier `app.js` et se connecter a la base de données.

## 6. Routes
Nous allons maintenant créer les routes.

Dans le fichier `app.js` ajouter :

```javascript
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users.routes');
var booksRouter = require('./routes/books.routes');
```

Puis dans `books.routes.js` ajouter :

```javascript
const controller = require('../controllers/books.controller');
const express = require('express');

const router = express.Router();

router.use(express.json());
router
    .route('/')
    .get(controller.getAll)
    .post(controller.addOne);
    
router
    .route('/:bookId')
    .get(controller.getOne)
    .put(controller.updateOne)
    .delete(controller.deleteOne);

router
    .route('/:bookId/comments')
    .post(controller.addOneComment)
    .get(controller.getAllComments);

router
    .route('/:bookId/comments/:commentId')
    .get(controller.getOneComment)
    .put(controller.updateOneComment)
    .delete(controller.deleteOneComment);

module.exports = router;
```

## 7. Controller

Créer un dossier `controllers` dans le lequel nous créerons un fichier `books.controller.js` et coder les fonctions décrite dans le router.

## 8. Création des modèles

Créer un dossier `models` à la racine de notre projet et creer le fichier `books.models.js`. 

Ajouter ensuite:

```javascript
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const commentSchema = new Schema({
    rating: {type: Number, min: 1, max: 5, required: true},
    comment: {type: String, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true});
   
const bookSchema = new Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    image: {type: String},
    year: {type: Number},
    price: {type: Currency},
    description: {type: String, required: true},
    bestseller: {type: Boolean, default: false},
    comments: [commentSchema]
}, {timestamps: true});
   
const Books = mongoose.model('Book', bookSchema);
module.exports = Books;
```

Installer mongoose-currency :

`npm install mongoose-currency --save`

**Lancement le serveur Node**

Lancer le projet avec la commande

`npm start`

Puis se rendre sur la page : **http://localhost:3000/books/**

## 9. Authentification

Installer les composant suivant:

`sudo npm install bcrypt-nodejs jsonwebtoken morgan passport passport-jwt --save`

Créer dans routes le fichier users.route.js et ajouter :

```javascript
const controller = require('../controllers/user.controller');
const passport = require('passport');
const config = require('../config/database');
require('../config/passport')(passport);
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();


router
  .route('/signup')
  .post(controller.addOne)

router 
  .route('/login')
  .post(controller.getOne)  

module.exports = router;
```

Créer ensuite dans models le fichier user.model.js et ajouter :

```javascript
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
  username: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  first_name: {type: String},
  last_name: {type: String},
  admin: {type: Boolean, default: true, required: true}
});

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
```

Puis ajouter dans controllers le fichier users.controller.js et ajouter:

```javascript
const User = require('../models/user.model');
const passport = require('passport');
const config = require('../config/database');
require('../config/passport')(passport);
const express = require('express');
const jwt = require('jsonwebtoken');

const controller = {
    addOne: (req, res) => {
        if (!req.body.username || !req.body.password) {
            res.json({success: false, msg: 'Please pass username and password.'});
          } else {
            var newUser = new User({
                username: req.body.username,
                password: req.body.password,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                admin: req.body.admin
            });
            // save the user
            newUser.save(function(err) {
              if (err) {
                return res.json({success: false, msg: 'Username already exists.'});
              }
              res.json({success: true, msg: 'Successful created new user.'});
            });
          }
    },

    getOne : (req, res) => {
        User.findOne({
            username: req.body.username
          }, function(err, user) {
            if (err) throw err;
        
            if (!user) {
              res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
            } else {
              // check if password matches
              user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                  // if user is found and password is right create a token
                  var token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800 // 1 week
                  });
                  // return the information including token as JSON
                  res.json({success: true, token: 'JWT ' + token, user});
                } else {
                  res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
              });
            }
        });
    },

}

module.exports = controller;
```

Puis ajouter dans controllers le fichier books.controller.js et ajouter:

```javascript
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
```

Créer ensuite le fichier passport.js dans le dossier config et ajouter :

```javascript
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

// load up the user model
var User = require('../models/user.model');
var config = require('../config/database'); // get db config file

module.exports = function(passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("JWT");
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.id}, function(err, user) {
          if (err) {
              return done(err, false);
          }
          if (user) {
              done(null, user);
          } else {
              done(null, false);
          }
      });
  }));
};
```

Créer également le fichier config.js dans le dossier config et ajouter:

```javascript
module.exports = {
    'secret':'nodeauthsecret',
    'database': 'mongodb://localhost/amazon'
};
```

## 10. Postman (Tester les routes)

**POST**

Dans un premier temps, création du compte utilisateur 

http://localhost:3000/users/signup 
 
 Et dans le body :
 
 ```
 {
    "username": "root",
    
    "password": "root",
    
    "first_name": "Dupont",
    
    "last_name": "Dupont",
    
    "admin": true
}
 ```

 **POST**

 Ensuite, se connecter avec le compte utilisateur et généré un token

 http://localhost:3000/users/login

 Et dans le body 

 ```
 {
    "username": "admin",
    
    "password": "admin"
}
 ```

 Un token devra être généré.

Dans Headers -> Authorization, copier le token généré afin d'avoir les autorisation.

**Books**

**POST**

Ajouter un livre 

http://localhost:3000/books

Et dans le body

```
{
    "title": "bookA",

    "author": "authorA",

    "image": "imageA",

    "year": 2019,

    "price": 10,

    "bestSaller": false

}
```

**GET**

Récupérer tous les livres 

http://localhost:3000/books

**GET**

Récupérer un livre avec son id

http://localhost:3000/books/{bookId}

**PUT**

Modifier un livre avec son id 

http://localhost:3000/books/{bookId}

Dans le body 

```
{
    "title": "bookB",

    "author": "authorB",

    "image": "imageB",

    "year": 2020,

    "price": 20

}    
```

**DELETE**

Supprimer un livre avec son id 

http://localhost:3000/books/5c7a8f4b537c8858b9c83942

**Comments**

**POST**

Ajouter un commentaire pour un livre donné

http://localhost:3000/books/{bookId}/comments

```
{
    "rating": "5",

    "comment": "Très bien",

    "author": {ObjectId}

}    
```

**GET**

Récupérer la liste des commentaires saisis par des utilisateurs différents pour un livre donné

http://localhost:3000/books/{bookId}/comments

**GET**

Récupérer un commentaire avec son id

http://localhost:3000/books/{bookId}/comments/{commentId}

**PUT**

Modifier un commentaire avec son id

http://localhost:3000/books/{bookId}/comments/{commentId}

Dans le body 

```
{
    "rating": "3",

    "comment": "Moyen"

}    
```

**DELETE**

Suprémer un comentaire avec son id

http://localhost:3000/books/{bookId}/comments/{commentId}