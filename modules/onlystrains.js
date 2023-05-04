const axios = require('axios');
const cache = require('.cache.js');
// const mongoose = require('mongoose');

const { onlystrainsModel } = require('../models'); 

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error'));
// db.once('open', function () {
//   console.log('Mongoose is connected');
// });

// mongoose.connect(process.env.DB_URL);

// class OnlyStrain {
//   constructor(OnlyStrainObject) {
//     this.name = OnlyStrainObject.name,
//     this.thc = OnlyStrainObject.thc,
//     this.cbg = OnlyStrainObject.cbg,
//     this.effects = OnlyStrainObject.effects,
//     this.flavors = OnlyStrainObject.flavors,
//     this.image = OnlyStrainObject.image.large;
//   }
// }

async function getOnlystrain(req, res, next) {
  let Onlystrain = req.query.name;
  console.log(Onlystrain);
  // https://api.Onlystraintcg.io/v2/cards?q=name:gardevoir
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

module.exports = getOnlystrain;
