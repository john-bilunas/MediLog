const express = require('express');
const router = express.Router();


//get all
router.get('/', (req,res));
//get one
router.get('/:user', (req,res));
//add one
router.post('/', (req,res));
//edit one (overwrite)
router.put('/:user', (req,res));
//modify one (edit properties)
router.patch('/:user', (req, res))
//delete one
router.delete('/:user', (req,res));




module.exports = router;