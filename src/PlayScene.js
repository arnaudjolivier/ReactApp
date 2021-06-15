import Phaser from 'phaser';

class PlayScene extends Phaser.Scene {

  constructor() {
    super('PlayScene');
  }

  createControls() {
    this.input.keyboard.on('keydown-SPACE', () => {
      if (!this.dino.body.onFloor()) { return; }
      this.dino.body.height = 100
      this.dino.body.offset.y = 0

      this.dino.setVelocityY(-1600)
    })

    this.input.keyboard.on('keydown-DOWN', () => {
      if (!this.dino.body.onFloor()) { return; }
      this.dino.body.height = 58
      this.dino.body.offset.y = 34
    })

    this.input.keyboard.on('keyup-DOWN', () => {
      if (!this.dino.body.onFloor()) { return; }
      this.dino.body.height = 92
      this.dino.body.offset.y = 0
    })
  }

  initAnims() {
    this.anims.create({
      key: 'dino-run',
      frames: this.anims.generateFrameNumbers('dino',
        { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'dino-down',
      frames: this.anims.generateFrameNumbers('dino-down',
        { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1
    })
    
  }

  initColliders(){
    this.physics.add.collider(this.dino, this.obsticles, () => {
      this.physics.pause()
      this.anims.pauseAll()
      this.dino.setTexture('dino-hurt')
     
        this.add.image(400,300, 'title_bg')
        this.scoreText = this.add.image(300, 300, 'game-over', { fontSize: '32px', fill: '#101' });
        this.input.on('pointerdown', () => this.scene.start('PlayScene'))
      
      this.isGameRunning = false
    }, null, this)
  }


  create() {
    this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, 'logo').setDepth(1);
    this.add.image(0,0, 'title_bg').setOrigin(0).setDepth(0);
    const { height, width } = this.game.config;
    this.gameSpeed = 10
    this.respawnTime = 0
    this.isGameRunning = true
    this.ground = this.add.tileSprite(0, height, width, 26, 'ground').setOrigin(0, 1)
    this.dino = this.physics.add.sprite(10, height, 'dino-idle')
      .setCollideWorldBounds(true)
      .setGravityY(5000)
      .setOrigin(0, 1);
    this.obsticles = this.physics.add.group();
    this.createControls()
    this.initAnims()
    this.initColliders()
    this.sound.play("title_music", {
      loop : true
    })
    
    let hoverSprite = this.add.sprite(100, 100, 'cat');
    hoverSprite.setScale(2);
    hoverSprite.setVisible(false);
  }

  placeObsticle(){
    const {width, height} = this.game.config
    const obsticleNum = Math.floor(Math.random() * 7) + 1
    const distance = Phaser.Math.Between(600,900)
    let obsticle
    if(obsticleNum > 6){
      const enemyHeight = [22,52]
      obsticle = this.obsticles.create(width + distance, height - enemyHeight[Math.floor(Math.random() * 2)], 'enemy-bird' )
      obsticle.play('enemy-bird', true)
      obsticle.body.height = obsticle.body.height / 1.5
    }else{
      obsticle = this.obsticles.create(width + distance, height, `obsticle-${obsticleNum}`)
      obsticle.body.offset.y = +10
    }

    obsticle.setImmovable()
    obsticle.setOrigin(0,1)
    
  }


  update(time,delta) {
    if(!this.isGameRunning) return
    this.ground.tilePositionX += this.gameSpeed;
    Phaser.Actions.IncX(this.obsticles.getChildren(), -this.gameSpeed)
    this.respawnTime = this.respawnTime + delta * this.gameSpeed * 0.08
    if(this.respawnTime >= 1500){
      this.placeObsticle() 
      this.respawnTime = 0
      
    }



    if (this.dino.body.deltaAbsY() > 0) {
      this.dino.anims.stop();
      this.dino.setTexture('dino');
    } else {
      this.dino.body.height <= 58 ? this.dino.play('dino-down', true): this.dino.play('dino-run', true);
    }

    var i;
    i=0;

    this.scoreText = this.add.text(16, 16, 'score:'+ i, { fontSize: '32px', fill: '#101' });
    i+=1;
    
  }

}
export default PlayScene;
