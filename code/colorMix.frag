void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
// // Normalized pixel coordinates (from 0 to 1)
//     vec2 uv=fragCoord/iResolution.xy;
//     vec3 color1 = vec3(1.,0.,0.);
//     vec3 color2 = vec3(0.,0.,1.);
//     vec3 col=mix(color1,color2,uv.x);
//     fragColor=vec4(col,1.);
// Normalized pixel coordinates (from 0 to 1)
    vec2 uv=normalize(fragCoord);
    vec3 color1 = vec3(1.,0.,0.);
    vec3 color2 = vec3(0.,0.,1.);
    vec3 col=mix(color1,color2,uv.x);
    fragColor=vec4(col,1.);
}