const monsters = {
  Emby: {
    position: {
      // x: 280,
      // y: 325
      x: 480,
      y: 385
    },
    image: {
      src: './img/playerBattle.png'
    },
    frames: {
      max: 1,
      hold: 30
    },
    animate: true,
    scale: 2,
    name: '나',
    attacks: [attacks.개껌, attacks.멍푸치노]
  },
  Draggle: {
    position: {
      // x: 800,
      // y: 100
      x: 980,
      y: 128
    },
    image: {
      src: './img/siksiki/siksiki.png'

      // src: './img/draggleSprite.png'
    },
    scale: 1.8,
    frames: {
      max: 1,
      hold: 30
    },
    // animate: true,
    isEnemy: true,
    name: '배고픈 씩씩이',
    attacks: [attacks.비둘기]
  }
}
