#version 300 es
precision highp float;

layout(location = 0) in vec3 a_position;
layout(location= 1) in vec3 a_color;
layout(location = 2) in vec3 a_normals;
out vec3 v_color;
out vec3 fs_color;
uniform mat4 mat4_transform;

void main()
{
    //gl_Position = vec4(a_position.xyz, 1);
    gl_Position = mat4_transform * vec4(a_position.xyz, 1.0);

    //1c
    v_color = abs(a_position);

    //Lab05 1b+c
    fs_color = abs(a_normals);



    
}