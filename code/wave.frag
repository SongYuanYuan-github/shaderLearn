
// //统一变量输入
// uniform vec3 iResolution;
// uniform float iTime;
// uniform float iTimeDelta;
// uniform float iFrame;
// uniform float iChannelTime[4];
// uniform vec4 iMouse;
// uniform vec4 iDate;
// uniform float iSampleRate;
// uniform vec3 iChannelResolution[4];
// uniform samplerXX iChanneli;


#iChannel0 "file://texture/water.jpg"

void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;


 float distanceFactor = 60.;
 
 
     float timeFactor = -30.;
 
 
     float totaFactor = 1.0;
 
 
     float waveWidth = 0.3;
 
 
     float waveSpeed = 0.3;
 
 
    float waveStartTime=0.1;
 
 
        float curwaveDistance = (iGlobalTime - waveStartTime) * waveSpeed;


// vec4 MainColor =vec4(1.,1.,1.,1.);

vec2 dv=vec2(0.5,0.5)-uv;
 
 
dv=dv*vec2(iResolution.x/iResolution.y,1);
float dis=sqrt(dv.x*dv.x+dv.y*dv.y);
 
float sinFactor=sin(dis*distanceFactor+iGlobalTime*timeFactor)*totaFactor*0.01;
 
 
float discardFactor=clamp(waveWidth-abs(curwaveDistance-dis),0.,1.);
 
 
vec2 dv1=normalize(dv);
vec2 off =dv1*sinFactor*discardFactor;
 uv=off+uv;
fragColor= texture(iChannel0,uv);
}

