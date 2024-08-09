const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db_config');

const Notification = sequelize.define('Notification', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    notificationUserId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    type: {
        type: DataTypes.ENUM('mention', 'like', 'retweet', 'follow', 'direct_message', 'comment', 'bookmark'),
        allowNull: false
    },
    mentionId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'Mentions',
            key: 'id'
        }
    },
    tweetId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'Tweets',
            key: 'id'
        }
    },
    retweetId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'Retweets',
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
    messageId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'Messages',
            key: 'id'
        }
    },
    likeId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'Likes', 
            key: 'id'
        }
    },
    bookmarkId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'Bookmarks', 
            key: 'id'
        }
    },
    read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    timestamps: true,
    createdAt: 'created_at'
});

module.exports = Notification;