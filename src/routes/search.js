const express = require('express');
const router = express.Router();
const { searchFiles } = require('../controllers/searchController');

/**
 * @swagger
 * /search:
 *   get:
 *     summary: Search uploaded files
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: alignment
 *         schema:
 *           type: string
 *           enum: [Landscape, Portrait, Other]
 *       - in: query
 *         name: fileType
 *         schema:
 *           type: string
 *           enum: [image, video]
 *       - in: query
 *         name: resolution
 *         schema:
 *           type: string
 *           enum: [HD, FullHD, 4K, 8K, Other]
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: ["1 week ago", "2 weeks ago", "1 month ago", "6 months ago", "1 year ago"]
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Full-text search on onlineId or title
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [onlineId, title, uploadedDate]
 *           default: uploadedDate
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *     responses:
 *       200:
 *         description: List of files
 *       500:
 *         description: Server error
 */

router.get('/', searchFiles);

module.exports = router;
