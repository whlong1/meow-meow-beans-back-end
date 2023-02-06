'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      Profile.belongsTo(models.User, { as: "user", foreignKey: 'userId' })

      Profile.hasMany(models.Vote, {
        as: 'votesGiven',
        foreignKey: 'voterId',
      })

      Profile.hasMany(models.Vote, {
        as: 'votesReceived',
        foreignKey: 'profileId',
      })

    }
  }

  Profile.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};