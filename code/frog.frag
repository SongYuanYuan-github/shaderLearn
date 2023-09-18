#define TAU 6.28318530718

#iUniform int MAX_ITER=5 in{0,20}
#iUniform float inten=.005 in{0.,.010}
#iUniform float OFF=250.in{0.,300.}

void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    float time = iTime * 0.2 + 23.0;
    vec2 uv=fragCoord.xy/iResolution.xy;
    
    vec2 p = mod(uv * TAU, TAU) - vec2(OFF);
    vec2 i=vec2(p);
    float c=1.;
    
    /// @note 波形的迭代叠加
    for(int n=0;n<MAX_ITER;n++)
    {
        float t = time * (1.0 - (3.5 / float(n + 1)));
        
        /// @note 更新 i，坐标位置的波形偏移（扭曲）
        i=p+vec2(cos(t-i.x)+sin(t+i.y),sin(t-i.y)+cos(t+i.x));
        
        /// @note “圆域波形扭曲”光线的累加
        c+=1./length(vec2(p.x/(sin(i.x+t)/inten),p.y/(cos(i.y+t)/inten)));
        // c=1./length(vec2(p.x/(sin(i.x)/inten),p.y/(cos(i.y+t)/inten)));
    }
    
    c/=float(MAX_ITER);
    // c = clamp(c, 0., 1.);
    c=1.17-pow(c,1.4);
    c=pow(abs(c),8.);
    vec3 colour=vec3(c);
    
    fragColor=vec4(clamp(colour,0.,1.),1.);
}
