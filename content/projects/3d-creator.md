---
title: 3D Creator
created: 01/01/2023
synopsis: 3D Creator is a prototype that shows how students (grades 7-12) can use block-based programming to create immersive 3D scenes. It's designed such that students only need knowledge of x, y, and z planes, and gently introduces more complex topics over time.
---
3D Creator is a prototype that shows how students (grades 7-12) can use block-based programming to create immersive 3D scenes. It's designed such that students only need knowledge of x, y, and z planes, and gently introduces more complex topics over time.

It provides an immediate feedback loop (when a block is added, the scene automatically updates, with no render time) and uses PBR (Physically Based Rendering) to create realistic materials, reflections, and lighting.

Designed to run on minimal hardware, 3D Creator is fully browser-based and requires no installation. It runs well (at 60fps for most scenes) on most low-end laptops and Chromebooks.

3D Creator is made possible by [Google's Blockly](https://github.com/google/blockly) and [BabylonJS](https://github.com/BabylonJS/Babylon.js). All public domain materials and HDRIs sourced from [ambientCG](https://ambientcg.com/) and [Poly Haven](https://polyhaven.com/).

To launch 3D Creator, browse to [https://simonguest.github.io/3dcreator](https://simonguest.github.io/3dcreator).

![3D Creator Prototype Screenshot](/images/3dcreator.png)

## Sample Projects

Sample projects can be opened via the toolbar or via these direct URLs:

- [TV Room](https://simonguest.github.io/3dcreator/?sample=tv-room.json&phys=0)
- [Spinning Code.org](https://simonguest.github.io/3dcreator/?sample=spinning-codeorg.json&phys=0)
- [Solar System](https://simonguest.github.io/3dcreator/?sample=solar-system.json&phys=0)
- [Red Pill, Blue Pill](https://simonguest.github.io/3dcreator/?sample=redpill-bluepill.json&phys=1) (Click on the scene and press A to add more and B to release.)
- [Pegboard Game](https://simonguest.github.io/3dcreator/?sample=pegboard.json&phys=1) (Click on the scene and press A and D to move, S to release.)
