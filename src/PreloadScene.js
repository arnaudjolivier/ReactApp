
import Phaser from 'phaser';

class PreloadScene extends Phaser.Scene {

  constructor() {
    super('PreloadScene');
  }

  preload() {
    this.load.audio('jump', 'assets/jump.m4a');
    this.load.audio('hit', 'assets/hit.m4a');
    this.load.audio('reach', 'assets/reach.m4a');

    this.load.image('ground', 'assets/ground.png');
    this.load.image('dino-idle', 'assets/dino-idle.png');
    this.load.image('dino-hurt', 'assets/dino-hurt.png');
    this.load.image('restart', 'assets/restart.png');
    this.load.image('game-over', 'assets/game-over.png');
    this.load.image('cloud', 'assets/cloud.png');
    this.load.image('bg', 'assets/bg.jpg');
    this.load.image('title_bg', 'assets/title_bg.jpg');
    this.load.image('options_button', 'assets/options_button.png');
    this.load.image('logo', 'assets/logo.png');
    this.load.image('play_button', 'assets/play_button.png');
    this.load.image('Gate', 'assets/Gate_logo.png');


    this.load.spritesheet('cat', 'assets/cat.png', {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.audio('title_music', 'assets/shuinvy-childhood.mp3');
    
    let loadingBar = this.add.graphics({
      fillStyle: {
        color: 0xffffff
      }
    })
    /*for(let i = 0; i < 100; i++){
      this.load.spritesheet('cat' + i, 'assets/cat.png',{
        frameHeight: 32,
        frameWidth: 32
      });
    }*/
    this.load.on('progress', (percent)=>{
      loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
      console.log(percent);
    })

    this.load.on('complete', ()=>{
      console.log('donnee')
    })

    this.load.spritesheet('star', 'assets/stars.png', {
      frameWidth: 9, frameHeight: 9
    });

    this.load.spritesheet('moon', 'assets/moon.png', {
      frameWidth: 20, frameHeight: 40
    });

    this.load.spritesheet('dino', 'assets/dino-run.png', {
      frameWidth: 95,
      frameHeight: 94
    })

    this.load.spritesheet('dino-down', 'assets/dino-down.png', {
      frameWidth: 118,
      frameHeight: 94
    })

    this.load.spritesheet('enemy-bird', 'assets/enemy-bird.png', {
      frameWidth: 200,
      frameHeight: 60
    })

    this.load.image('obsticle-1', 'assets/cactuses_small_1.png')
    this.load.image('obsticle-2', 'assets/cactuses_small_2.png')
    this.load.image('obsticle-3', 'assets/cactuses_small_3.png')
    this.load.image('obsticle-4', 'assets/cactuses_big_1.png')
    this.load.image('obsticle-5', 'assets/cactuses_big_2.png')
    this.load.image('obsticle-6', 'assets/cactuses_big_3.png')
  }
  

  create() {
    this.add.image(400,300, 'title_bg')
    this.scoreText = this.add.text(200, 150, 'Click To Enter In Game', { fontSize: '32px', fill: '#101' });
    this.input.on('pointerdown', () => this.scene.start('PlayScene'))
  }
}

export default PreloadScene;
