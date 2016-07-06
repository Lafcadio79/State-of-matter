// parametri generali
var trial = 5; // tentativi prima di passare alla particella successiva
var time = 100; // intervallo di tempo entro cui viene ripetuta la funzione movements() in setInterval()
var boundingbox = 4; // limite di prossimità (raggio*boundingbox)
var minTemp = 4; // soglia per il passaggio di stato  (< minTemp == gas, > minTemp == solido, minTemp == liquido)
var fattRep = 50; // fattore di repulsione


// variabili globali
var p = new Array();
var repeat = undefined;


// classe particella
function Particle(x, y, state){
	this.x = x;
	this.y = y;
	this.s = null;	
	this.state = state || 0;		
			
	this.movement = function(i, attX, attY){
		var angle = Math.random() * 2 * Math.PI;
		var attractX = attX || 0;
		var attractY = attY || 0;
		switch(this.state){
			case 0: this.x += Math.round(Math.cos(angle) * i);
					this.y += Math.round(Math.sin(angle) * i);
					break;
			case 1: this.x += Math.round((Math.cos(angle) + attractX)*i);
					this.y += Math.round((Math.sin(angle) + 1 + attractY)*i);
					if (!edgeHandling(this)) {
						var angle = Math.random() * 2 * Math.PI;
						this.x += Math.cos(angle) * i;
						this.y += (Math.sin(angle) - 3) * i;
					}
					break;
			case 2: this.x += Math.round((Math.cos(angle) + attractX)*i);
					this.y += Math.round((Math.sin(angle) + 1 + attractY)*i);
					break;
		}
	}
	
	this.printValues = function(){
		return "X: " + this.x + 
					" Y: " + this.y + "\n";
	}
	
}

// restituisce un numero casuale all'interno di un dato range
function rangeRandom(min, max, round){
	var val = min + (Math.random()*(max - min));
	if(round)
		val = Math.round(val);
	return val;
}

// restutuisce un nodo Id del DOM
function $_id(id){
	return document.getElementById(id);
}

// restutuisce un nodo Tag del DOM
function $_tag(tag){
	return document.getElementsByTagName(tag);
}

// crea un nuovo elemento sul dato Namespace
function $_ceNS(tag){
	return document.createElementNS("http://www.w3.org/2000/svg", tag);
}

// crea le opzioni per il tag select
function createShapeSelect(){
	var l = {
			"circle":"circle", 
			
			};
	var s = "";
		for (i in l){
			s += '<option value="' + i + '">' + l[i] + '</option>';
	}   
	return s;
}

// restituisce la forma selezionata
function shapeSelected(){
	var shape = $_id("shape");
	var i = 0;
	while ((i < shape.options.length) && !shape.options[i].selected){
		i++;
   }
   return shape.options[i].value;
}


// disegna un cerchio
function drawCircle(svg, cx, cy, r, color){
	var c = $_ceNS('circle');
	c.setAttribute("cx", cx);
	c.setAttribute("cy", cy);
	c.setAttribute("r", r);
	c.setAttribute("fill", "none");	
	c.setAttribute("stroke", color);		
	svg.appendChild(c);
	return c;
}

// muove un cerchio
function moveCircle(i){	

	var ind = i;
	var eX = p[i].x;
	var eY = p[i].y;
	var attempt = 0;
	do{
		i = ind;
		p[i].x = eX;
		p[i].y = eY;
		if(parseInt($_id("scale").value) < minTemp-1){
			p[i].state = 2;
			p[i].s.setAttribute("fill", "blue");
		} else if(parseInt($_id("scale").value) > minTemp+1){
			p[i].state = 0;
			p[i].s.setAttribute("fill", "none");
		} else{
			p[i].state = 1;
			p[i].s.setAttribute("fill", "cyan");
		}
		if (objectsCollision(p[i],i, boundingbox)) 
			attractionRepulsion(p[i],i, boundingbox);
		else
			p[i].movement($_id("scale").value);
				
		if (attempt++ > trial) {
			p[i].x = eX;
			p[i].y = eY;		
			break;
		}
	}while(!edgeHandling(p[i]) || (p[i].state != 1 && objectsCollision(p[i], i)));

	
	spostaAssieme(p[i]);
	
}

