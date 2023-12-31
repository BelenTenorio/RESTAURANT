'use strict'

var jwt=require('jwt-simple');
var moment=require('moment');
var secret='rest';

exports.createToken=function(user){
    var payload={
        sub: user.id,
        rol:user.rol,
        nombre: user.nombre,
        iat:moment().unix(),
        exp:moment().add(7,'days').unix()
    }
    return jwt.encode(payload,secret)
}