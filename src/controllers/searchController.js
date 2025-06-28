const File = require('../models/File');
const { parsePeriod } = require('../utils/period');

exports.searchFiles = async (req, res) => {
  try {
    const {
      alignment,
      fileType,
      resolution,
      period,
      q, // full-text search (onlineId or title)
      page = 1,
      pageSize = 10,
      sortBy = 'uploadedDate',
      sortOrder = 'desc',
    } = req.query;

    const filter = {};
    if (alignment) filter.alignment = alignment;
    if (fileType) filter.fileType = fileType;
    if (resolution) filter.resolution = resolution;
    if (period) {
      const fromDate = parsePeriod(period);
      if (fromDate) {
        filter.uploadedDate = { $gte: fromDate };
      }
    }
    let searchQuery = q ? q.trim() : '';
    if (searchQuery) {
      // Escape regex special characters for safe partial search
      const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const safeQuery = escapeRegex(searchQuery);
      filter.$or = [
        { onlineId: { $regex: safeQuery, $options: 'i' } },
        { title: { $regex: safeQuery, $options: 'i' } },
      ];
    }

    const sortOptions = {};
    if (['onlineId', 'title', 'uploadedDate'].includes(sortBy)) {
      sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;
    }

    const totalCount = await require('../models/File').countDocuments(filter);
    const files = await require('../models/File')
      .find(filter)
      .sort(sortOptions)
      .skip((page - 1) * pageSize)
      .limit(Number(pageSize));

    res.json({
      totalCount,
      files: files.map(f => ({
        onlineId: f.onlineId,
        title: f.title,
        url: f.url,
        thumbUrl: f.thumbUrl,
        alignment: f.alignment,
        resolution: f.resolution,
        fileType: f.fileType,
        uploadedDate: f.uploadedDate,
        duration: f.duration,
      })),
    });
  } catch (err) {
    res.status(500).json({ message: 'Search error', error: err.message });
  }
};
