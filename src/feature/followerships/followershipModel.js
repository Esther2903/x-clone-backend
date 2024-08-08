const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db_config');


const Followership = sequelize.define('Followership', {
    followerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    followedId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
  }, {
    timestamps: true,
    createdAt: 'created_at'
  });

module.exports =  Followership;
