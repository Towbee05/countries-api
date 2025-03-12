const notFoundMiddleware = (req, res) => res.status(404).json({data: { message: 'Page not found' }});

module.exports = notFoundMiddleware;