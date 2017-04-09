module.exports = (req, res) => {
  res.status(404).json({
    url: req.originalUrl,
    error: 'Not found',
  })
}
