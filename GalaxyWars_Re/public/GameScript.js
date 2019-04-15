
    //클래스
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

class UntitledGame {
    /* 초기화 */
    constructor(canvasElement) {
        this.canvas = canvasElement;
        this.context = canvasElement.getContext('2d');

        this.uiScale = 0;
        {
            this.EllipseGalaxy_Image = new Array(5);
            for(var i = 0;i<5;i++){
                this.EllipseGalaxy_Image[i] = new Image();
                this.EllipseGalaxy_Image[i].src = 'Resources/' + i + 'EllipseGalaxy.png';
            }

            this.LensGalaxy_Image = new Array(5);
            for(var i = 0;i<5;i++){
                this.LensGalaxy_Image[i] = new Image();
                this.LensGalaxy_Image[i].src = 'Resources/' + i + 'LensGalaxy.png';
            }

            this.StickGalaxy_Image = new Array(5);
            for(var i = 0;i<5;i++){
                this.StickGalaxy_Image[i] = new Image();
                this.StickGalaxy_Image[i].src = 'Resources/' + i + 'StickGalaxy.png';
            }

            this.SpiralGalaxy_Image = new Array(5);
            for(var i = 0;i<5;i++){
                this.SpiralGalaxy_Image[i] = new Image();
                this.SpiralGalaxy_Image[i].src = 'Resources/' + i + 'SpiralGalaxy.png';
            }
            
            this.ChemicalSpaceShip_Image = new Array(4);
            for(var i = 0;i<4;i++){
                this.ChemicalSpaceShip_Image[i] = new Image();
                this.ChemicalSpaceShip_Image[i].src = 'Resources/' + (i + 1) + 'ChemicalSpaceship.png';
            }
            
            this.ChemicalBullet_Image = new Array(4);
            for(var i = 0;i<4;i++){
                this.ChemicalBullet_Image[i] = new Image();
                this.ChemicalBullet_Image[i].src = 'Resources/' + (i + 1) + 'ChemicalBullet.png';
            }

            this.ExplainPanel_Image = new Image();
            this.ExplainPanel_Image.src = 'Resources/ExplainPanel.png';

            this.UpgradeButton_Image = new Image();
            this.UpgradeButton_Image.src = 'Resources/UpgradeButton.png';

            this.SpaceShipIcon_Image = new Image();
            this.SpaceShipIcon_Image.src = 'Resources/SpaceShipIcon.png';

            this.SpaceShipAddIcon_Image = new Image();
            this.SpaceShipAddIcon_Image.src = 'Resources/SpaceShipAddIcon.png';

            this.BangParticle_Image = new Image();
            this.BangParticle_Image.src = 'Resources/Bomb.png';

            this.SpaceMine_NonActive_Image = new Image();
            this.SpaceMine_NonActive_Image.src = 'Resources/SpaceMine_NonActive.png';

            this.SpaceMine_Active_Image = new Image();
            this.SpaceMine_Active_Image.src = 'Resources/SpaceMine_Active.png';

            this.RankingScreen_Image = new Image();
            this.RankingScreen_Image.src = 'Resources/RankScreen.png';

            this.BackMain_Image = new Image();
            this.BackMain_Image.src = 'Resources/BackButton.png';
            
            this.EndText_Image = new Array(4);
            for(var i = 0;i<4;i++){
                this.EndText_Image[i] = new Image();
                this.EndText_Image[i].src = 'Resources/' + (i + 1) + 'EndText.png';
            }
        }
        this.teamColor = ["#2ECCFA", "#58FA82", "#FA5882", "Yellow"];

        this.nowClicked_Obj;

        this.cameras = [];
        this.UIs = [];
        this.Buttons = [];
        this.SpaceShipButtons = [];
        this.Mines = [];
        this.Particles = [];
        
        // 혼모노
        this.sounds = [];
        this.galaxys = [];
        this.spaceships = [];
        this.bullets = [];
        this.stayKeys = {};
        
        this.paused = false;
        this.canControl = true;
        this.canUse = true;
        this.backSound = true;
        this.updatePending = false;

        this.mineSetting = false;
        this.spaceShipSetting = false;

        this.gameEnd = false;

        window.addEventListener('blur', this.onVisibilityChange.bind(this));
        window.addEventListener('focus', this.onVisibilityChange.bind(this));
        document.addEventListener('visibilitychange', this.onVisibilityChange.bind(this));
        window.addEventListener('keydown', this.onKeyDown.bind(this));
        window.addEventListener('keyup', this.onKeyUp.bind(this));
    }
    
