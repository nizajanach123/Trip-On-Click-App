const userService = require("../services/user.service");
const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const { checkUser } = require('../AuthMiddlewares');
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const keySecretForgotPassw = "352"
const router = express.Router();



//TEST
/* /users/ */


router.get("/", async (request, response) => {
  try {
    const users = await userService.getAllUsers();
    response.status(200).send(users);
  } catch (e) {
    console.log(e);
  }
});

// router.get("/get/:id", async (request, response) => {
//   try {
//     await userService.getTripByUserId(request,response);
//     console.log('workkkk');
  
//   } catch (e) {
//     response.status(500).send(e);
//   }
// });
// router.get("/:id/trips",async (request, response) => {
//   try {
//     const user = await User.findById(request.params.id).populate('trips');
//     console.log(user);
//     // const trip = await Trip.findById('6379740a5a920fe00875cd20').populate('attractions.attraction')
//     // user.trips.push(trip);
//     // await user.save();
//     response.send(user.trips);

//   }

//     // response.send(user.trips);
//   catch (e) {
//   response.status(500).send(e);
// }
// });
router.get("/:id/trips",async (request, response) => {
  try {
    const user = await User.findById(request.params.id).populate('trips');
    console.log(user);
    // const trip = await Trip.findById('6379740a5a920fe00875cd20').populate('attractions.attraction')
    // user.trips.push(trip);
    // await user.save();
    response.send(user.trips);

  }

    // response.send(user.trips);
  catch (e) {
  response.status(500).send(e);
}
});


router.get("/:id", async (request, response) => {
  try {
    await userService.getUserById(request,response);
  } catch (e) {
    response.status(500).send(e);
  }
});



router.post("/register",  (request, response) => {
  try {
     userService.register(request, response);
  
    } catch (error) {
    response.status(500).send(error);
  }
});

router.post("/login", async (request, response) => {
  try {
    await userService.login(request, response);
  } catch (error) {
    response.status(500).send(error);
  }
});

// router.delete("/delete/:id", async (request, response) => {
//   try {
//     console.log("deleteR");
//     await userService.deleteUser(request, response);
//   }
//    catch (error) {
//     response.status(500).send(error);
//   }
// });


router.patch("/:id", async (request, response) => {

  try {
    await userService.updateUser(request, response);
    console.log("works");
  }
   catch (error) {
    response.status(500).send(error);
  }
});

// send email Link For reset Password
router.post("/sendpasswordlink", async (req, res) => {
  try {
    await userService.sendLink(req, res);
  }
  catch (error) {
    response.status(500).send(error);
  }
});

// check token
router.post("/:id/:token" ,async (req, res) => {
  try {
    await userService.userAuth(req, res);
  }
  catch (error) {
    res.status(500).send(error);
  }
});
//change password
router.post("/change/:id/:token", async (req, res) => {
  try {
    await userService.changePassword(req, res);
  }
  catch (error) {
    res.status(500).send(error);
  }
});





// verify user for forgot password time

// router.get("/passwordreset/:id/:token", async (req, res) => {

//   const { id, token } = req.params;
//   console.log(token)
// console.log(id, token)

//   try {
//     const validuser = await User.findOne({ _id: id, verifytoken: token });
//     const verifyToken = jwt.verify(token, keySecretForgotPassw);

//     if (validuser && verifyToken._id) {
//       res.status(201).json({ status: 201, validuser })
//     } else {
//       res.status(401).json({ status: 401, message: "משתמש לא קיים" })
//     }

//   } catch (error) {
//     res.status(401).json({ status: 401, error })
//   }
// });










// router.post("/create", async (req, res) => {
//   console.log("hh");
//   try {

//     const newUser = new User({
//       _id: new mongoose.Types.ObjectId(),
//       username: req.body.username,
//       password: req.body.password,
//       email: req.body.email,
//     });

//     await User.create(newUser);
//     res.send("user added");
//   } catch (err) {
//     console.log("error: ", err);
//   }
// });


module.exports = router;
