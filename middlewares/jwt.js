/* 
-----------------------------------------------------
  Middleware for Authentication and Autherisation.
-----------------------------------------------------
 */

const jwt = require("jsonwebtoken")
const db = require('./postgres');

exports.requireLogin = (req, res, next) => {
   const { authorization } = req.headers

   if (!authorization) {
      res.status(404).json({ message: "U need to login first!" })
   }
   const token = authorization.replace("Bearer ", "")
   jwt.verify(token, process.env.SECRET, (err, payload) => {
      if (err) {
         return res.status(401).json({ error: "U must be logged in!" })
      }

      const { _id } = payload
      User.findById(_id).then((userdata) => {
         req.user = userdata
         next()
      })
   })
}

exports.isAdmin = (req, res, next) => {
   const role = req.user.role
   if (role === 0) {
      return res.status(403).json({
         error: "Yor are not ADMIN"
      })
   }
   next()
}
