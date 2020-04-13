# KrunkerToWavefront

Convert Krunker.io maps to Wavefront .obj and .mtl files

![Alt text](https://github.com/CobaltXII/KrunkerToWavefront/blob/master/Kanji.png?raw=true)

# Features

Currently, KrunkerToWavefront supports the following features
- .obj conversion of cubes
- .obj conversion of planes
- .obj conversion of ramps
- .obj conversion of water
- .obj conversion of models
- .obj conversion of rotated objects
- .mtl conversion of diffuse materials
- .mtl conversion of emissive materials
- .mtl conversion of opacity
- .mtl conversion of textured models

In the future, I would like to add support for the following features
- .obj conversion of ladders
- .obj conversion of billboards
- .mtl conversion of textured materials

# Contributing

If you manage to add any of the unimplemented features to this code, please submit a pull request. I will review and commit your changes so that other people can use them.

# Usage

You can use KrunkerToWavefront to create .obj files from your Krunker.io maps. You can then do whatever you want to them, like use them in your own games or render them in Blender. To actually use KrunkerToWavefront you need to install Node.js. After that you can invoke it through the command line as follows:

```bash
git clone https://github.com/CobaltXII/KrunkerToWavefront.git
cd KrunkerToWavefront/
node krunkerToWavefront.js
```

You will then get .obj and .mtl files for the 5 default maps, which can be found in the wavefront/ directory. To do this to your own maps, use these commands:

```bash
git clone https://github.com/CobaltXII/KrunkerToWavefront.git
cd KrunkerToWavefront/
node krunkerToWavefront.js <map.json>
```

You will then get .obj and .mtl files for the given map, which can be found in the wavefront/ directory.

To convert all the JSONs in the `/maps` folder, use these commands:
Add new JSON files to the maps folder(You can get the txt file from the Krunker Editor's Export, just rename it to .json from .txt).
```bash
node krunkerToWavefront.js all
```
# License

It's under the MIT License, so do whatever you want with it, but if you use it in one of your own projects it would be nice to credit me and put a link to this repository.