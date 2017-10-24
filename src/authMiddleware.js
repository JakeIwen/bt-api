

export default function authMiddleware(req, res, next) {
  console.log("req", req )
  next()
}
