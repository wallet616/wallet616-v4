/*
 * Created by: Wallet616
 * Description: This is a private file. I do not allow 
 *   anybody to copy content or part of content, of this file.
 *   If you are interested in creating something similar for You,
 *   just write to me mail.
 */

/*
 * Bg object
 */
var Bg = {
	// Variables
	sizeX: null,
	sizeZ: null,
	mouseX: null,
	mouseY: null,
	destX: null,
	destY: null,
	deltaX: null,
	deltaY: null,
	destContentX: null,
	destContentY: null,
	deltaContentX: null,
	deltaContentY: null,
	currentPosition: 0,
	positionDeltaX: 0,
	positionDeltaY: 0,
	scrollLock: false,
	
	checking: false,
	
	// Shapes
	l0X: [0.333, 0.333, 0.270],
	l0Y: [0.203, 0.203, 0.570],
	l1X: [0.445, 0.440, 0.441],
	l1Y: [0.400, 0.410, 0.418],
	l2X: [0.550, 0.270, 0.590],
	l2Y: [0.210, 0.570, 0.890],
	
	// Functions
	calc: function() {
		this.destX = -0.25 * this.sizeX + 0.07 * (this.mouseX - 0.25 * this.sizeX) + this.positionDeltaX;
		this.destY = -0.25 * this.sizeY + 0.07 * (this.mouseY - 0.25 * this.sizeY) + this.positionDeltaY;
		
		if (this.destX > this.deltaX) {
			this.deltaX = this.deltaX + (this.destX - this.deltaX) * 0.05;
			this.deltaContentX = this.deltaContentX + (this.destContentX - this.deltaContentX) * 0.09 + 0.003 * (this.mouseX - 0.25 * this.sizeX);
		} else if (this.destX < this.deltaX) {
			this.deltaX = this.deltaX - (this.destX + this.deltaX) * 0.05;
			this.deltaContentX = this.deltaContentX - (this.destContentX + this.deltaContentX) * 0.09 + 0.003 * (this.mouseX - 0.25 * this.sizeX);
		}
		
		if (this.destY > this.deltaY) {
			this.deltaY = this.deltaY + (this.destY - this.deltaY) * 0.05;
			this.deltaContentY = this.deltaContentY + (this.destContentY - this.deltaContentY) * 0.09 + 0.005 * (this.mouseY - 0.25 * this.sizeY);
		} else if (this.destY < this.deltaY) {
			this.deltaY = this.deltaY - (this.destY + this.deltaY) * 0.05;
			this.deltaContentY = this.deltaContentY - (this.destContentY + this.deltaContentY) * 0.09 + 0.005 * (this.mouseY - 0.25 * this.sizeY);
		}
		
		if (Math.abs(this.destX - this.deltaX) < 2) {
			this.deltaX = this.destX;
		}
		if (Math.abs(this.destY - this.deltaY) < 2) {
			this.deltaY = this.destY;
		}
		
		this.moveBg();
	},
	
	moveNeed: function () {
		if (!this.checking) {
			this.checking = true;
			
			// Draw it at least once
			this.calc();
			
			// Check it there is need to recalc positions and draw it more times
			setTimeout(function(){ 
				Bg.checking = false;
				if (Bg.destX != Bg.deltaX || Bg.destY != Bg.deltaY) Bg.moveNeed(); 
			}, 15);
		}
	},
	
	moveBg: function() {
		
		// Moving content
		var contentX = -0.25 * this.sizeX + 0.07 * (this.mouseX - 0.25 * this.sizeX) + this.positionDeltaX;
		var contentY = -0.25 * this.sizeY + 0.07 * (this.mouseY - 0.25 * this.sizeY) + this.positionDeltaY;
		document.getElementById("content").style.top = this.deltaContentY + "px";
		document.getElementById("content").style.left = this.deltaContentX + "px";
		
		// Initialization
		var canvas = document.getElementById("canvasBg");
		var ctx = canvas.getContext("2d");
		
		// Colors
		var redBg = ctx.createLinearGradient(0, 0, 0.3 * this.sizeX, this.sizeY);
		redBg.addColorStop(0, "#7D0000");
		redBg.addColorStop(0.5, "#D90000");
		redBg.addColorStop(1, "#850000");
		
		// Saving default ctx staus
		ctx.save();
		
		// Moving background
		ctx.translate(-this.deltaX, -this.deltaY);
		ctx.fillStyle = redBg;
		ctx.fillRect(0, 0, this.sizeX, this.sizeY);
		// Drawing shapes
		for (var i = 0; i < this.l0X.length; i++) {
			// Seting color for shape
			var color = ctx.createLinearGradient(0, 0, 1.5 * this.l0X[i] * this.sizeX, 1.5 * this.l0Y[i] * this.sizeY);
			ctx.fillStyle = color;
			color.addColorStop(0, "#40494A");
			color.addColorStop(1, "#000000");
				
			ctx.beginPath();
			ctx.moveTo(this.l0X[i] * this.sizeX, this.l0Y[i] * this.sizeY);
			ctx.lineTo(this.l1X[i] * this.sizeX, this.l1Y[i] * this.sizeY);
			ctx.lineTo(this.l2X[i] * this.sizeX, this.l2Y[i] * this.sizeY);
			
			// Adding shadow
			ctx.shadowColor = '#000000';
			ctx.shadowBlur = 15;
			ctx.shadowOffsetX = -2;
			ctx.shadowOffsetY =5;
			
			ctx.closePath();
			ctx.fill();
		}
			
		// Cleaning up
		ctx.restore();
	}
};

