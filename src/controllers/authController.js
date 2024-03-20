const authService = require("../services/authService");

const register = async (req, res) => {
  try {
    const userData = req.body;
    const user = await authService.registerUser(userData);
    res.status(201).json({
      message: "User Registered Successfully",
      userId: user._id,
    });
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};
const login = async (req, res) => {
  try {
    const userData = req.body;
    const { token, userId } = await authService.login(userData);
    res.status(200).json({
      message: "User Logged in Successfully",
      userId: userId,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getData =async(req,res)=>{
   res.send("U acessed privateData");
}
module.exports = {
  register,
  login,
  getData
};
