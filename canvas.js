

var canv = document.querySelector("canvas") ;
var c = canv.getContext("2d") ;

canv.height = window.innerHeight ; 
canv.width = window.innerWidth ; 

// c.arc(canv.width / 2, canv.height - 30, 30, 0, 2 * Math.PI, false) ;
// c.fillStyle = "#ff4fea";
// c.fill() ;

class Brick{
	constructor(x, y, sizex, sizey, color){
		this.x = x ; 
		this.y = y ; 
		this.sizex = sizex ; 
		this.sizey = sizey ; 
		this.color = color ;
		this.rightPressed = false ;
		this.leftPressed = false ; 
		this.dx = 7 ; 
	}

	draw(){
		// beginPath just clears everything and restarts 
		if(this.rightPressed && this.x + this.sizex < canvas.width){
			console.log("Entered here is true") ;
			this.x += this.dx ;
		}else if(this.leftPressed && this.x > 0){
			this.x -= this.dx ; 
		}

		c.beginPath() ;
		c.fillStyle = this.color ;
		c.rect(this.x, this.y, this.sizex, this.sizey) ;
		c.fill() ; 
	}

}

var paddle = new Brick(canv.width / 2 - 40 , canv.height - 40, 80 , 40, "green") ; 

class Ball{

	constructor(x, y, radius, color){
		this.x = x ; 
		this.y = y ; 
		this.radius = radius ; 
		this.color = color ;
		this.dx = 7;
		this.dy = -7 ; 
	}

	draw(){
		c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false) ;
		c.fillStyle = this.color ;
		c.fill() ;
	} 

	update(){
		this.x += this.dx ; 
		this.y += this.dy ; 
		if(this.x + this.radius > canvas.width  || this.x - this.radius < 0){
			this.dx *= -1 ;
		}else if( this.y - this.radius < 0 ){
			this.dy *= -1 ; 
		}

		// Collision Detection 
		if(this.y + this.radius > paddle.y && this.x > paddle.x && this.x < paddle.x + paddle.sizex){
			console.log("hit paddle")
			this.dy *= -1 ;
		}

		if(this.y  + this.dy > canvas.height){
			document.location.reload() ;
		}
	}

}

var ball = new Ball(canv.width / 2, canv.height - 78, 30, "blue") ;
// var paddle = new Brick(canv.width / 2, canv.height, 50, 40, "green") ; 
// c.fillRect(0, 0, canv.width, canv.height) ; 
// c.clearRect(100, 100, 200, 300) ;


function keyDownHandler(e){
		if(e.keyCode == 39 ){
			 paddle.rightPressed = true ;
		}else if(e.keyCode == 37){
			paddle.leftPressed = true ;

		}
	}

function keyUpHandler(e){
		if(e.keyCode == 39 ){
			paddle.rightPressed = false ;
		}else if(e.keyCode == 37){
			paddle.leftPressed = false ;
		}
	}

window.addEventListener('keydown', keyDownHandler) ;
window.addEventListener('keyup', keyUpHandler) ;

function animate(){
	requestAnimationFrame(animate)
	c.clearRect(0, 0, canv.width, canv.height) ;
	// http://codetheory.in/why-clearrect-might-not-be-clearing-canvas-pixels/
	// Check the above link to understand why I made a call to beginPath()
	c.beginPath() ;
	ball.draw() ;
	// paddle.rightPressed = true ; 
	// paddle.leftPressed = true ; 
	paddle.draw() ;
	ball.update() ;
}

animate() ;
