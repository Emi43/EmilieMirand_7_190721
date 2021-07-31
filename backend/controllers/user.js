const bcrypt = require('bcrypt');//pour importer le package bcrypt//
const jwt = require('jsonwebtoken');//pour importer le package jsonwebtoken//

const user = require('../models/user');//j'importe mon modèle user pour lire et enregistrer des users dans les middlewares suivant//
const db = require('../models');
const passwordValidator = require('password-validator');

const schema = new passwordValidator();//je crée un schéma pour recevoir des mots de passe sécurisés//

schema
.is().min(8)                                    // Minimum 8 caractères
.is().max(100)                                  // Maximum 100 caractères 
.has().uppercase(1)                              // minimun 1 caractère majuscule
.has().lowercase(1)                              // minimum 1 caractère minuscule
.has().digits(2)                                // doit avoir 2 chiffres
.has().not().spaces()                           // ne pas avoir d'espaces
.is().not().oneOf(['Password123']); // liste noire des mots de passe

//la fonction signup sert à l'enregistrement de nouveaux utilisateurs depuis le frontend//
exports.signup = (req, res, next) => {
    //si les données ne correspondent pas au schéma envoi d'une erreur//
    if(!schema.validate(req.body.password)){
        res.status(400).json({ error:'le mot de passe ne correspond pas au schéma demandé'})
    }
    //sinon le mot de passe correspond au schéma demandé//
        bcrypt.hash(req.body.password, 10)//pour appeler la fonction de hachage de bcrypt et "saler" le mot de passe 10fois//
        .then(hash => {
            console.log(req.body.email); 
            db.User.create({
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                email:req.body.email,
                password:hash,
                statut:0
            })
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error =>console.log(error) ||res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};
//fonction login pour la connexion des utilisateurs déjà crées//
exports.login = (req, res, next) => {
    db.User.findOne({//on verifie que l'email entré correspond à un utilisateur déjà créé//
        where:{
            email:req.body.email
        },
    })
    .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)//on utilise la fonction compare de bcrypt pour comparer le mot de passe entré par l'utilisateur avec le hash enregistré dans la base de données//
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
                userId: user.id,
                userStatut: user.statut,
                token: jwt.sign(//le token sécurise l'échange des données ce qui permet au backend de vérifier que la requête est authentifiée//
                    { userId: user.id, userStatut: user.statut },//1er argument:ce qu'on veut encoder//
                      'process.env.RANDOM_TOKEN_SECRET',//2ème argument:clè secréte d'encodage//
                    { expiresIn: '24h'}//3ème argument:chaque token dure 24h//
                )
              });
            })
            .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
  };

exports.getOneUser = (req,res,next) => {
    console.log(req.params.id)
    db.User.findOne({
        where: {
            id : req.params.id,
        },
    })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json({error: error }));
};

exports.getAllUsers = (req, res, next) => {
    db.User.findAll ({ //renvoie la liste complète des utilisateurs//
    })
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json({error }));
  };
exports.deleteAccountUser = (req, res, next) => {
    db.User.destroy({
        where:{id:req.params.id},
    })
    .then(() => res.status(200).json({ message: 'compte utilisateur suprimé !'}))
    .catch(error => res.status(404).json({ error }));
};
exports.deleteAccountUserByAdmin = (req, res, next) => {
    db.User.destroy({
        where:{id:req.params.id},
    })
    .then(() => res.status(200).json({ message: 'compte utilisateur suprimé par admin !'}))
    .catch(error => res.status(400).json({ error }));
};
exports.modifyUser= (req, res, next) => {
    db.User.update(
        {
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            email : req.body.email
        },
        {
            where: { id: req.params.id }
        })
        .then(() => res.status(200).json({ message: 'compte utilisateur modifié !'}))
        .catch(error => res.status(400).json({ error }));
};