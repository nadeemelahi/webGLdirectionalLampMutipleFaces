/*
 * author: Nadeem Elahi
 * nadeem.elahi@gmail.com
 * nad@3deem.com
 * license: gpl v3
 */
"use strict"; 

// matrix generator - data
// COLUMN MAJOR MATRIX LAYOUT CONVENTION REQUIRED
var nmg = {
	
	genIdentityMatrix : function(){
		return new Float32Array ( [
			1.0  ,  0.0  ,  0.0  ,  0.0  ,
			0.0  ,  1.0  ,  0.0  ,  0.0  ,
			0.0  ,  0.0  ,  1.0  ,  0.0  ,
			0.0  ,  0.0  ,  0.0  ,  1.0
		] ) ;
	},


	genTranslationMatrix : function(tx,ty,tz){
		return new Float32Array ( [
			1.0 , 0.0 , 0.0 , 0.0 ,
			0.0 , 1.0 , 0.0 , 0.0 ,
			0.0 , 0.0 , 1.0 , 0.0 ,
			tx  , ty  , tz  , 1.0
		] ) ;
	},

	genScaleMatrix : function(sx,sy,sz){
		return new Float32Array ( [
			sx  , 0.0 , 0.0 , 0.0 ,
			0.0 , sy  , 0.0 , 0.0 ,
			0.0 , 0.0 , sz  , 0.0 ,
			0.0 , 0.0 , 0.0 , 1.0
		] ) ;
	},

	genProjMatrix : function( 
		tx , ty , tz ,
		sx , sy , sz ){

		return new Float32Array ( [
			sx  , 0.0 , 0.0 , 0.0 ,
			0.0 , sy  , 0.0 , 0.0 ,
			0.0 , 0.0 , sz  , 0.0 ,
			tx  , ty  , tz  , 1.0
		] ) ;
	},

	genProjMatrixByEndpoints : function( 
		left , right , 
		bottom , ttop ,  // top is reserved keyword 
		near , far  ){

		// xsc = x scale 
		var xsc = 2/(right - left) , 
			ysc = 2/(ttop - bottom) , 
			zsc = 2/(far - near) ;

		return new Float32Array ( [
			xsc  , 0.0  , 0.0  , 0.0 ,
			0.0  , ysc  , 0.0  , 0.0 ,
			0.0  , 0.0  , zsc  , 0.0 ,
			-1   , -1   , -1   , 1.0
		] ) ;
	},

	calcCOS : function(degrees){
		return Math.cos(degrees*3.1416/180);
	},

	calcSIN : function(degrees){
		return Math.sin(degrees*3.1416/180);
	},

	genRotateAboutXmatrix : function(degrees){

		var cos = this.calcCOS(degrees);
		var sin = this.calcSIN(degrees);

		return new Float32Array ( [
			1.0  ,  0.0  ,  0.0  ,  0.0  ,
			0.0  ,  cos  ,  sin  ,  0.0  ,
			0.0  , -sin  ,  cos  ,  0.0  ,
			0.0  ,  0.0  ,  0.0  ,  1.0
		] ) ;
	},

	genRotateAboutYmatrix : function(degrees){

		var cos = this.calcCOS(degrees);
		var sin = this.calcSIN(degrees);

		return new Float32Array ( [
			cos  ,  0.0  , -sin  ,  0.0  ,
			0.0  ,  1.0  ,  0.0  ,  0.0  ,
			sin  ,  0.0  ,  cos  ,  0.0  ,
			0.0  ,  0.0  ,  0.0  ,  1.0
		] ) ;
	},

	genRotateAboutZmatrix : function(degrees){

		var cos = this.calcCOS(degrees);
		var sin = this.calcSIN(degrees);

		return new Float32Array ( [
			cos  ,  sin  ,  0.0  ,  0.0  ,
			-sin  ,  cos  ,  0.0  ,  0.0  ,
			0.0  ,  0.0  ,  1.0  ,  0.0  ,
			0.0  ,  0.0  ,  0.0  ,  1.0
		] ) ;
	}
};