function spostaAssieme(part){
	part.s.setAttribute("cx", part.x);
	part.s.setAttribute("cy", part.y);	
}

function attractionRepulsion(obj, ind, proxim){
	var attrx = 0;
	var attry = 0;
	var repx = 0;
	var repy = 0;
	var dx = 0;
	var dy = 0;
	var dist = 0;
	for(var i = 0; i < p.length; i++){
		if (i != ind) {
			dx = p[i].x - obj.x;
			dy = p[i].y - obj.y;
			dist = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));			
			if (dist <= $_id("radius").value * (proxim - 1)){
				dist = Math.pow(dist,2);
				repx += dx/dist;
				repy += dy/dist;
		//		console.log(dist + " " + attrx + " " + attry);
			} else if (dist <= $_id("radius").value * proxim){
				dist = Math.pow(dist,2);
				attrx += dx/dist;
				attry += dy/dist;
	//			console.log(dist + " " + repx + " " + repy);
			}
		}
	}
	if(obj.state == 1)
		obj.movement($_id("scale").value,attrx-(repx*fattRep),attry-(repy*fattRep));
	else if(obj.state == 2)
		obj.movement($_id("scale").value,attrx-repx,attry-repy);
	else
		obj.movement($_id("scale").value);
}

function moveCircles() {
	for(var i = 0; i < p.length; i++) {
		moveCircle(i);
	}
}

// gestisce le collisioni tra particelle e la loro distanza di attrazione/repulsione
function objectsCollision(obj,ind, proxim){
	var proximity = proxim || 2;
	for(var i = 0; i < p.length; i++){
		if (i != ind) {
			var dx = obj.x - p[i].x;
			var dy = obj.y - p[i].y;
			var dist = Math.sqrt((dx*dx)+(dy*dy));
			if(dist <= radius*proximity){
				return true;
			}
		}
	}
	return false;
}

// gestisce le collisioni con le pareti
function edgeHandling(p){
	return p.x > $_id("radius").value && p.x <= svg.getAttribute("width")-$_id("radius").value && p.y > $_id("radius").value && p.y <= svg.getAttribute("height")-$_id("radius").value;
}


function start() {
	// abilita il bottone stop, e disabilita start
	$_id("startBtn").disabled = true;
	$_id("stopBtn").disabled = false;

	setParticles();
	
	var flag = false;
	for(var i = 0; i < p.length; i++){
		if(!objectsCollision(p[i], i)){
			p[i].s = drawCircle(svg, p[i].x, p[i].y, $_id("radius").value, "blue");
		}else{
			p[i].x = rangeRandom(radius,svg.getAttribute("width")-radius, true);
			p[i].y = rangeRandom(radius,svg.getAttribute("height")-radius, true);
			i--;
		}
	}
	repeat = setInterval(moveCircles, time);
	setInterval(function(){$_id("val").innerHTML = (parseInt($_id("scale").value)*10-10) + " °C";}, 0);
}

function stop() {
	// abilita il bottone start, e disabilita stop
	$_id("startBtn").disabled = false;
	$_id("stopBtn").disabled = true;

	// ferma l'esecuzione del metodo moveCircle/Rectangle()
	clearInterval(repeat);

	while(svg.lastChild)
		svg.removeChild(svg.lastChild);
}

// inizializza un array di particelle
function setParticles(){
	svg = $_tag("svg")[0];
	radius = parseInt($_id("radius").value);
	p = [];
	var num = $_id("particles").value;
	for(i = 0; i < num; i++){
	    p[i] = new Particle(rangeRandom(radius,svg.getAttribute("width")-radius, true),rangeRandom(radius,svg.getAttribute("height")-radius, true));
		
	}
}


// funzione di inizializzazione
function initialize(){
	
	var nodeSelect = $_id("shape");
	nodeSelect.innerHTML = createShapeSelect();

	var nodeStart = $_id("startBtn");
	nodeStart.onclick = start;
	nodeSelect.disabled = false;

	var nodeStop = $_id("stopBtn");
	nodeStop.onclick = stop;
	nodeStop.disabled = true;

}

window.onload = initialize;
