
const baseError = (field, message, status) => {
    const err = new Error(`"${field}" ${message}`)
    err.status = status
    return err
}

const fieldNotFound = (field) => {
    return baseError(field, 'field not found', 400)
}

const invalidFieldData = (field) => {
    return baseError(field, 'invalid', 422)
}

module.exports = {
    fieldNotFound,
    invalidFieldData
}