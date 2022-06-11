let degreesone = 0;
let degreestwo = 0;
let game = document.getElementById("game");
let playerone = document.getElementById("playerone");
let playertwo = document.getElementById("playertwo");
const movelength = 5;
let moves = []
let waittimeone = 0;
let waittimetwo = 0;




function moveforward(playerid, degrees) {
    playerstats = playerid.computedStyleMap();
    let leftm = Math.cos(degrees * Math.PI / 180) * movelength
    let topm = Math.sin(degrees * Math.PI / 180) * movelength;
    playerid.style.left = `${playerstats.get("left").value + leftm}px`
    playerid.style.top = `${playerstats.get("top").value + topm}px`
}


function shoot(playerid, degrees, waittime) {
    if (waittime === 0) {
        playerstats = playerid.computedStyleMap();

        let bullet = document.createElement("div")
        bullet.className = `bullet ${(playerid == playerone) ? "bulletone" : "bullettwo"}`
        let bullettrajectory = document.createElement("div")
        bullettrajectory.className = "trajectory"
        bullettrajectory.style.transform = `rotate(${degrees}deg)`

        bullettrajectory.style.top = `${playerstats.get("top").value + 45}px`
        bullettrajectory.style.left = `${playerstats.get("left").value + 50}px`

        game.appendChild(bullettrajectory)
        bullettrajectory.appendChild(bullet)
    }
}




window.onkeydown = function (event) {
    keycod = event.keyCode
    moves.keys = (moves.keys || []);
    moves.keys[keycod] = true;
}

window.onkeyup = function (e) {
    moves.keys[e.keyCode] = false;
}




let gameloop = window.setInterval(function () {
    if (waittimeone > 0) {
        waittimeone--
    }
    if (waittimetwo > 0) {
        waittimetwo--
    }
    if (moves.keys && moves.keys[68]) {
        degreesone += 3
        document.getElementById("playerone").style.transform = `rotate(${degreesone}deg)`
    }
    if (moves.keys && moves.keys[65]) {
        degreesone -= 3
        document.getElementById("playerone").style.transform = `rotate(${degreesone}deg)`
    }
    if (moves.keys && moves.keys[39]) {
        degreestwo += 3
        document.getElementById("playertwo").style.transform = `rotate(${degreestwo}deg)`
    }
    if (moves.keys && moves.keys[37]) {
        degreestwo -= 3
        document.getElementById("playertwo").style.transform = `rotate(${degreestwo}deg)`
    }
    if (moves.keys && moves.keys[87]) {
        moveforward(playerone, degreesone)
    }
    if (moves.keys && moves.keys[38]) {
        moveforward(playertwo, degreestwo)
    }
    if (moves.keys && moves.keys[32] && waittimeone === 0) {
        shoot(playerone, degreesone, waittimeone)
        waittimeone = 10
    }
    if (moves.keys && moves.keys[96] && waittimetwo === 0) {
        shoot(playertwo, degreestwo, waittimetwo)
        waittimetwo = 10
    }

    document.querySelectorAll(".bullet").forEach(bullet => {

        let bulletleft = bullet.computedStyleMap().get("left").value;
        let tankonedata = playerone.getBoundingClientRect();
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

        //collision detection tank two
        if (bullet.classList.contains("bulletone") && rect.left < tanktwodata.left + 100 &&
            rect.left + 10 > tanktwodata.left &&
            rect.top < tanktwodata.top + 100 &&
            10 + rect.top > tanktwodata.top) {
            console.log("collision tank two")
        }
        //collision detection tank one
        if (bullet.classList.contains("bullettwo") && rect.left < tankonedata.left + 100 &&
            rect.left + 10 > tankonedata.left &&
            rect.top < tankonedata.top + 100 &&
            10 + rect.top > tankonedata.top) {
            console.log("collision tank one")
        }

    }
    )
}
    , 20)





