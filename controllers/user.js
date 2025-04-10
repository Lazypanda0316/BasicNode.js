import User from "../models/user.js";


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

    const user = await User.create({
      firstName,
      lastName,
      email,
      mobile,
      password,
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

//login
export const login = async(req,res,next)=>{
  try {
    const {email,password} = req.body;
    if(!email || !password){
      return res.status(400).json({
        success:false,
        message:"Pelase enter all fields"
      })
    }

    const user = await User.findOne({email}).select("+password")
      if(!user){
        return res.status(404).json({
          success:false,
          message:"User not found!"
        })
      }

      const isMatchd = await user.comparePassword(password)
      if(!isMatchd){
        return res.status(400).json({
          success:false,
          message:"Invalid Credentials!"
        })

      }

      const token = user.getJwtGenerateToken()

      res.status(200).json({
        success:true,
        message:"Login successFully",
        data:user,
        accessToken:token,

      })
    
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
    
  }
}

//get Profile

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
  
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

//change Password
//update Profile
//add to cart

//multer
//cloudinary


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
  