    realPlay() {
        this.playerID = pID; //플레이어 아이디
        
        this.chatScreen = new ChatScreen(this);

        this.camera1 = new Camera(this, 1); this.cameras.push(this.camera1);
        this.camera2 = new Camera(this, 2); this.cameras.push(this.camera2);
        this.camera3 = new Camera(this, 3); this.cameras.push(this.camera3);
        this.camera4 = new Camera(this, 4); this.cameras.push(this.camera4);
        this.camera1.playerName = p1Name; this.camera1.x = this.camera3.x = 0
        this.camera2.playerName = p2Name; this.camera2.x = this.camera4.x = this.canvas.width - UntitledGame.config.MAP_WIDTH
        this.camera3.playerName = p3Name; this.camera1.y = this.camera2.y = 0
        this.camera4.playerName = p4Name; this.camera3.y = this.camera4.y = this.canvas.height - UntitledGame.config.MAP_HEIGHT;

        this.mainCamera = this.cameras[this.playerID - 1];

        this.infoUI1 = new PlayerInfo(this); this.UIs.push(this.infoUI1);
        this.infoUI2 = new PlayerInfo(this); this.UIs.push(this.infoUI2);
        this.infoUI3 = new PlayerInfo(this); this.UIs.push(this.infoUI3);
        this.infoUI4 = new PlayerInfo(this); this.UIs.push(this.infoUI4);
        
        this.UpgradeButton1 = new UpgradeButton(this, 840, 93, 0); 
        this.Buttons.push(this.UpgradeButton1);
        this.UpgradeButton2 = new UpgradeButton(this, 590, 93, 1); 
        this.Buttons.push(this.UpgradeButton2);
        this.UpgradeButton3 = new UpgradeButton(this, 840, 48, 2); 
        this.Buttons.push(this.UpgradeButton3);
        this.UpgradeButton4 = new UpgradeButton(this, 590, 48, 3); 
        this.Buttons.push(this.UpgradeButton4);

        this.ExplainUI = new ExplainText(this, 250); this.UIs.push(this.ExplainUI);
        this.TimeUI = new TimeText(this); this.UIs.push(this.TimeUI);

        
        this.mouseX = 0, this.mouseY = 0;

        this.rankUI1 = new RankBoard(this); this.UIs.push(this.rankUI1);
        this.carbonUI1 = new CarbonBoard(this); this.UIs.push(this.carbonUI1);

        this.galaxyGenerate();
    }

    pause() {
        this.paused = true;
    }
    run() {
        this.updatePending = false;

        if(this.canUse){
            const now = performance.now();
            const deltaTime = (now - this.time) / 1000;
            this.time = now;

            this.clearCanvas();
            this.update(deltaTime);

            this.render();

            this.scheduleNextUpdate();
        }
    }

    endGame(){
        this.gameEnd = true;
    }

    play() {
        this.realPlay();
        
        this.paused = false;
        this.time = performance.now();
        this.scheduleNextUpdate();
        var backgroundMusic = new AudioClip(game,'Sounds/BackgroundMusic.mp3', -1);
    }

