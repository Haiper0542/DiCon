// Setup basic express server
var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var cookieparser = require('cookie-parser');
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 80;

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/Resources')));
app.use(express.static(path.join(__dirname, 'public/Sounds')));
app.use(express.static(path.join(__dirname, 'public/src')));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use(cookieparser());
app.use('/', require('./public/index.js'));
// app.use('/game', require('./public/game'));

// ServerInfo - Matching
var matchingUserList = []; // name, ID, socket.id
var matchingUserID = [];
var isStarted = false;

// ServerInfo - InGame
let lobby = [];
let roomObjects = {};
let userRoomInfo = {};
var stayKeys = {};

function getUserID() {
  for (var i = 0;i < 4;i++) {
    if (matchingUserID[i] !== undefined) {
      matchingUserID[i] = undefined;
      return i + 1;
    }
  }
}

function update() {
  // io.sockets.sockets[matchingUserList[0].sID].emit('update');
}
// socket event

io.on('connection', (socket) => {

    // Help 
    socket.on('helpStory', () => {
        var helpStartTime = new Date();
        var helpNowTime;
        var helpInterval = setInterval(() => {
            helpNowTime = new Date();
            console.log(parseInt((helpNowTime - helpStartTime) / 1000));
            if (parseInt((helpNowTime - helpStartTime) / 1000) >= 15) {
                socket.emit('helpEnd');
                clearInterval(helpInterval);
            }
        }, 1000);
    });

    socket.on('add user', (data) => {
        if (!isStarted) {
            var _ID = getUserID();
            var _data = { name: data.name, ID: _ID, sID: data.sId };
            matchingUserList.push(_data);
            socket.emit('saveUserInfo', _data);
        }

        if (matchingUserList.length == 4) {
            if (!isStarted) {
                io.sockets.emit('start game', matchingUserList);
            }
            else {
                socket.emit('started game');
            }
        }
    });

    socket.on('updateUser', data => {
        matchingUserList.push(data);

        for (var i = 0; i < 4; i++) {
            if (i + 1 == data.ID)
                matchingUserID[i] = undefined;
            break;
        }
    });

    socket.on('reset', () => {
        tempCnt = matchingUserList.length
        for (var i = 0; i < tempCnt; i++)
            matchingUserList.pop();
        for (var i = 0; i < 4; i++)
            matchingUserID[i] = i + 1;

        isStarted = false;
    });
    // update

    socket.on('update', (data) => {
        io.sockets.emit('update4', data);
        stayKeys = data;
        console.log(stayKeys);
    });

    socket.on('disconnect', () => {
        tempCnt = matchingUserList.length
        for (var i = 0; i < tempCnt; i++)
            matchingUserList.pop();
        for (var i = 0; i < 4; i++)
            matchingUserID[i] = i + 1;
        io.sockets.emit('updateUserList');
    });
    
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    class Rect {
        constructor(x = 0, y = 0, width = 0, height = 0) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }
    }

    class GameObject {
        constructor() {
            this.x = 0;
            this.y = 0;
            this.collisionRect = new Rect();
        }
    }

    class Sprite extends GameObject {
        constructor(game, sourceImageRect, imageType, obj) {
            super();
            this.game = game;
            this.imageRect = sourceImageRect;
            this.imageType = imageType;
            this.camera = game.mainCamera;
            this.obj = obj;
            this.rot = 0;
        }

        render() {
            if (this.imageType === "UI") {
                let { x, y, width, height } = this.imageRect;

                this.game.context.drawImage(this.game.bullet_image,
                    x, y, width, height,
                    (this.game.canvas.width / 2 - this.game.player1.x + this.x),
                    (this.game.canvas.height / 2 - this.game.player1.y + this.y),
                    width * UntitledGame.config.SCALE, height * UntitledGame.config.SCALE
                );
            }

            else if (this.imageType === "EllipseGalaxy") {
                let { x, y, width, height } = this.imageRect;

                this.game.context.drawImage(this.game.EllipseGalaxy_Image[this.obj.owner],
                    x, y, width, height,
                    (this.camera.x + this.x),
                    (this.camera.y + this.y),
                    width * UntitledGame.config.SCALE, height * UntitledGame.config.SCALE
                );
            }
            else if (this.imageType === "LensGalaxy") {
                let { x, y, width, height } = this.imageRect;

                this.game.context.drawImage(this.game.LensGalaxy_Image[this.obj.owner],
                    x, y, width, height,
                    (this.camera.x + this.x),
                    (this.camera.y + this.y),
                    width * UntitledGame.config.SCALE, height * UntitledGame.config.SCALE
                );
            }

            else if (this.imageType === "StickGalaxy") {
                let { x, y, width, height } = this.imageRect;

                this.game.context.drawImage(this.game.StickGalaxy_Image[this.obj.owner],
                    x, y, width, height,
                    (this.camera.x + this.x),
                    (this.camera.y + this.y),
                    width * UntitledGame.config.SCALE, height * UntitledGame.config.SCALE
                );
            }

            else if (this.imageType === "SpiralGalaxy") {
                let { x, y, width, height } = this.imageRect;

                this.game.context.drawImage(this.game.SpiralGalaxy_Image[this.obj.owner],
                    x, y, width, height,
                    (this.camera.x + this.x),
                    (this.camera.y + this.y),
                    width * UntitledGame.config.SCALE, height * UntitledGame.config.SCALE
                );
            }

            else if (this.imageType === "ChemicalSpaceShip") {
                let { x, y, width, height } = this.imageRect;

                this.game.context.drawImage(this.game.ChemicalSpaceShip_Image[this.obj.owner - 1],
                    x, y + this.rot * height, width, height,
                    (this.camera.x + this.x),
                    (this.camera.y + this.y),
                    width * UntitledGame.config.SCALE * 0.65, height * UntitledGame.config.SCALE * 0.65
                );
            }

            else if (this.imageType === "ChemicalBullet") {
                let { x, y, width, height } = this.imageRect;

                this.game.context.drawImage(this.game.ChemicalBullet_Image[this.obj.owner - 1],
                    x + this.rot * width, y, width, height,
                    (this.camera.x + this.x),
                    (this.camera.y + this.y),
                    width * UntitledGame.config.SCALE, height * UntitledGame.config.SCALE
                );
            }

            else if (this.imageType === "Explain_Panel") {
                let { x, y, width, height } = this.imageRect;

                this.game.context.drawImage(this.game.ExplainPanel_Image,
                    x, y, width, height,
                    0, this.game.canvas.height - this.game.canvas.width * UntitledGame.config.Panel_Height_RATE,
                    this.game.canvas.width,
                    this.game.canvas.width * UntitledGame.config.Panel_Height_RATE
                );
            }

            else if (this.imageType === "Bang") {
                let { x, y, width, height } = this.imageRect;

                this.game.context.drawImage(this.game.BangParticle_Image,
                    x, y, width, height,
                    (this.camera.x + this.x),
                    (this.camera.y + this.y),
                    width * UntitledGame.config.SCALE, height * UntitledGame.config.SCALE
                );
            }

            else if (this.imageType === "SpaceMine") {
                let { x, y, width, height } = this.imageRect;

                this.game.context.drawImage(this.game.SpaceMine_NonActive_Image,
                    x, y, width, height,
                    (this.camera.x + this.x),
                    (this.camera.y + this.y),
                    width * UntitledGame.config.SCALE * 0.4, height * UntitledGame.config.SCALE * 0.4
                );
            }

            else if (this.imageType === "SpaceMineActive") {
                let { x, y, width, height } = this.imageRect;

                this.game.context.drawImage(this.game.SpaceMine_Active_Image,
                    x, y, width, height,
                    (this.camera.x + this.x),
                    (this.camera.y + this.y),
                    width * UntitledGame.config.SCALE * 0.4, height * UntitledGame.config.SCALE * 0.4
                );
            }
        }

        update(deltaTime) {
        }

        get width() {
            return this.imageRect.width;
        }

        get height() {
            return this.imageRect.height;
        }
    }
    class Animation extends Sprite {
        constructor(game, sourceImageRect, imageType, totalFrame, fps, obj) {
            super(game, sourceImageRect, imageType, obj);

            this.imageType = imageType;
            this.frames = [];
            this.currentFrame = 0;
            this.totalFrame = totalFrame;
            this.fps = fps;

            // 스프라이트 시트 상에서 항상 옆으로 이어져 있으니 야매로
            for (let i = 0; i < this.totalFrame; ++i) {
                this.frames[i] = new Rect(
                    sourceImageRect.x + i * sourceImageRect.width,
                    sourceImageRect.y,
                    sourceImageRect.width,
                    sourceImageRect.height
                );
            }

            this.imageRect = this.frames[0];
        }

        update(deltaTime) {
            this.currentFrame += deltaTime * this.fps;

            let frameToRender = Math.floor(this.currentFrame);

            if (frameToRender >= this.totalFrame) {
                this.currentFrame = frameToRender = 0;
            }

            this.imageRect = this.frames[frameToRender];
        }
    }

    class Galaxy extends GameObject {
        constructor(game, galaxyType, galaxyName, gID = __gID) {
            super();
            this.game = game;

            this.gID = gID;
            __gID++;

            this.x = 0; this.y = 0; //해당 오브젝트가 그려지는 X,Y좌표
            this.centerX = 0; this.centerY = 0; //해당 오브젝트의 중심

            this.animation;

            this.generateTime = 0; //1초마다 자원을 생산하는 걸 구연할때 시간을 담는 변수

            //현재 주인(0 : 없음, 1 ~ 4 : 각각 플레이어 1 ~ 4)
            this.owner = 0;

            //defensiveForce는 방어막이란 뜻임
            this.maxDefensiveForce = (galaxyType + 1) * 100; //최대체력이라 보면 됨
            this.generativeForce = (galaxyType + 1) * 100;
            this.defensiveForce = this.maxDefensiveForce; //현 체력

            switch (galaxyType) { //해당 은하의 타입 지정
                case 0:
                    this.galaxyType = "불규칙 은하"
                    break;
                case 1:
                    this.galaxyType = "타원 은하"
                    this.animation = new Animation(game,
                        UntitledGame.spriteDefinition.EllapseGALAXY, "EllipseGalaxy", 24, 15, this);
                    break;
                case 2:
                    this.galaxyType = "렌즈 은하"
                    this.animation = new Animation(game,
                        UntitledGame.spriteDefinition.LensGALAXY, "LensGalaxy", 12, 13, this);
                    break;
                case 3:
                    this.galaxyType = "막대 은하"
                    this.animation = new Animation(game,
                        UntitledGame.spriteDefinition.StickGALAXY, "StickGalaxy", 12, 13, this);
                    break;
                case 4:
                    this.galaxyType = "나선 은하"
                    this.animation = new Animation(game,
                        UntitledGame.spriteDefinition.SpiralGALAXY, "SpiralGalaxy", 12, 10, this);
                    break;
                case 5:
                    this.galaxyType = "퀘이사 은하"
                    break;
            }
            this.generativeAdd = this.generativeForce / 10;
            this.defensiveAdd = this.defensiveForce / 10;

            this.galaxyName = galaxyName; //정보 뷰에 표시될 은하 이름

            //해당 은하의 업그레이드된 정도
            this.terraforming = 0;
            this.beamBarrier = 0;
        }
        render() {
            this.animation.render();
            this.animation.x = this.x;
            this.animation.y = this.y;

            this.centerX = this.x + this.animation.imageRect.width * UntitledGame.config.SCALE * 0.5
            this.centerY = this.y + this.animation.imageRect.height * UntitledGame.config.SCALE * 0.5

            this.showHealth();
        }

        update(deltaTime) {
            this.animation.update(deltaTime);

            this.generateTime += deltaTime;
            //1초지나면 자원 생산 함수 실행
            if (this.generateTime > UntitledGame.config.PLANET_RESOURCE_TERM) {
                this.generateTime = 0;
                this.resourceGenerate(this.generativeForce);
            }
        }

        //데미지(데미지량, 누가 때렸는지)
        Damage(dmg, owner) {
            this.defensiveForce -= dmg;
            if (this.defensiveForce <= 0)
                this.Death(owner);
        }

        //죽음
        Death(owner) {
            this.owner = owner;
            this.defensiveForce = this.maxDefensiveForce;
        }

        //체력 표시
        showHealth() {
            if (this.game.gameEnd) return;
            //체력 0미만은 0으로 바꿔줌
            if (this.defensiveForce < 0)
                this.defensiveForce = 0;

            this.game.context.font = "20px 나눔바른펜";
            this.game.context.fillStyle = 'White';
            this.game.context.textBaseline = 'top';
            this.game.context.textAlign = 'center';
            this.game.context.fillText(this.galaxyName + "(" + this.galaxyType + ")",
                this.game.mainCamera.x + this.x + (this.animation.width * UntitledGame.config.SCALE * 0.5),
                this.game.mainCamera.y + this.y - 50);

            if (this.defensiveForce < this.maxDefensiveForce || this.game.nowClicked_Obj == this ||
                this.owner == this.game.playerID) {
                this.game.context.fillStyle = "#FFFFFF";
                this.game.context.fillRect(
                    this.game.mainCamera.x + this.x + (this.animation.width * UntitledGame.config.SCALE * 0.5)
                    - this.maxDefensiveForce * 0.35,
                    this.game.mainCamera.y + this.y - 20,
                    this.maxDefensiveForce * 0.7, 15);
                this.game.context.fillStyle = "#FE2E2E";
                this.game.context.fillRect(
                    this.game.mainCamera.x + this.x + (this.animation.width * UntitledGame.config.SCALE * 0.5)
                    - this.maxDefensiveForce * 0.35,
                    this.game.mainCamera.y + this.y - 20,
                    this.defensiveForce * 0.7, 15);
            }
        }

        //자원 생산
        resourceGenerate(generativeForce) {
            if (this.owner != 0) //cameras는 플레이어1 ~ 4의 카메라를 담고 있음
                this.game.cameras[this.owner - 1].carbonAdd(generativeForce);
        }

        //생산력 업그레이드
        terraformingUpgrade() {
            if (this.terraforming < 10) {
                if (this.game.mainCamera.carbon >= 2000) {
                    this.game.mainCamera.carbon -= 2000;
                    this.terraforming++;
                    this.generativeForce += this.generativeAdd;
                }
                else
                    this.game.ExplainUI.explainSet("Carbon이 부족합니다", 3, "Red");
            }
            else
                this.game.ExplainUI.explainSet("더이상 업그레이드 할 수 없습니다.", 3, "Red");
        }

        //체력 업그레이드
        barrierUpgrade() {
            if (this.beamBarrier < 10) {
                if (this.game.mainCamera.carbon >= 2000) {
                    this.game.mainCamera.carbon -= 2000;
                    this.beamBarrier++;
                    this.defensiveForce += this.defensiveAdd;
                    this.maxDefensiveForce += this.defensiveAdd;
                }
                else
                    this.game.ExplainUI.explainSet("Carbon이 부족합니다", 3, "Red");
            }
            else
                this.game.ExplainUI.explainSet("더이상 업그레이드 할 수 없습니다.", 3, "Red");
        }
    }

    class ExplainText extends GameObject {
        constructor(game, abY) {
            super();
            this.game = game;
            this.context = game.context;
            this.canvas = game.canvas;

            this.abY = abY;

            this.x = 0; this.y = 0;

            this.explainTime = 0;
            this.explainText = "";
            this.color = "White";
        }
        render() {
            this.x = this.canvas.width * 0.5;
            this.y = this.canvas.height - this.abY * this.canvas.width / 1465;
            if (this.explainTime > 0) {
                this.game.context.font = "25px 나눔바른펜";
                this.game.context.fillStyle = this.color;
                this.game.context.textBaseline = 'top';
                this.game.context.textAlign = 'center';
                this.context.fillText(this.explainText, this.x, this.y);
            }
        }

        update(deltaTime) {
            if (this.explainTime > 0) {
                this.explainTime -= deltaTime;
            }
        }

        explainSet(text, time, color) {
            this.explainText = text;
            this.explainTime = time;
            this.color = color;
        }
    }

    // 나중에 서버에서 시간 받는식으로 개선
    class TimeText extends GameObject {
        constructor(game) {
            super();
            this.game = game;
            this.context = game.context;

            this.nowTime = 0;
            this.maxTime = 300;

            this.min = 0;
            this.sec = 0;
        }
        render() {
        }

        update(deltaTime) {
            this.nowTime += deltaTime;
            this.game.context.font = (35 * this.game.uiScale) + "px 나눔바른펜";
            this.game.context.fillStyle = "White";
            this.game.context.textBaseline = 'top';
            this.game.context.textAlign = 'left';

            if (this.nowTime > 1)
                this.min = Math.floor(Math.floor(this.nowTime - 1) / 60);
            else
                this.min = Math.floor(Math.floor(this.nowTime) / 60);
            this.sec = Math.round(this.nowTime) % 60;
            var time = (this.min < 10) ? "0" + this.min : this.min;
            time = time + " : " + ((this.sec < 10) ? "0" + this.sec : this.sec);
            this.context.fillText(time, 0, 0);

            if (this.nowTime >= this.maxTime || this.game.isKeyStay('KeyP')) {
                this.game.endGame();
            }
        }
    }

    class MiniMap extends GameObject {
        constructor(game) {
            super();
            this.game = game;
            this.context = game.context;
            this.canvas = game.canvas;
            this.map_Width = UntitledGame.config.MAP_WIDTH * UntitledGame.config.MAP_SCALE;
            this.map_Height = UntitledGame.config.MAP_HEIGHT * UntitledGame.config.MAP_SCALE;

            this.x = this.canvas.width - this.map_Width;
            this.y = this.canvas.height - this.map_Height;

            this.camera = game.mainCamera;
        }
        render() {
            this.context.fillStyle = "#FFFFFF";
            this.game.context.fillRect(
                this.canvas.width - this.map_Width, this.canvas.height - this.map_Height,
                this.map_Width, this.map_Height);
            this.drawCamera();
            this.drawIcon();
        }

        update(deltaTime) {
            this.map_Width = UntitledGame.config.MAP_WIDTH * UntitledGame.config.MAP_SCALE * this.game.uiScale;
            this.map_Height = UntitledGame.config.MAP_HEIGHT * UntitledGame.config.MAP_SCALE * this.game.uiScale * 0.89;
            this.x = this.canvas.width - this.map_Width;
            this.y = this.canvas.height - this.map_Height;
        }

        drawCamera() {
            var mapX = this.canvas.width - this.map_Width - this.camera.x * UntitledGame.config.MAP_SCALE * this.game.uiScale;
            var mapY = this.canvas.height - this.map_Height - this.camera.y * UntitledGame.config.MAP_SCALE * this.game.uiScale;
            var mapWidth = this.canvas.width * UntitledGame.config.MAP_SCALE * this.game.uiScale;
            var mapHeight = this.canvas.height * UntitledGame.config.MAP_SCALE * this.game.uiScale;
            // if(mapY > 675){
            //     mapHeight = mapHeight - (mapY - 675)
            // }

            this.context.fillStyle = "#E6E6E6";
            this.context.fillRect(mapX, mapY, mapWidth, mapHeight)

            this.context.strokeStyle = "#0000FF";
            this.context.lineWidth = 1.5;
            this.context.beginPath();
            this.context.moveTo(mapX, mapY)
            this.context.lineTo(mapX + mapWidth * 0.1, mapY)
            this.context.lineTo(mapX, mapY)
            this.context.lineTo(mapX, mapY + mapHeight * 0.1)
            this.context.closePath();
            this.context.stroke();

            this.context.beginPath();
            this.context.moveTo(mapX + mapWidth, mapY + mapHeight)
            this.context.lineTo(mapX + mapWidth - mapWidth * 0.1, mapY + mapHeight)
            this.context.lineTo(mapX + mapWidth, mapY + mapHeight)
            this.context.lineTo(mapX + mapWidth, mapY + mapHeight - mapHeight * 0.1)
            this.context.closePath();
            this.context.stroke();
        }

        drawIcon() {
            for (let g of this.game.galaxys) {
                if (g.animation.imageType === "EllipseGalaxy") {
                    this.context.drawImage(this.game.EllipseGalaxy_Image[g.owner],
                        10, 10, 304, 304,
                        this.x + g.x * UntitledGame.config.MAP_SCALE * this.game.uiScale,
                        this.y + g.y * UntitledGame.config.MAP_SCALE * this.game.uiScale * 0.89,
                        g.animation.width * UntitledGame.config.Icon_SCALE, g.animation.height * UntitledGame.config.Icon_SCALE
                    );
                }
                else if (g.animation.imageType === "LensGalaxy") {
                    this.context.drawImage(this.game.LensGalaxy_Image[g.owner],
                        10, 10, 304, 304,
                        this.x + g.x * UntitledGame.config.MAP_SCALE * this.game.uiScale,
                        this.y + g.y * UntitledGame.config.MAP_SCALE * this.game.uiScale * 0.89,
                        g.animation.width * UntitledGame.config.Icon_SCALE, g.animation.height * UntitledGame.config.Icon_SCALE
                    );
                }
                else if (g.animation.imageType === "StickGalaxy") {
                    this.context.drawImage(this.game.StickGalaxy_Image[g.owner],
                        10, 10, 304, 304,
                        this.x + g.x * UntitledGame.config.MAP_SCALE * this.game.uiScale,
                        this.y + g.y * UntitledGame.config.MAP_SCALE * this.game.uiScale * 0.89,
                        g.animation.width * UntitledGame.config.Icon_SCALE, g.animation.height * UntitledGame.config.Icon_SCALE
                    );
                }
                else if (g.animation.imageType === "SpiralGalaxy") {
                    this.context.drawImage(this.game.SpiralGalaxy_Image[g.owner],
                        10, 10, 304, 304,
                        this.x + g.x * UntitledGame.config.MAP_SCALE * this.game.uiScale,
                        this.y + g.y * UntitledGame.config.MAP_SCALE * this.game.uiScale * 0.89,
                        g.animation.width * UntitledGame.config.Icon_SCALE, g.animation.height * UntitledGame.config.Icon_SCALE
                    );
                }
            }

            for (let s of this.game.spaceships) {
                this.context.drawImage(this.game.ChemicalSpaceShip_Image[s.owner - 1],
                    0, 0 + s.animation.rot * s.animation.imageRect.height, 310, 310,
                    this.x + s.x * UntitledGame.config.MAP_SCALE * this.game.uiScale,
                    this.y + s.y * UntitledGame.config.MAP_SCALE * this.game.uiScale * 0.89,
                    s.animation.width * UntitledGame.config.Icon_SCALE * 0.8,
                    s.animation.height * UntitledGame.config.Icon_SCALE * 0.8
                );
            }
        }
    }
    class ChatScreen extends GameObject {
        constructor(game) {
            super();
            this.game = game;
            this.context = game.context;

            this.x = 10; this.y = 320;
            this.width = 300; this.height = 35;

            this.lineOffset = 33;

            this.maxLine = 5; this.nowLine = 0;

            this.lastChar = ""
            this.inputTerm = 0.1; this.enterTerm = 0.2; this.bsTerm = 0.2;
            this.spaceTerm = 0.1;

            this.chatMode = false;
            this.target = 0;
            this.textCount = 0;

            this.Chattings = []; //연동(채팅부분이라 너가 많이 고쳐야함)
            this.nowText = "";
        }
        render() {
            if (this.chatMode) {
                this.context.fillStyle = 'White';
                this.context.strokeStyle = 'White';
                this.context.globalAlpha = '0.3';
                this.context.fillRect(this.x * this.game.uiScale, this.game.canvas.height - (this.y + 5) * this.game.uiScale,
                    this.width * this.game.uiScale, this.height * this.game.uiScale);
                this.context.globalAlpha = '1';
            }

            this.context.font = (25 * this.game.uiScale) + "px 나눔바른펜";
            this.context.textBaseline = 'center';
            this.context.textAlign = 'left';
            this.context.fillStyle = "Black";
            this.context.fillText(this.nowText,
                (this.x + 5) * this.game.uiScale, this.game.canvas.height - this.y * this.game.uiScale);


            this.context.font = (20 * this.game.uiScale) + "px 나눔바른펜";
            this.context.textBaseline = 'center';
            this.context.textAlign = 'left';

            if (this.Chattings.length < this.maxLine)
                this.startIndex = this.Chattings.length;
            else
                this.startIndex = this.maxLine;

            var c = 0;
            for (var i = this.textCount - 1; i > this.textCount - this.startIndex - 1; i--) {
                c++;
                if (this.Chattings[i][0] == '0') {
                    this.context.fillStyle = "#2ECCFA";
                    var str = this.game.cameras[0].playerName + " : " + this.Chattings[i].replace("0", "");
                    this.context.fillText(str,
                        (this.x + 5) * this.game.uiScale, this.game.canvas.height - (this.y + this.lineOffset * c) * this.game.uiScale);
                }
                else if (this.Chattings[i][0] == '1') {
                    this.context.fillStyle = "#00FF40";
                    var str = this.game.cameras[1].playerName + " : " + this.Chattings[i].replace("1", "");
                    this.context.fillText(str,
                        (this.x + 5) * this.game.uiScale, this.game.canvas.height - (this.y + this.lineOffset * c) * this.game.uiScale);
                }
                else if (this.Chattings[i][0] == '2') {
                    this.context.fillStyle = "#FE2E2E";
                    var str = this.game.cameras[2].playerName + " : " + this.Chattings[i].replace("2", "");
                    this.context.fillText(str,
                        (this.x + 5) * this.game.uiScale, this.game.canvas.height - (this.y + this.lineOffset * c) * this.game.uiScale);

                }
                else if (this.Chattings[i][0] == '3') {
                    this.context.fillStyle = "Yellow";
                    var str = this.game.cameras[3].playerName + " : " + this.Chattings[i].replace("3", "");
                    this.context.fillText(str,
                        (this.x + 5) * this.game.uiScale, this.game.canvas.height - (this.y + this.lineOffset * c) * this.game.uiScale);
                }
                else {
                    this.context.fillStyle = "#FFFFFF";
                    var str = "ALL : " + this.Chattings[i].replace("4", "");
                    this.context.fillText(str,
                        (this.x + 5) * this.game.uiScale, this.game.canvas.height - (this.y + this.lineOffset * c) * this.game.uiScale);
                }
            }
        }

        update(deltaTime) {
            if (this.inputTerm > 0)
                this.inputTerm -= deltaTime;
            if (this.enterTerm > 0)
                this.enterTerm -= deltaTime;
            if (this.bsTerm > 0)
                this.bsTerm -= deltaTime;
            if (this.spaceTerm > 0)
                this.spaceTerm -= deltaTime;


            if (this.chatMode) {
                if (this.game.isKeyStay('Enter') && this.enterTerm <= 0) {
                    if (this.nowText != "") {
                        this.Chattings[this.textCount++] = (this.game.playerID - 1) + this.nowText;
                        this.nowText = "";
                    }
                    this.chatMode = false;
                    this.enterTerm = 0.1;
                }
                if (this.game.isKeyStay('Backspace') && this.bsTerm <= 0) {
                    if (this.nowText.length > 0) {
                        this.nowText = this.nowText.substring(0, this.nowText.length - 1);
                    }
                    this.bsTerm = 0.1;
                }
                if (this.game.isKeyStay('Space') && this.spaceTerm <= 0) {
                    if (this.nowText.length > 0) {
                        this.nowText = this.nowText + " ";
                    }
                    this.spaceTerm = 0.1;
                }
                for (var str in this.game.stayKeys) {
                    if (this.game.stayKeys[str]) {
                        if (str.match(/Key/)) {
                            str = str.replace("Key", "")
                        }
                        else if (str.match(/Digit/)) {
                            str = str.replace("Digit", "")
                        }
                        else if (str.match(/Numpad/)) {
                            str = str.replace("Numpad", "")
                        } else {
                            continue;
                        }

                        if (this.game.isKeyStay('ShiftLeft') || this.game.isKeyStay('ShiftRight'))
                            str = str.toUpperCase();
                        else
                            str = str.toLowerCase();

                        if (this.lastChar.toLowerCase() == str.toLowerCase()) {
                            if (this.inputTerm <= 0) {
                                this.inputTerm = 0.02;
                                this.nowText = this.nowText + str;
                                this.lastChar = str;
                            }
                        } else {
                            this.nowText = this.nowText + str;
                            this.inputTerm = 0.5;
                            this.lastChar = str;
                        }
                        break;
                    }
                }
            }
            else {
                if (this.game.isKeyStay('Enter') && this.enterTerm <= 0) {
                    this.chatMode = true;
                    this.enterTerm = 0.2;
                }
            }
        }
    }

    class AudioClip extends GameObject {
        constructor(game, src, lifeTime) {
            super();
            var newClip = new Audio(src);
            this.game = game;
            this.lifeTime = lifeTime;
            this.useful = 0;

            // newClip.volume = this.game.setting_effect_volume;
            newClip.play(); //정책때메 음악이 안나옴
        }
    }

    class Camera extends GameObject {
        constructor(game, owner) {
            super();
            this.game = game;

            this.x = 0; this.y = 0;
            this.moveSpeed = 8;

            this.carbon = 1000;

            this.carbonPlus = 0;
            this.carbonUse = 0;

            this.maxCount = 9;
            this.nowCount = 1;

            this.playerName = "";
            this.owner = owner;
            this.rank = 0;

            this.isDead = false;
        }

        render() {
            this.carbonPlus = this.carbonUse = 0;
            for (let g of this.game.galaxys) {
                if (g.owner == this.game.playerID)
                    this.carbonPlus += g.generativeForce;
            }
            for (let s of this.game.spaceships) {
                if (s.owner == this.game.playerID)
                    this.carbonUse += s.useCoin;
            }
        }

        update(deltaTime) {
            if (!this.game.chatScreen.chatMode) {
                if (this.game.isKeyStay('Space'))
                    this.moveSpeed = 15
                else
                    this.moveSpeed = 8

                if (this.game.isKeyStay('KeyW'))
                    this.y += this.moveSpeed;
                if (this.game.isKeyStay('KeyS'))
                    this.y -= this.moveSpeed;

                if (this.game.isKeyStay('KeyA'))
                    this.x += this.moveSpeed;
                if (this.game.isKeyStay('KeyD'))
                    this.x -= this.moveSpeed;
            }

            if (this.carbon < -1000 || this.game.isKeyStay('KeyO')) {
                this.gameOver();
            }

            if (this.x > 0) this.x = 0;
            if (this.x < -UntitledGame.config.MAP_WIDTH + this.game.canvas.width)
                this.x = -UntitledGame.config.MAP_WIDTH + this.game.canvas.width;
            if (this.y > 0) this.y = 0;
            if (this.y < -UntitledGame.config.MAP_HEIGHT + this.game.canvas.height - 130)
                this.y = -UntitledGame.config.MAP_HEIGHT + this.game.canvas.height - 130;
        }

        carbonAdd(num) {
            this.carbon += num;
        }

        gameOver() {
            this.isDead = true;
            for (let g of this.game.galaxys) {
                if (g.owner == this.game.playerID) {
                    g.owner = 0;
                }
            }
            for (let s of this.game.spaceships) {
                if (s.owner == this.game.playerID) {
                    s.Death(0)
                }
            }
            for (let m of this.game.Mines) {
                if (m.owner == this.game.playerID) {
                    m.damage = 0;
                    m.useful = false;
                }
            }
        }
    }

    UntitledGame.spriteDefinition = {//x, y, width, height
        EllapseGALAXY: new Rect(10, 10, 304, 304),
        LensGALAXY: new Rect(0, 0, 333, 332),
        StickGALAXY: new Rect(0, 0, 333, 332),
        SpiralGALAXY: new Rect(0, 0, 310.8, 310.8),

        BULLET1: new Rect(420, 10, 72.5, 72.5),
        BULLET2: new Rect(495, 10, 72.5, 72.5),
        BULLET3: new Rect(422, 81, 72.5, 72.5),
        BULLET4: new Rect(492.5, 80, 72.5, 72.5),
        BULLET5: new Rect(420, 155, 72.5, 72.5),

        CHEMICALSPACE_SHIP: new Rect(0, 27.5, 441.5, 320.2),
        CHEMICALBULLET: new Rect(0, 0, 70, 70),

        EXPLAIN_PANEL: new Rect(0, 0, 1922, 390),
        UPGRADE_BUTTON: new Rect(50, 120, 205, 70),
        SPACESHIP_BUTTON: new Rect(0, 0, 300, 300),
        RANKING_SCREEN: new Rect(0, 0, 1150, 850),

        SPACEMINE: new Rect(20, 0, 303, 300),

        BANG: new Rect(0, 0, 305, 305)
    }
    // 게임 설정
    UntitledGame.config = {
        PLANET_RESOURCE_TERM: 1,
        MAP_WIDTH: 3840,
        MAP_HEIGHT: 2160,

        MAP_SCALE: 0.1,
        Icon_SCALE: 0.05,
        Panel_Height_RATE: 0.209,
        SCALE: 0.4
    }

});