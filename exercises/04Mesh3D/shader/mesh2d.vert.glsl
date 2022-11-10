#version 300 es
precision highp float;

layout(location = 0) in vec3 a_position;
layout(location= 1) in vec3 a_color;
out vec3 v_color;
uniform mat3 mat3_transform;

void main()
{
    //gl_Position = vec4(a_position.xyz, 1);
    gl_Position = vec4(mat3_transform*vec3(a_position.xy, 1), 1.0);
    v_color = a_color;

    
}