    render() {
        //게임끝!
        if(this.mainCamera == null)
        return;
        if(this.gameEnd){
            for(let c of this.cameras) c.render();
            for(let g of this.galaxys) g.render();
            for(let s of this.spaceships) s.render();
            for(let p of this.Particles) p.render();
            for(let m of this.Mines)  m.render();
            for(let b of this.bullets) b.render();
            
            var x = 150 * this.uiScale; var y = 320 * this.uiScale;
            //랭킹 스크린
            {
                let { x, y, width, height } = UntitledGame.spriteDefinition.RANKING_SCREEN;
                this.context.drawImage(this.RankingScreen_Image,
                    x, y, width, height, -30 * this.uiScale, y,
                    width * 0.7 * this.uiScale, height * 0.7  * this.uiScale
                );
                
                this.context.drawImage(this.BackMain_Image,
                    x, y, 800, 300, 680 * this.uiScale, 460 * this.uiScale,
                    800 * 0.5 * this.uiScale, 300 * 0.5 * this.uiScale
                );
            }
            //랭킹 텍스트
            {
                this.context.drawImage(this.EndText_Image[this.cameras[this.playerID - 1].rank - 1],
                    0, 0, 1500, 300, 
                    660 * this.uiScale, 15 * this.uiScale,
                    1500 * 0.7 * this.uiScale, 300 * 0.7 * this.uiScale
                );
            }
            //랭킹 표시 텍스트
            {
                x = 230 * this.uiScale; y = 180 * this.uiScale;
                var line_offset = 80 * this.uiScale;

                this.context.textBaseline = 'top';
                this.context.textAlign = 'left';

                for(var i=0;i<4;i++){
                    var rank = this.cameras[i].rank - 1;
                    this.context.fillStyle = this.teamColor[i];
                    if(this.cameras[i].owner == this.playerID)
                    {
                        this.context.font = "bold " + (60 * this.uiScale) + "px Agency FB";
                        this.context.fillText(this.cameras[i].playerName + " : "
                        + this.cameras[i].carbon, 
                        x, y + line_offset * rank);
                    }
                    else
                    {
                        this.context.font = (60 * this.uiScale) + "px Agency FB";
                        this.context.fillText(this.cameras[i].playerName + " : "
                        + this.cameras[i].carbon,  
                        x, y + line_offset * rank);
                    }
                }
            }
        return;
        }

        for(let c of this.cameras)
            c.render();

        for(let g of this.galaxys)
            g.render();

        for(let s of this.spaceships)
            s.render();
            
        for(let p of this.Particles)
            p.render();
    
        for(let m of this.Mines)
            m.render();

        for(let b of this.bullets)
            b.render();

        for(let ui of this.UIs)
            ui.render();

        for(let b of this.Buttons)
            b.render();
            
        for(let sb of this.SpaceShipButtons)
            sb.render();

            this.chatScreen.render();
    
            if(this.mainCamera.isDead){
                this.context.font = "35px 나눔바른펜";
                this.context.fillStyle = "#2E9AFE";
                this.context.textBaseline = 'top';
                this.context.textAlign = 'center';
                this.context.fillText("파산했습니다", 
                this.canvas.width * 0.5, 30 * this.canvas.width / 1465);
            }
        }

    update(deltaTime) {
        this.socketUpdate();

        if(this.mainCamera == null)
        return;

        this.uiScale = this.canvas.width / 1465;

        if(this.gameEnd){
            return;
        }
        if(this.mainCamera.isDead)
        { 
            this.context.font = "25px 나눔바른펜";
            this.context.fillStyle = "Red";
            this.context.textBaseline = 'top';
            this.context.textAlign = 'center';
            this.context.fillText("ESC를 눌러 게임에서 나갈 수 있습니다", 
            this.canvas.width * 0.5, this.canvas.height - 250 * this.canvas.width / 1465);

            if(this.isKeyStay('Escape'))
                BackToMain();
        }

        for(let c of this.cameras)
            c.update(deltaTime);

        for(let g of this.galaxys)
            g.update(deltaTime);

        for(let s of this.spaceships)
            s.update(deltaTime);

        this.spaceships = this.spaceships.filter(
            function(s) {
                return s.useful;
            }
        );
            
        for(let p of this.Particles)
            p.update(deltaTime);

        this.Particles = this.Particles.filter(
            function(p) {
                return p.useful;
            }
        );

        for(let ui of this.UIs)
            ui.update(deltaTime);

        for(let b of this.Buttons)
            b.update(deltaTime);
            
        for(let sb of this.SpaceShipButtons)
            sb.update(deltaTime);

        for(let m of this.Mines)
            m.update(deltaTime);

        this.Mines = this.Mines.filter(
            function(m) {
                return m.useful;
            }
        );

        for(let b of this.bullets){
            b.update(deltaTime);
        }
            
        this.bullets = this.bullets.filter(
            function(b) {
                return b.useful;
            }
        );

        for(let obj of this.sounds){
            obj.lifeTime -= deltaTime;
            if(obj.lifeTime <= 0){
                obj.useful = false;
            }
        }
        this.sounds = this.sounds.filter(
            function(obj) {
                return obj.useful;
            }
        );
        // this.socketUpdate();
    }

