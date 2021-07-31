const express = require('express');//pour importer express//
const router = express.Router();//pour créer notre routeur avec la fonction router d'express//

const postCtrl = require('../controllers/post');//pour importer les controllers//
const auth = require('../middleware/auth');//pour importer le middleware auth//
const multer = require('../middleware/multer-config');//pour importer le middleware qui permet de télecharger des fichiers images depuis le frontend//

router.get('/',auth, postCtrl.getAllPosts);
router.get('/:id',auth, postCtrl.getOnePost);
router.post('/',auth, postCtrl.createPost);
router.delete('/:id',auth,postCtrl.deletePost);

module.exports = router;//pour exporter le routeur vers app.js//