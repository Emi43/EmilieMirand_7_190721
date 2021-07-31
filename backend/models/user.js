'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.associate = function(models){
        //models.User va fournir une clè étrangère à models.Post et models.Comment//
        models.User.hasMany(models.Post),
        models.User.hasMany(models.Comment)
      }
    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    statut: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};