/*
 * Autoload scripts
 */
(function() {
	document.addEventListener('DOMContentLoaded', function(e) {
		resizeChecker();
		
		Bg.moveNeed();
		$( window ).resize(function() {
			Bg.moveNeed();
		});
		
		galery_current = 0;
		galeria_int();
		
		// Dots
		var m_how_many_dots = 3;
		var j = 0;
		for (var c = 0; 3 * m_how_many_dots > c; c++) {
			if (c == 0 || c % (m_how_many_dots + 1) == 0) {
				document.getElementById("bar").innerHTML += '<div id="bar_hitbox_id_' + j + '" class="bar_square"><div id="bar_id_' + j + '" class="bar_square_center"></div></div>';
				j++;
			} else {
				document.getElementById("bar").innerHTML += '<div id="bar_id_" class="bar_dot"></div>';
			};
		};
		document.getElementById("bar_id_0").style.backgroundColor = "#F0F0F0";
		document.getElementById("bar_hitbox_id_" + 0).addEventListener('click', function(e){scrollMove(undefined, 0);}, false);
		document.getElementById("bar_hitbox_id_" + 1).addEventListener('click', function(e){scrollMove(undefined, 1);}, false);
		document.getElementById("bar_hitbox_id_" + 2).addEventListener('click', function(e){scrollMove(undefined, 2);}, false);
	}, false);
	
	document.addEventListener('mousemove', function(e){
		Bg.mouseX = e.clientX;
		Bg.mouseY = e.clientY;
		Bg.moveNeed();
	}, false);
	
	document.addEventListener("mousewheel", scrollMove, false);
	document.addEventListener("DOMMouseScroll", scrollMove, false);
	//document.addEventListener("contextmenu", function(e) { e.preventDefault();});
	
})();


