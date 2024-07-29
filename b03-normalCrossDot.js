/*
 * author: Nadeem Elahi
 * nadeem.elahi@gmail.com
 * nad@3deem.com
 * license: gpl v3
 */
function lightFactoring( colours , dlamp ){

	// ex) simplest pyramid has  48 verts 
	// 3 side face and 1 base face = 4 tot
	//console.log(dlamp.length);  // 4
	
	//console.log(colours.length); // 4 tot * 3 points per face * 3 channels each = 36

	var idx , ilim = dlamp.length;
	var jdx , jlim = 9 ; // each face with 3 points has 3 colours of 3 channels each = 9
	for ( idx = 0 ; idx < ilim ; idx ++ ) {
		for ( jdx = 0 ; jdx < jlim ; jdx ++ ) {

			//console.log ( idx*jlim + jdx );

			colours[ idx*jlim + jdx ] *= dlamp[idx];

		}
	}
}

function calcLineVector( pt1 , pt2 , ln ){

	// calculate U and V vectors

	ln.x = pt2.x - pt1.x;
	ln.y = pt2.y - pt1.y;
	ln.z = pt2.z - pt1.z;

}


function crossProduct( av , bv , cv ){
	// v - vector
	// <cv> = <av> x <bv>
	//https://www.mathsisfun.com/algebra/vectors-cross-product.html
	//https://mathinsight.org/cross_product_formula
	cv.x = (av.y * bv.z) - (av.z * bv.y) ; 
	cv.y = (av.z * bv.x) - (av.x * bv.z) ; 
	cv.z = (av.x * bv.y) - (av.y * bv.x) ; 
}

function normalize( nrm ) {

	// denominator - magintude of vector <x,y,z>
	var den = Math.sqrt (
		nrm.x * nrm.x
		+ nrm.y * nrm.y
		+ nrm.z * nrm.z 
	) ;

	nrm.x /= den;
	nrm.y /= den;
	nrm.z /= den;

}

// For a single face ie) verts is 3 verts
function calcNormal(
	verts 
	, vertsOffset 
	, nrm 
) {

	// https://www.khronos.org/opengl/wiki/Calculating_a_Surface_Normal

	var pt1 = {} ,
		pt2  = {} , 
		pt3  = {} , 
		ln1  = {} ,  // U vector
		ln2 = {}     // V vector
	;

	pt1.x = verts[vertsOffset + 0];
	pt1.y = verts[vertsOffset + 1];
	pt1.z = verts[vertsOffset + 2];

	pt2.x = verts[vertsOffset + 4];
	pt2.y = verts[vertsOffset + 5];
	pt2.z = verts[vertsOffset + 6];

	pt3.x = verts[vertsOffset + 8];
	pt3.y = verts[vertsOffset + 9];
	pt3.z = verts[vertsOffset +10];

	//console.log( pt1.x , pt1.y , pt1.z ); console.log( pt2.x , pt2.y , pt2.z ); console.log( pt3.x , pt3.y , pt3.z );

	calcLineVector( pt1 , pt2 , ln1 );
	//console.log( ln1.x , ln1.y , ln1.z );

	calcLineVector( pt1 , pt3 , ln2 );
	//console.log( ln2.y , ln2.y , ln2.z );

	//console.log("----");

	crossProduct( ln1 , ln2 , nrm );
	//console.log(nrm.x , nrm.y , nrm.z );

	//console.log("----");
	normalize( nrm );
	//console.log(nrm.x , nrm.y , nrm.z );
}

function calculateAllNormals( verts , normals , cnt ) {
	var idx 
		, ilim = cnt / 3 
		, vertsOffset
		, vertsPerFace = 12 
		, nrm = { x: null , y: null , z: null }
		, vecsPerNorm = 3
	; 

	// calcNormal(verts , nrm);
	//    nrm len 3 x,y,z
	//    verts to be len 12
	//       eachFaceVerts 4D x 3 verts
	
	// ex) simplest pyramid has  48 verts 
	// 4D x 3/face x 4faces = 48

	// loop each face
	for ( idx = 0 ; idx < ilim ; idx ++ ) {

		// ex) simplest pyramid that has 
		//     a base face and 3 side faces 
		//     totally 4 faces
		//
		// console.log( idx ) ; 
		//    --> 0,1,2,3
		//
		vertsOffset = idx * vertsPerFace ;
		// console.log("idxOffset: " + idxOffset);
		//   --> 0, 12 , 24 , 36
		calcNormal( verts , vertsOffset , nrm );

		normals[ vecsPerNorm*idx + 0 ] = nrm.x;
		normals[ vecsPerNorm*idx + 1 ] = nrm.y;
		normals[ vecsPerNorm*idx + 2 ] = nrm.z;
	}
}

function dotProduct( normals , dlamp , dlampL , light) {

	//var light = { x : 0 , y: 0 , z: -1 } ;
	//var light = [ 0 , 0 , -1 ] ;
	var magLight = Math.sqrt (
		(light[0] * light[0])
		+ (light[1] * light[1])
		+ (light[2] * light[2])
	);

	// norm - normal vector of face(3pt triangle)
	// light - directional lighting
	// cos(angle) or factor 
	//  - scalar result of dot product (norm dot light)

	// a . b = |a| |b| cos 
	//
	// a . b = a.x * b.x 
	//       + a.y * b.y 
	//	 + a.z * b.z
	//
	// cos = a . b / ( |a| |b| )

	// https://www.mathsisfun.com/algebra/vectors-dot-product.html
	// we want to the cos a value
	// so we need magnitudes of |norm| and |light|

	var idx 
		, magNorm 
		, mag 
		, dotp 
	;

	for ( idx = 0 ; idx < dlampL ; idx ++ ) {
		//console.log( normals[ idx*3 ] , normals[ idx*3 + 1 ] , normals[ idx*3 + 2 ] );

		magNorm = Math.sqrt (
			( normals[ idx*3 ] * normals[ idx*3 ] )
			+ ( normals[ idx*3 + 1 ] * normals[ idx*3 + 1 ] )
			+ ( normals[ idx*3 + 2 ] * normals[ idx*3 + 2 ] )
		);

		mag = magNorm * magLight;

		dotp = normals[ idx*3 ] * light[0]
			+ normals[ idx*3 + 1 ] * light[1]
			+ normals[ idx*3 + 2 ] * light[2] 
		;

		// cos ( angle )
		dlamp[idx] = dotp / mag;

		if ( dlamp[idx] < 0.2 ) dlamp[idx] = 0.2;

	}
	
}


