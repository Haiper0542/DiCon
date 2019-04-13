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
    constructor(game, sourceImageRect,type) {
        super();
        this.game = game;
        this.imageRect = sourceImageRect;
        this.imageType = type;
    }

    render() {
        for (let i in copyedUserObjects) {
            if (i == socket.id) {
                //this.game.player1.x = copyedUserObjects[i].x
                //this.game.player1.y = copyedUserObjects[i].y
            }
            else {
                this.game.context.drawImage(this.game.bullet_image, copyedUserObjects[i].x, copyedUserObjects[i].y, 50, 50)
            }
        }
        if(this.imageType === "Bullet"){
            let { x, y, width, height } = this.imageRect;
    
            this.game.context.drawImage(this.game.bullet_image,
                x, y, width, height,
                (this.game.canvas.width/2 - this.game.player1.x + this.x) * UntitledGame.config.SCALE, 
                (this.game.canvas.height/2 - this.game.player1.y + this.y) * UntitledGame.config.SCALE, 
                width * UntitledGame.config.SCALE, height * UntitledGame.config.SCALE
            );
        }

        else if(this.imageType === "Player1"){
            let { x, y, width, height } = this.imageRect;
    
            this.game.context.drawImage(this.game.Player_image,
                x, y, width, height,
                (this.game.canvas.width/2 - this.imageRect.width/2) * UntitledGame.config.SCALE, 
                (this.game.canvas.height/2 - this.imageRect.height/2) * UntitledGame.config.SCALE,
                width * UntitledGame.config.SCALE, height * UntitledGame.config.SCALE
            );
        }
        else if(this.imageType === "Player2"){
            let { x, y, width, height } = this.imageRect;
    
            this.game.context.drawImage(this.game.Player2_image,
                x, y, width, height,
                (this.game.canvas.width/2 - this.game.player1.x - this.imageRect.width/2 + this.x) * UntitledGame.config.SCALE,
                (this.game.canvas.height/2 - this.game.player1.y - this.imageRect.height/2 + this.y) * UntitledGame.config.SCALE, 
                width * UntitledGame.config.SCALE, height * UntitledGame.config.SCALE
            );
        }
        else if(this.imageType === "Background"){
            let { x, y, width, height } = this.imageRect;
    
            this.game.context.drawImage(this.game.back_image,
                x, y, width, height,
                (this.game.canvas.width/2 - this.game.player1.x + this.x) * UntitledGame.config.SCALE,
                (this.game.canvas.height/2 - this.game.player1.y + this.y) * UntitledGame.config.SCALE,
                width * UntitledGame.config.SCALE, height * UntitledGame.config.SCALE
            );
        }
        else if(this.imageType === "Effect"){
            let { x, y, width, height } = this.imageRect;
    
            this.game.context.drawImage(this.game.effect_image,
                x, y, width, height,
                (this.game.canvas.width/2 - this.game.player1.x + this.x) * UntitledGame.config.SCALE, 
                (this.game.canvas.height/2 - this.game.player1.y + this.y) * UntitledGame.config.SCALE, 
                width * UntitledGame.config.SCALE, height * UntitledGame.config.SCALE
            );
        }
        else if(this.imageType === "Passive"){
            let { x, y, width, height } = this.imageRect;
    
            this.game.context.drawImage(this.game.passive_image,
                x, y, width, height,
                (this.game.canvas.width/2 - this.game.player1.x + this.x) * UntitledGame.config.SCALE, 
                (this.game.canvas.height/2 - this.game.player1.y + this.y) * UntitledGame.config.SCALE, 
                width * UntitledGame.config.SCALE, height * UntitledGame.config.SCALE
            );
        }
        else if(this.imageType === "UI"){
            let { x, y, width, height } = this.imageRect;
    
            this.game.context.drawImage(this.game.UI_image,
                x, y, width, height,
                (this.game.canvas.width/2 - this.game.player1.x + this.x) * UntitledGame.config.SCALE, 
                (this.game.canvas.height/2 - this.game.player1.y + this.y) * UntitledGame.config.SCALE, 
                width * UntitledGame.config.SCALE, height * UntitledGame.config.SCALE
            );
        }
        else if (this.imageType === "Gate") {
            let { x, y, width, height } = this.imageRect;

            this.game.context.drawImage(this.game.gateImage,
                x, y, width, height,
                (this.game.canvas.width/2 - this.game.player1.x + this.x) * UntitledGame.config.SCALE,
                (this.game.canvas.height/2 - this.game.player1.y + this.y) * UntitledGame.config.SCALE,
                width * UntitledGame.config.SCALE, height * UntitledGame.config.SCALE
            );
        }
        else if (this.imageType === "Base") {
            let { x, y, width, height } = this.imageRect;

            this.game.context.drawImage(this.game.base_image,
                x, y, width, height,
                (this.game.canvas.width/2 - this.game.player1.x + this.x) * UntitledGame.config.SCALE, 
                (this.game.canvas.height/2 - this.game.player1.y + this.y) * UntitledGame.config.SCALE, 
                width * UntitledGame.config.SCALE, height * UntitledGame.config.SCALE
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
    constructor(game, sourceImageRect, imageType, totalFrame, fps) {
        super(game, sourceImageRect, imageType);

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
class Line extends Sprite {
    constructor(game, sourceImageRect, imageType, totalFrame, fps) {
        super(game, sourceImageRect, imageType);

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
            frameToRender = this.totalFrame - 1;
        }

        this.imageRect = this.frames[frameToRender];
    }
}

class Background {
    constructor(game) {
        this.game = game;
        this.walls = [];
        this.floors = [];
        this.runegeneraters = [];
        this.gates = [];
        this.tnts = [];
        this.passivegeneraters = [];

        const { x, y, width, height } = 
        UntitledGame.spriteDefinition.HORIZON;

        this.addFloor();
        this.addBrokenFloor();
        this.addWall();

        this.addRuneGenerater();
        this.addPassiveGenerater();

        this.addGate();
        this.addTnt();
    }

    render() {
        for (let f of this.floors) {
            f.render();
        }
        for (let r of this.runegeneraters) {
            r.render();
        }

        for (let p of this.passivegeneraters) {
            p.render();
        }

        for (let g of this.gates) {
            g.render();
        }
        for (let t of this.tnts) {
            t.render();
        }

        for (let b of this.game.player1.bullets) {
            if(b.first){
                b.render();
            }
        }
        for (let b of this.game.player2.bullets) {
            if(b.first){
                b.render();
            }
        }

        for (let w of this.walls) {
            w.render();
        }
    }

    update(deltaTime){
        for (let f of this.floors) {
            f.update(deltaTime);
        }

        for (let w of this.walls) {
            w.update(deltaTime);
        }

        for (let r of this.runegeneraters) {
            r.update(deltaTime);
        }

        for (let g of this.gates) {
            g.update(deltaTime);
        }

        for (let t of this.tnts) {
            t.update(deltaTime);
        }
        this.tnts = this.tnts.filter(
            function(t) {
                return t.useful;
            }
        );

        for (let p of this.passivegeneraters) {
            p.update(deltaTime);
        }
    }

    addFloor(){
        var f;
        for(var i = 0;i<8;i++){
           for(var j = 0;j<6;j++){
                f = new FLOOR(this.game); 
                this.floors.push(f);
                f.x = 310 * i; f.y = 310 * j;
            }
        }
    }

    addBrokenFloor(){
        var f;
        for(var i = 0;i<30;i++){
            f = new BROKENFLOOR(this.game); 
            this.floors.push(f);
            f.x = 77.4 * getRandomInt(0,20); f.y = 77.4 * getRandomInt(0,20);
        }
    }

    addWall(){
        var p;
        p = new PILLAR2(this.game); 
        this.walls.push(p);
        p.x = 210; p.y = 727.5;

        p = new PILLARSHADOW(this.game); 
        this.floors.push(p);
        p.x = 211; p.y = 777.5

        p = new PILLAR2(this.game); 
        this.walls.push(p);
        p.x = 210; p.y = 1102.5;

        p = new PILLARSHADOW(this.game); 
        this.floors.push(p);
        p.x = 211; p.y = 1152.5

        p = new PILLAR2(this.game); 
        this.walls.push(p);
        p.x = 2169; p.y = 727.5;

        p = new PILLARSHADOW(this.game); 
        this.floors.push(p);
        p.x = 2170; p.y = 777.5
        
        p = new PILLAR2(this.game); 
        this.walls.push(p);
        p.x = 2169; p.y = 1102.5;

        p = new PILLARSHADOW(this.game); 
        this.floors.push(p);
        p.x = 2170; p.y = 1152.5
        
        var w;
        for(var i = 1;i<25;i++){
            switch(getRandomInt(0,4)){
                case 0 :w = new WALL2(this.game); break;
                case 1 :w = new WALL3(this.game); break;
                case 2 :w = new WALL4(this.game); break;
                case 3 :w = new WALL5(this.game); break;
                case 4 :w = new WALL6(this.game); break;
            }
            this.walls.push(w);
            w.x = -100 + 102.75*i;       w.y = 0;
        }
        for(var i = 1;i<25;i++){
            switch(getRandomInt(0,4)){
                case 0 :w = new WALL2(this.game); break;
                case 1 :w = new WALL3(this.game); break;
                case 2 :w = new WALL4(this.game); break;
                case 3 :w = new WALL5(this.game); break;
                case 4 :w = new WALL6(this.game); break;
            }
            this.walls.push(w);
            w.x = -100 + 102.75*i;       w.y = 1895;
        }
        for(var i = 1;i<21;i++){
            w = new VERTICAL(this.game);
            this.walls.push(w);
            w.x = -12;       w.y = -210 + 102.75*i;
        }

        for(var i = 1;i<7;i++){
            w = new VERTICAL(this.game);
            this.walls.push(w);
            w.x = 658;       w.y = -160 + 102.75*i;
        }
        for(var i = 1;i<7;i++){
            w = new VERTICAL(this.game);
            this.walls.push(w);
            w.x = 658;       w.y = 1150 + 102.75*i;
        }
        for(var i = 1;i<6;i++){
            w = new VERTICAL(this.game);
            this.walls.push(w);
            w.x = 826;       w.y = 160 +102.75*i;
        }
        for(var i = 1;i<6;i++){
            w = new VERTICAL(this.game);
            this.walls.push(w);
            w.x = 826;       w.y = 1000 + 102.75*i;
        }
        for(var i = 1;i<6;i++){
            w = new VERTICAL(this.game);
            this.walls.push(w);
            w.x = 1642;       w.y = 160 + 102.75*i;
        }
        for(var i = 1;i<7;i++){
            w = new VERTICAL(this.game);
            this.walls.push(w);
            w.x = 1810;       w.y = -160 + 102.75*i;
        }

        for(var i = 1;i<5;i++){
            w = new VERTICAL(this.game);
            this.walls.push(w);
            w.x = 1642;       w.y = 1042.75 + 102.75*i;
        }
        for(var i = 1;i<7;i++){
            w = new VERTICAL(this.game);
            this.walls.push(w);
            w.x = 1810;       w.y = 1140 + 102.75*i;
        }

        for(var i = 1;i<5;i++){
            w = new VERTICAL(this.game);
            this.walls.push(w);
            w.x = 1080;       w.y = 550 + 102.75*i;
        }
        for(var i = 1;i<5;i++){
            w = new VERTICAL(this.game);
            this.walls.push(w);
            w.x = 1400;       w.y = 670 + 102.75*i;
        }

        for(var i = 1;i<21;i++){
            w = new VERTICAL(this.game);
            this.walls.push(w);
            w.x = 2468;       w.y = -210 + 102.75*i;
        }
        for(var i = 1;i<3;i++){
            switch(getRandomInt(0,4)){
                case 0 :w = new WALL2(this.game); break;
                case 1 :w = new WALL3(this.game); break;
                case 2 :w = new WALL4(this.game); break;
                case 3 :w = new WALL5(this.game); break;
                case 4 :w = new WALL6(this.game); break;
            }
            this.walls.push(w);
            w.x = 991 + 102.75*i;       w.y = 655;
        }
        for(var i = 1;i<3;i++){
            switch(getRandomInt(0,4)){
                case 0 :w = new WALL2(this.game); break;
                case 1 :w = new WALL3(this.game); break;
                case 2 :w = new WALL4(this.game); break;
                case 3 :w = new WALL5(this.game); break;
                case 4 :w = new WALL6(this.game); break;
            }
            this.walls.push(w);
            w.x = 1091 + 102.75*i;       w.y = 1135; //여기강라ㅜㅏ무ㅏ
        }
        for(var i = 1;i<6;i++){
            switch(getRandomInt(0,4)){
                case 0 :w = new WALL2(this.game); break;
                case 1 :w = new WALL3(this.game); break;
                case 2 :w = new WALL4(this.game); break;
                case 3 :w = new WALL5(this.game); break;
                case 4 :w = new WALL6(this.game); break;
            }
            this.walls.push(w);
            w.x = 210 + 102.75*i;       w.y = 728;
        }
        for(var i = 1;i<6;i++){
            switch(getRandomInt(0,4)){
                case 0 :w = new WALL2(this.game); break;
                case 1 :w = new WALL3(this.game); break;
                case 2 :w = new WALL4(this.game); break;
                case 3 :w = new WALL5(this.game); break;
                case 4 :w = new WALL6(this.game); break;
            }
            this.walls.push(w);
            w.x = 210 + 102.75*i;       w.y = 1102;
        }
        for(var i = 1;i<6;i++){
            switch(getRandomInt(0,4)){
                case 0 :w = new WALL2(this.game); break;
                case 1 :w = new WALL3(this.game); break;
                case 2 :w = new WALL4(this.game); break;
                case 3 :w = new WALL5(this.game); break;
                case 4 :w = new WALL6(this.game); break;
            }
            this.walls.push(w);
            w.x = 1552 + 102.75*i;       w.y = 728;
        }
        for(var i = 1;i<6;i++){
            switch(getRandomInt(0,4)){
                case 0 :w = new WALL2(this.game); break;
                case 1 :w = new WALL3(this.game); break;
                case 2 :w = new WALL4(this.game); break;
                case 3 :w = new WALL5(this.game); break;
                case 4 :w = new WALL6(this.game); break;
            }
            this.walls.push(w);
            w.x = 1552 + 102.75*i;       w.y = 1102;
        }

        for(var i = 1;i<3;i++){
            w = new VERTICAL(this.game);
            this.walls.push(w);
            w.x = 980;       w.y = 50 + 102.75*i;
        }
        for(var i = 1;i<3;i++){
            w = new VERTICAL(this.game);
            this.walls.push(w);
            w.x = 1482;       w.y = 50 + 102.75*i;
        }
        for(var i = 1;i<3;i++){
            w = new VERTICAL(this.game);
            this.walls.push(w);
            w.x = 980;       w.y = 1350 + 102.75*i;
        }
        for(var i = 1;i<3;i++){
            w = new VERTICAL(this.game);
            this.walls.push(w);
            w.x = 1482;       w.y = 1350 + 102.75*i;
        }
    }

    addRuneGenerater() {
        const r1 = new Rune_Generater(this.game);
        const r2 = new Rune_Generater(this.game);
        const r3 = new Rune_Generater(this.game);
        const r4 = new Rune_Generater(this.game);
        this.runegeneraters.push(r1);
        this.runegeneraters.push(r2);
        this.runegeneraters.push(r3);
        this.runegeneraters.push(r4);

        r1.x = 200; r1.y = 200;
        r2.x = 2100; r2.y = 200;
        r3.x = 200; r3.y = 1500;
        r4.x = 2100; r4.y = 1500;
    }

    addGate(x, y) {
        const g1 = new Gate(this.game);
        const g2 = new Gate(this.game);
        this.gates.push(g1);
        this.gates.push(g2);

        g1.x = 1190;     g1.y = 100;    g1.pos = 1;
        g2.x = 1190;     g2.y = 1700;     g2.pos = 2;
    }

    addTnt(x, y) {
        const t1 = new Tnt(this.game);
        const t2 = new Tnt(this.game);
        this.tnts.push(t1);
        this.tnts.push(t2);

        t1.x = 200; t1.y = 860;
        t2.x = 2170; t2.y = 860;
        }

    addPassiveGenerater(){
        const p = new Passive_Generater(this.game);
        this.passivegeneraters.push(p);

        p.x = 1165;
        p.y = 850;
    }
}

class PILLAR1 extends Sprite{
    constructor(game){
        super(game, UntitledGame.spriteDefinition.PILLAR1,"Background");
    }
}
class PILLAR2 extends Sprite{
    constructor(game){
        super(game, UntitledGame.spriteDefinition.PILLAR2,"Background");
    }
}
class PILLARSHADOW extends Sprite{
    constructor(game){
        super(game, UntitledGame.spriteDefinition.PILLAR_SHADOW,"Background");
    }
}
class PILLARSHADOW2 extends Sprite{
    constructor(game){
        super(game, UntitledGame.spriteDefinition.PILLAR_SHADOW2,"Background");
    }
}

class VERTICALSHADOW extends Sprite{
    constructor(game){
        super(game, UntitledGame.spriteDefinition.VERTICAL_SHADOW,"Background");
    }
}

class WALL1 extends Sprite{
    constructor(game){
        super(game, UntitledGame.spriteDefinition.WALL1,"Background");
    }
}
class WALL2 extends Sprite{
    constructor(game){
        super(game, UntitledGame.spriteDefinition.WALL2,"Background");
    }
}
class WALL3 extends Sprite{
    constructor(game){
        super(game, UntitledGame.spriteDefinition.WALL3,"Background");
    }
}
class WALL4 extends Sprite{
    constructor(game){
        super(game, UntitledGame.spriteDefinition.WALL4,"Background");
    }
}
class WALL5 extends Sprite{
    constructor(game){
        super(game, UntitledGame.spriteDefinition.WALL5,"Background");
    }
}
class WALL6 extends Sprite{
    constructor(game){
        super(game, UntitledGame.spriteDefinition.WALL6,"Background");
    }
}
class VERTICAL extends Sprite{
    constructor(game){
        super(game, UntitledGame.spriteDefinition.VERTICAL,"Background");
    }
}

class WALLSHADOW extends Sprite{
    constructor(game){
        super(game, UntitledGame.spriteDefinition.WALL_SHADOW,"Background");
    }
}
class WALLSHADOW2 extends Sprite{
    constructor(game){
        super(game, UntitledGame.spriteDefinition.WALL_SHADOW2,"Background");
    }
}
class FLOOR extends Sprite{
    constructor(game){
        super(game, UntitledGame.spriteDefinition.FLOOR,"Background");
    }
}
class BROKENFLOOR extends Sprite{
    constructor(game){
        super(game, UntitledGame.spriteDefinition.BROKENFLOOR,"Background");
    }
}

class Gate extends GameObject {
    constructor(game) {
        super();
        this.game = game;

        this.sprite = new Sprite(game,
            UntitledGame.spriteDefinition.GATE,"Gate");
        this.disabledTime = 0;
        this.pos = 1;
    }
    render(){
        this.sprite.render();
        this.sprite.x = this.x;
        this.sprite.y = this.y;
    }

    update(deltaTime) {
        if (this.disabledTime > 0){
            this.disabledTime -= deltaTime;
        }
    }
    teleport(obj){
        if(this.pos == 1){
            obj.x = this.game.background.gates[1].x + 50;
            obj.y = this.game.background.gates[1].y + 50;
            this.game.background.gates[1].disabledTime = 2;
        }
        else{
            obj.x = this.game.background.gates[0].x + 50;
            obj.y = this.game.background.gates[0].y + 50;
            this.game.background.gates[0].disabledTime = 2;
        }
    }
}

class Tnt extends GameObject {
    constructor(game) {
        super();
        this.game = game;

        this.sprite = new Sprite(game,
            UntitledGame.spriteDefinition.TNT,"Background");
            
        this.splash = new Line(game,UntitledGame.spriteDefinition.EXPEFFECT,"Effect", 7, 15);

        this.hp = 10;
        this.lifeTime = 0;
        this.useful = true;
    }
    render(){
        this.sprite.render();
        this.sprite.x = this.x;
        this.sprite.y = this.y;
    }

    update(deltaTime) {
        if (this.hp <= 0){
            this.boom(this);
        }
        if(this.lifeTime > 0){
            this.lifeTime += deltaTime;
            if(this.lifeTime > 1){
                this.useful = false;
            }
        }
    }
    boom(obj){
        if(this.lifeTime == 0){
            console.log("x : " + obj.x)
            console.log("y : " + obj.y)

            this.lifeTime = 0.1;
            this.sprite = this.splash;

            let distx = this.game.player1.animation.x - (obj.x + obj.sprite.width/2);
            let disty = this.game.player1.animation.y - (obj.y + obj.sprite.height/2);
            let dist = parseInt((Math.pow(distx,2) + Math.pow(disty,2)) * 0.001);
            if(dist < 5){
                this.game.player1.hp-=5;
                console.log("hp : " + this.game.player1.hp);
            }
            else if(dist < 10){
                this.game.player1.hp-=3;
                console.log("hp : " + this.game.player1.hp);
            }
            else if(dist < 20){
                this.game.player1.hp-=2;
                console.log("hp : " + this.game.player1.hp);
            }
            console.log("dist1 : " + dist)

            let distx2 = this.game.player2.animation.x - (obj.x + obj.sprite.width/2);
            let disty2 = this.game.player2.animation.y - (obj.y + obj.sprite.height/2);
            let dist2 = parseInt((Math.pow(distx2,2) + Math.pow(disty2,2)) * 0.001);
            if(dist < 5){
                this.game.player2.hp-=5;
                console.log("hp : " + this.game.player2.hp);
            }
            else if(dist < 10){
                this.game.player2.hp-=3;
                console.log("hp : " + this.game.player2.hp);
            }
            else if(dist < 20){
                this.game.player2.hp-=2;
                console.log("hp : " + this.game.player2.hp);
            }
            console.log("dist2 : " + dist)
        }
    }
}

class Base extends GameObject{
    constructor(game){
        super();
        this.game = game;

        this.normalBase = new Sprite(game,
            UntitledGame.spriteDefinition.BASE,"Base");
        this.damagedBase = new Sprite(game,
            UntitledGame.spriteDefinition.DAMAGED,"Base");
        this.brokenBase = new Sprite(game,
            UntitledGame.spriteDefinition.BROKEN,"Base");

        this.normalBase2 = new Sprite(game,
            UntitledGame.spriteDefinition.BASE2,"Base");
        this.damagedBase2 = new Sprite(game,
            UntitledGame.spriteDefinition.DAMAGED2,"Base");
        this.brokenBase2 = new Sprite(game,
            UntitledGame.spriteDefinition.BROKEN2,"Base");
        this.sprite = this.normalBase;

        this.state = "normal";

        this.hp = 50;
        this.owner = 1;

        this.range = 2200;
        this.fix = 0;

        this.delay = 0;
    }
    render(){
        this.sprite.render();
        this.sprite.x = this.x;
        this.sprite.y = this.y;
    }
    update(deltaTime){
        if(this.delay > 0){
            this.delay -= deltaTime;
        }
        else{
            if(this.state == "broken"){
                if(this.owner == 1){
                    this.x = 20; this.y = 810;
                }
                else if(this.owner == 2){
                    this.x = 2200; this.y = 820;
                }
                this.distance();
                if(this.fix > 7){
                    this.hp = 50;
                    this.fix = 0;
                }
                this.state = "normal";

                if(this.owner == 1){
                    this.sprite = this.normalBase;
                }
                else if(this.owner == 2){
                    this.sprite = this.normalBase2;
                }
            }
            this.delay = 1;
        }
        if(this.hp > 22){
            this.state = "normal";
            if(this.owner == 1){
                this.x = 100; this.y = 860;
            }
            else if(this.owner == 2){
                this.x = 2270; this.y = 860;
            }
            
            if(this.owner == 1){
                this.sprite = this.normalBase;
            }
            else if(this.owner == 2){
                this.sprite = this.normalBase2;
            }
        }
        else if(this.hp > 0){
            this.state = "damaged";
            if(this.owner == 1){
                this.x = 100; this.y = 860;
            }
            else if(this.owner == 2){
                this.x = 2270; this.y = 860;
            }
            if(this.owner == 1){
                this.sprite = this.damagedBase;
            }
            else if(this.owner == 2){
                this.sprite = this.damagedBase2;
            }
        }
        else if(this.hp <= 0){
            this.state = "broken";
            this.sprite = this.brokenBase;
            if(this.owner == 2){
                this.sprite = this.brokenBase2;
            }
            if(this.owner == 1){
                this.x = 20; this.y = 810;
            }
            else if(this.owner == 2){
                this.x = 2200; this.y = 820;
            }
        }
    }
    distance(){
        if(this.owner == 1){
            let distx = this.game.player1.animation.x - (this.sprite.x + this.sprite.width/2);
            let disty = this.game.player1.animation.y - (this.sprite.y + this.sprite.height/2);
            let dist = parseInt((Math.pow(distx,2) + Math.pow(disty,2)) * 0.1);
            if(dist < this.range){
                this.fix++;
            }
            else{
                this.fix = 0;
            }
        }
        else{
            let distx = this.game.player2.animation.x - (this.sprite.x + this.sprite.width/2);
            let disty = this.game.player2.animation.y - (this.sprite.y + this.sprite.height/2);
            let dist = parseInt((Math.pow(distx,2) + Math.pow(disty,2)) * 0.1);
            if(dist < this.range){
                this.fix++;
            }
            else{
                this.fix = 0;
            }
        }
    }
}

class Rune_Generater extends GameObject {
    constructor(game) {
        super();
        this.game = game;
        this.runes = [];
        this.normal = new Animation(game,
            UntitledGame.spriteDefinition.RUNE_GENERATER,"Background", 1, 2);
        this.generating = new Animation(game,
            UntitledGame.spriteDefinition.RUNE_GENERATING,0, 2, 12);
        this.animation = this.normal;
        const imageRect = UntitledGame.spriteDefinition.RUNE_GENERATING;

        this.sprite = new Sprite(game, new Rect(
            imageRect.x * imageRect.width,
            imageRect.y,
            imageRect.width,
            imageRect.height
        ));
        
        this.runeSpawnTimer = 0;
    }

    render() {
        this.animation.x = this.x;
        this.animation.y = this.y;
        this.animation.render();
        this.sprite.render();
        
        for(let r of this.runes){
            r.render();
        }
    }

    update(deltaTime) {
        this.animation.update(deltaTime);

        this.runeSpawnTimer += deltaTime;
        if(this.runeSpawnTimer > UntitledGame.config.RUNE_RESPAWN){
            this.runeSpawnTimer = 0;
            this.startGenerating();
            this.addRune();
        }
        for(let r of this.runes){
            if(!r.useful){
                this.runeSpawnTimer = 0;
            }
            r.update(deltaTime);
        }
        this.runes = this.runes.filter(
            function(r) {
                return r.useful;
                }
        );
    }

    addRune(){
        this.runes = [];
        const r = new Rune(this.game);
        this.runes.push(r);

        r.x = this.x + this.animation.width/2 + r.animation.width/5 * 2;
        r.y = this.y + this.animation.height/2 + 10;

        this.endGenerating();
    }
    
    startGenerating(){
        this.animation = this.generating;
    }

    endGenerating(){
        this.animation = this.normal;
    }
}

class Passive_Generater extends GameObject {
    constructor(game) {
        super();
        this.game = game;
        this.passives = [];
        this.normal = new Animation(game,
            UntitledGame.spriteDefinition.PASSIVE_GENERATER,"Background", 1, 2);
        this.generating = new Animation(game,
            UntitledGame.spriteDefinition.RUNE_GENERATING,0, 2, 12);
        this.animation = this.normal;
        const imageRect = UntitledGame.spriteDefinition.RUNE_GENERATING;

        this.sprite = new Sprite(game, new Rect(
            imageRect.x * imageRect.width,
            imageRect.y,
            imageRect.width,
            imageRect.height
        ));
        
        this.passiveSpawnTimer = 0;
    }

    render() {
        this.animation.x = this.x;
        this.animation.y = this.y;
        this.animation.render();
        this.sprite.render();
        
        for(let p of this.passives){
            p.render();
        }
    }

    update(deltaTime) {
        this.animation.update(deltaTime);

        this.passiveSpawnTimer += deltaTime;
        if(this.passiveSpawnTimer > UntitledGame.config.PASSIVE_RESPAWN){
            this.passiveSpawnTimer = 0;
            this.startGenerating();
            this.addPassive();
        }
        for(let p of this.passives){
            if(p.useful){
                this.passiveSpawnTimer = 0;
            }
            p.update(deltaTime);
        }
        this.passives = this.passives.filter(
            function(p) {
                return p.useful;
                }
        );
    }

    addPassive(){
        this.passives = [];
        this.game.audioPlay(5);
        const p = new Passive(this.game);
        this.passives.push(p);

        p.x = this.x + this.animation.width/2 + p.animation.width/10 * 3;
        p.y = this.y + this.animation.height/2 + 10;

        this.endGenerating();
    }
    
    startGenerating(){
        this.animation = this.generating;
    }

    endGenerating(){
        this.animation = this.normal;
    }
}

class Rune extends GameObject{
    constructor(game){
        super();
        this.game = game;
        this.useful = true;
        switch(getRandomInt(0,3)){
            case 0 : 
                this.Rune_type1 = new Animation(game,UntitledGame.spriteDefinition.RUNE,"Bullet", 4, 10);
                this.animation = this.Rune_type1;
                this.rune_type = 1;
                this.x += 20;
                this.y += 20;
                break;
            case 1 :  
                this.Rune_type2 = new Animation(game,UntitledGame.spriteDefinition.RUNE2,"Bullet", 12, 10);
                this.animation = this.Rune_type2;
                this.rune_type = 2;
                this.y -= 5;
                break;
            case 2 :  
                this.Rune_type3 = new Animation(game,UntitledGame.spriteDefinition.RUNE3,"Bullet", 16, 10);
                this.animation = this.Rune_type3;
                this.rune_type = 3;
                this.x += 5;
                this.y += 5;
                break;
            case 3 :  
                this.Passive_type3 = new Animation(game,UntitledGame.spriteDefinition.RUNE4,"Bullet", 7, 8);
                this.animation = this.Passive_type3;
                this.rune_type = 4;
                this.x += 5;
                this.y += 5;
                break;
        }
    }
    render(){
        this.animation.x = this.x;
        this.animation.y = this.y;
        this.animation.render();
    }
    update(deltaTime) {
        this.animation.update(deltaTime);
    }
}

class Passive extends GameObject{
    constructor(game){
        super();
        this.game = game;
        this.useful = true;
        switch(getRandomInt(0,3)){
            case 0 : 
                this.Passive_type1 = new Animation(game,UntitledGame.spriteDefinition.PASSIVE1,"Passive", 4, 5);
                this.animation = this.Passive_type1;
                this.passive_type = 1;
                this.x += 20;
                this.y += 20;
                break;
            case 1 :  
                this.Passive_type2 = new Animation(game,UntitledGame.spriteDefinition.PASSIVE2,"Passive", 7, 11);
                this.animation = this.Passive_type2;
                this.passive_type = 2;
                this.y -= 5;
                break;
            case 2 :  
                this.Passive_type3 = new Animation(game,UntitledGame.spriteDefinition.PASSIVE3,"Passive", 7, 5);
                this.animation = this.Passive_type3;
                this.passive_type = 3;
                this.x += 5;
                this.y += 5;
                break;
            case 3 :  
                this.Passive_type4 = new Animation(game,UntitledGame.spriteDefinition.PASSIVE4,"Passive", 7, 5);
                this.animation = this.Passive_type4;
                this.passive_type = 4;
                this.x += 5;
                this.y += 5;
                break;
        }
    }
    render(){
        this.animation.x = this.x;
        this.animation.y = this.y;
        this.animation.render();
    }
    update(deltaTime) {
        this.animation.update(deltaTime);
    }
}

class Shield extends GameObject{
    constructor(game){
        super();
        this.game = game;
        this.normal = new Line(game,
            UntitledGame.spriteDefinition.SHIELD,"Bullet", 6, 30);
        this.animation = this.normal;

        this.useful = true;

        this.owner = 0;
        this.lifeTime = 0;
    }
    render(){
        this.animation.x = this.x;
        this.animation.y = this.y;
        this.animation.render();
    }
    update(deltaTime) {
        this.animation.update(deltaTime);
        if(this.owner == 1){
            this.x = this.game.player2.x - 70;
            this.y = this.game.player2.y - 70;
        }
        if(this.owner == 2){
            this.x = this.game.player1.x - 70;
            this.y = this.game.player1.y - 70;
        }
        this.lifeTime += deltaTime;
        if(this.lifeTime > 0.35){
            this.useful = false;
        }
    }
}

class Bullet extends GameObject{
    constructor(game){
        super();
        this.game = game;
        this.normal = new Sprite(game,
            UntitledGame.spriteDefinition.NORMAL_BULLET,"Bullet");
        this.shotgun = new Line(game,
            UntitledGame.spriteDefinition.SHOTGUN,"Bullet", 2, 3);

        this.up = new Line(game,
            UntitledGame.spriteDefinition.ICEBALL_UP,"Bullet", 3, 2);
        this.right = new Line(game,
            UntitledGame.spriteDefinition.ICEBALL_RIGHT,"Bullet", 3, 2);
        this.down = new Line(game,
            UntitledGame.spriteDefinition.ICEBALL_DOWN,"Bullet", 3, 2);
        this.left = new Line(game,
            UntitledGame.spriteDefinition.ICEBALL_LEFT,"Bullet", 3, 2);

        this.splash = new Line(game,UntitledGame.spriteDefinition.EXPEFFECT,"Effect", 7, 15);
        this.iceSplash = new Animation(game, UntitledGame.spriteDefinition.ICEBALL_EFFECT,"Effect", 6, 15);
        this.lightSplash = new Animation(game, UntitledGame.spriteDefinition.LIGHTEFFECT,"Effect", 4, 15);
        
        this.animation = this.up;
        this.rot = 0;
        this.speed = 12;
        this.lifeTime = 0;
        this.useful = true;

        this.effected = false;
        this.owner = 0;
        this.type = 0; //0 : 기본, 1 : 아이스볼, 2 : 샷건볼

        this.first = true;
    }
    render(){
        this.animation.x = this.x;
        this.animation.y = this.y;
        this.animation.render();
    }
    update(deltaTime) {
        this.animation.update(deltaTime);

        if(this.lifeTime > 0){
            this.lifeTime += deltaTime;
        }

        switch(this.type){
            case 0:
            this.animation = this.normal;
                if(this.rot == 0){
                    this.y -= this.speed;
                }
                else if(this.rot == 1){
                    this.x += this.speed;
                }
                else if(this.rot == 2){
                    this.y += this.speed;
                    this.first = true;
                }
                else if(this.rot == 3){
                    this.x -= this.speed;
                }
                break;
            case 1:
                if(this.rot == 0){
                    this.animation = this.up;
                    this.y -= this.speed;
                }
                else if(this.rot == 1){
                    this.animation = this.right;
                    this.x += this.speed;
                }
                else if(this.rot == 2){
                    this.animation = this.down;
                    this.y += this.speed;
                    this.first = true;
                }
                else if(this.rot == 3){
                    this.animation = this.left;
                    this.x -= this.speed;
                }
                break;

            case 2:
            this.animation = this.shotgun;
                if(this.rot == 0){
                    this.y -= this.speed;
                }
                else if(this.rot == 1){
                    this.x += this.speed;
                }
                else if(this.rot == 2){
                    this.y += this.speed;
                    this.first = true;
                }
                else if(this.rot == 3){
                    this.x -= this.speed;
                }
                else if(this.rot == 4){
                    this.x += this.speed * 0.6;
                    this.y -= this.speed * 0.8;
                    this.first = false;
                }
                else if(this.rot == 5){
                    this.x += this.speed * 0.8;
                    this.y += this.speed * 0.6;
                }
                else if(this.rot == 6){
                    this.x += this.speed * 0.6;
                    this.y += this.speed * 0.8;
                }
                else if(this.rot == 7){
                    this.x -= this.speed * 0.7;
                    this.y += this.speed * 0.5;
                }
                else if(this.rot == 8){
                    this.x -= this.speed * 0.6;
                    this.y -= this.speed * 0.8;
                }
                else if(this.rot == 9){
                    this.x += this.speed * 0.8;
                    this.y -= this.speed * 0.6;
                    this.first = false;
                }
                else if(this.rot == 10){
                    this.x -= this.speed * 0.6;
                    this.y += this.speed * 0.8;
                }
                else if(this.rot == 11){
                    this.x -= this.speed * 0.7;
                    this.y -= this.speed * 0.5;
                    this.first = false;
                }
            break;
            case 3:
            this.animation = this.normal;
                if(this.rot == 0){
                    this.y -= this.speed;
                }
                else if(this.rot == 1){
                    this.x += this.speed;
                }
                else if(this.rot == 2){
                    this.y += this.speed;
                    this.first = true;
                }
                else if(this.rot == 3){
                    this.x -= this.speed;
                }
            break;
        }

        if(this.effected){
            this.effect();
        }

        if((this.type == 0 || this.type == 2 ) && this.lifeTime > 0.7){
            this.useful = false;
        }
        else if(this.type == 1 && this.lifeTime > 0.5){
            this.useful = false;
        }
        else if(this.type == 3 && this.lifeTime > 0.5){
            this.useful = false;
        }
        else if(this.type == 3 && this.lifeTime == 0.1){
            if(this.owner == 1){
                if(this.rot == 0){
                    this.game.player1.x = this.x + 50;
                    this.game.player1.y = this.y + 60;
                }
                else if(this.rot == 1){
                    this.game.player1.x = this.x - 60;
                    this.game.player1.y = this.y + 50;
                }
                else if(this.rot == 2){
                    this.game.player1.x = this.x + 50;
                    this.game.player1.y = this.y - 60;
                }
                else if(this.rot == 3){
                    this.game.player1.x = this.x + 60;
                    this.game.player1.y = this.y + 50;
                }
            }
            else if(this.owner == 2){
                if(this.rot == 0){
                    this.game.player2.x = this.x + 50;
                    this.game.player2.y = this.y + 60;
                }
                else if(this.rot == 1){
                    this.game.player2.x = this.x - 60;
                    this.game.player2.y = this.y + 50;
                }
                else if(this.rot == 2){
                    this.game.player2.x = this.x + 50;
                    this.game.player2.y = this.y - 60;
                }
                else if(this.rot == 3){
                    this.game.player2.x = this.x + 60;
                    this.game.player2.y = this.y + 50;
                }
            }
        }
    }
    effect(){
        switch(this.type)
        {
            case 0: this.animation = this.splash;break;
            case 1: this.animation = this.iceSplash;break;
            case 2: this.animation = this.splash;break;
            case 3: this.animation = this.lightSplash;break;
        }
        this.speed = 0;
        if(this.lifeTime == 0){
            this.lifeTime = 0.1;
        }
    }
}

class Healthbar extends GameObject{
    constructor(game){
        super();
        this.game = game;

        const imageRect = UntitledGame.spriteDefinition.HEALTHBAR;
        this.sprite = new Sprite(game, new Rect(
            imageRect.x * imageRect.width,
            imageRect.y,
            imageRect.width,
            imageRect.height
        ));
    }
    render(){
        let { x, y, width, height } = this.sprite.imageRect;
        this.game.context.drawImage(this.game.UI_image,x, y, width, height,0,665,220,80);
    }
}
class Health extends GameObject{
    constructor(game){
        super();
        this.game = game;

        const imageRect = UntitledGame.spriteDefinition.HEALTH;
        this.sprite = new Sprite(game, new Rect(
            imageRect.x * imageRect.width,
            imageRect.y,
            imageRect.width,
            imageRect.height
        ));

        this.owner = 1;
    }
    render(){
        let { x, y, width, height } = this.sprite.imageRect;
        if(this.owner == 1){
            this.game.context.drawImage(this.game.UI_image,
                x, y, width - (this.game.player1.limithp - this.game.player1.hp) * (200/this.game.player1.limithp * 2),
                 height,5,670,200 - (this.game.player1.limithp - this.game.player1.hp) * (200/this.game.player1.limithp),45);
        }
    }
}
class PassiveSlot extends GameObject{
    constructor(game){
        super();
        this.game = game;

        const imageRect = UntitledGame.spriteDefinition.PASSIVESLOT;
        this.sprite = new Sprite(game, new Rect(
            imageRect.x * imageRect.width,
            imageRect.y,
            imageRect.width,
            imageRect.height
        ));

        this.owner = 1;
    }
    render(){
        let { x, y, width, height } = this.sprite.imageRect;
        this.game.context.drawImage(this.game.UI_image,x, y, width, height,435,620,width - 240,height - 120);
    }
}
class HotSlot extends GameObject{
    constructor(game){
        super();
        this.game = game;

        const imageRect = UntitledGame.spriteDefinition.HOTSLOT;
        this.sprite = new Sprite(game, new Rect(
            imageRect.x * imageRect.width,
            imageRect.y,
            imageRect.width,
            imageRect.height
        ));

        this.owner = 1;
    }
    render(){
        let { x, y, width, height } = this.sprite.imageRect;
        this.game.context.drawImage(this.game.UI_image,x, y, width, height,0,-18,width - 140,height - 85);
    }
}

class NowBullet extends GameObject {
    constructor(game) {
        super();
        this.game = game;
        this.bullet1 = new Sprite(game,UntitledGame.spriteDefinition.BULLET1);
        this.bullet2 = new Sprite(game,UntitledGame.spriteDefinition.BULLET2);
        this.bullet3 = new Sprite(game,UntitledGame.spriteDefinition.BULLET3);
        this.bullet4 = new Sprite(game,UntitledGame.spriteDefinition.BULLET4);
        this.bullet5 = new Sprite(game,UntitledGame.spriteDefinition.BULLET5);
        this.sprite = this.bullet1;
    }
    render(){
        switch(this.game.player1.now_bullet){
            case 0 : this.sprite = this.bullet1; break;
            case 1 : this.sprite = this.bullet2; break;
            case 2 : this.sprite = this.bullet3; break;
            case 3 : this.sprite = this.bullet4; break;
            case 4 : this.sprite = this.bullet5; break;
        }
        var { x, y, width, height } = this.sprite.imageRect;
        this.game.context.drawImage(this.game.UI_image,x, y, width, height,0,0,width,height);
        switch(this.game.player2.now_bullet){
            case 0 : this.sprite = this.bullet1; break;
            case 1 : this.sprite = this.bullet2; break;
            case 2 : this.sprite = this.bullet3; break;
            case 3 : this.sprite = this.bullet4; break;
            case 4 : this.sprite = this.bullet5; break;
        }
        var { x, y, width, height } = this.sprite.imageRect;
        
        this.game.context.font = 'bold 22px 굴림';
        this.game.context.fillStyle = 'white';
        this.game.context.fillText(this.game.bullet_name[this.game.player1.now_bullet], 80, 60);

        
        this.game.context.font = 'bold 22px 굴림';
        this.game.context.fillStyle = 'black';
        if(this.game.player1.inventory[this.game.player1.now_bullet]==0){
            this.game.context.fillText('∞', 82, 31);
        }
        else{
            if(this.game.player1.count[this.game.player1.now_bullet] < 10){
                this.game.context.fillText(this.game.player1.count[this.game.player1.now_bullet], 85, 31);
            }
            else{
                this.game.context.fillText(this.game.player1.count[this.game.player1.now_bullet], 78, 31);
            }
        }
    }
}
class NowPassive extends GameObject {
    constructor(game) {
        super();
        this.game = game;
        this.nowpassive0 = new Sprite(game,UntitledGame.spriteDefinition.NOWPASSIVE0);
        this.nowpassive1 = new Sprite(game,UntitledGame.spriteDefinition.NOWPASSIVE1);
        this.nowpassive2 = new Sprite(game,UntitledGame.spriteDefinition.NOWPASSIVE2);
        this.nowpassive3 = new Sprite(game,UntitledGame.spriteDefinition.NOWPASSIVE3);
        this.nowpassive4 = new Sprite(game,UntitledGame.spriteDefinition.NOWPASSIVE4);
        this.sprite = this.nowpassive0;
    }
    render(){
        this.sprite = this.nowpassive0;
        switch(this.game.player1.now_passive){
            case 1 : this.sprite = this.nowpassive1; break;
            case 2 : this.sprite = this.nowpassive2; break;
            case 3 : this.sprite = this.nowpassive3; break;
            case 4 : this.sprite = this.nowpassive4; break;
        }
        var { x, y, width, height } = this.sprite.imageRect;
        this.game.context.drawImage(this.game.passive_image,x, y, width, height,454,634,width,height);
        this.sprite = this.nowpassive0;
        
        switch(this.game.player2.now_passive){
            case 1 : this.sprite = this.nowpassive1; break;
            case 2 : this.sprite = this.nowpassive2; break;
            case 3 : this.sprite = this.nowpassive3; break;
            case 4 : this.sprite = this.nowpassive4; break;
        }
        var { x, y, width, height } = this.sprite.imageRect;
        
        this.game.context.font = 'bold 28px 맑은고딕';
        this.game.context.fillStyle = 'white';
        this.game.context.fillText(this.game.passive_name[this.game.player1.now_passive], 555, 685);
    }
}

class AudioClip extends GameObject{
    constructor(game,src){
        super();
        var newClip = new Audio(src); 
        this.game = game;
        this.lifeTime = 0;
        this.useful = 0;
        
        newClip.volume = this.game.setting_effect_volume;
        newClip.play();
    }
    update(deltaTime){
        if(this.lifeTime > 0){
            this.lifeTime -= deltaTime;
        }
        else{
            this.useful = false;
        }
    }
}

class Player extends GameObject {
    constructor(game) {
        super();
        this.game = game;
        this.upS = new Animation(game,UntitledGame.spriteDefinition.PLAYERUP,"Player1", 2, 2);
        this.rightS = new Animation(game,UntitledGame.spriteDefinition.PLAYERRIGHT,"Player1",  2, 2);
        this.downS = new Animation(game,UntitledGame.spriteDefinition.PLAYERDOOWN,"Player1",  2, 2);
        this.leftS = new Animation(game,UntitledGame.spriteDefinition.PLAYERLEFT,"Player1",  2, 2);

        this.up = new Animation(game,UntitledGame.spriteDefinition.PLAYERUP,"Player1", 3, 3);
        this.right = new Animation(game,UntitledGame.spriteDefinition.PLAYERRIGHT,"Player1",  3, 3);
        this.down = new Animation(game,UntitledGame.spriteDefinition.PLAYERDOOWN,"Player1",  3, 3);
        this.left = new Animation(game,UntitledGame.spriteDefinition.PLAYERLEFT,"Player1",  3, 3);

        this.upA = new Line(game,UntitledGame.spriteDefinition.PLAYERUP,"Player1", 4, 10);
        this.rightA = new Line(game,UntitledGame.spriteDefinition.PLAYERRIGHT,"Player1",  4, 10);
        this.downA = new Line(game,UntitledGame.spriteDefinition.PLAYERDOOWN,"Player1",  4, 10);
        this.leftA = new Line(game,UntitledGame.spriteDefinition.PLAYERLEFT,"Player1",  4, 10);

        // this.lose = new Animation(game,UntitledGame.spriteDefinition.PLAYER_SPELL,"Player1",  2, 12);
        // this.win = new Animation(game,UntitledGame.spriteDefinition.PLAYER_SPELL,"Player1",  2, 12);
        this.animation = this.up;

        const imageRect = UntitledGame.spriteDefinition.PLAYERUP;
        this.sprite = new Sprite(game, new Rect(
            imageRect.x * imageRect.width,
            imageRect.y,
            imageRect.width,
            imageRect.height
        ));
        this.bulletSpawnTimer = UntitledGame.config.BULLET_RESPAWN;
        this.bullets = [];
        this.shields = [];

        this.speed = 7.5;
        this.hp = 7;
        this.limithp = 7;

        this.up_clear = true;
        this.left_clear = true;
        this.down_clear = true;
        this.right_clear = true;

        this.slowTime = 0;


        this.rot = 1; //0 : 위, 1 : 오른쪽, 2 : 아래, 3 : 왼쪽

        this.now_bullet = 0;            // ====특수 총알 목록=====
                                        //1. 아이스볼 :맞춘상대의 속도를 매우 감소
                                        //      사거리 : 700
                                        //      디버프 시간 : 2초
                                        //      슬로우율 : 30%
                                        //2. 샷건볼 : 3방이 쑥나감 ㅇㅋ?
                                        //      캐릭터가 보고 있는 방향 기준으로 -45°- 22.5° -0° 22.5° 45° 다섯 방향으로 투사체 발사
                                        //      데미지 : 투사체당 3
                                        //      사거리 : 300
                                        //
                                        // =====액티브 목록======
                                        // 1. 상대의 방으로 이동
                                        // 방으로 이동할 때 상대방이 현재 위치하고 있는 장소로 이동
                                        //
                                        // 2. 공격 무효화(실드)
                                        // 지팡이 들고 있을 시 맞는 공격을 무효화 시키며 1개씩 소모
                                        // 발동 시 결계에 막히는 이펙트
        
                                        // =======패시브 목록=======
        this.now_passive = 0;           // 1. 아이템 먹을시 2개 획득
                                        // 2. 체력:15
        this.inventory = [0,1,2,3,4];   // 3. 상대방 처치시 기지 체력 +5
        this.count = [1,3,0,0,2];
        this.player_type = 1;           // 4. 상대 패시브 없앰(1번)
        
        this.delayK = 0;
        this.delayV = 0;
        this.delayWalk = 0;

        this.isdead = false;
        this.respawnTime = 0;

        this.attack = false;
    }

    render() {
        if(!this.isdead){
            this.animation.x = this.x;
            this.animation.y = this.y;
            this.animation.render();
            this.sprite.render();
            
            for (let s of this.shields) {
                s.render();
            }
        }
    }

    update(deltaTime) {
        if(!this.isdead){
            this.animation.update(deltaTime);
            this.collision();
        }

        if(this.slowTime > 0){
                this.slowTime--;
        }
        if(this.count[this.now_bullet] <= 0){
                this.now_bullet = 0;
        }
        if(this.delayK > 0){
                this.delayK -= deltaTime;
        }
        if(this.delayV > 0){
                this.delayV -= deltaTime;
        }
        if(this.delayWalk > 0){
                this.delayWalk -= deltaTime;
        }
        if(this.respawnTime > 0){
            this.respawnTime -= deltaTime;
            if(this.respawnTime < 6){
                if(this.player_type == 1){
                    if(this.x > this.game.base1.sprite.x + 15){
                        this.x-= 15
                    }
                    else if(this.x < this.game.base1.sprite.x - 15){
                        this.x += 15
                    }
                    else{
                        this.x = this.game.base1.sprite.x;
                    }
                    if(this.y > this.game.base1.sprite.y + 15){
                        this.y -= 15
                    }
                    else if(this.y < this.game.base1.sprite.y - 15){
                        this.y += 15
                    }
                    else{
                        this.y = this.game.base1.sprite.y;
                    }
                }
                if(this.player_type == 2){
                    if(this.x > this.game.base2.sprite.x + 15){
                        this.x-= 15
                    }
                    else if(this.x < this.game.base2.sprite.x - 15){
                        this.x += 15
                    }
                    else{
                        this.x = this.game.base2.sprite.x;
                    }
                    if(this.y > this.game.base2.sprite.y + 15){
                        this.y -= 15
                    }
                    else if(this.y < this.game.base2.sprite.y - 15){
                        this.y += 15
                    }
                    else{
                        this.y = this.game.base2.sprite.y;
                    }
                }
            }
        }
        else if(this.isdead){
            this.isdead = false;
            this.hp = 7;
            this.limithp = 7;
        }

        if (this.game.isKeyStay('KeyW') && this.player_type == 1 && !this.isdead) {
            if(this.up_clear){
                if(this.slowTime > 0){
                    this.y -= this.speed * 0.5;
                }
                else{
                    this.y -= this.speed;
                }
                
                if(this.delayWalk <= 0){
                    this.game.audioPlay(4);
                    this.delayWalk = 0.4;
                }
            }
            this.rot = 0
        }
        else if(this.game.isKeyStay('KeyS') && this.player_type == 1 && !this.isdead){
            if(this.down_clear){
                if(this.slowTime > 0){
                    this.y += this.speed * 0.5;
                }
                else{
                    this.y += this.speed;
                }
                if(this.delayWalk <= 0){
                    this.game.audioPlay(4);
                    this.delayWalk = 0.4;
                }
            }
            this.rot = 2
        }
        if(this.game.isKeyStay('KeyA') && this.player_type == 1 && !this.isdead){
            if(this.left_clear){
                if(this.slowTime > 0){
                    this.x -= this.speed * 0.5;
                }
                else if(this.rot == 2 || this.rot == 0){
                    this.x -= this.speed / 1.41;
                }
                else{
                    this.x -= this.speed;
                }
                if(this.delayWalk <= 0){
                    this.game.audioPlay(4);
                    this.delayWalk = 0.4;
                }
            }
            this.rot = 3
        }
        else if(this.game.isKeyStay('KeyD') && this.player_type == 1 && !this.isdead){
            if(this.right_clear){
                if(this.slowTime > 0){
                    this.x += this.speed * 0.5;
                }
                else if(this.rot == 2 || this.rot == 0){
                    this.x += this.speed / 1.41;
                }
                else{
                    this.x += this.speed;
                }
                if(this.delayWalk <= 0){
                    this.game.audioPlay(4);
                    this.delayWalk = 0.4;
                }
            }
            this.rot = 1
        }
        
        if(this.game.isKeyStay('KeyV') && this.player_type == 1 && this.delayV <= 0 && !this.isdead){
            this.now_bullet++
            this.delayV = 0.2;
            while(this.count[this.now_bullet] == 0){
                this.now_bullet++;
                if(this.now_bullet > 4){
                    this.now_bullet = 0;
                    break;
                }
            }
            if(this.now_bullet > 4){
                this.now_bullet = 0;
            }
        }
        
        if(this.game.isKeyStay('Escape') && this.game.delayEsc <= 0){
            if(!this.game.paused){
                screen = "setting";

                this.game.settingBool = true;
                this.game.pause();
                this.game.delayEsc = 0.1;
            }
        }

        this.bulletSpawnTimer += deltaTime;
        
        if(this.slowTime > 0){
        if(this.bulletSpawnTimer > UntitledGame.config.BULLET_RESPAWN * 1.6){
            if(this.game.isKeyStay('KeyC') && this.player_type == 1 && !this.isdead){
                if(this.player_type == 1){
                    this.attack = true;
                }
                switch(this.inventory[this.now_bullet]){
                    case 0: this.game.audioPlay(0);break;
                    case 1: this.game.audioPlay(1);break;
                    case 2: this.game.audioPlay(2);break;
                    case 3: this.game.audioPlay(3);break;
                }
                if(this.inventory[this.now_bullet] >= 0 && this.inventory[this.now_bullet] <= 3){
                    const b = new Bullet(this.game);
                    this.bullets.push(b);
        
                    b.x = this.x - b.animation.width/2;
                    b.y = this.y - b.animation.height/2;

                    b.rot = this.rot;
                    if(this.inventory[this.now_bullet] == 2){
                        const b1 = new Bullet(this.game);
                        const b2 = new Bullet(this.game);
                        this.bullets.push(b1);
                        this.bullets.push(b2);
                        b1.x = this.x - b.animation.width/2;
                        b1.y = this.y - b.animation.height/2
                        b2.x = this.x - b.animation.width/2;
                        b2.y = this.y - b.animation.height/2
                        b1.rot = this.rot + 4;
                        b2.rot = this.rot + 8;
                        b1.type = this.inventory[this.now_bullet];
                        b1.owner = 1;
                        b2.type = this.inventory[this.now_bullet];
                        b2.owner = 1;
                    }
                    
                    b.type = this.inventory[this.now_bullet];
                    if(this.inventory[this.now_bullet] != 0){
                        this.inven_remove(this.inventory[this.now_bullet])
                    }
                    b.owner = 1;

                    this.bulletSpawnTimer = 0;
                }
            }
            else if(this.player_type == 1){
                    this.attack = false;
            }
        }
        }
        else{
            if(this.bulletSpawnTimer > UntitledGame.config.BULLET_RESPAWN){
                if(this.game.isKeyStay('KeyC') && this.player_type == 1 && !this.isdead){
                    if(this.player_type == 1){
                        this.attack = true;
                    }
                    switch(this.inventory[this.now_bullet]){
                        case 0: this.game.audioPlay(0);break;
                        case 1: this.game.audioPlay(1);break;
                        case 2: this.game.audioPlay(2);break;
                        case 3: this.game.audioPlay(3);break;
                    }
                    if(this.inventory[this.now_bullet] >= 0 && this.inventory[this.now_bullet] <= 3){
                        const b = new Bullet(this.game);
                        this.bullets.push(b);
            
                        b.x = this.x - b.animation.width/2;
                        b.y = this.y - b.animation.height/2;
    
                        b.rot = this.rot;
                        if(this.inventory[this.now_bullet] == 2){
                            const b1 = new Bullet(this.game);
                            const b2 = new Bullet(this.game);
                            this.bullets.push(b1);
                            this.bullets.push(b2);
                            b1.x = this.x - b.animation.width/2;
                            b1.y = this.y - b.animation.height/2
                            b2.x = this.x - b.animation.width/2;
                            b2.y = this.y - b.animation.height/2
                            b1.rot = this.rot + 4;
                            b2.rot = this.rot + 8;
                            b1.type = this.inventory[this.now_bullet];
                            b1.owner = 1;
                            b2.type = this.inventory[this.now_bullet];
                            b2.owner = 1;
                        }
                        
                        b.type = this.inventory[this.now_bullet];
                        if(this.inventory[this.now_bullet] != 0){
                            this.inven_remove(this.inventory[this.now_bullet])
                        }
                        b.owner = 1;
    
                        this.bulletSpawnTimer = 0;
                    }
                }
                else if(this.player_type == 1){
                        this.attack = false;
                }
                if(this.game.isKeyStay('Enter') && this.player_type == 2 && !this.isdead){
                    if(this.player_type == 2){
                        this.attack = true;
                    }
                    switch(this.inventory[this.now_bullet]){
                        case 0: this.game.audioPlay(0);break;
                        case 1: this.game.audioPlay(1);break;
                        case 2: this.game.audioPlay(2);break;
                        case 3: this.game.audioPlay(3);break;
                    }
                    if(this.inventory[this.now_bullet] >= 0 && this.inventory[this.now_bullet] <= 3){
                        const b = new Bullet(this.game);
                        this.bullets.push(b);
            
                        b.x = this.x - b.animation.width/2;
                        b.y = this.y - b.animation.height/2;
    
                        b.rot = this.rot;
                        if(this.inventory[this.now_bullet] == 2){
                            const b1 = new Bullet(this.game);
                            const b2 = new Bullet(this.game);
                            this.bullets.push(b1);
                            this.bullets.push(b2);
                            b1.x = this.x - b.animation.width/2;
                            b1.y = this.y - b.animation.height/2
                            b2.x = this.x - b.animation.width/2;
                            b2.y = this.y - b.animation.height/2
                            b1.rot = this.rot + 4;
                            b2.rot = this.rot + 8;
                            b1.type = this.inventory[this.now_bullet];
                            b1.owner = 2;
                            b2.type = this.inventory[this.now_bullet];
                            b2.owner = 2;
                        }
                        
                        b.type = this.inventory[this.now_bullet];
                        if(this.inventory[this.now_bullet] != 0){
                            this.inven_remove(this.inventory[this.now_bullet])
                        }
                        b.owner = 2;
    
                        this.bulletSpawnTimer = 0;
                    }
                }
                else if(this.player_type == 2){
                        this.attack = false;
                }
            }
        }
        
        if(this.attack){
            if (this.rot == 0){
                this.animation = this.upA;
            }
            else if(this.rot == 1){
                this.animation = this.rightA;
            }
            else if(this.rot == 2){
                this.animation = this.downA;
            }
            else if(this.rot == 3){
                this.animation = this.leftA;
            }
            else{
                this.animation = this.upA;
            }
        }
        else{
            if (this.rot == 0){
                this.animation = this.up;
            }
            else if(this.rot == 1){
                this.animation = this.right;
            }
            else if(this.rot == 2){
                this.animation = this.down;
            }
            else if(this.rot == 3){
                this.animation = this.left;
            }
            else{
                this.animation = this.up;
            }
        }
        
        for (let b of this.bullets) {
            b.update(deltaTime);
        }
        this.bullets = this.bullets.filter(
            function(b) {
                return b.useful;
            }
        );
        for (let s of this.shields) {
            s.update(deltaTime);
        }
        this.shields = this.shields.filter(
            function(s) {
                return s.useful;
            }
        );
    }

    Slow(){
        this.slowTime = 160;
        this.game.audioPlay(6);
    }

    inven_remove(item){
        this.count[item]--;
    }

    collision(){
        for(let obj of this.game.player1.bullets){
            if((this.x + this.sprite.width - 70 > obj.x + 10 && this.x - 10 < obj.x + obj.animation.imageRect.width - 10)
            && (this.y + this.sprite.height - 80 > obj.y + 10 && this.y - 10 < obj.y + obj.animation.imageRect.height - 10)){
                if(this.player_type != obj.owner && obj.lifeTime == 0){

                    if(this.inventory[this.now_bullet] != 4){
                        switch(obj.type){
                            case 0: this.hp--;obj.effected = true; this.game.audioPlay(7);break;
                            case 1: this.hp-=1;this.Slow();obj.effected = true;break;
                            case 2: this.hp-=2;obj.effected = true; this.game.audioPlay(7);break;
                            case 3: this.hp-=1;obj.effected = true;break;
                        }
                        if(this.hp <= 0){
                            if(this.game.player1.now_passive == 4){
                                this.game.base1.hp = 50;
                            }
                            if(this.game.base2.hp > 0){
                                this.dead();
                            }
                            else{
                                this.gameover(1);
                            }
                        }
                    }
                    else{
                        this.count[4]--;
                        const s = new Shield(this.game);
                        this.shields.push(s);
            
                        s.x = this.x;
                        s.y = this.y;
                        s.owner = 1;
                        obj.useful = false;
                    }
                }
            }
        }
        for(let obj of this.game.player2.bullets){
            if((this.x + this.sprite.width - 70 > obj.x + 10 && this.x - 10 < obj.x + obj.animation.imageRect.width - 10)
            && (this.y + this.sprite.height - 80 > obj.y + 10 && this.y - 10 < obj.y + obj.animation.imageRect.height - 10)){
                if(this.player_type != obj.owner && obj.lifeTime == 0){

                    if(this.inventory[this.now_bullet] != 4){
                        switch(obj.type){
                            case 0: this.hp--;obj.effected = true; this.game.audioPlay(7);break;
                            case 1: this.hp-=1;this.Slow();obj.effected = true;break;
                            case 2: this.hp-=2;obj.effected = true; this.game.audioPlay(7);break;
                            case 3: this.hp-=1;obj.effected = true; break;
                        }
                        if(this.hp <= 0){
                            if(this.game.player2.now_passive == 4){
                                this.game.base2.hp = 50;
                            }
                            if(this.game.base1.hp > 0){
                                this.dead();
                            }
                            else{
                                this.gameover(2);
                            }
                        }
                    }
                    else{
                        this.count[4]--;
                        const s = new Shield(this.game);
                        this.shields.push(s);
            
                        s.x = this.x;
                        s.y = this.y;
                        s.owner = 2;
                        obj.useful = false;
                    }
                }
            }
        }

        for(let obj of this.game.player1.bullets){
            if((this.game.base2.sprite.x + this.game.base2.sprite.width > obj.x && this.game.base2.sprite.x < obj.x + obj.animation.imageRect.width)
            && (this.game.base2.sprite.y + this.game.base2.sprite.height > obj.y + 20 && this.game.base2.sprite.y < obj.y + obj.animation.imageRect.height)){
                if(obj.lifeTime == 0 && this.game.base2.hp > 0){
                    this.game.base2.hp--;
                    obj.effected = true;
                }
            }
        }
        for(let obj of this.game.player2.bullets){
            if((this.game.base1.sprite.x + this.game.base1.sprite.width > obj.x && this.game.base1.sprite.x < obj.x + obj.animation.imageRect.width)
            && (this.game.base1.sprite.y + this.game.base1.sprite.height > obj.y + 20 && this.game.base1.sprite.y < obj.y + obj.animation.imageRect.height)){
                if(obj.lifeTime == 0 && this.game.base1.hp > 0){
                    this.game.base1.hp--;
                    obj.effected = true;
                }
            }
        }
        
        
        for(let obj of this.game.player1.bullets){
            for(let obj2 of this.game.background.tnts){
                if((obj2.sprite.x + obj2.sprite.width - 10 > obj.x && obj2.sprite.x + 10 < obj.x + obj.animation.imageRect.width)
                && (obj2.sprite.y + obj2.sprite.height - 10 > obj.y && obj2.sprite.y + 50 < obj.y + obj.animation.imageRect.height)){
                    if(obj.lifeTime == 0 && obj2.hp > 0){
                        obj2.hp--;
                        obj.effected = true;
                    }
                }
            }
        }

        for(let obj of this.game.player2.bullets){
            for(let obj2 of this.game.background.tnts){
                if((obj2.sprite.x + obj2.sprite.width > obj.x && obj2.sprite.x < obj.x + obj.animation.imageRect.width)
                && (obj2.sprite.y + obj2.sprite.height > obj.y && obj2.sprite.y + 50 < obj.y + obj.animation.imageRect.height)){
                    if(obj.lifeTime == 0 && obj2.hp > 0){
                        obj2.hp--;
                        obj.effected = true;
                    }
                }
            }
        }



        for(let obj of this.game.background.gates){
            if((this.x + this.sprite.width > obj.x + 80 && this.x < obj.x + obj.sprite.width)
            && (this.y + this.sprite.height > obj.y + 80 && this.y < obj.y + obj.sprite.height - 10)){
                if(obj.disabledTime <= 0){
                    obj.teleport(this);
                }
            }
        }

        this.up_clear = true;
        this.left_clear = true;
        this.down_clear = true;
        this.right_clear = true;
        for(let obj of this.game.background.walls){
            if((this.x - 40> obj.x && this.x - 40< obj.x + obj.imageRect.width)
            && (this.y + this.sprite.height - 50> obj.y  && this.y - 30 < obj.y + obj.imageRect.height)){
                this.left_clear = false;
            }
            if((this.x + this.sprite.width - 40 > obj.x && this.x + this.sprite.width - 40 < obj.x + obj.imageRect.width)
            && (this.y + this.sprite.height - 50 > obj.y && this.y - 30 < obj.y + obj.imageRect.height)){
                this.right_clear = false;
            }
            if((this.x + this.sprite.width - 50> obj.x && this.x - 30 < obj.x + obj.imageRect.width)
            && (this.y - 40 > obj.y && this.y - 40 < obj.y + obj.imageRect.height)){
                this.up_clear = false;
            }
            if((this.x + this.sprite.width - 50 > obj.x && this.x - 30 < obj.x + obj.imageRect.width)
            && (this.y + this.sprite.height - 40 > obj.y && this.y + this.sprite.height - 40 < obj.y + obj.imageRect.height)){
                this.down_clear = false;
            }
        }
        
        for(let obj of this.game.background.tnts){
            if(obj.hp > 0){
                if((this.x - 40 > obj.x + 40 && this.x - 40 < obj.x + obj.sprite.width - 20)
                && (this.y + this.sprite.height - 50> obj.y + 50 && this.y - 30 < obj.y + obj.sprite.height - 10)){
                    this.left_clear = false;
                }
                if((this.x + this.sprite.width - 40 > obj.x + 40 && this.x + this.sprite.width - 40 < obj.x + obj.sprite.width - 20)
                && (this.y + this.sprite.height - 50 > obj.y + 50 && this.y - 30 < obj.y + obj.sprite.height - 10)){
                    this.right_clear = false;
                }
                if((this.x + this.sprite.width - 50> obj.x + 40 && this.x - 30 < obj.x + obj.sprite.width - 20)
                && (this.y - 40 > obj.y + 50 && this.y - 40 < obj.y + obj.sprite.height - 10)){
                    this.up_clear = false;
                }
                if((this.x + this.sprite.width - 50 > obj.x + 40 && this.x - 30 < obj.x + obj.sprite.width - 20)
                && (this.y + this.sprite.height - 40 > obj.y + 50 && this.y + this.sprite.height - 40 < obj.y + obj.sprite.height - 10)){
                    this.down_clear = false;
                }
            }
        }

        for(let obj_b of this.game.player1.bullets){
            for(let obj of this.game.background.walls){
                if((obj.x + obj.imageRect.width - 2> obj_b.x && obj.x - 2 < obj_b.x + obj_b.animation.imageRect.width)
                && (obj.y + obj.imageRect.height - 20 > obj_b.y && obj.y < obj_b.y + obj_b.animation.imageRect.height)){
                    if(obj_b.lifeTime == 0){
                        if(obj_b.rot == 0){
                            obj_b.first = false;
                        }
                        else if(obj_b.rot == 1){
                            obj_b.first = false;
                        }
                        else if(obj_b.rot == 2){
                            obj_b.first = true;
                        }
                        else if(obj_b.rot == 3){
                            obj_b.first = false;
                        }
                        obj_b.effected = true;
                    }
                }
            }
        }
        for(let obj_b of this.game.player2.bullets){
            for(let obj of this.game.background.walls){
                if((obj.x + obj.imageRect.width - 2 > obj_b.x && obj.x - 2 < obj_b.x + obj_b.animation.imageRect.width)
                && (obj.y + obj.imageRect.height - 20 > obj_b.y && obj.y < obj_b.y + obj_b.animation.imageRect.height)){
                    if(obj_b.lifeTime == 0){
                        if(obj_b.rot == 0){
                            obj_b.first = false;
                        }
                        else if(obj_b.rot == 1){
                            obj_b.first = false;
                        }
                        else if(obj_b.rot == 2){
                            obj_b.first = true;
                        }
                        else if(obj_b.rot == 3){
                            obj_b.first = false;
                        }
                        obj_b.effected = true;
                    }
                }
            }
        }

        for(let obj of this.game.background.runegeneraters){
            for(let obj_r of obj.runes){
                if((this.x + this.sprite.width > obj_r.x + 70 && this.x < obj_r.x + obj_r.animation.imageRect.width - 10)
                && (this.y + this.sprite.height > obj_r.y + 90 && this.y < obj_r.y + obj_r.animation.imageRect.height + 20)){
                    let i;
                    for(i=0;i<5;i++){
                        if(this.inventory[i] == obj_r.rune_type){
                            if(this.now_passive == 1){
                                this.count[i] += getRandomInt(1,2) * 2;
                            }
                            else{
                                this.count[i] += getRandomInt(1,2);
                            }
                            break;
                        }
                        else if(i == 4){
                            this.inventory.push(obj_r.rune_type);
                            this.count.push(1);
                        }
                    }
                    obj_r.useful = false;
                }
            }
        }
        
        for(let obj of this.game.background.passivegeneraters){
            for(let obj_r of obj.passives){
                if((this.x + this.sprite.width > obj_r.x + 80 && this.x < obj_r.x + obj_r.animation.imageRect.width)
                && (this.y + this.sprite.height > obj_r.y + 80 && this.y < obj_r.y + obj_r.animation.imageRect.height)){
                    switch(obj_r.passive_type){
                        case 1: this.now_passive = obj_r.passive_type; 
                            this.game.player2.limithp = 7;
                            if(this.game.player2.hp > 7){
                                this.game.player2.hp = 7;
                            }
                            break;
                        case 2: this.now_passive = obj_r.passive_type;
                            this.limithp = 12; 
                            this.hp += 5; 
                            if(this.hp > 12){
                                this.hp = 12;
                            }
                            break;
                        case 3: 
                            if(this.player_type == 1){
                                if(this.game.player2.now_passive == 2){
                                    this.game.player2.limithp = 7;
                                    if(this.game.player2.hp > 7){
                                        this.game.player2.hp = 7;
                                    }
                                }
                                this.game.player2.now_passive = obj_r.passive_type;
                            }
                            else{
                                if(this.game.player1.now_passive == 2){
                                    this.game.player1.limithp = 7;
                                    if(this.game.player1.hp > 7){
                                        this.game.player1.hp = 7;
                                    }
                                }
                                this.game.player1.now_passive = obj_r.passive_type;
                            }
                            break;
                        case 4: this.now_passive = obj_r.passive_type;
                        this.game.player2.limithp = 7;
                        if(this.game.player2.hp > 7){
                            this.game.player2.hp = 7;
                        } break;
                    }
                    obj.passives = [];
                }
            }
        }
    }
    dead(){
        this.isdead = true;
        this.respawnTime = 8;
        this.count = [1,3,0,0,2];
    }

    gameover(winner){
        winner_ = winner;
        game.canControl = false;
        function start(counter){
            if(counter < 25){
                setTimeout(function(){
                    counter++;
                    game.context.translate(-320 * 0.01,-360 * 0.01);
                    game.context.scale(1.01,1.01);
                    start(counter);
                }, 30);
            }
            else if(counter < 28){
                setTimeout(function(){
                    counter++;
                    start(counter);
                },60);
            }
            else if(counter == 28){
                counter++;
                game.winner_screen = true;
            }
        }
        start(0);
    }
 }

class UntitledGame {
    constructor(canvasElement) {
        this.canvas = canvasElement;
        this.context = canvasElement.getContext('2d');

        this.setting_bgm_volume = 0.3;
        this.setting_effect_volume = 0.3;

        this.image = new Image();
        this.image.src = 'Resources/100-offline-sprite.png';
        this.bullet_image = new Image();
        this.bullet_image.src = 'Resources/Bullets.png';
        this.effect_image = new Image();
        this.effect_image.src = 'Resources/Effects.png';
        this.passive_image = new Image();
        this.passive_image.src = 'Resources/Passives.png';

        this.back_image = new Image();
        this.back_image.src = 'Resources/Backgrounds.png';
        this.base_image = new Image();
        this.base_image.src = 'Resources/Base.png';
        this.UI_image = new Image();
        this.UI_image.src = 'Resources/UIs.png';
        this.Setting = new Image();
        this.Setting.src = 'Resources/Setting.png';
        this.Lose = new Image();
        this.Lose.src = 'Resources/Loser.png';
        this.Win = new Image();
        this.Win.src = 'Resources/Winner.png';
        this.Player_image = new Image();
        this.Player_image.src = 'Resources/Player.png';
        this.Player2_image = new Image();
        this.Player2_image.src = 'Resources/Player2.png';

        this.gateImage = new Image();
        this.gateImage.src = 'Resources/Stair.png';

        this.settingBool = false;

        this.healthbar1 = new Healthbar(this);
        this.healthbar2 = new Healthbar(this);

        this.health1 = new Health(this);
        this.health2 = new Health(this);

        this.health2.owner = 2;

        this.passiveSlot1 = new PassiveSlot(this);
        this.passiveSlot2 = new PassiveSlot(this);
        this.passiveSlot2.owner = 2;

        this.hotSlot1 = new HotSlot(this);
        this.hotSlot2 = new HotSlot(this);

        this.nowbullet = new NowBullet(this);
        this.nowpassive = new NowPassive(this);

        this.players = [];
        

        this.background = new Background(this);
        this.sounds = [];
        this.walls2 = [];
        this.bases = [];
        this.stayKeys = {};

        this.delayEsc = 0;
        this.bullet_name = ["Bullet","Iceball","Shotgun","Teleport","Shield"];
        this.passive_name = [" ","더블","강화","삭제","재생"];

        var w2;
        for(var i = 1;i<25;i++){
            switch(getRandomInt(0,4)){
                case 0 :w2 = new WALL2(this); break;
                case 1 :w2 = new WALL3(this); break;
                case 2 :w2 = new WALL4(this); break;
                case 3 :w2 = new WALL5(this); break;
                case 4 :w2 = new WALL6(this); break;
            }
            this.walls2.push(w2);
            w2.x =-101.5 + 102.75 * i;       w2.y = -50;
        }
        for(var i = 1;i<25;i++){
            switch(getRandomInt(0,4)){
                case 0 :w2 = new WALL2(this); break;
                case 1 :w2 = new WALL3(this); break;
                case 2 :w2 = new WALL4(this); break;
                case 3 :w2 = new WALL5(this); break;
                case 4 :w2 = new WALL6(this); break;
            }
            this.walls2.push(w2);
            w2.x =-101.5 + 102.75 * i;       w2.y = 1850;
        }
        for(var i = 1;i<25;i++){
            w2 = new WALL1(this); 
            this.walls2.push(w2);
            w2.x = -101.5 + 102.75 * i;  w2.y = -150;
        }
        for(var i = 1;i<25;i++){
            w2 = new WALL1(this); 
            this.walls2.push(w2);
            w2.x = -101.5 + 102.75 * i;  w2.y = 1750;
        }
        

        //여기
        for(var i = 1;i<6;i++){
            w2 = new WALL1(this); 
            this.walls2.push(w2);
            w2.x = 210 + 102.75 * i;  w2.y = 625;
        }
        for(var i = 1;i<6;i++){
            w2 = new WALL1(this); 
            this.walls2.push(w2);
            w2.x = 210 + 102.75 * i;  w2.y = 1000;
        }
        for(var i = 1;i<6;i++){
            w2 = new WALL1(this); 
            this.walls2.push(w2);
            w2.x = 1552 + 102.75 * i;  w2.y = 625;
        }
        for(var i = 1;i<6;i++){
            w2 = new WALL1(this); 
            this.walls2.push(w2);
            w2.x = 1552 + 102.75 * i;  w2.y = 1000;
        }

        for(var i = 1;i<3;i++){
            w2 = new WALL1(this); 
            this.walls2.push(w2);
            w2.x = 991 + 102.75*i;       w2.y = 555;
        }
        for(var i = 1;i<3;i++){
            w2 = new WALL1(this); 
            this.walls2.push(w2);
            w2.x = 1091 + 102.75*i;       w2.y = 1035;
        }
        
        w2 = new VERTICAL(this);
        this.walls2.push(w2);
        w2.x = 826;       w2.y = 1043;

        w2 = new VERTICAL(this);
        this.walls2.push(w2);
        w2.x = 1080;       w2.y = 598

        w2 = new VERTICAL(this);
        this.walls2.push(w2);
        w2.x = 1642;       w2.y = 1042.75;
        
        w2 = new VERTICAL(this);
        this.walls2.push(w2);
        w2.x = 1810;       w2.y = -100;
        w2 = new VERTICAL(this);
        this.walls2.push(w2);
        w2.x = 658;       w2.y = -100;

        var p2;
        p2 = new PILLAR1(this); 
        this.walls2.push(p2);
        p2.x = 210; p2.y = 625
        p2 = new PILLAR1(this); 
        this.walls2.push(p2);
        p2.x = 210; p2.y = 1000;
        p2 = new PILLAR1(this); 
        this.walls2.push(p2);
        p2.x = 2169; p2.y = 625
        p2 = new PILLAR1(this); 
        this.walls2.push(p2);
        p2.x = 2169; p2.y = 1000;
        
        this.base1 = new Base(this);
        this.base2 = new Base(this);
        this.bases.push(this.base1);
        this.bases.push(this.base2);
        this.base2.owner = 2;
        this.base1.x = 100; this.base1.y = 860;
        this.base2.x = 2270; this.base2.y = 860;

        this.paused = false;
        this.canControl = true;
        this.canUse = true;
        this.backSound = true;
        this.updatePending = false;
        this.winner_screen = false;

        window.addEventListener('blur', this.onVisibilityChange.bind(this));
        window.addEventListener('focus', this.onVisibilityChange.bind(this));
        document.addEventListener('visibilitychange', this.onVisibilityChange.bind(this));
        window.addEventListener('keydown', this.onKeyDown.bind(this));
        window.addEventListener('keyup', this.onKeyUp.bind(this));
    }
    
    pause() {
        this.paused = true;
        //cancelAnimationFrame(this.raqId);
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

    play() {
        this.paused = false;
        this.time = performance.now();
        this.scheduleNextUpdate();
    }

    render() {
        this.background.render();
        for(let b of this.bases){
            b.render();
        }
        this.player1.render();
        this.player2.render();

        for (let w2 of this.walls2) {
            w2.render();
        }

        for (let b of this.player1.bullets) {
            if(!b.first){
                b.render();
            }
        }
        for (let b of this.player2.bullets) {
            if(!b.first){
                b.render();
            }
        }

        this.healthbar1.render();
        this.healthbar2.render();
        this.health1.render();
        this.health2.render();
        this.passiveSlot1.render();
        this.passiveSlot2.render();
        this.hotSlot1.render();
        this.hotSlot2.render();
        this.nowbullet.render();
        this.nowpassive.render();


        if(this.settingBool){
            game.context.drawImage(Setting,0,0,1100,820,200,50,990,620);
            
            game.context.drawImage(bar,(1 - game.setting_bgm_volume) * 500,0,750,80,540 + 430 * (1 - game.setting_bgm_volume),219,645,60);
            game.context.drawImage(bar,(1 - game.setting_effect_volume) * 500,0,750,80,540 + 428 * (1 - game.setting_effect_volume),335.5,645,60);
        }

        if(this.winner_screen){
            if(winner_ == 1){
                game.context.drawImage(this.Win,78,100,500,500);
            }
            else{
                game.context.drawImage(this.Lose,78,100,500,500);
            }
            screen = "Gameover"
        }
    }

    update(deltaTime) {
        this.background.update(deltaTime);
        this.player1.update(deltaTime);
        this.player2.update(deltaTime);

        if(this.delayEsc > 0){
            this.delayEsc -= deltaTime;
        }

        for(let b of this.bases){
            b.update(deltaTime);
        }

        for (let w2 of this.walls2) {
            w2.update(deltaTime);
        }
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

        socket.emit("update", {
            x: game.player1.x,
            y: game.player1.y,
            roomname: roomname
        })
    }

    scheduleNextUpdate() {
        if (!this.updatePending && !this.paused) {
            this.updatePending = true;
            this.raqId = requestAnimationFrame(this.run.bind(this));
        }
    }

    clearCanvas() {
        this.context.fillStyle="#EAEAEA";
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
}

UntitledGame.spriteDefinition = {
    PLAYERUP: new Rect(0,0,86.5,86.5),
    PLAYERRIGHT: new Rect(0,86.5,86.5,86.5),
    PLAYERDOOWN: new Rect(0,173,86.5,86.5),
    PLAYERLEFT: new Rect(0,259.5,86.5,86.5),

    HORIZON: new Rect(332, 2, 25, 50),
    PILLAR1: new Rect(0, 0, 103.75, 103.75),
    PILLAR2: new Rect(207, 0, 102.75, 52),
    PILLAR3: new Rect(259, 0, 102.75, 52),
    PILLAR_SHADOW: new Rect(519, 207.5, 103, 103),
    PILLAR_SHADOW2: new Rect(519, 515.5, 120, 120),
    WALL1: new Rect(103.25, 0, 103.75, 103.75),
    WALL2: new Rect(310.75, 0, 103.75, 51.375),
    WALL3: new Rect(414, 0, 103.75, 51.375),
    WALL4: new Rect(519.75, 0, 103, 51.375),
    WALL5: new Rect(310.75, 51.375, 103.75, 51.375),
    WALL6: new Rect(414, 51.375, 103.75, 51.375),
    VERTICAL: new Rect(922, 0, 15, 102.75),

    WALL_SHADOW: new Rect(517.75, 103.75, 105, 103),
    WALL_SHADOW2: new Rect(517.75, 311.25, 105, 103),
    VERTICAL_SHADOW: new Rect(517.75, 420.25, 80, 50),
    FLOOR: new Rect(0, 104, 311, 312),
    BROKENFLOOR: new Rect(311, 335, 115, 90),
    TNT: new Rect(661, 295, 73, 98),

    RUNE_GENERATER: new Rect(311.25, 103.75, 160, 160),
    PASSIVE_GENERATER: new Rect(651.25, 103.75, 160, 160),
    RUNE_GENERATING: new Rect(332, 2, 25, 50),
    RUNE: new Rect(0, 0, 72.5, 72),
    RUNE2: new Rect(0, 69, 73.5, 72),
    RUNE3: new Rect(0, 145, 73.5, 72),
    RUNE4: new Rect(0, 217.5, 75, 72),
    PASSIVE1: new Rect(5, 0, 73.57, 73),
    PASSIVE2: new Rect(5, 73, 73.57, 73),
    PASSIVE3: new Rect(5, 146, 73.57, 73),
    PASSIVE4: new Rect(5, 219.5, 73.57, 73),

    NORMAL_BULLET: new Rect(0, 663, 72.5, 80),
    SHOTGUN: new Rect(0, 590.5, 72.5, 80),
    ICEBALL_UP: new Rect(0, 520, 72.5, 80),
    ICEBALL_RIGHT: new Rect(220, 520, 72.5, 80),
    ICEBALL_DOWN: new Rect(440, 520, 72.5, 80),
    ICEBALL_LEFT: new Rect(660, 520, 72.5, 80),
    SHIELD: new Rect(0, 358, 140, 140),

    ICEBALL_EFFECT: new Rect(30, 190, 168, 130),
    EXPEFFECT: new Rect(30,40,168,150),
    LIGHTEFFECT: new Rect(45,318,75,50),

    HEALTH: new Rect(0.07, 180, 380, 90),
    HEALTHBAR: new Rect(0.05, 30, 410, 150),
    HOTSLOT: new Rect(0.65, 500, 390, 220),
    PASSIVESLOT: new Rect(0.55, 280, 455, 220),
    BULLET1: new Rect(420, 10, 72.5, 72.5),
    BULLET2: new Rect(495, 10, 72.5, 72.5),
    BULLET3: new Rect(422, 81, 72.5, 72.5),
    BULLET4: new Rect(492.5, 80, 72.5, 72.5),
    BULLET5: new Rect(420, 155, 72.5, 72.5),
    NOWPASSIVE0: new Rect(0, 0, 0, 0),
    NOWPASSIVE1: new Rect(0, 292, 76, 75.5),
    NOWPASSIVE2: new Rect(0, 367.5, 76, 75.5),
    NOWPASSIVE3: new Rect(0, 443, 76, 75.5),
    NOWPASSIVE4: new Rect(0, 518.5, 76, 75.5),

    BASE: new Rect(0, 0, 111, 110),
    DAMAGED: new Rect(111, 0, 111, 110),
    BROKEN: new Rect(222, 0, 260, 260),
    BASE2: new Rect(0, 111, 111, 110),
    DAMAGED2: new Rect(111, 111, 111, 110),
    BROKEN2: new Rect(502, 0, 260, 260),

    GATE: new Rect(0, 0, 130, 150)
}

UntitledGame.config = {
    RUNE_RESPAWN : 8,
    PASSIVE_RESPAWN : 15,
    BULLET_RESPAWN : 0.3,
    DISABLE_GATE_TIME : 2,
    SCALE : 1.2
}

let gameCanvas = document.getElementById('game');
let game = new UntitledGame(gameCanvas);
console.log(gameCanvas.width);
console.log(gameCanvas.height);

var bar = new Image();
var winner_ = 1
bar.src = "Resources/Soundbar.png";



var socket = io.connect('/');
let copyedUserObjects

socket.on('matching', (event) => { //매칭 됨
    clearInterval(matching);
    console.log('로딩중');
    roomname = event.roomname
    if (event.player === 1) {
        game.player1 = new Player(game);
        game.players.push(game.player1);

        game.player1.x = 100;
        game.player1.y = 940;

        game.player1.upS = new Animation(game,UntitledGame.spriteDefinition.PLAYERUP,"Player1", 1, 1);
        game.player1.rightS = new Animation(game,UntitledGame.spriteDefinition.PLAYERRIGHT,"Player1",  1, 1);
        game.player1.downS = new Animation(game,UntitledGame.spriteDefinition.PLAYERDOOWN,"Player1",  1, 1);
        game.player1.leftS = new Animation(game,UntitledGame.spriteDefinition.PLAYERLEFT,"Player1",  1, 1);

        game.player1.up = new Animation(game,UntitledGame.spriteDefinition.PLAYERUP,"Player1", 1, 2);
        game.player1.right = new Animation(game,UntitledGame.spriteDefinition.PLAYERRIGHT,"Player1",  1, 2);
        game.player1.down = new Animation(game,UntitledGame.spriteDefinition.PLAYERDOOWN,"Player1",  1, 2);
        game.player1.left = new Animation(game,UntitledGame.spriteDefinition.PLAYERLEFT,"Player1",  1, 2);

        game.player1.upA = new Line(game,UntitledGame.spriteDefinition.PLAYERUP,"Player1", 4, 10);
        game.player1.rightA = new Line(game,UntitledGame.spriteDefinition.PLAYERRIGHT,"Player1",  4, 10);
        game.player1.downA = new Line(game,UntitledGame.spriteDefinition.PLAYERDOOWN,"Player1",  4, 10);
        game.player1.leftA = new Line(game,UntitledGame.spriteDefinition.PLAYERLEFT,"Player1",  4, 10);
        game.player1.rot = 1
    }
    else {
        game.player2 = new Player(game);
        game.players.push(game.player2);

        game.player2.upS = new Animation(game,UntitledGame.spriteDefinition.PLAYERUP,"Player2", 1, 1);
        game.player2.rightS = new Animation(game,UntitledGame.spriteDefinition.PLAYERRIGHT,"Player2",  1, 1);
        game.player2.downS = new Animation(game,UntitledGame.spriteDefinition.PLAYERDOOWN,"Player2",  1, 1);
        game.player2.leftS = new Animation(game,UntitledGame.spriteDefinition.PLAYERLEFT,"Player2",  1, 1);

        game.player2.up = new Animation(game,UntitledGame.spriteDefinition.PLAYERUP,"Player2", 1, 2);
        game.player2.right = new Animation(game,UntitledGame.spriteDefinition.PLAYERRIGHT,"Player2",  1, 2);
        game.player2.down = new Animation(game,UntitledGame.spriteDefinition.PLAYERDOOWN,"Player2",  1, 2);
        game.player2.left = new Animation(game,UntitledGame.spriteDefinition.PLAYERLEFT,"Player2",  1, 2);

        game.player2.upA = new Line(game,UntitledGame.spriteDefinition.PLAYERUP,"Player2", 4, 10);
        game.player2.rightA = new Line(game,UntitledGame.spriteDefinition.PLAYERRIGHT,"Player2",  4, 10);
        game.player2.downA = new Line(game,UntitledGame.spriteDefinition.PLAYERDOOWN,"Player2",  4, 10);
        game.player2.leftA = new Line(game,UntitledGame.spriteDefinition.PLAYERLEFT,"Player2",  4, 10);
        
        game.player2.x = 2340;
        game.player2.y = 940;

        game.player2.rot = 3
    }
    
    socket.emit("ready", {
            roomname: roomname,
            x: game.player1.x,
            y: game.player1.y
        })
})
socket.on('ready', (event) => {
    game.play();
    document.body.style.cursor = 'crosshair'
})
var roomname
socket.on('update', (userObjects) => {
    try {
        copyedUserObjects = JSON.parse(JSON.stringify(userObjects));
    } catch (error) {
        console.log(error)
    }
})
socket.on('otheruser_disconnect',(data)=>{
    console.log('disconnected')
    document.body.style.background = 'white'
    screen = "start";
    location.reload(true);
    location.href = location.href;
    //history.go(-1);
})

window.onload = function () {
    
    var canvas = document.getElementById("game");
    var context = canvas.getContext("2d");

    image = new Image();
    image.src = "Resources/StartImage.png";
    one = new Image();
    one.src = "Resources/Page1.png";
    two = new Image();
    two.src = "Resources/Page2.png";
    three = new Image();
    three.src = "Resources/Page3.png";
    four = new Image();
    four.src = "Resources/Page4.png";
    five = new Image();
    five.src = "Resources/Page5.png";
    cursor = new Image();
    cursor.src = "Resources/Cursor.png";
    Setting = new Image();
    Setting.src = 'Resources/Setting.png';
    
    image.onload = function(){
        context.drawImage(image,0,0);
    };

    //아몰랑 일단 소켓임
    console.log(socket.id)

    socket.emit("matching")
    let a = ".";
    matching = setInterval(function () {
        console.log("Matching" + a);
        a += ".";
        if (a == "....") {
            a = "";
        }
    }, 1000); //로딩 화면
};
