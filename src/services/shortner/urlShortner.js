const dbUtils = require('../../utils/dbUtils/dbCrud')

const shortURL = async (url) => {
  return new Promise((resolve) =>
    resolve(new URL(`${process.env.DOMAIN}/1234`).href)
  );
};

const getOriginalURLFromId = async (id) => {
    const urlToFind = `${process.env.DOMAIN}/${id}`
    const [originalURL] = await dbUtils.find('urls', {field: 'shortned_url', value: urlToFind })
    return originalURL[0].original_url
}

module.exports = {
  shortURL,
  getOriginalURLFromId
};
