
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

const headerKeyNotProvided = (headerKey) => {
    return baseError(headerKey, "not provided", 401)
}

module.exports = {
    fieldNotFound,
    invalidFieldData,
    headerKeyNotProvided
}