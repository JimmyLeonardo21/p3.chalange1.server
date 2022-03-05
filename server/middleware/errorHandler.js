function errorHandler(err, req, res, next) {
  const code = err.code || 500;
  const message = err.message || "Internal Server Error";
  res.status(code).json({ message });
}

module.exports = {
  errorHandler,
};
