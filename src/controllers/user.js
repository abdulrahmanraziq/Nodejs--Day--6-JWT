import userModal from "../models/user.js";
import auth from "../common/auth.js";
import nodemailer from "nodemailer";

const signup = async (req, res) => {
  try {
    let user = await userModal.findOne({ email: req.body.email });
    if (!user) {
      req.body.password = await auth.hashPassword(req.body.password);
      await userModal.create(req.body);
      const user = await userModal.findOne(
        { email: req.body.email },
        { _id: 0, email: 0, password: 0, status: 0, createdAt: 0, role: 0 }
      );
      console.log(user)
      res.status(201).send({
        message: "User Created Successfully",
        user,
      });
    } else {
      res.status(400).send({
        message: `User with ${email} already exists`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
      error,
    });
  }
};

const login = async (req, res) => {
  try {
    let user = await userModal.findOne({ email: req.body.email });
    if (user) {
      if (await auth.comparePassword(req.body.password, user.password)) {
        let payload = {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          mobile: user.mobile,
          role: user.role,
          createdAt: user.createdAt,
        };
        let token = await auth.createToken(payload);
        res.status(200).send({
          message: "Login Successfully",
          token,
          role: user.role,
        });
      } else {
        res.status(400).send({
          message: "Incorrect Password",
        });
      }
    } else {
      res.status(400).send({
        message: "User Not Found",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
      error,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userModal.find({}, { password: 0 });
    if (users) {
      res.status(200).send({
        message: "Data Fetched Successfully",
        users,
      });
    } else {
      res.status(400).send({
        message: "No Users Found",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    let users = await userModal.findOne({ email: req.body.email });
    if (users) {
      const generateOTP = () => {
        const char = "0123456789";
        return Array.from(
          { length: 6 },
          () => char[Math.floor(Math.random() * char.length)]
        ).join("");
      };

      const OTP = generateOTP();
      await userModal.updateOne(
        { email: req.body.email },
        {
          $set: {
            resetPasswordOTP: OTP,
            resetPasswordExpires: Date.now() + 3600000,
          },
        }
      );

      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        secure: true,
        auth: {
          user: process.env.USER_MAIL,
          pass: process.env.PASS_MAIL,
        },
      });
      const mailOptions = {
        from: process.env.USER_MAIL,
        to: users.email,
        subject: "Password Reset",
        html: `<div>
                <p>Dear ${users.firstName} ${users.lastName}</p>
                <p>We received a request to reset your password. Here is your One Time Password (OTP):<strong>${OTP}</strong></p>
                <p>Thank You</p>
                <p>${users.firstName} ${users.lastName}</p>
              </div>`,
      };
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Password Reset email Sent" });
    } else {
      res.status(400).send({
        message: "User Not Found",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { OTP, password } = req.body;
    const user = await userModal.findOne({
      resetPasswordOTP: OTP,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      const message = user ? "OTP Expired" : "Invalid OTP";
      return res.status(404).send({ message });
    }

    const hashPassword = await auth.hashPassword(password);
    await userModal.updateOne(
      { resetPasswordOTP: OTP },
      {
        $set: {
          password: hashPassword,
          resetPasswordOTP: null,
          resetPasswordExpires: null,
        },
      }
    );

    res.status(200).send({
      message: "Password Updated Successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
      error,
    });
  }
};

export default {
  signup,
  login,
  getAllUsers,
  forgotPassword,
  resetPassword,
};
