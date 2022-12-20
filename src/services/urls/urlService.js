const dbUtils = require('../../utils/dbUtils/dbCrud')

const getUrlsByPersonId = async (id) => {
    const [urls] = await dbUtils.find('urls', {field: 'user_id', value: id})
    return urls
 }


module.exports = {
    getUrlsByPersonId
}