const express = require('express');
const router = express.Router();


//get all
router.get('/', (req,res));
//get one
router.get('/:medication', (req,res));
//add one
router.post('/', (req,res));
//edit one (overwrite)
router.put('/:medication', (req,res));
//modify one (edit properties)
router.patch('/:medication', (req, res))
//delete one
router.delete('/:medication', (req,res));




module.exports = router;