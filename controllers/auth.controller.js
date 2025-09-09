const bcrypt = require("bcrypt")
const config = require("config")
const Author = require("../models/author")
const { sendErrorResponse } = require("../helpers/send.response.error")
const jwtService = require("../service/jwt.service")
const Admin = require("../models/admin")
const User = require("../models/user")

const loginAuthor = async(req,res) =>{
    try{
        const {email, password} = req.body
        const author = await Author.findOne({where: {email}})
        if(!author){
            return sendErrorResponse(
                {message: "Email yoki parol notog'ri"},
                res,
                401
            )
        }
        const verifyPassword = await bcrypt.compare(password, author.password)
        if(!verifyPassword){
            return sendErrorResponse(
                {message: "Email yoki parol notog'ri"},
                res,
                401
            )
        }
        const payload = {
            id: author.id,
            email: author.email,
            is_expert: author.is_expert,
            is_active: author.is_active
        }
        const token = jwtService.generateToken(payload)
        const hashedRefreshToken = await bcrypt.hash(token.refreshToken, 7)
        author.refresh_token = hashedRefreshToken;
        await author.save()

        res.cookie("refreshToken", token.refreshToken,{
            maxAge: config.get("cookie_refresh_time"),
            httpOnly: true
        })

        res.status(200).json({
            message: "Author logged in",
            accessToken: token.accessToken
        })
    }catch(error){
        sendErrorResponse(error,res,500)
    }

}

const registerAuthor = async (req,res)=>{
    try {
        const {
          frist_name,
          last_name,
          nick_name,
          email,
          phone,
          password,
          confirm_password,
          info,
          position,
          photo,
          is_expert,
          is_active,
        } = req.body;
        const condidate = await Author.findOne({where: {email}})
        console.log(condidate);
        
        if(condidate){
            return sendErrorResponse({message: "Bunday author mavjud"}, res, 403)
        }
        const condidate2 = await Author.findOne({where: {nick_name}})
        if(condidate2){
            return sendErrorResponse({message: "Bunday nick_name mavjud"}, res, 403)
        }
        if(confirm_password !== password){
            return sendErrorResponse({message: "Parol mos emas"}, res, 400)
        }
    
        const hashedPasword = await bcrypt.hash(password, 7)
        
        const newAuthor = await Author.create({
          frist_name,
          last_name,
          nick_name,
          email,
          phone,
          password: hashedPasword,
          info,
          position,
          photo,
          is_expert,
          is_active,
        })
        res.status(201).json({
            message: "Created",
            data: newAuthor
        })
    } catch (error) {
        sendErrorResponse(error, res, 500);
    }
}

const logoutAuthor = async (req,res)=>{
    try{
        const {refreshToken} = req.cookies
        if (!refreshToken) {
            return sendErrorResponse(
              { message: "Cookieda refresh token topilmadi" },
              res,
              400
            );
        }

        const verifyRefreshToken = await jwtService.verifyRefreshken(refreshToken)
        const author = await Author.findByPk(verifyRefreshToken.id)
        author.refresh_token = null
        await author.save()

        res.clearCookie("refreshToken")
        res.send({
            message: "Author log out"
        })
    }catch(error){
        sendErrorResponse(error,res,500)
    }
}

const refreshTokenAuthor = async (req,res)=>{
    try{
        const {refreshToken} = req.cookies
        if (!refreshToken) {
            return sendErrorResponse(
              { message: "Cookieda refresh token topilmadi" },
              res,
              400
            );
        }
        const verifyRefreshToken = await jwtService.verifyRefreshken(refreshToken)
        const author = await Author.findByPk(verifyRefreshToken.id)
        
        const compareRefreshToken = await bcrypt.compare(refreshToken, author.refresh_token)
        if(!compareRefreshToken){
            return sendErrorResponse({message: "Refresh token notog'ri"}, res, 400)
        }

        const payload = {
            id: author.id,
            email: author.email,
            is_expert: author.is_expert,
            is_active: author.is_active
        }
        const tokens = jwtService.generateToken(payload);
        const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 7);
        author.refresh_token = hashedRefreshToken;
        await author.save();

        res.cookie("refreshToken", tokens.refreshToken, {
            maxAge: config.get("cookie_refresh_time"),
            httpOnly: true,
        });
      
        res.status(200).json({
            message: "Tokens refreshed",
            accessToken: tokens.accessToken,
        })
    }catch(error){
        sendErrorResponse(error,res,500)
    }
}

const loginAdmin = async(req,res)=>{
    try{
        const {email, password} = req.body
        const admin = await Admin.findOne({where: {email}})
        if(!admin){
            return sendErrorResponse(
                {message: "Email yoki parol notog'ri"},
                res,
                401
            )
        }
        const verifyPassword = await bcrypt.compare(password, admin.password)
        if(!verifyPassword){
            return sendErrorResponse(
                {message: "Email yoki parol notog'ri"},
                res,
                401
            )
        }
        const payload = {
            id: admin.id,
            email: admin.email,
            is_creator: admin.is_expert,
            is_active: admin.is_active
        }
        const token = jwtService.generateToken(payload)
        const hashedRefreshToken = await bcrypt.hash(token.refreshToken, 7)
        admin.refresh_token = hashedRefreshToken;
        await admin.save()

        res.cookie("refreshToken", token.refreshToken,{
            maxAge: config.get("cookie_refresh_time"),
            httpOnly: true
        })

        res.status(200).json({
            message: "Admin logged in",
            accessToken: token.accessToken
        })
    }catch(error){
        sendErrorResponse(error,res,500)
    }

}

