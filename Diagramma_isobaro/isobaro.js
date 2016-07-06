(function(){

// restutuisce un nodo id del DOM
function $_id(node){
	return document.getElementById(node);
}

// restutuisce un nodo tag del DOM
function $_tag(tag){
	return document.getElementsByTagName(tag);
}

// crea un nuovo tag SVG sul dato NameSpace
function $_ceNS(tag){
	return document.createElementNS("http://www.w3.org/2000/svg", tag);
}

// disegna una linea
function drawLine(svg, x1, x2, y1, y2, color, dash){
	var line = $_ceNS("line");
	
	var dashArr = dash || 0;

	line.setAttribute("x1", x1);
	line.setAttribute("x2", x2);
	line.setAttribute("y1", y1);
	line.setAttribute("y2", y2);
	line.setAttribute("stroke", color);
	line.setAttribute("stroke-dasharray", dashArr);

	svg.appendChild(line);
}

// inserisce un testo
function addText(svg, x, y, content, color){
	var tx = $_ceNS("text");
	
	tx.setAttribute("x", x);
	tx.setAttribute("y", y);
	tx.setAttribute("fill", color);
	tx.textContent = content;
	
	svg.appendChild(tx);
}

var svg;

// inizializza i contenuti
function initialize(){
	svg = $_tag("svg")[0];
	var color = "red";
	var colorText = "green";
	
	addText(svg, 3, 365, "A", colorText);
	drawLine(svg, 0, 90, 350, 300, color);
		addText(svg, 95, 316, "B", colorText);
		addText(svg, 90, 296, "solido ↔ liquido", colorText);
	
		drawLine(svg, 90, 90, 400, 300, color, 3);
		addText(svg, 205, 316, "C", colorText);
		
		drawLine(svg, 0, 100, 300, 300, color, 3);
	drawLine(svg, 90, 200, 300, 300, color);
		drawLine(svg, 200, 200, 300, 400, color, 3);
	drawLine(svg, 200, 290, 300, 200, color);
	addText(svg, 295, 216, "D", colorText);
		
		drawLine(svg, 290, 0, 200, 200, color, 3);
		drawLine(svg, 290, 290, 200, 400, color, 3);
	drawLine(svg, 290, 400, 200, 200, color);
	addText(svg, 405, 216, "E", colorText);	
	addText(svg, 284, 196, "liquido ↔ vapore", colorText);

		drawLine(svg, 400, 400, 200, 400, color, 3);
	drawLine(svg, 400, 500, 200, 100, color, 3);
	
	addText(svg, 530, 100, "AB = Aumento della temperatura ed energia cinetica delle particelle", colorText);
	addText(svg, 530, 120, "BC = Calore latente di fusione", colorText);
	addText(svg, 530, 140, "CD = Aumento della temperatura ed energia cinetica delle particelle", colorText);
	addText(svg, 530, 160, "DE = Calore latente di evaporazione", colorText);
		
}

// passa i dati inizializzati nell'HTML 
window.onload = initialize;

})();