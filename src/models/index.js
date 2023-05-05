'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const onlystrains = require('./onlystrains-model.js');

const DATABASE_URL = process.env.DATABASE_URL|| 'sqlite::memory';

const sequelize = new Sequelize(DATABASE_URL);

const onlystrainsModel = onlystrains(sequelize, DataTypes);

module.exports = {
  sequelize,
  onlystrainsModel,
};
