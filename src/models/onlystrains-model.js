'use strict';

module.exports = (sequelize, DataTypes) => {
  const OnlyStrain = sequelize.define('OnlyStrain', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    thc: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    cbg: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    effects: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    flavors: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  return OnlyStrain;
};
