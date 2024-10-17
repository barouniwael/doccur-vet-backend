const sequelize = require("../database/sql");
const User = require("../modeles/user");
const bcrypt = require("bcrypt");
const sms = require("./sendsms");
const jwt = require("jsonwebtoken");
exports.register = async (req, res, next) => {
    console.log("register");
    console.log(req.body);
    const verificationCode = generateVerificationCode();
    
    // Check if the user already exists
    const user = await User.findOne({
        where: {
            email: req.body.email,
            phone: req.body.phone
        }
    });

    if (user) { // If user exists
        if (user.isActive) {
            res.json({msg: "Vous avez déjà un compte actif."});
        } else {
            // Update the existing user
            bcrypt.hash(req.body.password, 10).then((pwdcrypted) => {
                User.update({
                    name: req.body.name,
                    email: req.body.email,
                    password: pwdcrypted,
                    phone: req.body.phone,
                    verificationcode: verificationCode
                }, {
                    where: {
                        email: req.body.email // Specify the condition for which user to update
                    }
                }).then(() => {
                  
                    res.json({user: req.body.email,msg: "Compte mis à jour avec succès."});
                   
                }).catch((error) => {
                    console.error("Error updating user:", error);
                    res.status(500).json({error: "Erreur lors de la mise à jour du compte."});
                });
            });
        }
    } else { // If user does not exist, create a new one
        bcrypt.hash(req.body.password, 10).then((pwdcrypted) => {
            User.create({
                name: req.body.name,
                email: req.body.email,
                password: pwdcrypted,
                phone: req.body.phone,
                verificationcode: verificationCode
            }).then((data) => {
                res.json({user: data.dataValues.email,msg: "Compte crée avec succès."});
            }).catch((error) => {
                console.error("Error creating user:", error);
                res.status(500).json({error: "Erreur lors de la création du compte."});
            });
        });
    }

    // Send verification code via SMS
    // sms.sendsms(req.body.phone, verificationCode)
}


function generateVerificationCode() {
    return Math.floor(1000 + Math.random() * 900); // Generates a 6-digit code
  }

  exports.verify = async (req,res,next)=>{
   
        try {
          const { email, code } = req.body;
      
          // Find user by email and verification code
          const user = await User.findOne({
            where: {
              email : email,
              verificationCode :code,
            },
          });
      
          if (user) {
            // Update user's isActive status to true
            await user.update({ isActive: true });
            res.status(200).json({ msg: 'Account activated successfully' });
            console.log("user verified");
          } else {
            res.status(404).json({ msg: 'Invalid verification code' });
          }
        } catch (error) {
          console.error('Error activating account:', error);
          res.status(500).json({ msg: 'Internal server error' }); 
        }
  }
  exports.login =async(req,res,next)=>{
    const {email,password,phone} = req.body;
    let user;
    if (email!=null) {
        
    }
    await User.findOne({where:
         {
        email: req.body.email,  
        isActive : true
    }
}).then((doc)=> {
    if (!doc) {
        res.json({ msg: "user n'existe pas" });

      }
      user = doc.dataValues;
   
      return bcrypt.compare(req.body.password, user.password);
}).then((pwdComparedPwd) => {
    if (pwdComparedPwd) {
      let userToSend = {
        email: user.email,
        role: user.role,
        id: user.id,
      }
      const token = jwt.sign(userToSend, "process.env.MY_SECRET", {
        expiresIn: "1h",
      });
      res.json({ token: token,user: userToSend });
    };
    })
  }

  exports.loginPhone =async(req,res,next)=>{
    const {phone,password} = req.body;
    let user;
   
    await User.findOne({where:
         {
        phone:phone,  
        isActive : true
    }
}).then((doc)=> {
    if (!doc) {
        res.json({ msg: "user n'existe pas" });

      }
      user = doc.dataValues;
   
      return bcrypt.compare(req.body.password, user.password);
}).then((pwdComparedPwd) => {
    if (pwdComparedPwd) {
      let userToSend = {
        email: user.email,
        role: user.role,
        id: user.id,
      }
      const token = jwt.sign(userToSend, "process.env.MY_SECRET", {
        expiresIn: "1h",
      });
      res.json({ token: token,user: userToSend });
    };
    })
  }