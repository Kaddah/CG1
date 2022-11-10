#version 300 es
precision highp float;

out vec4 outColor;
in vec3 v_color;

uniform vec3 u_color;

void main() 
{
  outColor = vec4(v_color.rgb*2.0, 1.0);
}