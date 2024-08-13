const { User , Tweet , Bookmark} = require('../../utils/index');

class BookmarkService {
    async createBookmark(bookmarkData) {
        try {
            const { tweetId, userId } = bookmarkData;
            const tweet = await Tweet.findByPk(tweetId);
            if (!tweet) {
                throw new Error('Tweet not found');
            }

            const bookmark = await Bookmark.create(bookmarkData);
            return bookmark;
        } catch (error) {
            throw new Error(`Error creating bookmark: ${error.message}`);
        }
    }

     async getBookmarksByUser(userId) {
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                throw new Error('User not found');
            }

            const bookmarks = await Bookmark.findAll({ where: { userId } });
            return bookmarks;
        } catch (error) {
            throw new Error(`Error retrieving bookmarks: ${error.message}`);
        }
    }

    async getBookmarksByTweet(tweetId) {
        try {
            const tweet = await Tweet.findByPk(tweetId);
            if (!tweet) {
                throw new Error('Tweet not found');
            }

            const bookmarks = await Bookmark.findAll({ where: { tweetId } });
            return bookmarks;
        } catch (error) {
            console.log(error);
            throw new Error(`Error retrieving bookmarks: ${error.message}`);
        }
    }

    async deleteBookmark(userId, tweetId) {
        try {
            const bookmark = await Bookmark.findOne({ where: { userId, tweetId } });
            if (!bookmark) {
                throw new Error('Bookmark not found');
            }

            await Bookmark.destroy({ where: { userId, tweetId } });
            return { message: 'Bookmark deleted successfully' };
        } catch (error) {
            throw new Error(`Error deleting bookmark: ${error.message}`);
        }
    }
}

module.exports = new BookmarkService();
