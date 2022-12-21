const shortURL = async (url) => {
  return new Promise((resolve) =>
    resolve(new URL(`${process.env.DOMAIN}/1234`).href)
  );
};

const getOriginalURLFromId = async (url) => {
  return new Promise((resolve) => resolve('http://google.com'))
}

module.exports = {
  shortURL,
  getOriginalURLFromId
};
