#iChannel0 'file://texture/color.jpg'
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv=fragCoord/iResolution.xy;
    vec4 color = texture(iChannel0,uv);

    // vec3 color1=vec3(1.,0.,0.);
    // vec3 color2=vec3(0.,0.,1.);
    // vec3 col=mix(color1,color2,uv.x);
    float r = step(0.3,color.r);
    float g = step(0.5,color.g);
    float b = step(0.5,color.b);
    // float a = step(0.5,color.a);
    fragColor=vec4(r,color.g,color.b,color.a);
}