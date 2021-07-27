import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Here is how middlewear works
// suppose user wants to like a post, so we can not immediately like the post because we sdont know if the user has permission to like it
// So first user click like button => then middlewear is called and checks if he has a valid permission(by checking token) then if everything is correct
// it runs a next() function which perform then next operation, which in this case is liking the post

const auth = async (req, res, next) => {
  try {
    // here we're checking if the users token is valid or not
    const token = req.headers.authorization.split(" ")[1];

    // here we're checking if token is our own or Google's Auth
    // if length of token is more than 500 then it's our own
    // if not then it's Google Auth
    const isCustomAuth = token.length < 500;

    let decodedData;

    // if its our own token(jwt)
    if (token && isCustomAuth) {
      // this is gonna give us the data for each specific token
      // it's gonna give us the username of the person and id
      decodedData = jwt.verify(token, process.env.TOKEN_SECRET);

      // here we're storing the users id in req.userId
      req.userId = decodedData?.id;
    } else {
      // if its a google auth token
      decodedData = jwt.decode(token);

      // 'sub' is google's id, different for each user
      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
