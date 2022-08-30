const jwt = require("jsonwebtoken");
const store = require("../store");

const middleware = {
  verifyToken: async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!store.includes(token)) {
        return res.status(400).json({ error: "Token not exist in server" });
      } else {
        const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.decode = decode;
        next();
      }
    } catch (error) {
      console.log("không thể đi tới logout");
      return res.status(500).json({ error });
    }
  },
};

module.exports = middleware;
