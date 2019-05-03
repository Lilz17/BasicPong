

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
	}

	draw(){
		// beginPath just clears everything and restarts 
		c.beginPath() ;
		c.fillStyle = this.color ;
		c.rect(this.x, this.y, this.sizex, this.sizey) ;
		c.fill() ; 
	}
}

class Ball{

	constructor(x, y, radius, color){
		this.x = x ; 
		this.y = y ; 
		this.radius = radius ; 
		this.color = color ;
		this.dx = 2 ;
		this.dy = -2 ; 
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
		}else if(this.y + this.radius > canvas.height || this.y - this.radius < 0){
			this.dy *= -1 ; 
		}
	}

}

var ball = new Ball(canv.width / 2, canv.height - 78, 30, "blue") ;
// var paddle = new Brick(canv.width / 2, canv.height, 50, 40, "green") ; 

var paddle = new Brick(canv.width / 2 - 45 , canv.height - 40, 80 , 40, "green") ; 
// c.fillRect(0, 0, canv.width, canv.height) ; 
// c.clearRect(100, 100, 200, 300) ;


function animate(){
	requestAnimationFrame(animate)
	c.clearRect(0, 0, canv.width, canv.height) ;
	// http://codetheory.in/why-clearrect-might-not-be-clearing-canvas-pixels/
	// Check the above link to understand why I made a call to beginPath()
	c.beginPath() ;
	ball.draw() ;
	paddle.draw() ;
	ball.update() ;
}

animate() ;
