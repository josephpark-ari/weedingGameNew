const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

var md = new MobileDetect(window.navigator.userAgent);

if (md.mobile()) {
    canvas.style.width = window.innerHeight * 1.75;
    canvas.style.height = window.innerHeight;
} else {
    canvas.width = 1774;
    canvas.height = 1325;
}

// 고정된 캔버스 크기 설정
// canvas.width = 1774
// canvas.height = 1325
// 고정된 크기로 설정
// canvas.style.width = '1774px';
// alert(window.innerHeight * 1.75);

// 화면이 작아졌을 때 캔버스가 넘치지 않도록
document.body.style.overflow = 'hidden';

// 캔버스 내부 내용을 가운데에 고정하거나 특정 위치에 고정시키고 싶다면 추가 스타일을 적용
// function resizeCanvas() {
//     // 화면 크기와 캔버스 크기의 비율 계산
//     const scale = Math.min(window.innerWidth / canvas.width, window.innerHeight / canvas.height);

//     // 화면에 맞게 캔버스 크기 조정
//     // canvas.style.width = `${canvas.width * scale}px`;
//     canvas.style.height = `100vh`;

//     // 캔버스를 중앙에 위치시키기 위한 스타일 설정
//     // canvas.style.position = 'absolute';
//     // canvas.style.top = '50%';
//     // canvas.style.left = '50%';
//     // canvas.style.transform = 'translate(-50%, -50%)';
// }

// // 초기 설정 및 리사이즈 이벤트 추가
// resizeCanvas();
// window.addEventListener('resize', resizeCanvas);
const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 70) {
    collisionsMap.push(collisions.slice(i, 70 + i));
}

const battleZonesMap = [];
for (let i = 0; i < battleZonesData.length; i += 70) {
    battleZonesMap.push(battleZonesData.slice(i, 70 + i));
}

const charactersMap = [];
for (let i = 0; i < charactersMapData.length; i += 70) {
    charactersMap.push(charactersMapData.slice(i, 70 + i));
}
console.log(charactersMap);

const boundaries = [];
const offset = {
    x: -1085,
    y: -490,
};
// const offset = {
//     x: -735,
//     y: -590,
// };

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025)
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y,
                    },
                })
            );
    });
});

const battleZones = [];

battleZonesMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025)
            battleZones.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y,
                    },
                })
            );
    });
});

const characters = [];
const villagerImg = new Image();
villagerImg.src = './img/villager2/Idle.png';

const oldManImg = new Image();
oldManImg.src = './img/oldMan/Idle.png';
const guestbookImg = new Image();
guestbookImg.src = './img/Guestbook.png';

const ariImg = new Image();
ariImg.src = './img/ari/ari.png';
const locationImg = new Image();
locationImg.src = './img/location.png';
const locationBubbleImg = new Image();
locationBubbleImg.src = './img/villager/locationBubble.png';
const thankuBubbleImg = new Image();
thankuBubbleImg.src = './img/oldMan/thankuBubble.png';
const virtualManImg = new Image();
virtualManImg.src = './img/virtualMan/virtualMan.png';
const pinkManImg = new Image();
pinkManImg.src = './img/pinkMan/pinkMan.png';
const frogManImg = new Image();
frogManImg.src = './img/frogMan/frogMan.png';
const chickenImg = new Image();
chickenImg.src = './img/chicken/chicken.png';
const ghostImg = new Image();
ghostImg.src = './img/ghost/ghost.png';
const tvManImg = new Image();
tvManImg.src = './img/tvMan/tvMan.png';

charactersMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        // 1026 === villager

        if (symbol === 1026) {
            characters.push(
                new Character({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y,
                    },
                    image: villagerImg,
                    frames: {
                        max: 9,
                        hold: 5,
                    },
                    scale: 2,
                    animate: true,
                    id: 'poster_man',
                    dialogue: [
                        '...',
                        '박요셉과 안지은이 어디서 결혼하는지 아냐고?',
                        '6월 7일 마곡역의 보타닉 파크 웨딩홀에서 하잔아.',
                        '신부대기실에서 사진도 찍어야하니까 늦지 말고 오라고!!',
                    ],
                })
            );
        }
        if (symbol === 1025) {
            characters.push(
                new Character({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y,
                    },
                    image: locationBubbleImg,
                    frames: {
                        max: 5,
                        hold: 20,
                    },
                    scale: 2,
                    animate: true,
                    id: 'location',
                    // dialogue: []
                })
            );
        }
        if (symbol === 1027) {
            characters.push(
                new Character({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y,
                    },
                    image: locationImg,
                    frames: {
                        max: 1,
                        hold: 60,
                    },
                    scale: 1.5,
                    animate: true,
                    id: 'location',
                    dialogue: [
                        '...',
                        '박요셉과 안지은이 어디서 결혼하는지 아냐고?',
                        '6월 7일 마곡역의 보타닉 파크 웨딩홀에서 하잔아.',
                        '신부대기실에서 사진도 찍어야하니까 늦지 말고 오라고!!',
                    ],
                })
            );
        }
        // 1031 === oldMan
        else if (symbol === 1031) {
            characters.push(
                new Character({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y,
                    },
                    image: oldManImg,
                    frames: {
                        max: 4,
                        hold: 60,
                    },
                    scale: 3,
                    dialogue: ['웨딩사진을 보고싶어?.'],
                })
            );
        }
        // 5 === chickenImg
        else if (symbol === 5) {
            characters.push(
                new Character({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y,
                    },
                    image: chickenImg,
                    animate: true,
                    frames: {
                        max: 13,
                        hold: 5,
                    },
                    scale: 1.5,
                    dialogue: ['웨딩사진을 보고싶어?.'],
                })
            );
        }
        // 6 === ghost
        else if (symbol === 6) {
            characters.push(
                new Character({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y,
                    },
                    image: ghostImg,
                    animate: true,
                    frames: {
                        max: 10,
                        hold: 15,
                    },
                    scale: 1.5,
                    dialogue: ['웨딩사진을 보고싶어?.'],
                })
            );
        }
        // 9 === tvMan
        else if (symbol === 9) {
            console.log({
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y,
            });

            characters.push(
                new Character({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y,
                    },
                    image: tvManImg,
                    animate: true,
                    frames: {
                        max: 1,
                        hold: 15,
                    },
                    scale: 0.4,
                    dialogue: ['웨딩사진을 보고싶어?.'],
                })
            );
        } else if (symbol === 44) {
            characters.push(
                new Character({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y,
                    },

                    image: guestbookImg,
                    frames: {
                        max: 1,
                        hold: 100,
                    },
                    scale: 1,
                    dialogue: ['방명록을 남겨줄래?'],
                })
            );
            console.log({
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y,
            });
        } else if (symbol === 1035) {
            characters.push(
                new Character({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y,
                    },
                    image: ariImg,
                    animate: true,
                    frames: {
                        max: 3,
                        hold: 30,
                    },
                    scale: 0.8,
                    dialogue: [
                        '난 아리라고 한다냥~!.',
                        '이 게임 세계에 들어온 순간 부터 말을 할 수 있다냥~!',
                        '냥냥펀치를 맞고 싶지 않다면 결혼식 꼭 참석해야한다냥~!',
                        '아! 씩씩이 형은 배가 고프다고 풀 속으로 들어갔다냥!',
                        '풀 속을 찾아보면 씩씩이 형을 만날 수 있다냥~!',
                    ],
                })
            );
        }
        // 1031 === oldMan
        else if (symbol === 1030) {
            characters.push(
                new Character({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y,
                    },
                    image: pinkManImg,
                    animate: true,
                    frames: {
                        max: 11,
                        hold: 5,
                    },
                    scale: 2,
                    dialogue: ['신랑 신부가 너에게 할 말이 있대!', 'Youbute로 연결해줄게!!'],
                    id: 'youTube_man',
                })
            );
        }
        // 1031 === oldMan
        else if (symbol === 1040) {
            characters.push(
                new Character({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y,
                    },
                    image: oldManImg,
                    animate: true,
                    frames: {
                        max: 4,
                        hold: 60,
                    },
                    scale: 3,
                    dialogue: ['신랑 신부가 너에게 할 말이 있대!', 'Youbute로 연결해줄게!!'],
                    id: 'youTube_man',
                })
            );
        }
        // 1031 === oldMan
        else if (symbol === 1041) {
            characters.push(
                new Character({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y,
                    },
                    image: thankuBubbleImg,
                    animate: true,
                    frames: {
                        max: 5,
                        hold: 20,
                    },
                    scale: 2,
                    // dialogue: [],
                    id: 'youTube_man',
                })
            );
        }

        if (symbol !== 0) {
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y,
                    },
                })
            );
        }
    });
});

