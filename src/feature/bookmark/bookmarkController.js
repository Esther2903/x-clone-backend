const BookmarkService = require('./bookmarkService');

class BookmarkController {
    async createBookmark(req, res) {
        try {
            const { tweetId } = req.body;
            const userId = req.user.id;

            const bookmarkData = {
                tweetId,
                userId
            };

            const bookmark = await BookmarkService.createBookmark(bookmarkData);
            res.status(201).json(bookmark);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }

    }

    async getBookmarksByUser(req, res) {
        try {
            const bookmarks = await BookmarkService.getBookmarksByUser(req.params.userId);
            res.status(200).json(bookmarks);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getBookmarksByTweet(req, res) {
        try {
            const bookmarks = await BookmarkService.getBookmarksByTweet(req.params.tweetId);
            res.status(200).json(bookmarks);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteBookmark(req, res) {
        try {
            const result = await BookmarkService.deleteBookmark(req.params.userId, req.params.tweetId);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new BookmarkController();
