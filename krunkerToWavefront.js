// Generate the vertex information for a cube.
function generateCubeVertexInfo(cube, vertexCount, faceCount) {
	var info = "";
	info += "v " + (cube.p[0]            ) + " " + (cube.p[1]            ) + " " + (cube.p[2]            ) + "\n";
	info += "v " + (cube.p[0] + cube.s[0]) + " " + (cube.p[1]            ) + " " + (cube.p[2]            ) + "\n";
	info += "v " + (cube.p[0]            ) + " " + (cube.p[1] + cube.s[1]) + " " + (cube.p[2]            ) + "\n";
	info += "v " + (cube.p[0]            ) + " " + (cube.p[1]            ) + " " + (cube.p[2] + cube.s[2]) + "\n";
	info += "v " + (cube.p[0] + cube.s[0]) + " " + (cube.p[1] + cube.s[1]) + " " + (cube.p[2]            ) + "\n";
	info += "v " + (cube.p[0] + cube.s[0]) + " " + (cube.p[1]            ) + " " + (cube.p[2] + cube.s[2]) + "\n";
	info += "v " + (cube.p[0]            ) + " " + (cube.p[1] + cube.s[1]) + " " + (cube.p[2] + cube.s[2]) + "\n";
	info += "v " + (cube.p[0] + cube.s[0]) + " " + (cube.p[1] + cube.s[1]) + " " + (cube.p[2] + cube.s[2]) + "\n";
	return info;
}
