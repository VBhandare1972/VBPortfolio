"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeFlower() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.2); // Move closer to make the flower look big

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 4. Lights (Enhanced for Glass Refraction & Transmission)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xe0935f, 1.2); // Warm secondary light for color bounce
    dirLight2.position.set(-5, -3, 3);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 1.5, 10);
    pointLight.position.set(0, 0, 2);
    scene.add(pointLight);

    // 5. Build Large 3D Glass Flower (Head Only - No Stem or Leaves)
    const flowerGroup = new THREE.Group();
    scene.add(flowerGroup);

    // Glass Materials using MeshPhysicalMaterial (optimized for performance)
    const petalMat = new THREE.MeshPhysicalMaterial({
      color: 0xe0935f, // soft gold/amber glass
      roughness: 0.1,
      metalness: 0.1,
      opacity: 0.55,
      transparent: true,
      ior: 1.5, // glass Index of Refraction
      clearcoat: 1.0, // high gloss surface
      clearcoatRoughness: 0.05,
      side: THREE.DoubleSide,
    });

    const centerMat = new THREE.MeshPhysicalMaterial({
      color: 0xc75c2e, // deeper rust-amber glass for the center
      roughness: 0.12,
      metalness: 0.1,
      opacity: 0.75,
      transparent: true,
      ior: 1.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });

    // Center bulb
    const centerGeo = new THREE.SphereGeometry(0.35, 32, 32);
    const centerMesh = new THREE.Mesh(centerGeo, centerMat);
    centerMesh.scale.set(1.1, 1.1, 0.75); // flatten slightly
    centerMesh.position.z = 0.1; // place in front of petals
    flowerGroup.add(centerMesh);

    // Petal geometry (Organic leaf/petal shape using scaled sphere)
    const petalGeo = new THREE.SphereGeometry(0.32, 32, 16);
    petalGeo.scale(1.8, 0.42, 0.05); // stretch X (length), compress Y (width) & Z (thickness)
    petalGeo.translate(0.9, 0, 0);   // shift geometry so pivot is at the base edge (x=0)

    // Outer Petals Layer (12 Petals)
    const numOuter = 12;
    for (let i = 0; i < numOuter; i++) {
      const petal = new THREE.Mesh(petalGeo, petalMat);
      const angle = (i / numOuter) * Math.PI * 2;
      petal.rotation.z = angle;
      petal.rotation.y = -0.12; // flare backwards slightly
      flowerGroup.add(petal);
    }

    // Inner Petals Layer (8 Petals, offset angle, slightly smaller & tilted forward)
    const innerPetalGeo = petalGeo.clone();
    innerPetalGeo.scale(0.82, 0.88, 1.0); // scale down length and width

    const numInner = 8;
    for (let i = 0; i < numInner; i++) {
      const petal = new THREE.Mesh(innerPetalGeo, petalMat);
      const angle = (i / numInner) * Math.PI * 2 + Math.PI / 8; // offset between outer petals
      petal.rotation.z = angle;
      petal.rotation.y = 0.22; // tilt forwards to form a cup/bowl layer
      petal.position.z = 0.06; // place slightly in front
      flowerGroup.add(petal);
    }

    // 6. Interaction variables
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (event) => {
      // Calculate normalized mouse coords (-1 to 1) relative to container
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      mouseX = (x / rect.width) * 2 - 1;
      mouseY = -(y / rect.height) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 7. Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      const requestID = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();

      // Continuous slow spinning on the Z axis (facing the camera)
      flowerGroup.rotation.z = time * 0.12;

      // Mouse tracking: tilt on X and Y axes
      targetRotationX = mouseY * 0.55;
      targetRotationY = mouseX * 0.55;

      // Smooth interpolation (lerp)
      flowerGroup.rotation.x += (targetRotationX - flowerGroup.rotation.x) * 0.08;
      flowerGroup.rotation.y += (targetRotationY - flowerGroup.rotation.y) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="three-flower-container"
      style={{
        width: "100%",
        height: "380px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "grab",
      }}
    />
  );
}
