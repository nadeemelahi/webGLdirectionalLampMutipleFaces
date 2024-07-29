/*
 * author: Nadeem Elahi
 * nadeem.elahi@gmail.com
 * nad@3deem.com
 * license: gpl v3
 */
"use strict"; 

var gl = ngl.get_gl() ,

	cw = ngl.get_cw() , 
	ch = ngl.get_ch() ,

	clr = [ 0.1 , 0.1 , 0.1 ] ,

	startIdx = 0 ,

	dimVec = 4 ,
	dimClr = 3 
;

ngl.configureDraw( clr , 0 , 0 , cw , ch );


/* 
 * 3 faces + base - pyramid
 * base verts 0, 120, 240
 *  < cos a , sin a , 0 >
 *   0: < 1 , 0 , 0 >
 * 120: < cos 120 , sin 12
 * 240:
 *
 */


function simplestPyramid( verts ) {

	// each verts 4d: < x , y , z , w >

	// 3 verts - base
	// 1 vert - tip
	
	function d2r( deg ) { return ( deg * (3.1416 / 180) ); }

	var idx = 0 , rad ; 

	//verts[ ++idx ] = 1; // x
	verts[ 0 ] = 1; // x
	verts[1] = 0; // y
	verts[2] = 0; // z
	verts[3] = 1; // w

	rad = d2r(120);

	verts[4] = Math.cos( rad );
	verts[5] = Math.sin( rad );
	verts[6] = 0;
	verts[7] = 1;

	rad = d2r(240);

	verts[8] = Math.cos( rad );
	verts[9] = Math.sin( rad );
	verts[10] = 0;
	verts[11] = 1;

	verts[12] = 0;
	verts[13] = 0;
	verts[14] = 1;
	verts[15] = 1;

}

var pyramidVerts = new Float32Array(16);
simplestPyramid( pyramidVerts ) ;

console.log("---");
//matUtil.print4Dvector( pyramidVerts );

function generateVertsByIndicies( 
	indicies , 
	inputVerts , 
	outputVerts 
) {

	var idx , step = 4 , ilim = indicies.length;

	var jdx , jlim = 4;

	for ( idx = 0 ; idx < ilim ; idx ++ ) {


		// outputVerts [step*idx + 0 ]; +0,1,2,3 -- jdx
		// inputVerts [ step*indicies[idx] + 0 ] ; +0,1,2,3 -- jdx

		for ( jdx = 0 ; jdx < jlim; jdx ++ ) {
			outputVerts [ step*idx + jdx ] =
				inputVerts [ step*indicies[idx] + jdx ] ;
		}

	}
}

// vert indicies 0 , 1 , 2 , 3(tip of pyramid)
var indicies = [

	0 , 2 , 1 
	,
	0 , 1 , 3
	,
	1 , 2 , 3
	,
	2 , 0 , 3
];

var cnt = indicies.length;
var verts = new Float32Array( cnt * dimVec ); // 4D each
generateVertsByIndicies(
	indicies,
	pyramidVerts,
	verts
);

console.log("---");
//matUtil.print4Dvector( verts );

var halfScale = nmg.genScaleMatrix(0.5,0.5,0.5);
var rotx90 = nmg.genRotateAboutXmatrix(-90); // left hand rule

matUtil.multiply1x4times4x4( verts , halfScale);
matUtil.multiply1x4times4x4( verts , rotx90);

var roty1 = nmg.genRotateAboutYmatrix(1);

var coloursBkup = new Float32Array(
	[ 
		1.0 , 1.0 , 1.0 ,
		1.0 , 1.0 , 1.0 ,
		1.0 , 1.0 , 1.0 ,
		
		1.0 , 0.0 , 1.0 ,
		1.0 , 0.0 , 1.0 ,
		1.0 , 0.0 , 1.0 ,

		0.0 , 1.0 , 1.0 ,
		0.0 , 1.0 , 1.0 ,
		0.0 , 1.0 , 1.0 ,

		1.0 , 1.0 , 0.0 ,
		1.0 , 1.0 , 0.0 ,
		1.0 , 1.0 , 0.0 ,
	]
);
var clen = coloursBkup.length;

var colours;
function resetColours(){
	for ( var idx = 0 ; idx < clen ; idx ++ ) {
		//colours[idx] = coloursBkup[idx];
		colours[idx] = 1.0;
	}
}


var light = [ 0 , 0 , -1 ] ; // camera lamp
var dlampL = cnt/3; // each 3 verts represents a face
var normals , dlamp ; 


//
drawframe();
function drawframe(){

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	ngl.loadAttribute ( "vert" , verts , dimVec );

	
	// colours
	colours = new Float32Array( clen );
	resetColours(colours);

	//{ x: null , y: null , z: null } 
	// 3 indidies is 1 face
	// each normal is < x , y , z >
	
	normals = new Array( cnt); // 1 normal per face 
	calculateAllNormals ( verts , normals , cnt );


	dlamp = new Array(dlampL)
	dotProduct( normals , dlamp , dlampL , light );



	lightFactoring( colours , dlamp );



	ngl.loadAttribute ( "colour" , colours , dimClr );
	
	
	// DRAW
	gl.drawArrays(gl.TRIANGLES, startIdx, cnt);

	matUtil.multiply1x4times4x4( verts , roty1 );

	setTimeout( drawframe , 70 );

}

