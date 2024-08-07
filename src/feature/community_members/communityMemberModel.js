const { DataTypes } = require('sequelize');
const sequelize = require('../config/db_config.js');


const CommunityMember = sequelize.define('CommunityMember', {
    communityId: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: 'Communities',
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

module.exports = CommunityMember;
