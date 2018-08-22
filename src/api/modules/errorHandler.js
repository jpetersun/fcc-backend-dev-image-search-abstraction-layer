// error handler middleware using boom
function apiErrorHandler (err, req, res, next) {
  if (process.env.NODE_ENV === 'development') {
    console.log(err)
  }

  return res.status(err.output.statusCode).json(err.output.payload)
}

export default apiErrorHandler
