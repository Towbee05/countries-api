const errorMiddleware = async (err, req, res, next ) => {
    return res.status(500).json({data: { message: err.mesaage}});
};

module.exports = errorMiddleware;