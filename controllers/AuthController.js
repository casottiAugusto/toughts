const User =require('../models/User');
const bcrypt = require('bcryptjs')
module.exports=class AuthController{
 static login(req,res){ 
    res.render('auth/login')
 }
 static register(req,res){
    res.render('auth/register')
 }  
 static async registerPost(req,res){
   const {name,email,password,confirmpassword}=req.body
 
   if (password !=confirmpassword) {
      req.flash('message','As senhas não conferem, tente novamente!')
      req.session.save(function () {
          res.redirect('/register');
      })
      return
   }
    const checkIfUserExists = await User.findOne({where: {email: email}})
    if (checkIfUserExists) {
       req.flash('message','Este e-mail já está em uso!')
       req.session.save(function () {
           res.redirect('/register');
       })
       return
      }
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      const user={
         name,
         email,
         password: hashedPassword

      }
      try {
      await User.create(user);
      req.flash('message','Cadastro realizado com sucesso!')
      req.session.save(function () {
          res.redirect('/');
      })
         
      } catch (error) {
         req.flash('message','Houve um erro ao realizar o cadastro!')
         req.session.save(function () {
             res.redirect('/register');
         })
      }
    
   }
}