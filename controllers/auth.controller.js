const bcrypt = require("bcrypt")
const config = require("config")
const Author = require("../models/author")
const { sendErrorResponse } = require("../helpers/send.response.error")
const jwtService = require("../service/jwt.service")

const login = async(req,res) =>{
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

const logout = async (req,res)=>{
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
            message: "Admin log out"
        })
    }catch(error){
        sendErrorResponse(error,res,500)
    }
}

const refreshToken = async (req,res)=>{
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

module.exports = {
    login,
    logout,
    refreshToken
}