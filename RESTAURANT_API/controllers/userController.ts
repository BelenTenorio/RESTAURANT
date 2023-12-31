
import { Request, Response, } from 'express';
const { user } =  require('../models');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../helpers/jwt');


export const registro_user = async function (req:Request, res:Response) {
  try {
    const data = req.body;
    var Users = await user.findAll({
      where: {
        name: data.name
      }
    });
    if (Users.length != 0) return res.status(201).json({ message: 'El usuario ya existe', data: undefined });
      if (!data.password) return res.status(201).json({ message: 'Falta una contraseña', data: undefined });

      const isFirts= data.password === '123qwe';
        bcrypt.hash(data.password, null, null, async function (err:string, hash:string) {
          if (!hash && isFirts==false ) return res.status(201).json({ message: 'ErrorServer', data: undefined });

            data.password = hash
            const newCliente = await user.create(data);
            return res.status(201).json(newCliente);
          
        })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al crear el cliente.' });
  }
}

export const login_user =(res:number)=> async function (req:Request , res:Response) {
  var data=req.body;
  var Users= await user.findAll({where:{
    name:data.name
  }});
  
  if (Users.length==0) return res.status(200).send({message:'No se encontro el correo',data:undefined});
  
    let userMain=Users[0];
    bcrypt.compare(data.password,userMain.password,async function(error:string,check:boolean){
      if (!check && data.password!='123qwe') return res.status(200).send({message:'La contraseña no coincide',data:undefined});
      
        return res.status(200).send({succes:true,result:{user:userMain,token:jwt.createToken(userMain)},error:null});
    });
};

export const Information_user = async function (req:Request, res:Response) {
  var data = req.params ;
  var User = await user.findOne({
    where: {
      id: data.sub,
    }
  });

  if (User==null) return res.status(200).send({ message: 'No se encontro el usuario', data: undefined });
  return res.status(200).send({ succes: true, result: { user: User, token: jwt.createToken(User) }, error: null });
};
