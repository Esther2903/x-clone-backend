const { DataTypes } = require('sequelize');
const sequelize = require('../config/db_config.js');


const NewsletterSubscriber = sequelize.define('NewsletterSubscriber', {
    newsletterId: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: 'Newsletters',
        key: 'id'
      }
    },
    subscriberUserId: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  });

module.exports = NewsletterSubscriber;

