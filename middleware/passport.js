const jwtstrategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user')
const config_data = require('../../config.json')

module.exports = function(passport){
    // const param = {
    //     secretKey : process.env.secretKey,
    //     jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken()
    // }
    passport.use(
        new jwtstrategy({
            secretOrKey : config_data.JWT_KEY,
            jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken()
        },
        function(jwt_payload, next){
            //console.log(jwt_payload)
            User.findOne({}, function(err, user){
                if(err){
                    return next(err, false)
                }
                if(user){
                    next(null, user)
                }else{
                    next(null, false)
                }
            })
        })
    )
}