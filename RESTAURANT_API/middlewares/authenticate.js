'use strict'
var jwt=require('jwt-simple');
var moment=require('moment');
var secret='oasis'

exports.auth=function(req,res,next){
    
    if (!req.headers.authorization){
        return res.status(403).send({ error: 'NoHeadersError', result: undefined, success: false })
    }

    var token=req.headers.authorization.replace(/['"]+/g,'');
    var segment= token.split('.');

    if (segment.length !=3 ) {
        return res.status(403).send({error: 'InvalidToken', result: undefined, success: false });  
    }

    try{
        var payload = jwt.decode(token,secret);
        
        if (payload.exp<=moment().unix()) {
            return res.status(403).send({error:'TokenExpirado', result: undefined, success: false,}); 
        }

    }catch(error){
        return res.status(403).send({error:'InvalidToken', result: undefined, success: false});  
    }

    req.user=payload;
    if (req.user.rol != 'admin') {
        return res.status(500).send({error:'NoAccess', result: undefined, success: false});  
    }

    next()
}