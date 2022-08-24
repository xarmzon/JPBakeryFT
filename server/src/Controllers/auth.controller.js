const { hashSync, compareSync } = require("bcryptjs");
const jwt = require('jsonwebtoken')
const UserModel = require("../Models/users.model");
const {buildResponse, buildUser}= require('../utils/index')
const {APIError} = require('../utils/apiError')

exports.register = async (req, res, next) => {
  try {
    const { username, password, role, email, address } = req.body;
    if (!email || !password || !role || !username || !address) {
      return next(
        APIError.badRequest(
          `Field(s) missing. Please try again`
        )
      )
    }
   
    const oldAccount = await UserModel.findOne({ email });
    if (oldAccount) {
      return next(
        APIError.customError(
          `An Account with the email ${email} already exist...`,
          409
        )
      );
    }
    const hashPassword = hashSync(password, 12);
    const newUser = await UserModel.create({
      username,
      role,
      password: hashPassword,
      email,
      address
    });
    const data = buildUser(newUser.toObject());
    res
      .status(201)
      .json(buildResponse("Account Created Successfully", data, "account"));
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return next(
        APIError.notFound("Sorry, No Account with that email or password")
      );
    }
    if (!password) {
      return next(
        APIError.customError("Sorry, Invalid password for this user", 400)
      );
    }
    const validPassword = compareSync(password, user.password);
    if (!validPassword) {
      return next(
        APIError.customError("Sorry, Invalid password for this user", 400)
      );
    }
    
    const accessSecret = process.env.JWT_SECRET_TOKEN
    const refreshSecret = process.env.JWT_REFRESH_TOKEN
    const payload = { id: user._id, role: user.role }

    const token = jwt.sign(payload, accessSecret, { expiresIn: "30m" });
    const refreshToken = jwt.sign(payload, refreshSecret, { expiresIn: "7d" });

    user.refreshToken = refreshToken;
    await user.save();
    
    const data = buildUser(user.toObject());
    
    res.cookie('jwt', refreshToken, {httpOnly: true, sameSite: 'none', secure: true, maxAge: 7*24*60*60*1000})
    res
      .status(200)
      .json(
        buildResponse("Account Logged-in successfully", data, "user", { token })
      );
  } catch (err) {
    next(err);
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const cookies = req.cookies
    if(!cookies?.jwt) {
      return next (APIError.unauthenticated(`You need to login`))
    }
   
    const refreshToken = cookies.jwt
    const user = await UserModel.findOne({ refreshToken });

    if(!user) {
      return next (APIError.customError(`Forbidden`, 403))
    }
  const verifyRefreshToken = await jwt.verify (refreshToken,  process.env.JWT_REFRESH_TOKEN)
  if(!verifyRefreshToken) return next (APIError.customError(`Forbidden`, 403))
  const payload = { id: user._id, role: user.role }
  const accessSecret = process.env.JWT_SECRET_TOKEN
  const token = jwt.sign (payload, accessSecret, { expiresIn: "30m" })
  res.json({token})

  } 
  
  catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const cookies = req.cookies
    if(!cookies?.jwt) {
      return next (APIError.customError(`No content, success`, 204))
    }
    const refreshToken = cookies.jwt
    const user = await UserModel.findOne({ refreshToken });

    if(!user) {
      res.clearCookie('jwt', {httpOnly: true, sameSite: 'none', secure: true})
      return res.sendStatus(204)
    }
    
    user.refreshToken = ''
    await user.save()
    res.clearCookie('jwt', {httpOnly: true, sameSite: 'none', secure: true,})
    res.status(200).json(`You have successfully logged out `)
  
  } catch (err) {
    next(err);
  }
}