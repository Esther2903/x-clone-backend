const { DataTypes } = require('sequelize');
const sequelize = require('../config/db_config.js');


const Media = sequelize.define('Media', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    mediaType: {
      type: DataTypes.ENUM('image', 'video', 'gif'),
      allowNull: false
    },
    mediaUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tweetId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Tweets',
        key: 'id'
      }
    }
  }, {
    timestamps: true,
    createdAt: 'created_at'
  });

module.exports = Media;
