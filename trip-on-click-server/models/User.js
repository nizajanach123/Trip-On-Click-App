const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({


  username: {
    type: String,
    require: true,
    min: 3,
    max: 20,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
    min: 6,
  },
  email: {
    type: String,
    required: [true, "Email is Required"],

    lowercase: true,
    unique: true
  },

  trips: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip"
    }
  ],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      }
    }
  ],
  verifytoken:{
    type:String,
  }
 });

// userSchema.pre("save", async function (next) {
//   console.log("save passwords hash");
//   const salt = await bcrypt.genSalt();
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

var User = mongoose.model('User', userSchema);
module.exports = User;