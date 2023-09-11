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
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv=fragCoord/iResolution.xy;
    
    // Time varying pixel color
    vec3 col=.5+.5*cos(iTime+uv.xyx+vec3(0,2,4));
    
    // Output to screen
    fragColor=vec4(col,1.);
}

// //声音着色器
// vec2 mainSound( int samp, float time )
// {
    //     // A 440 Hz wave that attenuates quickly overt time
    //     return vec2( sin(6.2831*440.0*time)*exp(-3.0*time) );
// }

// //虚拟现实着色器
// void mainVR( out vec4 fragColor, in vec2 fragCoord, in vec3 fragRayOri, in vec3 fragRayDir )

// // 天空盒
// void mainCubemap( out vec4 fragColor, in vec2 fragCoord, in vec3 rayOri, in vec3 rayDir )
// {
    //     // Ray direction as color
    //     vec3 col = 0.5 + 0.5*rayDir;
    
    //     // Output to cubemap
    //     fragColor = vec4(col,1.0);
// }

//channel

// 如果想通过iChannelN给 shader 输入纹理的话， 可以在 shader 开始的地方指定：

// #iChannel0 "file://carrot.jpeg"

// void mainImage(out vec4 fragColor,in vec2 fragCoord)
// {
    //     vec2 uv=fragCoord/iResolution.xy;
    //     vec4 color = texture(iChannel0,uv);
    //     fragColor=color;
// }
// 上面纹理使用的本地的文件， 还可以使用 web 连接的方式， 在后面配置一个 http 地址就可以了。这比shadertoy上只能使用固定的一些纹理灵活多了。 除了使用自定义问题，vscode中还可以指定采样器的采样方式和图片的环绕方式, 类似下面的代码：

// #iChannel0::MinFilter "NearestMipMapNearest"
// #iChannel0::MagFilter "Nearest"
// #iChannel0::WrapMode "Repeat"
// glsl作为独立pass输入
// vscode中#iChannel的指定除了是一张纹理， 还可以是.glsl类型的shader， 这样就可以实现shadertoy上的多pass的效果了。

// #iChannel0 "file://bufferA.glsl"
// #iChannel1 "file://bufferB.glsl"
// 立方贴图输入
// Cubemaps可以指定为任何其他纹理，事实上，它们是 Cubemaps 的路径包含通配符和它们的类型被显式声明的组合。

// #iChannel0 "file://cubemaps/yokohama_{}.jpg" // 注意 '{}'
// #iChannel0::Type "CubeMap"
// 通配符将通过替换下列集合中的任何值来解析

// [ ‘e’, ‘w’, ‘u’, ‘d’, ‘n’, ‘s’ ],
// [ ‘east’, ‘west’, ‘up’, ‘down’, ‘north’, ‘south’ ],
// [ ‘px’, ‘nx’, ‘py’, ‘ny’, ‘pz’, ‘nz’ ] or
// [ ‘posx’, ‘negx’, ‘posy’, ‘negy’, ‘posz’, ‘negz’ ].