    socketUpdate() {
        socket.emit("update", {
            stayKeys:{
                ID: localID,
                key: this.stayKeys
            }
        });
    }

    scheduleNextUpdate() {
        if (!this.updatePending && !this.paused) {
            this.updatePending = true;
            this.raqId = requestAnimationFrame(this.run.bind(this));
        }
    }

    clearCanvas() {
        if(this.gameEnd)
            this.context.fillStyle="#CEECF5";
        else
            this.context.fillStyle="#170B3B";
        this.context.fillRect(
            0, 0, this.canvas.width, this.canvas.height);
    }

    onVisibilityChange(event) {
        if (document.hidden
            || event.type === 'blur'
            || document.visibilityState !== 'visible') {
            this.canControl = false;
        } else {
            this.canControl = true;
        }
    }
    onKeyDown(event) {
        this.stayKeys[event.code] = true;
    }

    onKeyUp(event) {
        this.stayKeys[event.code] = false;
    }

    isKeyStay(code) {
        if(this.canControl){
            return this.stayKeys[code];
        }
    }

    leftmouseClick(event){
        if(this.gameEnd){
            if(event.x > 680 * this.uiScale &&
                event.x < 680 * this.uiScale + 400 * this.uiScale &&
                event.y > 460 * this.uiScale &&
                event.y < 460 * this.uiScale + 150 * this.uiScale)
                {
                    BackToMain();
                }
            return;
        }
        var flag = false;
        var mousePosX = event.x - this.mainCamera.x;
        var mousePosY = event.y - this.mainCamera.y;

        for(let b of this.Buttons){
            if (
                event.x > b.x && 
                event.x < b.x + b.width &&
                event.y > b.y && 
                event.y < b.y + b.height && this.nowClicked_Obj != null){
                    b.buttonClick(this.nowClicked_Obj);
                    return;
                }
        }

        for(let sb of this.SpaceShipButtons){
            if (
                event.x > sb.x && 
                event.x < sb.x + sb.width * 0.7 &&
                event.y > sb.y && 
                event.y < sb.y + sb.height * 0.7
              ) 
            {
                sb.buttonClick()
                return;
            }
        }

        if(this.mineSetting){
            if(this.mainCamera.carbon >= 2000){
                var offsetX = this.nowClicked_Obj.centerX - mousePosX;
                var offsetY = this.nowClicked_Obj.centerY - mousePosY;
                
                if(offsetX*offsetX + offsetY*offsetY < 400 * 400){
                    this.mainCamera.carbon -= 2000;
                    this.nowClicked_Obj.mine++;
                    this.mineSetting = false;
                    var newMine = new SpaceMine(game, mousePosX, mousePosY, this.nowClicked_Obj.owner, this.nowClicked_Obj)
                    this.Mines.push(newMine);
                    this.ExplainUI.explainSet("", 0.1);
                    return;
                }else{
                    this.ExplainUI.explainSet("우주선으로부터 너무 멀리 설치할 수 없습니다", 10, "Red");
                }
                return;
            }
            else{
                this.ExplainUI.explainSet("Carbon이 부족합니다", 10, "Red");
            }
        }

        for(let s of this.spaceships){
            if (
                event.x > (this.mainCamera.x + s.x) && 
                event.x < (this.mainCamera.x + s.x) + s.animation.width * UntitledGame.config.SCALE &&
                event.y > (this.mainCamera.y + s.y) && 
                event.y < (this.mainCamera.y + s.y) + s.animation.height * UntitledGame.config.SCALE
              ) 
            {
                this.nowClicked_Obj = s;
                this.nowClicked_Obj.attackTarget = null;
                this.nowClicked_Obj.isAttacking = false;
                return;
            }
        }

        for(let g of this.galaxys){
            if (
                event.x > (this.mainCamera.x + g.x) && 
                event.x < (this.mainCamera.x + g.x) + g.animation.width * UntitledGame.config.SCALE &&
                event.y > (this.mainCamera.y + g.y) && 
                event.y < (this.mainCamera.y + g.y) + g.animation.height * UntitledGame.config.SCALE
              ) 
            {
                if(this.spaceShipSetting){
                    if(g.owner == this.playerID){
                        if(this.mainCamera.carbon >= 2000){
                            var newSpaceShip = new SpaceShip(
                                this, "화학 우주선", this.cameras[this.playerID - 1].playerName); 
                            this.spaceships.push(newSpaceShip);
                            newSpaceShip.x = g.centerX;  newSpaceShip.y = g.centerY;
                            newSpaceShip.owner = this.playerID;
                            newSpaceShip.spaceshipID = idCount++;
                            console.log("id : " + newSpaceShip.spaceshipID)
                            newSpaceShip.targetX = g.centerX;  newSpaceShip.targetY = g.centerY;
                            this.spaceShipSetting = false;
                            this.ExplainUI.explainSet("", 0.1);

                            this.SpaceShipButtons[this.mainCamera.nowCount].index = 2;
                            if (this.mainCamera.nowCount < this.mainCamera.maxCount)
                                this.SpaceShipButtons[this.mainCamera.nowCount + 1].index = 1;
                            this.SpaceShipButtons[this.mainCamera.nowCount].connectedObj = newSpaceShip;
                            this.mainCamera.nowCount++;
                        }
                        else{
                            this.ExplainUI.explainSet("Carbon이 부족합니다", 10, "Red");
                        }
                    }
                    else{
                        this.ExplainUI.explainSet("우주선은 자신의 은하에서만 생성 가능합니다", 10, "Red");
                    }
                }
                else{
                    this.nowClicked_Obj = g;
                    this.nowClicked_Obj.attackTarget = null;
                    this.nowClicked_Obj.isAttacking = false;
                }
                return;
            }
        }

        if(!flag && this.nowClicked_Obj != null){
            this.nowClicked_Obj = null;
        }
    }

