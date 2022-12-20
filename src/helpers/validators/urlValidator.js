

const isValidUrl = (url) => {
    try {
        new URL(url)
        return true
    }
    catch(err) {
        return false
    }
}

module.exports = {
    isValidUrl
}