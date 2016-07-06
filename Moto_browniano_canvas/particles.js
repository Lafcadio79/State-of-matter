
//Particle class
function Particle(x,y, color){
	this.x = x;
	this.y = y;
	this.color = color;
	
	this.getX = function(){
		return this.x;
	}
	
	this.getY = function(){
		return this.y;
	}
	
	this.getColor = function(){
		return this.color;
	}
	
	this.setX = function(x){
		this.x = x;
	}
	
	this.setY = function(y){
		this.y = y;
	}
	
	this.setColor = function(color){
		this.color = color;
	}
	
	this.movement = function(angle){
		this.setX(this.x + Math.cos(angle)*20);
		this.setY(this.y + Math.sin(angle)*20);
	}
	
	this.drawParticle = function(x, y, color, canvas){
		canvas.beginPath();
		canvas.arc(x, y, 2, 0, 2*Math.PI);
		canvas.fillStyle = color;
		canvas.fill();
		canvas.stroke();
		canvas.closePath();	
	}
	
	this.stampaValori = function(){
		return "<p>X: " + this.x + 
					" Y: " + this.y + "</p>";
	}
}

//draw canvas with axis, particle points and path
function canvas(){
    var c = document.getElementById('lavagna');
    var context = c.getContext("2d");
    drawAxis(context);
    generatePoint(a1, context, c.width/2, c.height/2); 
    generatePoint(a2, context, c.width/2, c.height/2); 
    generatePoint(a3, context, c.width/2, c.height/2); 
    generatePoint(a4, context, c.width/2, c.height/2); 
}

function drawAxis(context){
    var c = document.getElementById('lavagna');
    const Ox= c.width/2;   //x origin
    const Oy= c.height/2;  //y origin
    context.moveTo(0,Oy);  // starting point
    context.lineTo(c.width-20,Oy);  //x axis
    context.moveTo(c.width-20,Oy-4);  //x arrow
    context.lineTo(c.width-20,Oy+4);
    context.lineTo(c.width-12,Oy);
    context.lineTo(c.width-20,Oy-4); //end x arrow
    context.moveTo(Ox,20);  //starting point coordinates
    context.lineTo(Ox,c.height-20);  //y axis
    context.moveTo(Ox-4,20);  //y arrow
    context.lineTo(Ox+4,20);
    context.lineTo(Ox,12);
    context.lineTo(Ox-4,20); //end y arrow
    context.stroke();  //draws
    context.fill() //fills arrows
    context.fillStyle="#000";

    context.fillText('x',c.width-20,Oy+10);
    context.fillText('y',Ox+5,20);
    context.fillText('O',Ox+2,Oy+10);
}

function generatePoint(part, canvas,c,d){
	var nodo = document.getElementById("testo");
	part.drawParticle(part.getX()+c, part.getY()+d, part.getColor(), canvas);
	for(var i = 0; i < 100; i++){
		nodo.innerHTML += part.stampaValori();
		part.drawParticle(part.getX()+c, part.getY()+d, part.getColor(), canvas);
		canvas.beginPath();
		canvas.moveTo(part.getX()+c, part.getY()+d, canvas);
		part.movement(Math.round(Math.random()*360));
		canvas.lineTo(part.getX()+c, part.getY()+d, canvas);
		canvas.stroke();
		canvas.closePath();
	}
	part.drawParticle(part.getX()+c, part.getY()+d, part.getColor(), canvas);		
}

//Global Object
//var a1 = new Particle(0, 0, "green");
//var a2 = new Particle(0, 0, "white");
var a1 = new Particle(0, 0, "yellow");
//var a4 = new Particle(0, 0, "grey");

function initialize(){
	canvas();
}

window.onload = initialize;