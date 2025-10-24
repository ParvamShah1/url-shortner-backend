const jwt = require("jsonwebtoken");

const secret = "12345678";
function setUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    name: user.name
  };
  
  return jwt.sign(payload, secret, { expiresIn: '24h' });
}

function getUser(token) {
  try {
    if (!token) return null;
    return jwt.verify(token, secret);
  } catch (error) {
    console.error('JWT verification error:', error.message);
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
