import * as THREE from "three";

const main = () => {
  const canvas = document.querySelector("#c");

  //    RENDER
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const fov = 75; // field of view
  const aspect =  window.innerWidth / window.innerHeight; // the canvas default
  const near = 0.1; // space in front of camera...
  const far = 100; // ...that will be rendered.

  //   PERSPECTIVE
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 5;

  const scene = new THREE.Scene();

  // geometry data for box
  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  // shape of object
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  // how to draw the object
  // const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });
  // PhongMaterial is affected by lights
  // const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });

  // Mesh!
  // const cube = new THREE.Mesh(geometry, material);


  function render(time) {
    time *= 0.001;  // convert time to seconds

    cubes.forEach((cube, ndx) => {
      const speed = 1 + ndx * .1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });
    
    renderer.render(scene, camera);
    
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);


  function makeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({color});
   
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
   
    cube.position.x = x;
   
    return cube;
  }
  const cubes = [
    makeInstance(geometry, 0x44aa88,  0),
    makeInstance(geometry, 0x8844aa, -2),
    makeInstance(geometry, 0xaa8844,  2),
  ];


// directoinal light
  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }


  scene.add(cube);
  renderer.render(scene, camera);
}

main();