const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db_config');


const SpaceParticipant = sequelize.define('SpaceParticipant', {
    spaceId: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: 'Spaces',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  });

module.exports =  SpaceParticipant;
