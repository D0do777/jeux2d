const player = document.getElementById("player");
const platforms = document.querySelectorAll(".platform");

let x = 100;
let y = 100;

let velocityY = 0;
let gravity = 0.5;
let gravityDirection = 1;

let speed = 4;

let keys = {};

document.addEventListener("keydown", (e)=>{
    keys[e.key.toLowerCase()] = true;

    if(e.code === "Space"){
        gravityDirection *= -1;
    }
});

document.addEventListener("keyup", (e)=>{
    keys[e.key.toLowerCase()] = false;
});

function checkCollision(){

    let playerRect = player.getBoundingClientRect();

    for(let platform of platforms){

        let rect = platform.getBoundingClientRect();

        if(
            playerRect.right > rect.left &&
            playerRect.left < rect.right &&
            playerRect.bottom > rect.top &&
            playerRect.top < rect.bottom
        ){
            if(gravityDirection === 1){
                y = rect.top - player.offsetHeight - player.parentElement.getBoundingClientRect().top;
            }else{
                y = rect.bottom - player.parentElement.getBoundingClientRect().top;
            }

            velocityY = 0;
        }
    }
}

function update(){

    if(keys["d"] || keys["arrowright"]) x += speed;
    if(keys["q"] || keys["arrowleft"]) x -= speed;

    velocityY += gravity * gravityDirection;
    y += velocityY;

    checkCollision();

    player.style.left = x + "px";
    player.style.top = y + "px";

    requestAnimationFrame(update);
}

update();
