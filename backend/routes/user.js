const express = require('express');//pour importer express//
const router = express.Router();//pour créer notre routeur avec la fonction router d'express//

const userCtrl = require('../controllers/user');//pour importer les controllers//
const auth = require('../middleware/auth');//pour importer le middleware auth//
const multer = require('../middleware/multer-config');//pour importer le middleware qui permet de télecharger des fichiers images depuis le frontend//

//je crée deux routes post parce que le frontend doit envoyer des informations( adresse mail et mot de passe)//
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

//pour protéger mes routes j'ajoute le middleware 'auth' avant le controlleur//
//j'ajoute le middleware 'multer' pour avoir un fichier image avec la requête post//
router.get('/', auth, userCtrl.getAllUsers);//pour afficher tous les utilisateurs//
router.get('/:id', auth, userCtrl.getOneUser);//pour afficher un seul utilisateur//
router.put('/:id', auth, multer, userCtrl.modifyUser);//pour modifier un utilisateur//
router.delete('/:id', auth,  userCtrl.deleteAccountUser);//pour supprimer un compte user//


module.exports = router;//pour exporter le routeur vers app.js//