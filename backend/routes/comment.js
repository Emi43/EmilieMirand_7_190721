const express = require('express');//pour importer express//
const router = express.Router();//pour créer notre routeur avec la fonction router d'express//

const commentCtrl = require('../controllers/comment');//pour importer les controllers//
const auth = require('../middleware/auth');//pour importer le middleware auth//

//router.post('/',auth,commentCtrl.createComment);//²
module.exports = router;//pour exporter le routeur vers app.js//