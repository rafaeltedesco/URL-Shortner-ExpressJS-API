

const handleErrorMiddleware = (err, _req, res, _next) => {
    const { status, message } = err
    res.status(status || 500).json({
        message
    })
}

module.exports = {
    handleErrorMiddleware
}