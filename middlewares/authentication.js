import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const { token } = await req.headers;
  if (!token) {
    return res.json({
      success: false,
      message: "Not Authorised...Login again",
    });
  }
  try {
    const deCodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.headers.userId = String(deCodedToken?.id);
    next();
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Error!!! " });
  }
};
export default authMiddleware;
