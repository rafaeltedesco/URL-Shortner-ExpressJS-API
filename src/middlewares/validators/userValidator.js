

const validUserData = (req, res, next) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        const err = new Error('invalid params')
        err.status = 400
        return next(err)
    }
    req.userData = {
        name, email, password
    }
    next()
} 

module.exports = {
    validUserData
}