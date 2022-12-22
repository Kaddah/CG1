#version 300 es
precision highp float;

in vec3 v_color;
out vec4 fragColor;
in vec3 fs_color;
uniform bool u_useWireframe;
uniform vec3 u_wfColor;

void main()
{
	if(u_useWireframe){
		fragColor = vec4(u_wfColor.rgb, 1.0);
	}
	else{
		fragColor = vec4(fs_color.rgb, 1.0);
	}


}