const image = new Image();
image.src = './img/Pellet Town.png';

const foregroundImage = new Image();
foregroundImage.src = './img/foregroundObjects.png';

const playerDownImage = new Image();
playerDownImage.src = './img/playerDown.png';

const playerUpImage = new Image();
playerUpImage.src = './img/playerUp.png';

const playerLeftImage = new Image();
playerLeftImage.src = './img/playerLeft.png';

const playerRightImage = new Image();
playerRightImage.src = './img/playerRight.png';

const player = new Sprite({
    position: {
        x: 150,
        y: 400,
    },
    image: playerDownImage,
    frames: {
        max: 4,
        hold: 10,
    },
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,
        down: playerDownImage,
    },
});

const background = new Sprite({
    position: {
        // x: offset.x,
        // y: offset.y
        x: offset.x,
        y: offset.y,
    },
    image: image,
});

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y,
    },
    image: foregroundImage,
});

const keys = {
    w: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
    s: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
};

const movables = [background, ...boundaries, foreground, ...battleZones, ...characters];
const renderables = [background, ...boundaries, ...battleZones, ...characters, player, foreground];

const battle = {
    initiated: false,
};

function animate() {
    const animationId = window.requestAnimationFrame(animate);
    renderables.forEach(renderable => {
        renderable.draw();
    });

    let moving = true;
    player.animate = false;

    if (battle.initiated) return;

    // activate a battle
    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
        for (let i = 0; i < battleZones.length; i++) {
            const battleZone = battleZones[i];
            const overlappingArea =
                (Math.min(player.position.x + player.width, battleZone.position.x + battleZone.width) -
                    Math.max(player.position.x, battleZone.position.x)) *
                (Math.min(player.position.y + player.height, battleZone.position.y + battleZone.height) -
                    Math.max(player.position.y, battleZone.position.y));
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: battleZone,
                }) &&
                overlappingArea > (player.width * player.height) / 2 &&
                Math.random() < 0.01
            ) {
                // deactivate current animation loop
                window.cancelAnimationFrame(animationId);

                audio.Map.stop();
                audio.initBattle.play();
                audio.battle.play();

                battle.initiated = true;
                gsap.to('#overlappingDiv', {
                    opacity: 1,
                    repeat: 3,
                    yoyo: true,
                    duration: 0.4,
                    onComplete() {
                        gsap.to('#overlappingDiv', {
                            opacity: 1,
                            duration: 0.4,
                            onComplete() {
                                // activate a new animation loop
                                initBattle();
                                animateBattle();
                                gsap.to('#overlappingDiv', {
                                    opacity: 0,
                                    duration: 0.4,
                                });
                            },
                        });
                    },
                });
                break;
            }
        }
    }

    if (keys.w.pressed && lastKey === 'w') {
        player.animate = true;
        player.image = player.sprites.up;

        checkForCharacterCollision({
            characters,
            player,
            characterOffset: { x: 0, y: 3 },
        });

        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y + 3,
                        },
                    },
                })
            ) {
                moving = false;
                break;
            }
        }

        if (moving)
            movables.forEach(movable => {
                movable.position.y += 3;
            });
    } else if (keys.a.pressed && lastKey === 'a') {
        player.animate = true;
        player.image = player.sprites.left;

        checkForCharacterCollision({
            characters,
            player,
            characterOffset: { x: 3, y: 0 },
        });

        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x + 3,
                            y: boundary.position.y,
                        },
                    },
                })
            ) {
                moving = false;
                break;
            }
        }

        if (moving)
            movables.forEach(movable => {
                movable.position.x += 3;
            });
    } else if (keys.s.pressed && lastKey === 's') {
        player.animate = true;
        player.image = player.sprites.down;

        checkForCharacterCollision({
            characters,
            player,
            characterOffset: { x: 0, y: -3 },
        });

        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y - 3,
                        },
                    },
                })
            ) {
                moving = false;
                break;
            }
        }

        if (moving)
            movables.forEach(movable => {
                movable.position.y -= 3;
            });
    } else if (keys.d.pressed && lastKey === 'd') {
        player.animate = true;
        player.image = player.sprites.right;

        checkForCharacterCollision({
            characters,
            player,
            characterOffset: { x: -3, y: 0 },
        });

        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x - 3,
                            y: boundary.position.y,
                        },
                    },
                })
            ) {
                moving = false;
                break;
            }
        }

        if (moving)
            movables.forEach(movable => {
                movable.position.x -= 3;
            });
    }
}
// animate()

