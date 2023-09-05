float Circle(vec2 uv,vec2 p,float r,float blur)
{
    float d=length(uv-p);//xy取值0-1，xy均减p，原点移到p,取距离值
    float c=smoothstep(r,r-blur,d);//d取r到r-0.2的平滑值，r内纯白
    return c;
}
float Smiley(vec2 uv,vec2 p,float size){
    uv-=p;
    uv/=size;
    
    float mask=Circle(uv,vec2(0.),.4,.05);
    
    mask-=Circle(uv,vec2(-.13,.2),.07,.01);
    mask-=Circle(uv,vec2(.13,.2),.07,.01);
    
    float mouth=Circle(uv,vec2(0.,0.),.3,.02);
    mouth-=Circle(uv,vec2(0.,.1),.3,.02);
    
    mask-=mouth;
    
    return mask;
}
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;//将坐标转换到0-1之间
    uv.x*=iResolution.x/iResolution.y;//xy统一为一个值，为圆形
    
    float t=iTime;
    vec2 p=vec2(sin(t)*.3+.5,cos(t)*.2+.5);
    
    float mask=Smiley(uv,p,.3);
    
    vec3 col=vec3(0.);
    col=vec3(1.,1.,0.)*mask;
    
    fragColor=vec4(col,1.);
}

// void mainImage( out vec4 fragColor, in vec2 fragCoord )
// {
    //         vec2 uv = fragCoord.xy / iResolution.xy;// 将坐标转换到0-1之间
    //         fragColor = vec4(uv,0.5+0.5*sin(iTime),1.0);// r，g位置绝对，b随时间变化。
// }