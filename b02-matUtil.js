/*
 * author: Nadeem Elahi
 * nadeem.elahi@gmail.com
 * nad@3deem.com
 * license: gpl v3
 */
"use strict"; 

// matrix operations - transpose 
// converts 1D col major to row major
var matUtil = {
	
	print4Dvector : function ( vec ) {

		var idx , 
			lim = vec.length ,
			dim = 4 ;

		for ( idx = 0 ; idx < lim ; idx += dim ) {

			console.log ( 
				( vec [ idx ] ).toFixed(2) + "  " +
				( vec [ idx + 1 ] ).toFixed(2) + "  " +
				( vec [ idx + 2 ] ).toFixed(2) + "  " +
				( vec [ idx + 3 ] ).toFixed(2) + "  " 
			);

		}
	},

	print1D4x4mat : function ( mat ) {
		var idx , inc = 4 , lim = 16 ;

		for ( idx = 0 ; idx < lim ; idx += inc ) {

			console.log(
				( mat[idx] ).toFixed(2) + "  " +
				( mat[idx + 1] ).toFixed(2) + "  " +
				( mat[idx + 2] ).toFixed(2) + "  " +
				( mat[idx + 3] ).toFixed(2) + "  " 
			);
				
		}
	},

	print2D4x4mat : function ( mat ) {

		var idx , lim = 4 ;

		for ( idx = 0 ; idx < lim ; idx ++ ) {

			console.log(
				( mat[idx][0] ).toFixed(2) + "  " +
				( mat[idx][1] ).toFixed(2) + "  " +
				( mat[idx][2] ).toFixed(2) + "  " +
				( mat[idx][3] ).toFixed(2) + "  " 
			);
				
		}
	},


	// row major 4x4 by 1x4
	// column major 1x4 by 4x4
	multiply1x4times4x4 : function ( vec , four ) {

		var idx, 
			len = vec.length ,
			cnt = len / 4 ,
			cpy = new Float32Array( len );

		for ( idx = 0 ; idx < len ; idx ++ ) {
			cpy[idx] = vec[idx];
		}

		function multiply ( offset ) {

			var idx, jdx , vecdx , cpydx , lim = 4 ;
			
			for ( idx = 0 ; idx < lim ; idx ++ ) {

				vecdx = lim*offset + idx;
				vec[ vecdx ] = 0;

				for ( jdx = 0 ; jdx < lim ; jdx ++ ) {

					cpydx = lim*offset + jdx;

					//console.log( vecdx , cpydx , idx + jdx*lim ) ;
					vec[ vecdx ] += cpy[ cpydx ] * four[ idx + jdx*lim ]
				}
			}
		}

		for ( idx = 0 ; idx < cnt ; idx ++ ) {
			multiply( idx ) ;
		}

	},

	// col maj
	multiply4x4s : function ( mata , matb , result ) {

		var idx , jdx , kdx , lim = 4 ,
			resdx ;

		for ( idx = 0 ; idx < lim ; idx ++ ){

			for ( jdx = 0 ; jdx < lim ; jdx ++ ){


				//console.log("---"); //console.log( idx*lim + jdx ); //console.log( idx , idx + 1*lim , idx + 2*lim , idx + 3*lim   ); // mata adx //console.log( jdx*lim, jdx*lim + 1, jdx*lim + 2, jdx*lim + 3,); // matb bdx

				resdx = idx*lim + jdx;
				//result[resdx] = 
				//mata[ idx + 0*lim ] * matb[ jdx*lim + 0 ] + 
				//mata[ idx + 1*lim ] * matb[ jdx*lim + 1 ] + 
				//mata[ idx + 2*lim ] * matb[ jdx*lim + 2 ] + 
				//mata[ idx + 3*lim ] * matb[ jdx*lim + 3 ]  
					;
				result[resdx] = 0;

				for ( kdx = 0 ; kdx < lim ; kdx ++ ){
					
					result[resdx] += 
						mata[ idx + kdx*lim ] *
						matb[ jdx*lim + kdx ] 
						;

				}


			}
		}

	},



	
	transpose1D_ColMaj2RowMaj : function( mat ) {


		var idx , jdx , lim = 4 ,
			srcdx , dstdx ;

		var tmp = new Float32Array(16);

		for ( idx = 0 ; idx < 16 ; idx ++ ) {

			tmp[idx] = mat[idx] ;
		}

		for ( idx = 0 ; idx < lim ; idx ++ ) {
			for ( jdx = 0 ; jdx < lim ; jdx ++ ) {

				srcdx = idx * lim + jdx;
				dstdx = jdx * lim + idx;
				//console.log ( srcdx , dstdx );

				mat[ dstdx ] = tmp [ srcdx ]; 
			}
		}
	},

	transposeRowMaj2ColMaj : function( mat ) {


		var idx , jdx , lim = 4 ,
			srcdx , dstdx ;

		var tmp = new Float32Array(16);

		for ( idx = 0 ; idx < 16 ; idx ++ ) {

			tmp[idx] = mat[idx] ;
		}

		for ( idx = 0 ; idx < lim ; idx ++ ) {
			for ( jdx = 0 ; jdx < lim ; jdx ++ ) {

				srcdx = idx * lim + jdx;
				dstdx = jdx * lim + idx;
				//console.log ( srcdx , dstdx );

				mat[ srcdx ] = tmp [ dstdx ]; 
			}
		}
	},

	rowMaj1D_to_rowMaj2D : function ( mat1d , mat2d ) {

		var idx , jdx , lim = 4 ,
			srcdx ;

		for ( idx = 0 ; idx < lim ; idx ++ ) {
			for ( jdx = 0 ; jdx < lim ; jdx ++ ) {

				srcdx = jdx + idx * lim;
				//console.log( srcdx , idx , jdx );
				mat2d[ idx ][ jdx ] = mat1d[ srcdx ];

			}
		}


	},


	rowMaj2D_to_rowMaj1D : function ( mat1d , mat2d ) {

		var idx , jdx , lim = 4 ,
			srcdx ;

		for ( idx = 0 ; idx < lim ; idx ++ ) {
			for ( jdx = 0 ; jdx < lim ; jdx ++ ) {

				srcdx = jdx + idx * lim;
				//console.log( srcdx , idx , jdx );
				mat1d[ srcdx ] = mat2d[ idx ][ jdx ] ;

			}
		}


	},

	make4x4array : function () {
		return [
			[0,0,0,0],
			[0,0,0,0],
			[0,0,0,0], 
			[0,0,0,0]  
		]
	},


	inverse2Dmat : function ( eh , iv ) {

		var em = this.make4x4array();
		
		var idexs , jdexs , 
			idexBig , idexMd , idexSm ,
			jdexBig , jdexMd , jdexSm ,
			cnt ;

		var idx , jdx , lim = 5 ;

		for ( idx = 1 ; idx < lim ; idx ++ ) {
			for ( jdx = 1 ; jdx < lim ; jdx ++ ) {

				idexs = [];
				jdexs = [];

				for ( cnt = 1 ; cnt < lim ; cnt ++ ){ 
					if ( cnt != idx )
						idexs.push(cnt);

					if ( cnt != jdx ) 
						jdexs.push(cnt);
				}

				idexBig = idexs.pop(); 
				jdexBig = jdexs.pop();
				idexSm = idexs.shift(); 
				jdexSm = jdexs.shift();
				idexMd = idexs.shift(); 
				jdexMd = jdexs.shift();

				em[idx-1][jdx-1] = 
					eh[idexSm-1][jdexSm-1]
					*eh[idexMd-1][jdexMd-1]
					*eh[idexBig-1][jdexBig-1]

					+ eh[idexSm-1][jdexMd-1]
					*eh[idexMd-1][jdexBig-1]
					*eh[idexBig-1][jdexSm-1]

					+ eh[idexSm-1][jdexBig-1]
					*eh[idexMd-1][jdexSm-1]
					*eh[idexBig-1][jdexMd-1] 

					- eh[idexSm-1][jdexBig-1]
					*eh[idexMd-1][jdexMd-1]
					*eh[idexBig-1][jdexSm-1]

					- eh[idexSm-1][jdexMd-1]
					*eh[idexMd-1][jdexSm-1]
					*eh[idexBig-1][jdexBig-1]

					- eh[idexSm-1][jdexSm-1]
					*eh[idexMd-1][jdexBig-1]
					*eh[idexBig-1][jdexMd-1] 
				;


			}
		}

		function calcSign ( idx , jdx ) {
			if ( (idx + jdx ) % 2 ) return -1; // odd
			else return 1; // even
		}

		var sign ;

		for ( idx = 1 ; idx < lim ; idx ++ ) {
			for ( jdx = 1 ; jdx < lim ; jdx ++ ) {

				sign = calcSign ( idx , jdx ) ;

				iv[idx-1][jdx-1] = sign * em[jdx-1][idx-1];
			}
		}

		/*
		 * https://semath.info/src/determinant-four-by-four.html
		 *
		 * det = a11*m11 - a21*m21 + a31*m31 - a41*m41
		 *
		 * offset index starting at 0 instead of so -1
		 * det = a00*m00 - a10*m10 + a20*m20 - a30*m30
		 *
		 */
		var det = eh[0][0]*em[0][0] - eh[1][0]*em[1][0] + eh[2][0]*em[2][0] - eh[3][0]*em[3][0];

		/* 
		 * Inverse:
		 * https://semath.info/src/inverse-cofactor-ex4.html
		 * 
		 * says the cofactor matrix is called the adjucate
		 */
		var idx , jdx , lim = 4;
		for ( idx = 0 ; idx < lim ; idx ++ ) {
			for ( jdx = 0 ; jdx < lim ; jdx ++ ) {
				iv[idx][jdx] = iv[idx][jdx] / det;	
			}
		}

	}




	
};
