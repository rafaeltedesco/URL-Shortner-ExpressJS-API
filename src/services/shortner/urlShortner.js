const shortURL = async (url) => {
  return new Promise((resolve) =>
    resolve(new URL(`${process.env.DOMAIN}/1234`).href)
  );
};

module.exports = {
  shortURL,
};
