const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db_config');

const Mention = sequelize.define('Mention', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    tweetId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Tweets',
        key: 'id'
      }
    },
    mentionedUserId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    timestamps: true
  });

module.exports = Mention;
