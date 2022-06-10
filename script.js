let degreesone = 0;
let degreestwo = 0;
let game = document.getElementById("game");
let playerone = document.getElementById("playerone");
let playertwo = document.getElementById("playertwo");
var movelength = 5;

function moveforward(playerid, degrees){
    playerstats = playerid.computedStyleMap();
    let leftm = Math.cos(degrees * Math.PI / 180) * movelength

    let topm = Math.sin(degrees * Math.PI / 180) * movelength;
    playerid.style.left = `${playerstats.get("left").value + leftm}px`
    playerid.style.top = `${playerstats.get("top").value + topm}px`
   

}

function shoot(playerid, degrees){
    playerstats = playerid.computedStyleMap();

    let bullet = document.createElement("div")
    bullet.className = "bullet"
    let bullettrajectory = document.createElement("div")
    bullettrajectory.className = "trajectory"
    bullettrajectory.style.transform = `rotate(${degrees}deg)`

    bullettrajectory.style.top = `${playerstats.get("top").value + 45}px`
    bullettrajectory.style.left = `${playerstats.get("left").value + 50}px`
   
    game.appendChild(bullettrajectory)
    bullettrajectory.appendChild(bullet)
}


window.onkeydown = function (event) {
    console.log(event.keyCode)
    //playerone turn right
    if (event.keyCode == 65) {
        degreesone += 3
        document.getElementById("playerone").style.transform = `rotate(${degreesone}deg)`
    }
    //playerone turn left
    if (event.keyCode == 68) {
        degreesone -= 3
        document.getElementById("playerone").style.transform = `rotate(${degreesone}deg)`
    }
    //player one shoot
    if (event.keyCode == 32) {
        playeronestats = playerone.computedStyleMap();

        let bullet = document.createElement("div")
        bullet.className = "bullet"
        let bullettrajectory = document.createElement("div")
        bullettrajectory.className = "trajectory"
        bullettrajectory.style.transform = `rotate(${degreesone}deg)`

        bullettrajectory.style.top = `${playeronestats.get("top").value + 45}px`
        bullettrajectory.style.left = `${playeronestats.get("left").value + 50}px`
       
        game.appendChild(bullettrajectory)
        bullettrajectory.appendChild(bullet)
    }
    if(event.keyCode == 96){
        shoot(playertwo, degreestwo)
    }
    //playerone move forward
    if (event.keyCode == 87) {
        moveforward(playerone, degreesone)
    }
    if(event.keyCode == 38){
        console.log("move")
        moveforward(playertwo, degreestwo)
    }
}




let gameloop = window.setInterval(function () {
    document.querySelectorAll(".bullet").forEach(bullet => {
        let bulletleft = bullet.computedStyleMap().get("left").value;
        let tanktwodata = playertwo.getBoundingClientRect();

        bullet.style.left = `${bulletleft + 10}px`
        let rect = bullet.getBoundingClientRect();
        
        if (rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)) {
        }
        else {
            bullet.parentNode.remove()
            bullet.remove()
        }
        if (rect.left < tanktwodata.left + 100 &&
            rect.left + 10 > tanktwodata.left &&
            rect.top < tanktwodata.top + 100 &&
            10 + rect.top > tanktwodata.top){
                console.log("collision")
            }
    }
    )

}
    , 20)





