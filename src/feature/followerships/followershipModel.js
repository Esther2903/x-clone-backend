const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db_config');
const User = require('../users/userModel');




const Followership = sequelize.define('Followership', {
  followerId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  followedId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  //updatedAt: false
});

module.exports =  Followership;