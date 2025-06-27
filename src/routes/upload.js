const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { uploadSchema } = require('../validators/upload');
const { uploadFile } = require('../controllers/uploadController');

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload an image or video file
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               alignment:
 *                 type: string
 *                 enum: [Landscape, Portrait, Other]
 *               resolution:
 *                 type: string
 *                 enum: [HD, FullHD, 4K, 8K, Other]
 *     responses:
 *       201:
 *         description: File uploaded successfully
 *       400:
 *         description: Validation or file error
 *       401:
 *         description: Unauthorized
 */

router.post('/', auth, upload.single('file'), validate(uploadSchema), uploadFile);

module.exports = router;
