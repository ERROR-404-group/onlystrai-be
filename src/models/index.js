'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const onlystrains = require('src/models/onlystrains');

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory' : process.env.DATABASE_URL;

const sequelize = new Sequelize(DATABASE_URL);

const onlystrainsModel = onlystrains(sequelize, DataTypes);

module.exports = {
  sequelize,
  onlystrainsModel,
};