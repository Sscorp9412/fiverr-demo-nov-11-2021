require("dotenv").config()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const logs = require("../utilities/console")
const db = require("../middlewares/postgres")

/**
 *  @description for login
 *  @method POST /userlogin
 */
exports.userlogin = (req, res) => {
   db.query(
      `SELECT * FROM demo WHERE email = '${req.body.email}'`,
      (err, result) => {
         if (err) throw err
         const user = result.rows[0]
         if (!user) {
            return res
               .status(404)
               .json({ error: "Invalid email and password!" })
         }
         bcrypt
            .compare(req.body.password, user.password)
            .then((valid) => {
               if (valid) {
                  const accessToken = jwt.sign(
                     { id: user.id },
                     process.env.JWT_SECRET
                  )
                  return res.json({
                     stat: "success",
                     accessToken: accessToken,
                     userData: {
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        username: user.username,
                        role: user.role
                     }
                  })
               } else {
                  return res.json({
                     stat: "failure",
                     error: "Invalid Email and Password"
                  })
               }
            })
            .catch((error) => {
               logs(error)
            })

         db.end()
      }
   )
}

/**
 *  @description for user logout
 *  @method get /logout
 */
exports.logout = (req, res) => {
   res.clearCookie("token")
   return res.json({
      message: "User Signout Successfully"
   })
}

/**
 *  @description for user login
 *  @method POST /register
 */
exports.postUserRegister = (req, res) => {
   let { first_name, last_name, username, email, password, role } = req.body
   logs(req.body)
   bcrypt.hash(password, 10, (err, hash) => {
      db.query(
         `INSERT INTO demo (first_name, last_name, username, email, password, role) VALUES ($1, $2, $3, $4, $5, $6)`,
         [first_name, last_name, username, email, hash, role],
         (err, result) => {
            if (err) throw err
            logs(result)
            res.send({ status: 200, text: "User Registered Successfully" })
         }
      )
   })
}

/**
 *  @description for login
 *  @method POST /userupdate
 */
// exports.postUserUpdate = async (req, res) => {
//    const user_id = req.params.id

//    console.log(user_id)
//    try {
//       // const user = await User.findOne({ _id: user_id });
//       await User.updateOne({ _id: user_id }, req.body)
//       const user = await User.findOne({ _id: user_id })
//       console.log(user)
//       res.send({ status: 200, message: "successfully updated", user: user })
//    } catch (error) {
//       console.log(error)
//       res.send({ status: 404, message: "invalid user not found", user: [] })
//    }
// }

/**
 *  @description for login
 *  @method POST /userdelete
 */
// exports.postUserDelete = async (req, res) => {
//    const user_id = req.params.id

//    try {
//       const deletedUser = await User.deleteOne({ _id: user_id })
//       console.log(deletedUser)
//       res.send({ status: 200, message: "successfully Deleted" })
//    } catch (error) {
//       console.log(error)
//       res.send({ status: 404, message: "invalid user not found" })
//    }
// }

/**
 *  @description for login
 *  @method POST /forgotPassword
 */
// exports.postForgotPaasword = async (req, res) => {
//    const user_id = req.params.id

//    try {
//       const hash = await bcrypt.hash(req.body.password, 10)
//       await User.updateOne({ _id: user_id }, { password: hash })
//       res.send({ status: 200, message: "Password successfully updated" })
//    } catch (error) {
//       console.log(error)
//       res.send({ status: 404, message: "invalid user not found" })
//    }
// }

/**
 *  @description for login
 *  @method POST /refresh-token
 */
// exports.refreshToken = (req, res) => {
//    const { refreshToken } = req.body

//    User.findOne({ remember_token: refreshToken }).then((user) => {
//       if (!user) {
//          return res.status(403).json({ message: "You must login" })
//       }

//       jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, data) => {
//          if (err)
//             return res.status(403).json({ message: "User not authenticated" })
//          const accessToken = jwt.sign(
//             { _id: user._id },
//             process.env.ACCESS_TOKEN,
//             { expiresIn: "40s" }
//          )
//          user.token = accessToken
//          user
//             .save()
//             .then((savedUser) => {
//                return res.status(201).json({ token: savedUser.token })
//             })
//             .catch((error) => {
//                console.log(error)
//                return res.json({ error })
//             })
//       })
//    })
// }
