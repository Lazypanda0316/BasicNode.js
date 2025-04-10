import User from "../models/user.js";
import bcrypt from "bcrypt"

//register
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, mobile, password } = req.body;
    if (!firstName || !lastName || !email || !mobile || !password) {
      return res.status(400).json({
        success: false,
        message: "please insert all field!",
      });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({
        success: false,
        message: "Email already exist!!",
      });
    }

    //to encrypt password must be used before saving
    const bypassword = await bcrypt.hash(password,10)

    const user = await User.create({
      firstName,
      lastName,
      email,
      mobile,
      password:bypassword,
    });
     

    res.status(201).json({
      success: true,
      message: "Register success!",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get User By id

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "user get successFully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//update user
export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found!",
      });
    }
    const { firstName, lastName, email, mobile } = req.body;
    
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.mobile = mobile;
  
    // Save updated user
    await user.save();

      return res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: user,
      });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// delete user
export const deleteUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found!",
        });
      }
  
      await user.deleteOne();
  
      return res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
  
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  
