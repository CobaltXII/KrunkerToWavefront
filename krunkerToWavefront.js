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

// Multiply a vector with a matrix.
function vectorMultiplyMatrix(vec, mat) {
	return [
		mat[0][0] * vec[0] + mat[0][1] * vec[1] + mat[0][2] * vec[2],
		mat[1][0] * vec[0] + mat[1][1] * vec[1] + mat[1][2] * vec[2],
		mat[2][0] * vec[0] + mat[2][1] * vec[1] + mat[2][2] * vec[2],
	];
}

// Generate the vertex information for a cube.
function generateCubeVertexInfo(cube, vertexCount, faceCount) {
	var info = "";
	if (cube.hasOwnProperty("r")) {
		// Cube is rotated.
		var p0 = [cube.p[0]             - cube.s[0] / 2.0, cube.p[1]            , cube.p[2]             -  cube.s[2] / 2.0];
		var p1 = [cube.p[0] + cube.s[0] - cube.s[0] / 2.0, cube.p[1]            , cube.p[2]             -  cube.s[2] / 2.0];
		var p2 = [cube.p[0]             - cube.s[0] / 2.0, cube.p[1] + cube.s[1], cube.p[2]             -  cube.s[2] / 2.0];
		var p3 = [cube.p[0]             - cube.s[0] / 2.0, cube.p[1]            , cube.p[2] + cube.s[2] -  cube.s[2] / 2.0];
		var p4 = [cube.p[0] + cube.s[0] - cube.s[0] / 2.0, cube.p[1] + cube.s[1], cube.p[2]             -  cube.s[2] / 2.0];
		var p5 = [cube.p[0] + cube.s[0] - cube.s[0] / 2.0, cube.p[1]            , cube.p[2] + cube.s[2] -  cube.s[2] / 2.0];
		var p6 = [cube.p[0]             - cube.s[0] / 2.0, cube.p[1] + cube.s[1], cube.p[2] + cube.s[2] -  cube.s[2] / 2.0];
		var p7 = [cube.p[0] + cube.s[0] - cube.s[0] / 2.0, cube.p[1] + cube.s[1], cube.p[2] + cube.s[2] -  cube.s[2] / 2.0];
		var p = [p0, p1, p2, p3, p4, p5, p6, p7];

		// Offset the cube to object coordinates.
		for (var i = 0; i < p.length; i++) {
			for (var q = 0; q < 3; q++) {
				p[i][q] -= cube.p[q];
			}
		}

		// Generate the rotation matrices.
		var rotX = xRotate(cube.r[0]);
		var rotY = yRotate(cube.r[1]);
		var rotZ = zRotate(cube.r[2]);

		// Rotate the cube.
		for (var i = 0; i < p.length; i++) {
			p[i] = vectorMultiplyMatrix(vectorMultiplyMatrix(vectorMultiplyMatrix(p[i], rotX), rotY), rotZ);
		}

		// Offset the cube back to world coordinates.
		for (var i = 0; i < p.length; i++) {
			for (var q = 0; q < 3; q++) {
				p[i][q] += cube.p[q];
			}
		}

		for (var i = 0; i < p.length; i++) {
			info += "v " + p[i][0] + " " + p[i][1] + " " + p[i][2] + "\n";
		}
	} else {
		// Cube is axis-aligned.
		cube.p[0] -= cube.s[0] / 2.0;
		cube.p[2] -= cube.s[2] / 2.0;
		info += "v " + (cube.p[0]            ) + " " + (cube.p[1]            ) + " " + (cube.p[2]            ) + "\n";
		info += "v " + (cube.p[0] + cube.s[0]) + " " + (cube.p[1]            ) + " " + (cube.p[2]            ) + "\n";
		info += "v " + (cube.p[0]            ) + " " + (cube.p[1] + cube.s[1]) + " " + (cube.p[2]            ) + "\n";
		info += "v " + (cube.p[0]            ) + " " + (cube.p[1]            ) + " " + (cube.p[2] + cube.s[2]) + "\n";
		info += "v " + (cube.p[0] + cube.s[0]) + " " + (cube.p[1] + cube.s[1]) + " " + (cube.p[2]            ) + "\n";
		info += "v " + (cube.p[0] + cube.s[0]) + " " + (cube.p[1]            ) + " " + (cube.p[2] + cube.s[2]) + "\n";
		info += "v " + (cube.p[0]            ) + " " + (cube.p[1] + cube.s[1]) + " " + (cube.p[2] + cube.s[2]) + "\n";
		info += "v " + (cube.p[0] + cube.s[0]) + " " + (cube.p[1] + cube.s[1]) + " " + (cube.p[2] + cube.s[2]) + "\n";
	}
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

// Generate the vertex information for a ramp.
function generateRampVertexInfo(ramp, vertexCount, faceCount) {
	// Ramp directions are as follows
	//     0: +x
	//     1: +z
	//     2: -x
	//     3: -z
	var info = "";
	var p1, p2, p3, p4;
	if (ramp.d == 0) {
		p0 = [ramp.p[0] - ramp.s[0] / 2.0, ramp.p[1], ramp.p[2] + ramp.s[2] / 2.0];
		p1 = [ramp.p[0] - ramp.s[0] / 2.0, ramp.p[1], ramp.p[2] - ramp.s[2] / 2.0];
		p2 = [ramp.p[0] + ramp.s[0] / 2.0, ramp.p[1] + ramp.s[1], ramp.p[2] + ramp.s[2] / 2.0];
		p3 = [ramp.p[0] + ramp.s[0] / 2.0, ramp.p[1] + ramp.s[1], ramp.p[2] - ramp.s[2] / 2.0];
	} else if (ramp.d == 2) {
		p0 = [ramp.p[0] + ramp.s[0] / 2.0, ramp.p[1], ramp.p[2] + ramp.s[2] / 2.0];
		p1 = [ramp.p[0] + ramp.s[0] / 2.0, ramp.p[1], ramp.p[2] - ramp.s[2] / 2.0];
		p2 = [ramp.p[0] - ramp.s[0] / 2.0, ramp.p[1] + ramp.s[1], ramp.p[2] + ramp.s[2] / 2.0];
		p3 = [ramp.p[0] - ramp.s[0] / 2.0, ramp.p[1] + ramp.s[1], ramp.p[2] - ramp.s[2] / 2.0];
	} else if (ramp.d == 1) {
		p0 = [ramp.p[0] + ramp.s[0] / 2.0, ramp.p[1], ramp.p[2] - ramp.s[2] / 2.0];
		p1 = [ramp.p[0] - ramp.s[0] / 2.0, ramp.p[1], ramp.p[2] - ramp.s[2] / 2.0];
		p2 = [ramp.p[0] + ramp.s[0] / 2.0, ramp.p[1] + ramp.s[1], ramp.p[2] + ramp.s[2] / 2.0];
		p3 = [ramp.p[0] - ramp.s[0] / 2.0, ramp.p[1] + ramp.s[1], ramp.p[2] + ramp.s[2] / 2.0];
	} else {
		p0 = [ramp.p[0] + ramp.s[0] / 2.0, ramp.p[1], ramp.p[2] + ramp.s[2] / 2.0];
		p1 = [ramp.p[0] - ramp.s[0] / 2.0, ramp.p[1], ramp.p[2] + ramp.s[2] / 2.0];
		p2 = [ramp.p[0] + ramp.s[0] / 2.0, ramp.p[1] + ramp.s[1], ramp.p[2] - ramp.s[2] / 2.0];
		p3 = [ramp.p[0] - ramp.s[0] / 2.0, ramp.p[1] + ramp.s[1], ramp.p[2] - ramp.s[2] / 2.0];
	}
	info += "v " + p0[0] + " " + p0[1] + " " + p0[2] + "\n";
	info += "v " + p1[0] + " " + p1[1] + " " + p1[2] + "\n";
	info += "v " + p2[0] + " " + p2[1] + " " + p2[2] + "\n";
	info += "v " + p3[0] + " " + p3[1] + " " + p3[2] + "\n";
	return info;
}

// Generate the face information for a ramp.
function generateRampFaceInfo(ramp, vertexCount, faceCount) {
	var info = "";
	vertexCount++;
	// Both faces are generated to counteract backface culling.
	info += "f " + (vertexCount + 0) + " " + (vertexCount + 1) + " " + (vertexCount + 2) + " " + (vertexCount + 3) + "\n";
	info += "f " + (vertexCount + 3) + " " + (vertexCount + 2) + " " + (vertexCount + 1) + " " + (vertexCount + 0) + "\n";
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
	info += "Kd " + (emissiveR / 255.0) + " " + (emissiveG / 255.0) + " " + (emissiveB / 255.0) + "\n";
	info += "Ke " + (emissiveR / 255.0) + " " + (emissiveG / 255.0) + " " + (emissiveB / 255.0) + "\n";
	info += "Ka " + (emissiveR / 255.0) + " " + (emissiveG / 255.0) + " " + (emissiveB / 255.0) + "\n";
	return info;
}

// ID constants.
const idCube = 0;                   // Implemented and working
const idCrate = 1;                  // Model
const idBarrel = 2;                 // Model
const idLadder = 3;                 // NEEDS TO BE IMPLEMENTED
const idPlane = 4;                  // Implemented and working
const idSpawnPoint = 5;             // Never going to be used here
const idCameraPosition = 6;         // Never going to be used here
const idVehicle = 7;                // Model
const idStack = 8;                  // Model
const idRamp = 9;                   // Implemented and working
const idScoreZone = 10;             // Never going to be used here
const idBillboard = 11;             // NEEDS TO BE IMPLEMENTED
const idDeathZone = 12;             // Never going to be used here
const idParticles = 13;             // Never going to be used here
const idObjective = 14;             // Never going to be used here
const idTree = 15;                  // Model
const idCone = 16;                  // Model
const idContainer = 17;             // Model
const idGrass = 18;                 // Model
const idContainerr = 19;            // Model
const idAcidbarrel = 20;            // Model
const idDoor = 21;                  // Model
const idWindow = 22;                // Model
const idFlag = 23;                  // Never going to be used here
const idWater = 24;                 // Implemented and working
const idCheckPoint = 25;            // Never going to be used here
const idWeaponPickup = 26;          // Never going to be used here

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

		// Ignore unsupported or unused objects.
		var id = 0;
		if (object.hasOwnProperty("id")) {
			if (object.id != idCube &&
				object.id != idPlane &&
				object.id != idRamp) {
				continue;
			}
			id = object.id;
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

		if (object.hasOwnProperty("opacity")) {
			materialInfo += "d " + object.opacity + "\n";
		}

		if (id == idCube || id == idPlane || id == idWater) {
			vertexInfo += generateCubeVertexInfo(object, vertexCount, faceCount);
			faceInfo += generateCubeFaceInfo(object, vertexCount, faceCount);
			vertexCount += 8;
			faceCount += 6;
		} else if (id == idRamp) {
			vertexInfo += generateRampVertexInfo(object, vertexCount, faceCount);
			faceInfo += generateRampFaceInfo(object, vertexCount, faceCount);
			vertexCount += 4;
			faceCount += 2;
		}
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