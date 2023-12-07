import jwt from 'jsonwebtoken'
import asyncHandler from './asyncHandler.js'
import User from '../models/userModel.js'

//Protected routes
const protect = asyncHandler(async (req, res, next) => {
  let token
  token = req.cookies.jwt

  if (!token) {
    res.status(401)
    throw new Error('Not authorized!')
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.userId).select('-password')
    next()
  } catch (error) {
    res.status(401)
    throw new Error('Not authorized, server error!')
  }
})

// Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) return next()

  res.status(401)
  throw new Error('Not authorized as admin')
}

export { protect, admin }
