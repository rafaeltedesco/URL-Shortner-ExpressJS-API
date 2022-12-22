

const handleASyncError = fn => async (req, res, next)=> {
    try {
        await fn(req, res)
        next()
    }
    catch(err) {
        err.status = err.status ? err.status : 500
        return next(err)
    }
}

module.exports = {
    handleASyncError
}