let lastKey = '';
window.addEventListener('keydown', e => {
    if (player.isInteracting) {
        switch (e.key) {
            case ' ':
                player.interactionAsset.dialogueIndex++;

                const { dialogueIndex, dialogue } = player.interactionAsset;
                console.log({ dialogueIndex, dialogue });

                if (dialogueIndex <= dialogue.length - 1) {
                    document.querySelector('#characterDialogueBox').innerHTML =
                        player.interactionAsset.dialogue[dialogueIndex];
                    return;
                }

                // finish conversation
                player.isInteracting = false;
                player.interactionAsset.dialogueIndex = 0;
                document.querySelector('#characterDialogueBox').style.display = 'none';
                console.log(player);

                if (player.interactionAsset.id === 'youTube_man') {
                    // 유튜브 링크로 새창 열기
                    // window.open('https://www.youtube.com/watch?v=X2HQps2QAqI', '_blank')
                }
                if (player.interactionAsset.id === 'poster_man') {
                    // 포스터 이미지를 화면에 추가
                    const posterImage = document.createElement('img');
                    posterImage.src = './img/poster.png'; // 포스터 이미지 경로
                    posterImage.style.position = 'fixed';
                    posterImage.style.top = '50%';
                    posterImage.style.left = '50%';
                    posterImage.style.transform = 'translate(-50%, -50%)';
                    posterImage.style.width = '80%'; // 필요에 따라 크기 조정
                    posterImage.style.height = 'auto';
                    posterImage.style.cursor = 'pointer';
                    posterImage.style.zIndex = '1000'; // 다른 요소 위에 표시되도록 z-index 설정
                    posterImage.id = 'poster';

                    document.body.appendChild(posterImage);

                    // 클릭 시 포스터 이미지를 제거
                    posterImage.addEventListener('click', () => {
                        document.body.removeChild(posterImage);
                    });
                }
                // // 플레이어 위치에서 왼쪽 200px 옆에 비디오 위치 설정
                // const playerPosition = {
                //   x: player.position.x,
                //   y: player.position.y
                // }

                // // 비디오를 플레이어의 중앙보다 왼쪽 200px 위치에 배치
                // const videoElement = document.getElementById('tvVideo')
                // videoElement.style.left = `${playerPosition.x - 500}px` // 플레이어의 x 위치보다 200px 왼쪽
                // videoElement.style.top = `${playerPosition.y - 100}px` // 플레이어의 y 위치와 동일
                // videoElement.style.display = 'block'

                break;
        }
        return;
    }

    switch (e.key) {
        case ' ':
            if (!player.interactionAsset) return;

            // beginning the conversation
            const firstMessage = player.interactionAsset.dialogue[0];
            document.querySelector('#characterDialogueBox').innerHTML = firstMessage;
            document.querySelector('#characterDialogueBox').style.display = 'flex';
            player.isInteracting = true;
            break;
        case 'w':
            keys.w.pressed = true;
            lastKey = 'w';
            break;
        case 'a':
            keys.a.pressed = true;
            lastKey = 'a';
            break;

        case 's':
            keys.s.pressed = true;
            lastKey = 's';
            break;

        case 'd':
            keys.d.pressed = true;
            lastKey = 'd';
            break;
    }
});

