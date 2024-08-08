const { DataTypes } = require('sequelize');
const sequelize = require('../../utils/index');

const Tweet = sequelize.define('Tweet', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isThread: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    parentTweetId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Tweets',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    typeTweets: {
      type: DataTypes.ENUM('tweet', 'quote', 'reply'),
      allowNull: false
    }
  }, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

module.exports = Tweet;

