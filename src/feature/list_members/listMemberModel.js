const { DataTypes } = require('sequelize');
const sequelize = require('../config/db_config.js');


const ListMember = sequelize.define('ListMember', {
    listId: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: 'Lists',
        key: 'id'
      }
    },
    memberUserId: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  });

module.exports = ListMember;