
import express from 'express'; //ESModules
// const express = required('express')  => commonjs
import userRouter from './routes/user'
var app=express();
const bodyParser=require('body-parser');

var mysql= require('mysql2');
var port=process.env.port||4202;

//metodo de prueba para tsc
    // app.get('/ping',(_req,res)=>{
    //   console.log('some pinged here!!!');
    //   res.send('pong')
    // })
 // app.listen(port, ()=>{
  //   console.log(`server running on port ${port})`);
  // });

//Rutas de los metodos
 var user_route=require('./routes/');
 app.use('/api/user',userRouter)

//Coneccion a la base de datos
var connection = mysql.createConnection({
  host: 'localhost',  // Cambia esto a la dirección de tu servidor MySQL
  port: 3306, // Agregamos el puerto 3306 aquí
  user: 'root',   // Cambia esto al nombre de usuario de tu base de datos
  password: '123qwe',   // Cambia esto a la contraseña de tu base de datos
  // password: 'harrystyles',   // Cambia esto a la contraseña de tu base de datos
  database: 'restaurante'  // Cambia esto al nombre de tu base de datos
});


connection.connect(function(err:any) {
    if (err) {
      console.error('Error connecting to MySQL: ' + err.stack);
      return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
    app.listen(port,function () {
        console.log('Servidor corriendo en el puerto ' + port);
    });
  });

  

  app.use(bodyParser.urlencoded({
    extended:true
  }));

  app.use(bodyParser.json({
    limit:'50mb',
    extended:true
  }));

 

  app.use((_,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});

//Se declara el uso de la ruta
app.use('/api',user_route);


module.exports=app;
