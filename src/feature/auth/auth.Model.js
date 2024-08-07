const { DataTypes } = require('sequelize');
const sequelize = require('../config/db_config.js');


const Auth = sequelize.define('Auth', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false 
    },
    secretKey: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    accountStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false, 
        defaultValue: true 
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false, 
      references: {
        model: 'Users',
        key: 'id'
      }
    }
}, 
{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
    
});

module.exports = Auth;
