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
// //图像着色器
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord/iResolution.xy;

    // Time varying pixel color
    vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));

    // Output to screen
    fragColor = vec4(col,1.0);
}
// //声音着色器
// vec2 mainSound( int samp, float time )
// {
//     // A 440 Hz wave that attenuates quickly overt time
//     return vec2( sin(6.2831*440.0*time)*exp(-3.0*time) );
// }
// //虚拟现实着色器
// void mainVR( out vec4 fragColor, in vec2 fragCoord, in vec3 fragRayOri, in vec3 fragRayDir )
// void mainCubemap( out vec4 fragColor, in vec2 fragCoord, in vec3 rayOri, in vec3 rayDir )
// {
//     // Ray direction as color
//     vec3 col = 0.5 + 0.5*rayDir;

//     // Output to cubemap
//     fragColor = vec4(col,1.0);
// }