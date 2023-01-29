'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vote extends Model {
    static associate(models) {
      // define association here
      Vote.belongsTo(models.Profile, { foreignKey: 'voterId' })
      Vote.belongsTo(models.Profile, { foreignKey: 'profileId' })
    }
  }
  Vote.init({
    // value: DataTypes.INTEGER,
    value: {
      type: DataTypes.INTEGER,
      validate: {
        max: 5,
        min: 0
      }
    },

    // profileId: DataTypes.INTEGER,
    profileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Profiles',
        key: 'id',
      },
    },

    // voterId: DataTypes.INTEGER,
    voterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Profiles',
        key: 'id',
      },
    },

  }, {
    sequelize,
    modelName: 'Vote',
  });
  return Vote;
};