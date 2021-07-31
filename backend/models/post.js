'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      post.associate = function(models){
        //models.Post va fournir une clè étrangère à models.Comment//
        models.Post.hasMany(models.Comment,{
          onDelete : 'cascade',
        })
        //models.Post va recevoir une clè étrangère de models.User//
        models.Post.belongsTo(models.User,{
          onDelete : 'cascade',
          foreignKey : {allowNull: false}
        });
      }
    }
  };
  post.init({
    tittle: DataTypes.STRING,
    content: DataTypes.STRING,
    statut: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};