    rightmouseClick(event){
        if(this.gameEnd)
            return;
        var flag = false;
        var mousePosX = event.x - this.mainCamera.x;
        var mousePosY = event.y - this.mainCamera.y;

        if(this.mineSetting){
            this.mineSetting = false;
            this.ExplainUI.explainSet("", 1, "White");
            return;
        }
        if(this.spaceShipSetting){
            this.spaceShipSetting = false;
            this.ExplainUI.explainSet("", 1, "White");
            return;
        }
        
        for(let s of this.spaceships){
            if (
                event.x > (this.mainCamera.x + s.x) && 
                event.x < (this.mainCamera.x + s.x) + s.animation.width * UntitledGame.config.SCALE &&
                event.y > (this.mainCamera.y + s.y) && 
                event.y < (this.mainCamera.y + s.y) + s.animation.height * UntitledGame.config.SCALE&&
                this.playerID != s.owner &&
                this.nowClicked_Obj != null
              ) 
            {
                this.nowClicked_Obj.attackTarget = s;
                return;
            }
        }

        for(let g of this.galaxys){
            if (
                event.x > (this.mainCamera.x + g.x) && 
                event.x < (this.mainCamera.x + g.x) + g.animation.width * UntitledGame.config.SCALE &&
                event.y > (this.mainCamera.y + g.y) && 
                event.y < (this.mainCamera.y + g.y) + g.animation.height * UntitledGame.config.SCALE&&
                this.playerID != g.owner &&
                this.nowClicked_Obj != null
                ) 
            {
                this.nowClicked_Obj.attackTarget = g;
                return;
            }
        }

        if(this.nowClicked_Obj instanceof SpaceShip && this.nowClicked_Obj.owner == this.playerID
             ){
                this.nowClicked_Obj.setDestination(mousePosX, mousePosY);
                this.nowClicked_Obj.attackTarget = null;
                this.nowClicked_Obj.isAttacking = false;
                return;
        }

        if(!flag && this.nowClicked_Obj != null){
            this.nowClicked_Obj.attackTarget = null;
            this.nowClicked_Obj.isAttacking = false;
            this.nowClicked_Obj = null;
        }
    }

