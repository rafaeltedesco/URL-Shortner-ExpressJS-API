const welcome = (_req, res) => {
  res.status(200).json({
    message: "Welcome",
  });
};

module.exports = {
  welcome,
};