window.addEventListener('keyup', e => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 's':
            keys.s.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
    }
});

let clicked = false;
addEventListener('click', () => {
    if (!clicked) {
        audio.Map.play();
        clicked = true;
    }
});

// 화면이 작아졌을 때 캔버스가 넘치지 않도록
document.body.style.overflow = 'hidden';

if (md.mobile()) {
    // 조작 버튼 추가
    window.addEventListener('DOMContentLoaded', () => {
        const controlsHTML = `
  <div id="controlsBox">
    <div >
      <div id="controls">
<div id="dpad">
        <button id="right"  class="dpad-button up">
          <span class="arrow up-arrow">↑</span>
        </button>
        <button id="down" class="dpad-button left">
          <span class="arrow left-arrow">↑</span>
        </button>
        <button id="left" class="dpad-button down">
          <span class="arrow down-arrow">↑</span>
        </button>
        <button id="up" class="dpad-button right">
          <span class="arrow right-arrow">↑</span>
        </button>
      </div>
  <button id="confirm" class="confirm-button">확인</button>
      </div>
  </div>
  `;

        // HTML 추가
        document.body.insertAdjacentHTML('beforeend', controlsHTML);

        // 스타일 추가
        const style = document.createElement('style');
        style.textContent = `
      #controlsBox {
        position: fixed;
        bottom: 20px;
        left: 20px;
      }
      #controls {
        width: 100%;
        display: flex;
        flex-direction: space-between;
        align-items: center;
        gap: 20px;
      }
      #dpad {
        width: 340px;
        height: 340px;
        border-radius: 50%;
        overflow: hidden;
        position: fixed;
        left: 80px;
        bottom: 80px;
      }
      .dpad-button {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.5);
        border: none;
        clip-path: polygon(49% 50%, 100% 0, 100% 100%);
      }
      .dpad-button.up {
        transform: rotate(0deg);
      }
      .right-arrow {
        top: 65px;
        position: absolute;
        right: 40px;
        transform: rotate(90deg);
        font-size: 170px;
        color: rgba(0, 0, 0, 0.7);
      }
      .left-arrow {
        top: 65px;
        position: absolute;
        right: 40px;
        transform: rotate(90deg);
        font-size: 170px;
        color: rgba(0, 0, 0, 0.7);
      }
      .up-arrow {
        top: 65px;
        position: absolute;
        right: 40px;
        transform: rotate(90deg);
        font-size: 170px;
        color: rgba(0, 0, 0, 0.7);
      }
      .down-arrow {
        top: 65px;
        position: absolute;
        right: 40px;
        transform: rotate(90deg);
        font-size: 170px;
        color: rgba(0, 0, 0, 0.7);
      }
      .dpad-button.left {
        transform: rotate(90deg);
      }
      .dpad-button.down {
        transform: rotate(180deg);
      }
      .dpad-button.right {
        transform: rotate(270deg);
      }
      .confirm-button {
        width: 20vh;
        height: 20vh;
        font-size: 2rem;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.5);
        border: none;
        user-select: none;
        display: flex;
        justify-content: center;
        align-items: center;
        color: rgba(0, 0, 0, 0.7);
        right: 80px;
        bottom: 80px;
        position: fixed;
      }

      .dpad-button,
      .confirm-button {
        background-color: rgba(255, 255, 255, 0.5);
        border: none;
        outline: none;
        -webkit-tap-highlight-color: transparent; /* 모바일 터치 하이라이트 제거 */
        user-select: none;
      }

      .dpad-button:hover,
      .confirm-button:hover,
      .dpad-button:active,
      .confirm-button:active,
      .dpad-button:focus,
      .confirm-button:focus {
        background-color: rgba(255, 255, 255, 0.5); /* 호버 상태에서도 배경 유지 */
        outline: none; /* 포커스 outline 제거 */
      }
    `;
        document.head.appendChild(style);

        const setupButtonControls = (buttonId, startHandler, endHandler) => {
            const button = document.getElementById(buttonId);

            if (button) {
                button.addEventListener('mousedown', startHandler);
                button.addEventListener('mouseup', endHandler);

                button.addEventListener('touchstart', startHandler);
                button.addEventListener('touchend', endHandler);
            } else {
                console.error(`${buttonId} button not found`);
            }
        };

        const handleUpStart = () => {
            keys.w.pressed = true;
            lastKey = 'w';
            console.log('Up button pressed');
        };

        const handleUpEnd = () => {
            keys.w.pressed = false;
            console.log('Up button released');
        };

        const handleLeftStart = () => {
            keys.a.pressed = true;
            lastKey = 'a';
            console.log('Left button pressed');
        };

        const handleLeftEnd = () => {
            keys.a.pressed = false;
            console.log('Left button released');
        };

        const handleDownStart = () => {
            keys.s.pressed = true;
            lastKey = 's';
            console.log('Down button pressed');
        };

        const handleDownEnd = () => {
            keys.s.pressed = false;
            console.log('Down button released');
        };

        const handleRightStart = () => {
            keys.d.pressed = true;
            lastKey = 'd';
            console.log('Right button pressed');
        };

        const handleRightEnd = () => {
            keys.d.pressed = false;
            console.log('Right button released');
        };

        setupButtonControls('up', handleUpStart, handleUpEnd);
        setupButtonControls('left', handleLeftStart, handleLeftEnd);
        setupButtonControls('down', handleDownStart, handleDownEnd);
        setupButtonControls('right', handleRightStart, handleRightEnd);

        document.getElementById('confirm').addEventListener('click', () => {
            if (player.isInteracting) {
                player.interactionAsset.dialogueIndex++;

                const { dialogueIndex, dialogue } = player.interactionAsset;
                if (dialogueIndex <= dialogue.length - 1) {
                    document.querySelector('#characterDialogueBox').innerHTML =
                        player.interactionAsset.dialogue[dialogueIndex];
                    return;
                }
                document.querySelector('#dpad').style.bottom = '80px';
                document.querySelector('#confirm').style.bottom = '80px';

                // finish conversation
                player.isInteracting = false;
                player.interactionAsset.dialogueIndex = 0;
                document.querySelector('#characterDialogueBox').style.display = 'none';

                if (player.interactionAsset.id === 'youTube_man') {
                    // 유튜브 링크로 새창 열기
                    // window.open('https://www.youtube.com/watch?v=X2HQps2QAqI', '_blank');
                }
                if (player.interactionAsset.id === 'poster_man') {
                    document.querySelector('#dpad').style.display = 'none';
                    document.querySelector('#confirm').style.display = 'none';
                    // 포스터 이미지를 화면에 추가
                    const posterImage = document.createElement('img');
                    posterImage.src = './img/poster.png'; // 포스터 이미지 경로
                    posterImage.style.position = 'fixed';
                    posterImage.style.top = '50%';
                    posterImage.style.left = '50%';
                    posterImage.style.transform = 'translate(-50%, -50%)';
                    posterImage.style.width = '80%'; // 필요에 따라 크기 조정
                    posterImage.style.height = 'auto';
                    posterImage.style.cursor = 'pointer';
                    posterImage.style.zIndex = '1000'; // 다른 요소 위에 표시되도록 z-index 설정
                    posterImage.id = 'poster';

                    document.body.appendChild(posterImage);

                    // 클릭 시 포스터 이미지를 제거
                    posterImage.addEventListener('click', () => {
                        document.body.removeChild(posterImage);
                        document.querySelector('#dpad').style.display = 'block';
                        document.querySelector('#confirm').style.display = 'block';
                    });
                }
            } else if (player.interactionAsset) {
                document.querySelector('#dpad').style.bottom = '620px';
                document.querySelector('#confirm').style.bottom = '620px';
                // beginning the conversation
                const firstMessage = player.interactionAsset.dialogue[0];
                document.querySelector('#characterDialogueBox').innerHTML = firstMessage;
                document.querySelector('#characterDialogueBox').style.display = 'flex';
                player.isInteracting = true;
            }
        });
    });
}
