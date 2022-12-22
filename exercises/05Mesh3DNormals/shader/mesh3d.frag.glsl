#version 300 es
precision highp float;

in vec3 v_color;
out vec4 fragColor;
//Lab05 1c
in vec3 fs_color;
//Lab05 1d
in vec3 fs_normal;
uniform bool u_useWireframe;
uniform vec3 u_wfColor;

void main()
{
	if(u_useWireframe){
		fragColor = vec4(u_wfColor.rgb, 1.0);
	}
	else{
		//Lab05 1c
		//fragColor = vec4(fs_color.rgb, 1.0);
		//Lab05 1d
		fragColor = vec4(abs(fs_normal).rgb, 1.0);
	}


}