function scrollMove(e, se) {
	if (!Bg.scrollLock) {
		document.getElementById("bar_id_" + Bg.currentPosition).style.backgroundColor = "#292929";
		if (e == undefined) {
			Bg.currentPosition = se;
		} else {
			e.stopPropagation();
			
			var sitesAmmount = 3;
			Bg.scrollLock = true;
			
			if (e.wheelDelta > 0) {
				Bg.currentPosition--;
				if (Bg.currentPosition < 0) Bg.currentPosition = sitesAmmount - 1;
			} else {
				Bg.currentPosition++;
				if (Bg.currentPosition > sitesAmmount - 1) Bg.currentPosition = 0;
			}
		}
		document.getElementById("bar_id_" + Bg.currentPosition).style.backgroundColor = "#F0F0F0";
		
		switch (Bg.currentPosition) {
		case 0:
			Bg.positionDeltaX = 0;
			Bg.positionDeltaY = 0;
			Bg.destContentX = 0;
			Bg.destContentY = 0;
			break;
		case 1:
			Bg.positionDeltaX = 0.15 * Bg.sizeX;
			Bg.positionDeltaY = -0.15 * Bg.sizeY;
			Bg.destContentX = -0.5 * Bg.sizeX;
			Bg.destContentY = 0.5 * Bg.sizeY;
			break;
		case 2:
			Bg.positionDeltaX = -0.15 * Bg.sizeX;
			Bg.positionDeltaY = 0;
			Bg.destContentX = 0.5 * Bg.sizeX;
			Bg.destContentY = 0;
			break;
		}
		Bg.moveNeed();
		
		setTimeout(function(){ Bg.scrollLock = false; }, 500);
	}
}

function resizeChecker(arg1, arg2) {
	var val1 = document.body.offsetWidth;
	var val2 = document.body.offsetHeight;
	if (arg1 != val1 || arg2 != val2) {
		resize(val1, val2);
		Bg.sizeX = val1 * 2;
		Bg.sizeY = val2 * 2;
		Bg.mouseX = val1 / 2;
		Bg.mouseY = val2 / 2;
		Bg.deltaX = 0.25 * Bg.sizeX + 0.07 * (Bg.mouseX - 0.25 * Bg.sizeX);
		Bg.deltaY = 0.25 * Bg.sizeY + 0.07 * (Bg.mouseY - 0.25 * Bg.sizeY);
		
		Bg.moveNeed();
	}
	setTimeout(function(){resizeChecker(val1, val2); }, 100);
	
	function resize(val1, val2) {
		if (val1 - 500 > 0) {
			document.getElementById("logo").style.marginTop = (val2 - document.getElementById("logo").offsetHeight) / 2 + "px";
			document.getElementById("logo").style.marginBottom = (val2 - document.getElementById("logo").offsetHeight) / 2 + "px";
			document.getElementById("about").style.marginTop = (val2 - document.getElementById("about").offsetHeight) / 2 + "px";
			document.getElementById("about").style.marginBottom = (val2 - document.getElementById("about").offsetHeight) / 2 + "px";
			document.getElementById("galery").style.marginTop = (val2 - document.getElementById("galery").offsetHeight) / 2 + "px";
			document.getElementById("galery").style.marginBottom = (val2 - document.getElementById("galery").offsetHeight) / 2 + "px";
		}
		document.getElementById("canvasBg").setAttribute("width", val1 + "px");
		document.getElementById("canvasBg").setAttribute("height", val2 + "px");
	}
}