const logoutAdmin = async (req,res)=>{
    try{
        const {refreshToken} = req.cookies
        if (!refreshToken) {
            return sendErrorResponse(
              { message: "Cookieda refresh token topilmadi" },
              res,
              400
            );
        }

        const verifyRefreshToken = await jwtService.verifyRefreshken(refreshToken)
        const admin = await Admin.findByPk(verifyRefreshToken.id)
        admin.refresh_token = null
        await admin.save()

        res.clearCookie("refreshToken")
        res.send({
            message: "Admin log out"
        })
    }catch(error){
        sendErrorResponse(error,res,500)
    }
}

const refreshTokenAdmin = async (req,res)=>{
    try{
        const {refreshToken} = req.cookies
        if (!refreshToken) {
            return sendErrorResponse(
              { message: "Cookieda refresh token topilmadi" },
              res,
              400
            );
        }
        const verifyRefreshToken = await jwtService.verifyRefreshken(refreshToken)
        const admin = await Admin.findByPk(verifyRefreshToken.id)
        
        const compareRefreshToken = await bcrypt.compare(refreshToken, admin.refresh_token)
        if(!compareRefreshToken){
            return sendErrorResponse({message: "Refresh token notog'ri"}, res, 400)
        }

        const payload = {
            id: admin.id,
            email: admin.email,
            is_creator: admin.is_expert,
            is_active: admin.is_active
        }
        const tokens = jwtService.generateToken(payload);
        const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 7);
        admin.refresh_token = hashedRefreshToken;
        await admin.save();

        res.cookie("refreshToken", tokens.refreshToken, {
            maxAge: config.get("cookie_refresh_time"),
            httpOnly: true,
        });
      
        res.status(200).json({
            message: "Tokens refreshed",
            accessToken: tokens.accessToken,
        })
    }catch(error){
        sendErrorResponse(error,res,500)
    }
}

const registerUser = async(req,res)=>{
    try {
        const {
            name,
            email,
            info,
            password,
            confirm_password,
            photo,
            is_active
        } = req.body;
        const condidate = await User.findOne({where: {email}})
        
        if(condidate){
            return sendErrorResponse({message: "Bunday user mavjud"}, res, 403)
        }
        if(confirm_password !== password){
            return sendErrorResponse({message: "Parol mos emas"}, res, 400)
        }
    
        const hashedPasword = await bcrypt.hash(password, 7)
        
        const newUser = await User.create({
            name,
            email,
            info,
            password: hashedPasword,
            photo,
            is_active
        })
        res.status(201).json({
            message: "Created",
            data: newUser
        })
    } catch (error) {
        sendErrorResponse(error, res, 500);
    }
}

const loginUser = async(req,res)=>{
    try{
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if(!user){
            return sendErrorResponse(
                {message: "Email yoki parol notog'ri"},
                res,
                401
            )
        }
        const verifyPassword = await bcrypt.compare(password, user.password)
        if(!verifyPassword){
            return sendErrorResponse(
                {message: "Email yoki parol notog'ri"},
                res,
                401
            )
        }
        const payload = {
            id: user.id,
            email: user.email,
            is_active: user.is_active
        }
        const token = jwtService.generateToken(payload)
        const hashedRefreshToken = await bcrypt.hash(token.refreshToken, 7)
        user.refresh_token = hashedRefreshToken;
        await user.save()

        res.cookie("refreshToken", token.refreshToken,{
            maxAge: config.get("cookie_refresh_time"),
            httpOnly: true
        })

        res.status(200).json({
            message: "User logged in",
            accessToken: token.accessToken
        })
    }catch(error){
        sendErrorResponse(error,res,500)
    }

}

const logoutUser = async (req,res)=>{
    try{
        const {refreshToken} = req.cookies
        if (!refreshToken) {
            return sendErrorResponse(
              { message: "Cookieda refresh token topilmadi" },
              res,
              400
            );
        }

        const verifyRefreshToken = await jwtService.verifyRefreshken(refreshToken)
        const user = await User.findByPk(verifyRefreshToken.id)
        user.refresh_token = null
        await user.save()

        res.clearCookie("refreshToken")
        res.send({
            message: "User log out"
        })
    }catch(error){
        sendErrorResponse(error,res,500)
    }
}

const refreshTokenUser = async (req,res)=>{
    try{
        const {refreshToken} = req.cookies
        if (!refreshToken) {
            return sendErrorResponse(
              { message: "Cookieda refresh token topilmadi" },
              res,
              400
            );
        }
        const verifyRefreshToken = await jwtService.verifyRefreshken(refreshToken)
        const user = await User.findByPk(verifyRefreshToken.id)
        
        const compareRefreshToken = await bcrypt.compare(refreshToken, user.refresh_token)
        if(!compareRefreshToken){
            return sendErrorResponse({message: "Refresh token notog'ri"}, res, 400)
        }

        const payload = {
            id: user.id,
            email: user.email,
            is_active: user.is_active
        }
        const tokens = jwtService.generateToken(payload);
        const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 7);
        user.refresh_token = hashedRefreshToken;
        await user.save();

        res.cookie("refreshToken", tokens.refreshToken, {
            maxAge: config.get("cookie_refresh_time"),
            httpOnly: true,
        });
      
        res.status(200).json({
            message: "Tokens refreshed",
            accessToken: tokens.accessToken,
        })
    }catch(error){
        sendErrorResponse(error,res,500)
    }
}

module.exports = {
    loginAuthor,
    logoutAuthor,
    refreshTokenAuthor,
    registerAuthor,
    loginAdmin,
    logoutAdmin,
    refreshTokenAdmin,
    loginUser,
    registerUser,
    logoutUser,
    refreshTokenUser
}