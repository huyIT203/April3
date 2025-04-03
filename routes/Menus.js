let express = require('express');
let router = express.Router();
let Menus = require('../controllers/Menus');

router.get('/', Menus.getMenu);

module.exports = router;
router.post('/', Menus.createMenu);