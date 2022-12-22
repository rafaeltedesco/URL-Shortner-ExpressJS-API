const dbUtils = require('../../utils/dbUtils/dbCrud')

const shortURL = async (url) => {
  return new Promise((resolve) =>
    resolve(new URL(`${process.env.DOMAIN}/1234`).href)
  );
};

const getOriginalURLFromId = async (id) => {
    const urlToFind = `${process.env.DOMAIN}/${id}`
    const [url] = await dbUtils.find('urls', {field: 'shortned_url', value: urlToFind })

    if (!url) {
      const err = new Error('"url" not found')
      err.status = 404
      throw err
    }
    return url.original_url
}

module.exports = {
  shortURL,
  getOriginalURLFromId
};
