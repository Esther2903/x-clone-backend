const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db_config');

const Bookmark = sequelize.define('Bookmark', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    }, 
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Users',
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
    tableName: 'bookmarks',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Bookmark;
