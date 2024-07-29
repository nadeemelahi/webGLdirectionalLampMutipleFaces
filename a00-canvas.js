/*
 * author: Nadeem Elahi
 * nadeem.elahi@gmail.com
 * nad@3deem.com
 * license: gpl v3
 */
"use strict"; 

var ngl = new function (){
	var canvas = document.body.children[0];
	canvas.width=window.innerWidth;
	canvas.height=window.innerHeight;
	this.get_cw = function(){ return canvas.width; };
	this.get_ch = function(){ return canvas.height; };

	var gl = canvas.getContext('webgl');
	if(!gl) { console.log("no gl support"); return; }

	this.get_gl = function(){
		return gl;
	};

	var vshdr = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vshdr
		, document.getElementById('vertex-shader-2d').text
	);
	gl.compileShader(vshdr);

	var fshdr = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fshdr 
		, document.getElementById('fragment-shader-2d').text
	);
	gl.compileShader(fshdr);

	var shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram,vshdr); 
	gl.attachShader(shaderProgram,fshdr);
	gl.linkProgram(shaderProgram);
	gl.useProgram(shaderProgram);

	this.get_shaderProgram = function(){
		return shaderProgram;
	};

	
	this.loadAttribute = function(vertsName, verts, dim){
		// transfer data to gpu
		gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer() );
		gl.bufferData(gl.ARRAY_BUFFER , verts , gl.STATIC_DRAW);

		// ---------point attribute location
		var ptr = gl.getAttribLocation(shaderProgram, vertsName);

		gl.vertexAttribPointer(ptr
			, dim 
			, gl.FLOAT,false,0,0
		);
		gl.enableVertexAttribArray(ptr);

		// unbind
		gl.bindBuffer(gl.ARRAY_BUFFER,null);

	};

	this.configureDraw = function( clr , 
		x0 , y0 , cw , ch ){

		gl.clearColor(
			clr[0],
			clr[1],
			clr[2],
			1.0
		);
		gl.enable(gl.DEPTH_TEST); 
		gl.viewport( x0 , y0 ,
			cw , ch );
		//canvas.width,canvas.height);
	};
};

