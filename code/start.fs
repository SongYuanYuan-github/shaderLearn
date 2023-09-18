// 伪随机数，接受一个二维向量，产生一个0到1的数
float random(vec2 st){
    // fract() : return x - floor(x) 
    return fract(sin(dot(st.xy, vec2(565656.233,123123.2033))) * 323434.34344);
}
// 伪随机数，接受一个二维向量，返回x，都是0到1之间的随机二维向量（就是例子里的这些参数也太反人类的。。。。。。）
vec2 random2(vec2 p) {
     return fract(sin(vec2(dot(p,vec2(234234.1,54544.7)), sin(dot(p,vec2(33332.5,18563.3))))) *323434.34344);
}

void main () {
    // 起手式，好像挺多shader都是这么开始的
    vec2 uv = gl_FragCoord.xy/iResolution.xy;   
    // 将uv 放大十倍,将uv 坐标数值上分别映射到整数部分与小数(0,1)之间
    uv *= 10.0;
    vec2 ipos = floor(uv);
    vec2 fpos = fract(uv);
    // 设置星星的坐标
    vec2 targetPoint = random2(ipos);
    float speed = 0.2;
    // 让星星随时间动起来，虽然参数有点反人类
    targetPoint = 0.5 + 0.4 * sin(iTime * speed + 6.2831*targetPoint);
    float dist = length(fpos - targetPoint);
    float brightness = sin(iTime * speed + 6.2831 * targetPoint.x);
    
    vec3 color = vec3(1. - step(0.013, dist)) * brightness;
    // 最后的结尾
    gl_FragColor = vec4(color,1.0);
}
