'use strict';

const express = require('express');

const { onlystrainsModel } = require('../models');


const router = express.Router();

router.get('/onlystrains', async (req, res, next) => {
  const onlystrains = await onlystrainsModel.findAll();
  res.status(200).send(onlystrains);
});

router.post('/onlystrains', async (req, res, next) => {
  try {
    console.log(req.body);
    const newonlystrains = await onlystrainsModel.create(req.body);
    res.status(200).send(newonlystrains);
  } catch (err) {
    next(err);
  }
});


router.get('/onlystrains/:id', async (req, res, next) => {
  const id = req.params.id;
  const onlystrains = await onlystrainsModel.findByPk(id);
  res.status(200).send(onlystrains);
});

router.put('/onlystrains/:id', async (req, res, next) => {
  try {
   
    const updatedonlystrains = await onlystrainsModel.update(req.body, {where: {id: req.params.id}});
    res.status(200).send(updatedonlystrains);
  } catch (err) {
    next(err);
  }
});

router.delete('/onlystrains/:id', async (req, res, next) => {
  try {
    
    await onlystrainsModel.destroy({where: {id: req.params.id}});
    res.status(200).send('Deleted');
  } catch (err) {
    next(err);
  }
});


module.exports = router;