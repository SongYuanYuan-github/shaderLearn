
#define PI 3.1415926535897932384626433832795

void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 p=(2.*fragCoord.xy-iResolution.xy)/iResolution.y;//表示把当前的坐标轴缩小到原来的1/2，原点移动到屏幕中间，并把x,y轴的坐标范围缩小到1左右的值（即p的y轴范围在-1到1之间，x轴的范围也在附近）
    float tau=3.1415926535*2.;
    float a=atan(p.x,p.y);//a表示p点绕原点的角度，范围为[-π，π]；所以uv.x = a/tau的范围为[-1/2, 1/2]
    float r=length(p)*.75;//xCol=mod(xCol, 3)的范围为 [0,3]
    vec2 uv=vec2(a/tau,r);
    
    //get the color
    float xCol=(uv.x-(iGlobalTime/3.))*3.;//xCol经过上面处理，其范围为[0,3]; 现在把这个范围平均分成3份，每一份做一个颜色的混合：
    xCol=mod(xCol,3.);
    vec3 horColour=vec3(.25,.25,.25);
    if(xCol<1.){
        horColour.r+=1.-xCol;
        horColour.g+=xCol;
    }else if(xCol<2.){
        xCol-=1.;
        horColour.g+=1.-xCol;
        horColour.b+=xCol;
    }else{
        xCol-=2.;
        horColour.b+=1.-xCol;
        horColour.r+=xCol;
    }
    
    // draw color beam
    uv=(2.*uv)-1.;
    float tt = 5.0 + 10.0*cos(iGlobalTime);
    float param = clamp(floor(tt), 0.0, 10.0);
    float beamWidth  = (0.7+0.5*cos(uv.x*10.*tau*.15*param))*abs(1./(30.*uv.y));
    vec3 horBeam=vec3(beamWidth,beamWidth,beamWidth);
    fragColor=vec4(((horBeam)*horColour),1.);
}