const db = require('../models');
const fs = require('fs');//importer le package fs(file system) de node pour accéder aux opérations liées aux fichiers//

exports.createPost = (req,res,next) => {
    console.log(req.body);
    db.Post.create ({
        //je renseigne la clè étrangère (id de l'utilisateur) pour le champ UserId de la table post//
        UserId : req.body.user_id,
        //je récupère les données des champs titre et content//
        tittle: req.body.tittle,
        content: req.body.content,
        statut: 0,
    })
    .then(() => res.status(201).json({message : 'post créé'}))
    .catch(error => res.status(400).json({error}));
};


exports.deletePost = (req,res,next) => {
    db.Post.destroy(
        {
            where : {
                id: req.params.id,
            },
        })
        .then(() => res.status(200).json({message : 'post suprimé'}))
        .catch(error => res.status(400).json({error}));   
};
exports.getOnePost = (req,res,next) => {
    db.Post.findOne({
        where : {
            id : req.params.id,
            statut : 0,
        },
        include : [{
            model : db.User,
            attributes : ['firstName','lastName'],
        }]
    })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(400).json({error}));  
};
exports.getAllPosts = (req,res,next) => {
//recupération de tous les posts dans la base de donnée//
    db.Post.findAll({
        include : [{
            model : db.User,
            attributes : ['firstName','lastName'],
        }],
        order : [["createdAt", "DESC"]]
    })
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({error}));
};