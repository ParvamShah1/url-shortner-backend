const User = require("../models/user")
const {generateToken} = require("../token")
async function handleUserSignup(req, res) {
  try {
    const { name, email, password } = req.body;
    
    const user = await User.create({
        name,
        email,
        password,
    })
    const token = setUser(user);
    
    res.cookie('token', token, { 
      httpOnly: true,
      secure: true, // set to true in production with HTTPS
      sameSite: 'none', // Changed back to 'lax' for localhost
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      path: '/',
    });
    
    console.log('Cookie set for user:', user.email);
    
    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(400).json({
      success: false,
      message: error.message || 'Signup failed'
    });
  }
}

async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email,password})
    if(!user){
    return res.status(401).json({msg: "Invalid username or password"})
    }
    const token = setUser(user);
    
    res.cookie('token', token, { 
      httpOnly: true,
      secure: false, // set to true in production with HTTPS
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      path: '/',
      domain: 'localhost' // Explicitly set domain
    });
    
    console.log('Cookie set for user:', user.email);
    
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(401).json({
      success: false,
      message: error.message || 'Login failed'
    });
  }
}

async function handleUserLogout(req, res) {
  try {
    res.clearCookie('token');
    return res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({
      success: false,
      message: 'Logout failed'
    });
  }
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
  handleUserLogout
};

function setUser(user) {
  return generateToken(user._id);
}
