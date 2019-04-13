var express = require('express');
var app = express()
server = require('http').Server(app);
var io = require('socket.io').listen(server)
var bodyParser = require('body-parser');

let lobby = []
let roomObjects = {}
let userRoomInfo = {}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  limit: '10gb',
  extended: false
}));
//body-parser 1gb

server.listen(80)

console.log("server start")

app.get('/', (req, res) => { //메인 페이지
  res.sendfile(__dirname+"/Main.html")
});
app.get('/Resources/:resource', (req, res) => {
  res.sendfile(__dirname+"/Resources/"+req.params.resource)
  console.log(req.params.image);
});
app.get('/Sounds/:sound', (req, res) => {
  res.sendfile(__dirname+"/Sounds/"+req.params.sound)
  console.log(req.params.sound);
});
class basicObject{
  constructor(width,height,x,y){
    this.width = width
    this.height = height
    this.x = x
    this.y = y
  }
}
class userObject extends basicObject{
  constructor(x,y,color){
    super(50,50,x,y)
    this.color = color
  }
}
class roomObject{
  constructor(user1,user2){
    this.userObjects = {}
    this.userObjects[user1] = undefined
    this.userObjects[user2] = undefined
    this.users = [user1,user2]
    this.roomname = this.users[0]+this.users[1]
    this.isRoomReady = false
    this.skills
    userRoomInfo[user1] = this.roomname
    userRoomInfo[user2] = this.roomname
    try{
    io.sockets.sockets[user2].emit('matching',{roomname:this.roomname,player:2})
    io.sockets.sockets[user1].emit('matching',{roomname:this.roomname,player:1})
    }
    catch(e){
      if(io.sockets.sockets[this.users[0]] != undefined)
        io.sockets.sockets[this.users[0]].emit('otheruser_disconnect')
      if(io.sockets.sockets[this.users[1]] != undefined)
        io.sockets.sockets[this.users[1]].emit('otheruser_disconnect')
    }
    console.log('making room : '+this.roomname);
  }
  update(){
    io.sockets.sockets[this.users[0]].emit('update',this.userObjects)
    io.sockets.sockets[this.users[1]].emit('update',this.userObjects)
  }
  ready(data,socketid){
    this.userObjects[socketid] = new userObject(data.x,data.y,data.color)
    console.log('this.userObjects[this.users[0]] : '+this.userObjects[this.users[0]]);
    console.log('this.userObjects[this.users[1]] : '+this.userObjects[this.users[1]]);
    if(this.userObjects[this.users[0]] != undefined&&this.userObjects[this.users[1]] != undefined){
      io.sockets.sockets[this.users[0]].emit('ready')
      io.sockets.sockets[this.users[1]].emit('ready')
      this.isRoomReady = true
      console.log(this.roomname +" : it's ready");
    }
  }
  disconnect(user){
    if(io.sockets.sockets[this.users[1]]!=undefined)
      io.sockets.sockets[this.users[1]].emit('otheruser_disconnect')
    if(io.sockets.sockets[this.users[0]]!=undefined)
      io.sockets.sockets[this.users[0]].emit('otheruser_disconnect')
    delete roomObjects[this.roomname]
  }
}
io.on('connect', (socket) => {
  console.log("entered : "+socket.id);
  socket.on("matching",(data)=>{
    lobby.push(socket.id)
    console.log(lobby.length);
    if(lobby.length === 2){
      roomObjects[lobby[0]+lobby[1]] = new roomObject(lobby[0],lobby[1])
      lobby = []
    }
  })
  socket.on('ready',(data)=>{
    roomObjects[data.roomname].ready(data,socket.id)
  })
  socket.on("update",(data)=>{
    try{
      roomObjects[data.roomname].userObjects[socket.id].x = data.x
      roomObjects[data.roomname].userObjects[socket.id].y = data.y
      roomObjects[data.roomname].userObjects[socket.id].r = data.r
      roomObjects[data.roomname].userObjects[socket.id].C = data.C
      roomObjects[data.roomname].userObjects[socket.id].V = data.V
      roomObjects[data.roomname].userObjects[socket.id].h1 = data.h1
      roomObjects[data.roomname].userObjects[socket.id].h2 = data.h2
      roomObjects[data.roomname].userObjects[socket.id].lh2 = data.lh2
      roomObjects[data.roomname].userObjects[socket.id].bh = data.bh
      roomObjects[data.roomname].userObjects[socket.id].i1 = data.i1
      roomObjects[data.roomname].userObjects[socket.id].i2 = data.i2
      roomObjects[data.roomname].userObjects[socket.id].np1 = data.np1
      roomObjects[data.roomname].userObjects[socket.id].np2 = data.np2
      roomObjects[data.roomname].userObjects[socket.id].nb2 = data.nb2
      roomObjects[data.roomname].userObjects[socket.id].r1 = data.r1
      roomObjects[data.roomname].userObjects[socket.id].r2 = data.r2
      roomObjects[data.roomname].userObjects[socket.id].r3 = data.r3
      roomObjects[data.roomname].userObjects[socket.id].r4 = data.r4
      //roomObjects[data.roomname].userObjects[socket.id].hp = data.hp
      //roomObjects[data.roomname].userObjects[socket.id].anim = data.anim
      this.skills = data.skills
  }
  catch(error){
    console.log(error+"\n\n")
    console.log(roomObjects)
    console.log(data);
  }
  })
  
  socket.on('disconnect', (data) => {
    console.log("disconnected : "+socket.id);
    if(socket.id === lobby[0]){
      lobby = []
    }
    try{
      if(roomObjects[userRoomInfo[socket.id]] != undefined)
        roomObjects[userRoomInfo[socket.id]].disconnect(socket.id)
    }
    catch(e){
      console.log(e);
    }
  })
  setInterval(function() {
    for(let room in roomObjects){
      if(roomObjects[room].isRoomReady){
        roomObjects[room].update()
      }
    }
  },10)

})
