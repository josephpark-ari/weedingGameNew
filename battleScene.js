const battleBackgroundImage = new Image()
battleBackgroundImage.src = './img/battleBackground.png'
const battleBackground = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  image: battleBackgroundImage
})

let draggle
let emby
let renderedSprites
let battleAnimationId
let queue

function initBattle() {
  document.querySelector('#userInterface').style.display = 'block'
  document.querySelector('#dialogueBox').style.display = 'none'
  document.querySelector('#enemyHealthBar').style.width = '10%'
  // document.querySelector('#playerHealthBar').style.width = '1%'
  document.querySelector('#attacksBox').replaceChildren()

  draggle = new Monster(monsters.Draggle)
  draggle.health = 10
  emby = new Monster(monsters.Emby)
  renderedSprites = [draggle, emby]
  queue = []

  emby.attacks.forEach((attack) => {
    console.log(attack)

    const button = document.createElement('button')
    button.innerText = attack.name
    document.querySelector('#attacksBox').append(button)
  })

  // our event listeners for our buttons (attack)
  document.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', (e) => {
      const selectedAttack = attacks[e.currentTarget.innerHTML]

      emby.attack({
        attack: selectedAttack,
        recipient: draggle,
        renderedSprites
      })

      if (draggle.health === 100) {
        queue.push(() => {
          draggle.faint()
        })
        queue.push(() => {
          // fade back to black
          gsap.to('#overlappingDiv', {
            opacity: 1,
            onComplete: () => {
              cancelAnimationFrame(battleAnimationId)
              animate()
              document.querySelector('#userInterface').style.display = 'none'

              gsap.to('#overlappingDiv', {
                opacity: 0
              })

              battle.initiated = false
              audio.Map.play()
            }
          })
        })
      }

      // draggle or enemy attacks right here
      const randomAttack =
        draggle.attacks[Math.floor(Math.random() * draggle.attacks.length)]

      queue.push(() => {
        draggle.attack({
          attack: randomAttack,
          recipient: emby,
          renderedSprites
        })
      })
    })

    button.addEventListener('mouseenter', (e) => {
      const selectedAttack = attacks[e.currentTarget.innerHTML]
      console.log(e.currentTarget.innerHTML)

      document.querySelector('#attackType').innerText =
        selectedAttack.id === '개껌'
          ? '맛있는 개껌 🦴'
          : '씩씩이가 좋아하는 달달한 멍푸치노 🐶'
      document.querySelector('#attackType').style.color = selectedAttack.color
    })
  })
}

function animateBattle() {
  battleAnimationId = window.requestAnimationFrame(animateBattle)
  // battleBackground.draw()

  // console.log(battleAnimationId)

  // renderedSprites.forEach((sprite) => {
  //   sprite.draw()
  // })

  // 캔버스 크기 가져오기
  const canvasWidth = canvas.width
  const canvasHeight = canvas.height

  // 배경 이미지 크기 가져오기
  const backgroundWidth = battleBackground.image.width
  const backgroundHeight = battleBackground.image.height

  // 배경 이미지를 중앙에 배치하기 위한 좌표 계산
  const x = (canvasWidth - backgroundWidth) / 2.5
  const y = (canvasHeight - backgroundHeight) / 2.7

  // 캔버스 배경을 검정색으로 채우기
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvasWidth, canvasHeight)

  // 배경 이미지를 중앙에 그리기
  c.drawImage(battleBackground.image, x, y)

  // 렌더된 스프라이트 그리기
  renderedSprites.forEach((sprite) => {
    sprite.draw()
  })
}

animate()
// initBattle()
// animateBattle()

document.querySelector('#dialogueBox').addEventListener('click', (e) => {
  if (queue.length > 0) {
    queue[0]()
    queue.shift()
  } else e.currentTarget.style.display = 'none'
})