// Galeria
function galeria(galery_next) {
	if (galery_id.length >= 0 && galery_next <= galery_id.length && galery_next >= 0 && galery_next != galery_current) {	
		galeria_akcja = 1;
		
		if (galery_current > galery_next) {
			wincyj = 300;
			mnij = 600;
		} else {
			wincyj = 600;
			mnij = 300;
		};
		
		$(galery_id[galery_next - 3 + 0]).animate({width: "0px", height: "0px", marginTop: "0px", opacity: "0"}, {duration: mnij, queue: false});
		$(galery_id[galery_next - 3 + 0]).promise().done(function(){
			$(galery_id[galery_next - 3 + 0]).css({"z-index": "5"});
		});
		$(galery_id[galery_next - 2 + 0]).animate({width: "40%", height: "54px", marginTop: "0px", opacity: "0.5"}, {duration: mnij, queue: false});
		$(galery_id[galery_next - 2 + 0]).promise().done(function(){
			$(galery_id[galery_next - 2 + 0]).css({"z-index": "10"}).animate({marginTop: "0px"}, {duration: mnij, queue: false});
		});
		$(galery_id[galery_next - 1 + 0]).animate({width: "60%", height: "76px", marginTop: "0px", opacity: "1"}, {duration: mnij, queue: false});
		$(galery_id[galery_next - 1 + 0]).promise().done(function(){
			$(galery_id[galery_next - 1 + 0]).css({"z-index": "15"}).animate({marginTop: "-30px"}, {duration: mnij, queue: false});
		});
		$(galery_id[galery_next - 0 + 0]).animate({width: "100%", height: "260px", marginTop: "0px", opacity: "1"}, {duration: 300, queue: false});
		$(galery_id[galery_next - 0 + 0]).promise().done(function(){
			$(galery_id[galery_next - 0 + 0]).css({"z-index": "20"}).animate({marginTop: "-30px"}, {duration: 300, queue: false});
		});
		$(galery_id[galery_next - 0 + 1]).animate({width: "60%", height: "76px", marginTop: "0px", opacity: "1"}, {duration: wincyj, queue: false});
		$(galery_id[galery_next - 0 + 1]).promise().done(function(){
			$(galery_id[galery_next - 0 + 1]).css({"z-index": "15"}).animate({marginTop: "-30px"}, {duration: wincyj, queue: false});
		});
		$(galery_id[galery_next - 0 + 2]).animate({width: "40%", height: "54px", marginTop: "0px", opacity: "0.5"}, {duration: wincyj, queue: false});
		$(galery_id[galery_next - 0 + 2]).promise().done(function(){
			$(galery_id[galery_next - 0 + 2]).css({"z-index": "10"}).animate({marginTop: "-30px"}, {duration: wincyj, queue: false});
		});
		$(galery_id[galery_next - 0 + 3]).animate({width: "0px", height: "0px", marginTop: "0px", opacity: "0"}, {duration: wincyj, queue: false});
		$(galery_id[galery_next - 0 + 3]).promise().done(function(){
			$(galery_id[galery_next - 0 + 3]).css({"z-index": "5"});
		});
		
		if (galery_id.length >= 4) {
			for (h = 4; h <= galery_id.length; h++) {
				$(galery_id[galery_next - h + 0]).animate({width: "0px", height: "0px", marginTop: "0px", opacity: "0"}, {duration: mnij});
				$(galery_id[galery_next - h + 0]).css({"z-index": "5"});
				$(galery_id[galery_next - 0 + h]).animate({width: "0px", height: "0px", marginTop: "0px", opacity: "0"}, {duration: wincyj});
				$(galery_id[galery_next - 0 + h]).css({"z-index": "5"});
			};
		};
		
		if (galery_next == 0) {
			$('#galery-first').animate({marginTop: "120px"}, {duration: 600, queue: false});
		} else if (galery_next == 1) {
			$('#galery-first').animate({marginTop: "70px"}, {duration: 600, queue: false});
		} else {
			$('#galery-first').animate({marginTop: "10px"}, {duration: 600, queue: false});
		};
		
		galery_current = galery_next;
		
		$('#galery_description').animate({opacity: "0"}, {duration: 300, queue: false});
		$('#galery_description').promise().done(function(){
			var g_current;
			if (galery_current < 10) g_current = "0" + galery_current;
				else g_current = galery_current;
			document.getElementById('galery_description').innerHTML = document.getElementById('galery_description_' + g_current).innerHTML;
			$('#galery_description').animate({opacity: "1"}, {duration: 300, queue: false});
		});
	};
};

// Galeria search and initrialize
function galeria_int() {
	galery_id = $('*[id^="galery_image_"]');
	
	if (galery_id.length >= 0) {
		$(galery_id).click(function(){
			galeria(this.id.substr(14));
		});
		
		$('#galery-first').css({"margin-top": "120px"});
		
		$('#galery_image_00').css({"width": "100%", "height": "260px", "margin-top": "-30px", "opacity": "1", "z-index": 20});
		$('#galery_image_01').css({"width": "60%", "height": "76px", "margin-top": "-30px", "opacity": "1", "z-index": 15});
		$('#galery_image_02').css({"width": "40%", "height": "54px", "margin-top": "-30px", "opacity": "0.5", "z-index": 10});
		$('#galery_image_03').css({"width": "0px", "height": "0px", "margin-top": "0px", "opacity": "0", "z-index": 5});
		
		document.getElementById('galery_description').innerHTML = document.getElementById('galery_description_00').innerHTML;
	};
};