    audioPlay(audio){
        if(this.backSound && this.canControl){
            switch(audio){
                case 0: var newAudio = new AudioClip(game,'Sounds/normal.wav'); break;
                case 1: var newAudio = new AudioClip(game,'Sounds/iceball.wav'); break;
                case 2: var newAudio = new AudioClip(game,'Sounds/shotgun.mp3'); break;
                case 3: var newAudio = new AudioClip(game,'Sounds/teleport.wav'); break;
                case 4: var newAudio = new AudioClip(game,'Sounds/woodenwalk_1.mp3'); break;
                case 5: var newAudio = new AudioClip(game,'Sounds/rune.wav'); break;
                case 6: var newAudio = new AudioClip(game,'Sounds/iceball_frozen.mp3'); break;
                case 7: var newAudio = new AudioClip(game,'Sounds/take.mp3'); break;
                case 8: var newAudio = new AudioClip(game,'Sounds/wall.mp3'); break;
            }
            this.sounds.push(newAudio);
            newAudio.lifeTime = 5;
        }
    }

    //은하 생성
    galaxyGenerate(){
        var newGalaxy = new Galaxy(this, 1, GalaxyName(1)); this.galaxys.push(newGalaxy);
        newGalaxy.x = 250;  newGalaxy.y = 250; newGalaxy.owner = 1;

        newGalaxy = new Galaxy(this, 1, GalaxyName(1)); this.galaxys.push(newGalaxy);
        newGalaxy.x = UntitledGame.config.MAP_WIDTH - 370; newGalaxy.y = 250; 
        newGalaxy.owner = 2;

        newGalaxy = new Galaxy(this, 1, GalaxyName(1)); this.galaxys.push(newGalaxy);
        newGalaxy.x = 250; newGalaxy.y = UntitledGame.config.MAP_HEIGHT - 370; 
        newGalaxy.owner = 3;

        newGalaxy = new Galaxy(this, 1, GalaxyName(1)); this.galaxys.push(newGalaxy);
        newGalaxy.x = UntitledGame.config.MAP_WIDTH - 370;
        newGalaxy.y = UntitledGame.config.MAP_HEIGHT - 370;
        newGalaxy.owner = 4;

        newGalaxy = new Galaxy(this, 1, GalaxyName(1)); this.galaxys.push(newGalaxy);
        newGalaxy.x = 2030; newGalaxy.y = 620;

        newGalaxy = new Galaxy(this, 1, GalaxyName(1)); this.galaxys.push(newGalaxy);
        newGalaxy.x = 2630; newGalaxy.y = 920;

        newGalaxy = new Galaxy(this, 1, GalaxyName(1)); this.galaxys.push(newGalaxy);
        newGalaxy.x = 2430; newGalaxy.y = 1920;
        
        newGalaxy = new Galaxy(this, 1, GalaxyName(2)); this.galaxys.push(newGalaxy);
        newGalaxy.x = 1150; newGalaxy.y = 1500;
        
        newGalaxy = new Galaxy(this, 1, GalaxyName(2)); this.galaxys.push(newGalaxy);
        newGalaxy.x = 1550; newGalaxy.y = 1950;

        newGalaxy = new Galaxy(this, 2, GalaxyName(2)); this.galaxys.push(newGalaxy);
        newGalaxy.x = 1880; newGalaxy.y = 150;

        newGalaxy = new Galaxy(this, 2, GalaxyName(2)); this.galaxys.push(newGalaxy);
        newGalaxy.x = 950; newGalaxy.y = 600;

        newGalaxy = new Galaxy(this, 2, GalaxyName(2)); this.galaxys.push(newGalaxy);
        newGalaxy.x = 1850; newGalaxy.y = 1650;

        newGalaxy = new Galaxy(this, 2, GalaxyName(2)); this.galaxys.push(newGalaxy);
        newGalaxy.x = 2680; newGalaxy.y = 1560;

        newGalaxy = new Galaxy(this, 2, GalaxyName(2)); this.galaxys.push(newGalaxy);
        newGalaxy.x = 3580; newGalaxy.y = 1460;

        newGalaxy = new Galaxy(this, 2, GalaxyName(2)); this.galaxys.push(newGalaxy);
        newGalaxy.x = 2680; newGalaxy.y = 230;

        newGalaxy = new Galaxy(this, 2, GalaxyName(2)); this.galaxys.push(newGalaxy);
        newGalaxy.x = 980; newGalaxy.y = 1160;

        newGalaxy = new Galaxy(this, 3, GalaxyName(3)); this.galaxys.push(newGalaxy);
        newGalaxy.x = 320; newGalaxy.y = 1060;

        newGalaxy = new Galaxy(this, 3, GalaxyName(3)); this.galaxys.push(newGalaxy);
        newGalaxy.x = 920; newGalaxy.y = 1860;

        newGalaxy = new Galaxy(this, 3, GalaxyName(3)); this.galaxys.push(newGalaxy);
        newGalaxy.x = 1020; newGalaxy.y = 160;

        newGalaxy = new Galaxy(this, 3, GalaxyName(3)); this.galaxys.push(newGalaxy);
        newGalaxy.x = 3490; newGalaxy.y = 860;

        newGalaxy = new Galaxy(this, 4, GalaxyName(4)); this.galaxys.push(newGalaxy);
        newGalaxy.x = 1520; newGalaxy.y = 980;

        newGalaxy = new Galaxy(this, 4, GalaxyName(4)); this.galaxys.push(newGalaxy);
        newGalaxy.x = 2320; newGalaxy.y = 1180;

        
        var newSpaceShip = new SpaceShip(this, "화학 우주선", this.camera1.playerName); this.spaceships.push(newSpaceShip);
        newSpaceShip.x = 450;  newSpaceShip.y = 450; newSpaceShip.owner = 1;
        newSpaceShip.targetX = 450;  newSpaceShip.targetY = 450;
        newSpaceShip.spaceshipID = idCount++;
        console.log("id : " + newSpaceShip.spaceshipID)
        
        newSpaceShip = new SpaceShip(this, "화학 우주선", this.camera2.playerName); this.spaceships.push(newSpaceShip);
        newSpaceShip.x = UntitledGame.config.MAP_WIDTH - 570;  newSpaceShip.y = 450; newSpaceShip.owner = 2;
        newSpaceShip.targetX = UntitledGame.config.MAP_WIDTH - 570;  newSpaceShip.targetY = 450;
        newSpaceShip.spaceshipID = idCount++;
        console.log("id : " + newSpaceShip.spaceshipID)
        
        newSpaceShip = new SpaceShip(this, "화학 우주선", this.camera3.playerName); this.spaceships.push(newSpaceShip);
        newSpaceShip.x = 450;  newSpaceShip.y = UntitledGame.config.MAP_HEIGHT - 570; newSpaceShip.owner = 3;
        newSpaceShip.targetX = 450;  newSpaceShip.targetY = UntitledGame.config.MAP_HEIGHT - 570;
        newSpaceShip.spaceshipID = idCount++;
        console.log("id : " + newSpaceShip.spaceshipID)
        
        newSpaceShip = new SpaceShip(this, "화학 우주선", this.camera4.playerName); this.spaceships.push(newSpaceShip);
        newSpaceShip.x = UntitledGame.config.MAP_WIDTH - 570;  
        newSpaceShip.y = UntitledGame.config.MAP_HEIGHT - 570; newSpaceShip.owner = 4;
        newSpaceShip.targetX = UntitledGame.config.MAP_WIDTH - 570;  
        newSpaceShip.targetY = UntitledGame.config.MAP_HEIGHT - 570;
        newSpaceShip.spaceshipID = idCount++;
        console.log("id : " + newSpaceShip.spaceshipID)

        this.SpaceShipButton1 = new SpaceShipButton(this, 1464, 190, 0); 
        this.SpaceShipButtons.push(this.SpaceShipButton1);
        this.SpaceShipButton1.index = 2; this.SpaceShipButton1.connectedObj = this.spaceships[this.playerID - 1];
        this.SpaceShipButton2 = new SpaceShipButton(this, 1402, 190, 0);
        this.SpaceShipButtons.push(this.SpaceShipButton2);
        this.SpaceShipButton2.index = 1;
        this.SpaceShipButton3 = new SpaceShipButton(this, 1340, 190, 0);
        this.SpaceShipButtons.push(this.SpaceShipButton3);
        this.SpaceShipButton4 = new SpaceShipButton(this, 1464, 128, 3); 
        this.SpaceShipButtons.push(this.SpaceShipButton4);
        this.SpaceShipButton5 = new SpaceShipButton(this, 1402, 128, 4); 
        this.SpaceShipButtons.push(this.SpaceShipButton5);
        this.SpaceShipButton6 = new SpaceShipButton(this, 1340, 128, 5); 
        this.SpaceShipButtons.push(this.SpaceShipButton6);
        this.SpaceShipButton7 = new SpaceShipButton(this, 1464, 66, 6); 
        this.SpaceShipButtons.push(this.SpaceShipButton7);
        this.SpaceShipButton8 = new SpaceShipButton(this, 1402, 66, 7); 
        this.SpaceShipButtons.push(this.SpaceShipButton8);
        this.SpaceShipButton9 = new SpaceShipButton(this, 1340, 66, 8); 
        this.SpaceShipButtons.push(this.SpaceShipButton9);

        this.miniMap1 = new MiniMap(this); this.UIs.push(this.miniMap1);
    }
}


