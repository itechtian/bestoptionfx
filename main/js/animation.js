var canvas = document.getElementById('myCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');
var raf;
var points = [];
var vx = 0.5, vy = 0.5;


var d = function (p1, p2) {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
}

for (var i = 0; i < 50; i++) {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    var xVel = vx, yVel = vy;
    if (i % 2 == 0) {
        xVel = vx + 0.5;
    }
    else {
        yVel = vy + 0.5;
    }
    points.push({ x: x, y: y, originx: x, originy: y, vx: xVel, vy: yVel });
}

for (var i = 0; i < points.length; i++) {
    var closest;
    var p1 = points[i];
    for (var j = 0; j < points.length; j++) {
        var p2 = points[j]
        if (!(p1 == p2)) {
            var placed = false;
            if (!placed) {
                if (closest == undefined) {
                    closest = p2;
                    placed = true;
                }
            }

            if (!placed) {
                if (d(p1, p2) < d(p1, closest)) {
                    closest = p2;
                    placed = true;
                }
            }
        }
    }
    p1.closest = closest;
}



var drawPoint = function (p) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.closest.x, p.closest.y);
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.stroke();

}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < 50; i++) {
        drawPoint(points[i]);
        points[i].x += points[i].vx;
        points[i].y += points[i].vy;
        points[i].closest.x += points[i].vx;
        points[i].closest.y += points[i].vy;
        if (points[i].y + points[i].vy > points[i].originy + 20 || points[i].y + points[i].vy < points[i].originy - 20) {
            points[i].vy = -points[i].vy;
        }
        if (points[i].x + points[i].vx > points[i].originx + 20 || points[i].x + points[i].vx < points[i].originx - 20) {
            points[i].vx = -points[i].vx;
        }
    }

    //console.log(ball.x,ball.originx)
    raf = window.requestAnimationFrame(draw);
}
draw();
raf = window.requestAnimationFrame(draw);



//https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js



function getHost() {

    var host = location.host;
    switch (window.location.protocol) {
        case 'http:':
            return "http://" + host;
        case 'https:':

            return 'https://' + host;

        case 'localhost':
            return "http://" + host;
        default:
            return "http://" + host;
        //some other protocol
    }
}

$.getScript(getHost() +"/main/js/particles.min.js", function () {
    particlesJS('particles-js',
        {
            "particles": {
                "number": {
                    "value": 100,
                    "density": {
                        "enable": true,
                        "value_area": 500
                    }
                },
                "color": {
                    "value": "#fe5564"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    },
                    "image": {
                        "width": 100,
                        "height": 100
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 5,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 6,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "repulse"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 400,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 100
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true,
            "config_demo": {
                "hide_card": false,
                "background_color": "#b61924",
                "background_image": "",
                "background_position": "50% 50%",
                "background_repeat": "no-repeat",
                "background_size": "cover"
            }
        }
    );

});