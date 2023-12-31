
vec3 random3(vec3 c) {
	float j = 4096.0*sin(dot(c,vec3(17.0, 59.4, 15.0)));
	vec3 r;
	r.z = fract(512.0*j);
	j *= .125;
	r.x = fract(512.0*j);
	j *= .125;
	r.y = fract(512.0*j);
	return r-0.5;
}

/* skew constants for 3d simplex functions */
const float F3 =  0.3333333;
const float G3 =  0.1666667;

/* 3d simplex noise */
float simplex3d(vec3 p) {
	 /* 1. find current tetrahedron T and it's four vertices */
	 /* s, s+i1, s+i2, s+1.0 - absolute skewed (integer) coordinates of T vertices */
	 /* x, x1, x2, x3 - unskewed coordinates of p relative to each of T vertices*/
	 
	 /* calculate s and x */
	 vec3 s = floor(p + dot(p, vec3(F3)));
	 vec3 x = p - s + dot(s, vec3(G3));
	 
	 /* calculate i1 and i2 */
	 vec3 e = step(vec3(0.0), x - x.yzx);
	 vec3 i1 = e*(1.0 - e.zxy);
	 vec3 i2 = 1.0 - e.zxy*(1.0 - e);
	 	
	 /* x1, x2, x3 */
	 vec3 x1 = x - i1 + G3;
	 vec3 x2 = x - i2 + 2.0*G3;
	 vec3 x3 = x - 1.0 + 3.0*G3;
	 
	 /* 2. find four surflets and store them in d */
	 vec4 w, d;
	 
	 /* calculate surflet weights */
	 w.x = dot(x, x);
	 w.y = dot(x1, x1);
	 w.z = dot(x2, x2);
	 w.w = dot(x3, x3);
	 
	 /* w fades from 0.6 at the center of the surflet to 0.0 at the margin */
	 w = max(0.6 - w, 0.0);
	 
	 /* calculate surflet components */
	 d.x = dot(random3(s), x);
	 d.y = dot(random3(s + i1), x1);
	 d.z = dot(random3(s + i2), x2);
	 d.w = dot(random3(s + 1.0), x3);
	 
	 /* multiply d by w^4 */
	 w *= w;
	 w *= w;
	 d *= w;
	 
	 /* 3. return the sum of the four surflets */
	 return dot(d, vec4(50.0));
}

float noise(vec3 m) {
    return   0.5333333*simplex3d(m)
			+0.2666667*simplex3d(2.0*m)
			+0.1333333*simplex3d(4.0*m)
			+0.0666667*simplex3d(8.0*m);
}
float mysqrt(float p){
    //if(p<0.)
        //return -1.*sqrt(abs(p));
    //else
        //return sqrt(p);
        return sqrt(abs(p))*(step(0.,p)*2.-1.);
}
#iChannel0 "file://texture/water.jpg"
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // sampler2D iChannel0 =file:/texture/water.jpg;
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord/iResolution.xy;
    float scale=60.;
    vec2 id = floor(uv*scale);
    float mynoise=noise(vec3(uv*6.,iTime*5.));
    mynoise=mysqrt(mynoise);
    uv.x+=0.02*mynoise*(1.-sin(uv.x*3.141));
    uv.y+=0.02*mynoise*sin(uv.x*3.141);
    
    //uv.x+= 0.01*mysin(uv.y*scale+mysin(iTime*3.)*20.+id.y*0.2);
	//uv.y+= 0.01*mysin(uv.x*scale+mysin(iTime*3.)*20.+id.x*0.2);
    // Time varying pixel color
    vec3 col = texture(iChannel0,uv).rgb;
    // Output to screen
    fragColor = vec4(col,1.0);
}