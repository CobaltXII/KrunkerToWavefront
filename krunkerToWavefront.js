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

// Generate the face information for a cube.
function generateCubeFaceInfo(cube, vertexCount, faceCount) {
	var info = "";
	vertexCount++;
	info += "f " + (vertexCount + 0) + " " + (vertexCount + 2) + " " + (vertexCount + 4) + " " + (vertexCount + 1) + "\n";
	info += "f " + (vertexCount + 1) + " " + (vertexCount + 4) + " " + (vertexCount + 7) + " " + (vertexCount + 5) + "\n";
	info += "f " + (vertexCount + 5) + " " + (vertexCount + 7) + " " + (vertexCount + 6) + " " + (vertexCount + 3) + "\n";
	info += "f " + (vertexCount + 3) + " " + (vertexCount + 6) + " " + (vertexCount + 2) + " " + (vertexCount + 0) + "\n";
	info += "f " + (vertexCount + 2) + " " + (vertexCount + 6) + " " + (vertexCount + 7) + " " + (vertexCount + 4) + "\n";
	info += "f " + (vertexCount + 3) + " " + (vertexCount + 0) + " " + (vertexCount + 1) + " " + (vertexCount + 5) + "\n";
	return info;
}

// Generate material information for a specific color.
function generateColorMaterialInfo(color, materialCount) {
	var colorR = color >> 16 & 0xFF;
	var colorG = color >> 8 & 0xFF;
	var colorB = color & 0xFF;
	var info = "";
	info += "newmtl cmtl" + materialCount + "\n";
	info += "Kd " + (colorR / 255.0) + " " + (colorG / 255.0) + " " + (colorB / 255.0) + "\n";
	return info;
}

// Generate material information for a specific emissive color.
function generateEmissiveColorMaterialInfo(color, emissive, materialCount) {
	var colorR = color >> 16 & 0xFF;
	var colorG = color >> 8 & 0xFF;
	var colorB = color & 0xFF;
	var emissiveR = emissive >> 16 & 0xFF * 10;
	var emissiveG = emissive >> 8 & 0xFF * 10;
	var emissiveB = emissive & 0xFF * 10;
	var info = "";
	info += "newmtl cmtl" + materialCount + "\n";
	info += "Kd " + (colorR / 255.0 + 1e-5) + " " + (colorG / 255.0 + 1e-5) + " " + (colorB / 255.0 + 1e-5) + "\n";
	info += "Ke " + (emissiveR / 255.0) + " " + (emissiveG / 255.0) + " " + (emissiveB / 255.0) + "\n";
	info += "Ka " + (emissiveR / 255.0) + " " + (emissiveG / 255.0) + " " + (emissiveB / 255.0) + "\n";
	return info;
}
