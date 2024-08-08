const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db_config');


const MomentTweet = sequelize.define('MomentTweet', {
    momentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Moments',
        key: 'id'
      }
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
    timestamps: true
  });

module.exports =  MomentTweet;

