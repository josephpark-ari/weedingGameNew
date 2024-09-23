class Sprite {
  constructor({
    position,
    velocity,
    image,
    frames = { max: 1, hold: 10 },
    sprites,
    animate = false,
    rotation = 0,
    scale = 1,
    id,
    name
  }) {
    this.position = position
    this.image = new Image()
    this.frames = { ...frames, val: 0, elapsed: 0 }
    this.image.onload = () => {
      this.width = (this.image.width / this.frames.max) * scale
      this.height = this.image.height * scale
    }
    this.image.src = image.src

    this.animate = animate
    this.sprites = sprites
    this.opacity = 1

    this.id = id // 고유 아이디
    this.name = name // 고유 이름

    this.rotation = rotation
    this.scale = scale
  }

  draw() {
    c.save()
    c.translate(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2
    )
    c.rotate(this.rotation)
    c.translate(
      -this.position.x - this.width / 2,
      -this.position.y - this.height / 2
    )
    c.globalAlpha = this.opacity

    const crop = {
      position: {
        x: this.frames.val * (this.width / this.scale),
        y: 0
      },
      width: this.image.width / this.frames.max,
      height: this.image.height
    }

    const image = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      width: this.image.width / this.frames.max,
      height: this.image.height
    }

    c.drawImage(
      this.image,
      crop.position.x,
      crop.position.y,
      crop.width,
      crop.height,
      image.position.x,
      image.position.y,
      image.width * this.scale,
      image.height * this.scale
    )

    c.restore()

    if (!this.animate) return

    if (this.frames.max > 1) {
      this.frames.elapsed++
    }

    if (this.frames.elapsed % this.frames.hold === 0) {
      if (this.frames.val < this.frames.max - 1) this.frames.val++
      else this.frames.val = 0
    }
  }
}

class Monster extends Sprite {
  constructor({
    position,
    velocity,
    image,
    frames = { max: 1, hold: 10 },
    sprites,
    animate = false,
    rotation = 0,
    isEnemy = false,
    name,
    attacks,
    scale = 1
  }) {
    super({
      position,
      velocity,
      image,
      frames,
      sprites,
      animate,
      rotation
    })
    this.health = 100
    this.isEnemy = isEnemy
    this.name = name
    this.attacks = attacks
    this.scale = scale
  }

  faint() {
    document.querySelector('#dialogueBox').innerHTML =
      '씩씩이는 기분이 좋아져서 돌아갔다.'
    gsap.to(this.position, {
      y: this.position.y + 20
    })
    gsap.to(this, {
      opacity: 0
    })
    audio.battle.stop()
    audio.victory.play()
  }

  attack({ attack, recipient, renderedSprites }) {
    document.querySelector('#dialogueBox').style.display = 'block'
    if (this.name === '나') {
      document.querySelector('#dialogueBox').innerHTML =
        this.name + '는 씩씩이에게 ' + attack.name + '을(를) 먹였다.'
    } else {
      if (attack.name === '비둘기') {
        document.querySelector('#dialogueBox').innerHTML =
          '아얏! 씩씩이 때문에 놀란 비둘기가 도망가다가 나와 부딪쳤다.'
      } else {
        document.querySelector('#dialogueBox').innerHTML =
          '배가고픈 씩씩이는 ' + attack.name + '을(를) 사용하였다. '
      }
    }

    let healthBar = '#enemyHealthBar'
    // if (this.name !== '나') healthBar = '#playerHealthBar'

    // let rotation = 1
    // if (this.name !== '나') rotation = -2.2

    if (this.name === '나') {
      if (recipient.health + attack.damage > 100) {
        recipient.health = 100
      } else {
        recipient.health += attack.damage
      }
    }

    switch (attack.name) {
      case '멍푸치노':
        audio.initFireball.play()
        const fireballImage = new Image()
        fireballImage.src = './img/coffee.png'
        // fireballImage.src = './img/fireball.png'
        const fireball = new Sprite({
          position: {
            x: this.position.x,
            y: this.position.y
          },
          image: fireballImage,
          frames: {
            max: 2,
            hold: 10
          },
          animate: true,
          scale: 2.5
          // rotation
        })
        renderedSprites.splice(1, 0, fireball)

        gsap.to(fireball.position, {
          x: recipient.position.x,
          y: recipient.position.y,
          onComplete: () => {
            // Enemy actually gets hit
            audio.fireballHit.play()
            gsap.to(healthBar, {
              width: recipient.health + '%'
            })

            gsap.to(recipient.position, {
              y: recipient.position.y + 10,
              yoyo: true,
              repeat: 5,
              duration: 0.08
            })

            gsap.to(recipient, {
              // opacity: 0,
              repeat: 5,
              yoyo: true,
              duration: 0.08
            })
            renderedSprites.splice(1, 1)
          }
        })

        break
      case '개껌':
        audio.initFireball.play()
        const boneImage = new Image()
        boneImage.src = './img/bone.png'
        // fireballImage.src = './img/fireball.png'
        const bone = new Sprite({
          position: {
            x: this.position.x,
            y: this.position.y
          },
          image: boneImage,
          frames: {
            max: 1,
            hold: 10
          },
          animate: false,
          scale: 2.5
          // rotation
        })
        renderedSprites.splice(1, 0, bone)

        gsap.to(bone.position, {
          x: recipient.position.x,
          y: recipient.position.y,
          onComplete: () => {
            // Enemy actually gets hit
            audio.fireballHit.play()
            gsap.to(healthBar, {
              width: recipient.health + '%'
            })

            gsap.to(recipient.position, {
              y: recipient.position.y + 10,
              yoyo: true,
              repeat: 5,
              duration: 0.08
            })

            gsap.to(recipient, {
              // opacity: 0,
              repeat: 5,
              yoyo: true,
              duration: 0.08
            })
            renderedSprites.splice(1, 1)
          }
        })

        break
      case '비둘기':
        audio.initFireball.play()
        const birdImage = new Image()
        birdImage.src = './img/bird.png'
        // fireballImage.src = './img/fireball.png'
        const bird = new Sprite({
          position: {
            x: this.position.x,
            y: this.position.y - 100
          },
          image: birdImage,
          frames: {
            max: 6,
            hold: 10
          },
          animate: true,
          scale: 5
          // rotation
        })
        renderedSprites.splice(1, 0, bird)

        gsap.to(bird.position, {
          x: recipient.position.x,
          y: recipient.position.y,
          duration: 1.3,
          onComplete: () => {
            // Enemy actually gets hit
            audio.fireballHit.play()

            gsap.to(recipient.position, {
              y: recipient.position.y + 10,
              yoyo: true,
              repeat: 5,
              duration: 0.08
            })

            gsap.to(recipient, {
              // opacity: 0,
              repeat: 5,
              yoyo: true,
              duration: 0.08
            })
            renderedSprites.splice(1, 1)
          }
        })

        break
    }
  }
}

class Boundary {
  static width = 48
  static height = 48
  constructor({ position }) {
    this.position = position
    this.width = 48
    this.height = 48
  }

  draw() {
    c.fillStyle = 'rgba(255, 0, 0, 0)'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

class Character extends Sprite {
  constructor({
    position,
    velocity,
    image,
    frames = { max: 1, hold: 10 },
    sprites,
    animate = false,
    rotation = 0,
    scale = 1,
    dialogue = [],
    id,
    name
  }) {
    super({
      position,
      velocity,
      image,
      frames,
      sprites,
      animate,
      rotation,
      scale,
      id,
      name
    })

    this.dialogue = dialogue
    this.dialogueIndex = 0
  }
}
