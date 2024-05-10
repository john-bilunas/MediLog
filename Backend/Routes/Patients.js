const express = require('express');
const router = express.Router();


//get all
router.get('/', (req,res));
//get one
router.get('/:patient', (req,res));
//add one
router.post('/', (req,res));
//edit one (overwrite)
router.put('/:patient', (req,res));
//modify one (edit properties)
router.patch('/:patient', (req, res))
//delete one
router.delete('/:patient', (req,res));




module.exports = router;