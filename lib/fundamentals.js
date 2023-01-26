import * as THREE from "three";

const main = () => {
  const canvas = document.querySelector("#c");

  //////  RENDER
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

  const fov = 100; // field of view
  const aspect = 2; // 2 is the canvas default
  const near = 0.1; // space in front of camera...
  const far = 5; // ...that will be rendered.

  //////  PERSPECTIVE
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 4;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0d0d10);

  

  // geometry data for box
  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  // shape of object
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);


  ////// Check Render's Canvas Size 
  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = canvas.clientWidth * pixelRatio | 0;
    const height = canvas.clientHeight * pixelRatio | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  //////  RENDER LOOP
  function render(time) {
    time *= 0.001;  // convert time to seconds

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    cubes.forEach((cube, ndx) => {
      const speed = 1 + ndx * 0.1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });
    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);


  ///// Add Cube Instance to Scene
  function makeInstance(geometry, color, x) {
    // how to draw the object
    // PhongMaterial is affected by lights
    const material = new THREE.MeshPhongMaterial({ color });
    // Mesh: 1)Geometry 2)Material 3)position/orienation/scale of object
    // in scene relative to its parents (scene is parent here)
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;

    return cube;
  }

  const cubes = [
    makeInstance(geometry, 0x44aa88, 0),
    makeInstance(geometry, 0x8844aa, -2),
    makeInstance(geometry, 0xaa8844, 2),
  ];

  // directional light
  {
    const lightColor = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(lightColor, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }

};

main();