//메인으로 돌아가기
function BackToMain(){
    window.location.href = "http://localhost";
}

//이름 생성기(짜피 이름이니까 서버에서 안맞춰줘도 되고 맞춰줘도 되고)
function GalaxyName(index){
    switch(index){
        case 0 : //불규칙 은하
        return "I-" + getRandomInt(0,9) + getRandomInt(0,9) + getRandomInt(0,9) + getRandomInt(0,9);
        case 1 : //타원 은하
        return "E-" + getRandomInt(0,9) + getRandomInt(0,9) + getRandomInt(0,9) + getRandomInt(0,9);
        case 2 : //렌즈 은하
        return "L-" + getRandomInt(0,9) + getRandomInt(0,9) + getRandomInt(0,9) + getRandomInt(0,9);
        case 3 : //막대 은하
        return "S-" + getRandomInt(0,9) + getRandomInt(0,9) + getRandomInt(0,9) + getRandomInt(0,9);
        case 4 : //나선 은하
        return "H-" + getRandomInt(0,9) + getRandomInt(0,9) + getRandomInt(0,9) + getRandomInt(0,9);
        case 3 : //퀘이사
        return "Q-" + getRandomInt(0,9) + getRandomInt(0,9) + getRandomInt(0,9) + getRandomInt(0,9);
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

var socket = io();
var updateData = {
    camera: {
        carbon: 1000,
        x: 0,
        y: 0,
        isDead: false,
        rank: 1,
    },
    spaceShips: [{ssID: 0, health: 200, x: 0, y: 0, owner: 1}],
    galaxys: [{gID: 0, health: 200, owner: 1}],
    ID: localID
};

/* socket event */
var __gID = 0;
var idCount = 0;
var p1Name, p2Name, p3Name, p4Name, pID;

    socket.on('start game', data => {
        p1Name = data[0].name;
        p2Name = data[1].name;
        p3Name = data[2].name;
        p4Name = data[3].name;

        roomname = "TestRoom";

        pID = localID;

        game.play();
    });

    socket.on('update', (data) => {
        updateData = data;
    })
    
    socket.on('connect', () => {
    });
    
    socket.on('disconnect', () => {
        socket.emit('gameDisconnect');
    });
    
    var canvas = document.getElementById("game");
    let game = new UntitledGame(canvas);

window.onresize = function(){
    canvas.style.widows = window.innerWidth;
    canvas.style.height = window.innerHeight;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    game.context.fillStyle="#170B3B";
    game.context.fillRect(0, 0, canvas.width, canvas.height);
}

window.onload = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    game.context.fillStyle="#170B3B";
    game.context.fillRect(0, 0, canvas.width, canvas.height);

    canvas.addEventListener('click', function(event)
    {
        game.leftmouseClick(event);
    });
    canvas.addEventListener("contextmenu", function(event)
    {
        event.preventDefault();
        game.rightmouseClick(event);
    });

    canvas.addEventListener("mousemove", function(event)
    {
        // game.mouseX = event.x - game.mainCamera.x;
        // game.mouseY = event.y - game.mainCamera.y;
    });
};