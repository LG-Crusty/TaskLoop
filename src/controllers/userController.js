import { handler } from "../utils/handler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";

const signupUser = handler(async (req, res) => {
  // fetch data from user
  // not sure on this(have to pass the error)
  // search the database
  // if user exist give error else passon
  //add user in the db
  //find user in the mongoose
  //if don't exists send error
  //send the response

  const { username, email, password } = req.body;
  if (!(username || email || password)) {
    throw new ApiError(400, "Invalid credentials");
  }

  const findUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (findUser) {
    throw new ApiError(400, "user already exists");
  }
  const Dbuser = await User.create({
    username: username.toLowerCase(),
    email,
    password,
  });

  const MongoUser = await User.findById(Dbuser._id).select(
    "-password -refreshToken"
  );
  if (!MongoUser) {
    throw new ApiError(500, "something went wrong while creating user");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, MongoUser, "User successfully registered"));
});

const loginUser = handler(async (req, res) => {
  // take the input from user
  // check for username and email
  // if no username and email send error
  // check the data for the user
  // if no user send error
  // make accessToken and refreshToken from the credentials
  //add refreshToken to the database
  //fix that token in the cookies

  const { username, email, password } = req.body;

  if (!(username && email)) {
    throw new ApiError(400, "UserName or Email didn't received");
  }

  const MongoUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!MongoUser) {
    throw new ApiError(400, "User doesn't exists");
  }

  const isPasswordValid = await MongoUser.isPasswordCorrect(password);

  const accessToken = await MongoUser.generateAccessToken();
  const refreshToken = await MongoUser.generateRefreshToken();

  const loggedInUser = await User.findOne(MongoUser._id).select("-password");

  if (!loggedInUser) {
    throw new ApiError(500, "error in getting updated user");
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie(accessToken, options)
    .cookie(refreshToken, options)
    .json(new ApiResponse(200, loggedInUser, "User Successfully Logged In"));
});

export { signupUser, loginUser };
