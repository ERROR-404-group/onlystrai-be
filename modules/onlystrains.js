const axios = require('axios');
const cache = require('.cache.js');
const { onlystrainsModel } = require('../models'); 

async function getOnlystrain(req, res, next) {
  let Onlystrain = req.query.name;
  console.log(Onlystrain);
  let config = {
    baseURL: 'https://rapidapi.com/raygorodskij/api/Strain/',
    params: {
      q: `name:${Onlystrain}`,
    },
    method: 'get',
  };
  let key = Onlystrain + 'Data';
  if (cache[key]) {
    console.log('found CASH!' + cache[key]);
    res.status(200).send(cache[key].data);
  } else {
    console.log('no cash, fetching resource');

    try {
      let Onlystraindata = await axios(config);
      console.log(Onlystraindata.data.data);
      let OnlystraindataResults = Onlystraindata.data.data.map(item => new Onlystrain(item));
      res.status(200).send(OnlystraindataResults);
      cache[key] ={
        data:OnlystraindataResults,
        timeStamp: Date.now(),
      };
    }
    catch (err) {
      console.log(err);
      next(err);
    }
  }
}

async function createOnlystrain(req, res, next) {
  try {
    const { name, thc, cbg, effects, flavors, image } = req.body;
    const newOnlystrain = await onlystrainsModel.create({
      name,
      thc,
      cbg,
      effects,
      flavors,
      image,
    });
    res.status(201).send(newOnlystrain);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function getOnlystrains(req, res, next) {
  try {
    const Onlystrains = await onlystrainsModel.find({});
    res.status(200).send(Onlystrains);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function updateOnlystrain(req, res, next) {
  try {
    const { id } = req.params;
    const { name, thc, cbg, effects, flavors, image } = req.body;
    const updatedOnlystrain = await onlystrainsModel.findByIdAndUpdate(
      id,
      {
        name,
        thc,
        cbg,
        effects,
        flavors,
        image,
      },
      { new: true }
    );
    res.status(200).send(updatedOnlystrain);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function deleteOnlystrain(req, res, next) {
  try {
    const { id } = req.params;
    const deletedOnlystrain = await onlystrainsModel.findByIdAndDelete(id);
    res.status(200).send(deletedOnlystrain);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = {
  getOnlystrain,
  createOnlystrain,
  getOnlystrains,
  updateOnlystrain,
  deleteOnlystrain,
};
