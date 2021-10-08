import express from "express";
import  {MongoClient} from "mongodb";
import dotenv from "dotenv"

// const os = require("os");

// const fs = require("fs");

// console.log("hello")


// const marks =[45,67,87];

// console.log(Math.max(...marks))

// function dou(num){
//     return num*3;
// }
// console.log(process.argv);
// const num = process.argv[2];

//  console.log("triple of the number",dou(num));

//  console.log("free "+os.freemem())
//  console.log("total  "+os.totalmem())
//  console.log("ar "+os.arch())

//  fs.readFile("./nice.txt","utf8",(err,data)=>{
//      console.log(data,"mohan")
//  });

// //  fs.copyFile("./nice.txt","good1.txt",()=>{
// //      console.log("copied")
// //  })


// fs.appendFile("./nice.txt","what is your name",()=>{
//     console.log("addied in file")
// })

// const mongoose = require('mongoose');
// const express = require('express');
const app = express();
dotenv.config();
const PORT = process.env.PORT;

// tell express what format data you are going to ge - json ,xml,text
// middleware - gatekeeper
// all the request - body - will be converted to json
app.use(express.json());
//express.json()- inbuilt middleware

const users =[
    {
    "createdAt": "2021-10-01T00:49:47.780Z",
    "name": "Bennie Aufderhar",
    "avatar": "https://cdn.fakercloud.com/avatars/d_kobelyatsky_128.jpg",
    "age": 59,
    "color": "silver",
    "id": "5"
    },
    {
    "createdAt": "2021-09-30T14:22:51.638Z",
    "name": "Lana Witting",
    "avatar": "https://cdn.fakercloud.com/avatars/afusinatto_128.jpg",
    "age": 77,
    "color": "olive",
    "id": "6"
    },
    {
    "createdAt": "2021-09-30T18:01:06.642Z",
    "name": "Vickie Brekke",
    "avatar": "https://cdn.fakercloud.com/avatars/carlyson_128.jpg",
    "age": 80,
    "color": "tan",
    "id": "7"
    },
    {
    "createdAt": "2021-09-30T09:39:22.586Z",
    "name": "Al Runolfsdottir",
    "avatar": "https://cdn.fakercloud.com/avatars/areus_128.jpg",
    "age": 28,
    "color": "orange",
    "id": "8"
    },
    {
    "createdAt": "2021-09-30T18:22:41.955Z",
    "name": "Sam Orn",
    "avatar": "https://cdn.fakercloud.com/avatars/itolmach_128.jpg",
    "age": 49,
    "color": "indigo",
    "id": "9"
    },
    {
    "createdAt": "2021-09-30T18:30:05.224Z",
    "name": "Grace Grimes",
    "avatar": "https://cdn.fakercloud.com/avatars/smalonso_128.jpg",
    "age": 72,
    "color": "yellow",
    "id": "10"
    },
    {
    "createdAt": "2021-09-30T11:26:57.667Z",
    "name": "Cindy Reinger",
    "avatar": "https://cdn.fakercloud.com/avatars/vimarethomas_128.jpg",
    "age": 30,
    "color": "yellow",
    "id": "11"
    },
    {
    "createdAt": "2021-10-01T06:26:55.203Z",
    "name": "Beth Koelpin",
    "avatar": "https://cdn.fakercloud.com/avatars/anatolinicolae_128.jpg",
    "age": 0,
    "color": "purple",
    "id": "12"
    },
    {
    "createdAt": "2021-09-30T12:28:17.426Z",
    "name": "Doug Mayer",
    "avatar": "https://cdn.fakercloud.com/avatars/nerrsoft_128.jpg",
    "age": 25,
    "color": "cyan",
    "id": "13"
    },
    {
    "createdAt": "2021-10-01T01:09:41.654Z",
    "name": "Mrs. Garrett Becker",
    "avatar": "https://cdn.fakercloud.com/avatars/increase_128.jpg",
    "age": 20,
    "color": "yellow",
    "id": "14"
    }
    ]

async function createConnetion(){
    // const MONGO_URL = "mongodb://localhost/users";
    const MONGO_URL = process.env.MONGO_URL;
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("successful connected22");
    return client;
    // const users =  await client.db("users").collection("people").findOne({id:"7"})
    // console.log(users)
    // // Db.people.find({})
    // console.log("mongo is working")
}
createConnetion()

app.get('/',(request,response)=>{
    response.send("Hello,All44c!kk!");
})

app.get('/users/:id',(request,response)=>{
    console.log(request.params);
    const id = request.params.id;
    response.send(users);
})


app.get('/users/:id', async (request,response)=>{
    console.log(request.params);
    const {id} =request.params;

    const client = await createConnetion();
     const user =  await client
     .db("users")
     .collection("people")

     .findOne({id:id});
     console.log(user);
     response.send(users);
    // response.send(users.filter((user)=>user.id===id));
})


app.delete('/users/:id', async (request,response)=>{
    console.log(request.params);
    const { id } =request.params;

    const client = await createConnetion();
     const user =  await client
     .db("users")
     .collection("people")
     .deleteOne({id: id});
     console.log(user);
     response.send(users);
})

//id -identify the  person
app.patch('/users/:id', async (request,response)=>{
    console.log(request.params);
    const { id } =request.params;

    const client = await createConnetion();
     const newData = request.body
    console.log(id,request.body)
     const user =  await client
     .db("users")
     .collection("people")
    
    .updateOne({id: id},{$set:newData});
     console.log(user);
     response.send(users);
   
})

app.get('/users',(request,response)=>{
    console.log(request.params);
    const {color,age} = request.query;
    console.log(request.query,color,age);

    if(!color && !age){
        response.send(users);
    }else if(color && !age){
    response.send(users.filter((user)=>user.color===color));
    }else if(!color && age){
        response.send(users.filter((user)=>user.age>age));
    }else{

    }   
})

app.get('/users',(request,response)=>{
    response.send(users);
})

app.post('/users', async (request,response)=> {
    const client =await createConnetion();
    const addUsers = request.body;
    // console.log(request.body)
    const result =  await client
    .db("users")
    .collection("people")
    .insertMany(addUsers);
    console.log(addUsers,result)
    response.send(result);
    


})

app.listen(PORT, ()=> console.log("this the server",PORT))
