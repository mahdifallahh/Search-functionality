function parsePeriod(period) {
  const now = new Date();
  switch (period) {
    case '1 week ago':
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    case '2 weeks ago':
      return new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
    case '1 month ago': {
      const d = new Date(now);
      d.setMonth(d.getMonth() - 1);
      return d;
    }
    case '6 months ago': {
      const d = new Date(now);
      d.setMonth(d.getMonth() - 6);
      return d;
    }
    case '1 year ago': {
      const d = new Date(now);
      d.setFullYear(d.getFullYear() - 1);
      return d;
    }
    default:
      return null;
  }
}

module.exports = { parsePeriod };
