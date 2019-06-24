// Generate an X rotation matrix.
function xRotate(angle) {
	return [
		[1.0, 0.0, 0.0],
		[0.0, Math.cos(angle), -Math.sin(angle)],
		[0.0, Math.sin(angle), Math.cos(angle)]
	];
}

// Generate an Y rotation matrix.
function yRotate(angle) {
	return [
		[Math.cos(angle), 0.0, Math.sin(angle)],
		[0.0, 1.0, 0.0],
		[-Math.sin(angle), 0.0, Math.cos(angle)]
	];
}

// Generate an Z rotation matrix.
function zRotate(angle) {
	return [
		[Math.cos(angle), -Math.sin(angle), 0.0],
		[Math.sin(angle), Math.cos(angle), 0.0],
		[0.0, 0.0, 1.0]
	];
}
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

// Convert a Krunker.io map into a Wavefront object (.obj) file.
function krunkerToWavefront(map) {
	var mapName = map.name;

	var vertexInfo = "";
	var faceInfo = "";
	var materialInfo = "";

	var vertexCount = 0;
	var faceCount = 0;
	var materialCount = 0;

	for (var i = 0; i < map.objects.length; i++) {
		var object = map.objects[i];

		// Ignore invisible objects.
		if (object.hasOwnProperty("v") && object.v == 1) {
			continue;
		}

		// Only cubes, planes and ramps are supported.
		if (object.hasOwnProperty("id")) {
			if (object.id != 4 &&
				object.id != 9) {
				continue;
			}
		}

		var isObjectColored = false;
		var colorInteger = 0;
		if (object.hasOwnProperty("c")) {
			// Annoyingly, not all colors are stored in the same manner. Some
			// are stored as integers while others are stored as hex codes.
			if (typeof object.c == "string") {
				isObjectColored = true;
				if (object.c[0] == "#") {
					object.c = object.c.substr(1);
				}
				colorInteger = parseInt(object.c, 16);
			} else if (typeof object.c == "number") {
				isObjectColored = true;
				colorInteger = object.c;
			}
		}

		var isObjectEmissive = false;
		var emissiveInteger = 0;
		if (object.hasOwnProperty("e")) {
			if (typeof object.e == "string") {
				isObjectEmissive = true;
				if (object.e[0] == "#") {
					object.e = object.e.substr(1);
				}
				emissiveInteger = parseInt(object.e, 16);
			} else if (typeof object.e == "number") {
				isObjectEmissive = true;
				emissiveInteger = object.e;
			}
		}

		if (isObjectColored) {
			if (isObjectEmissive) {
				materialInfo += generateEmissiveColorMaterialInfo(colorInteger, emissiveInteger, materialCount);
				faceInfo += "usemtl cmtl" + materialCount + "\n";
				materialCount++;
			} else {
				materialInfo += generateColorMaterialInfo(colorInteger, materialCount);
				faceInfo += "usemtl cmtl" + materialCount + "\n";
				materialCount++;
			}
		}

		object.p[0] -= object.s[0] / 2.0;
		object.p[2] -= object.s[2] / 2.0;

		vertexInfo += generateCubeVertexInfo(object, vertexCount, faceCount);
		faceInfo += generateCubeFaceInfo(object, vertexCount, faceCount);
		vertexCount += 8;
		faceCount += 6;
	}

	var objectInfo = vertexInfo + faceInfo;

	return {
		objFile: objectInfo,
		mtlFile: materialInfo
	};
}

const fs = require("fs");

if (process.argv.length == 3) {
	var map = JSON.parse(fs.readFileSync(process.argv[2]));

	var data = krunkerToWavefront(map);
	data.objFile = "mtllib " + map.name + ".mtl\n" + data.objFile;
	fs.writeFileSync(map.name + ".obj", data.objFile);
	fs.writeFileSync(map.name + ".mtl", data.mtlFile);
} else {
	var mapBurg = JSON.parse(fs.readFileSync("burg.json"));
	var mapLittletown = JSON.parse(fs.readFileSync("littletown.json"));
	var mapSandstorm = JSON.parse(fs.readFileSync("sandstorm.json"));
	var mapSubzero = JSON.parse(fs.readFileSync("subzero.json"));
	var mapKanji = JSON.parse(fs.readFileSync("kanji.json"));

	var maps = [mapBurg, mapLittletown, mapSandstorm, mapSubzero, mapKanji];

	for (var i = 0; i < maps.length; i++) {
		var map = maps[i];
		var data = krunkerToWavefront(map);
		data.objFile = "mtllib " + map.name + ".mtl\n" + data.objFile;
		fs.writeFileSync("wavefront/" + map.name + ".obj", data.objFile);
		fs.writeFileSync("wavefront/" + map.name + ".mtl", data.mtlFile);
	}
}