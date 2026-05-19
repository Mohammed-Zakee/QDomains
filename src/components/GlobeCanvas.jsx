import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const GlobeCanvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 160;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0); // Transparent background

    // Prevent duplication by clearing the container
    mountRef.current.innerHTML = '';
    mountRef.current.appendChild(renderer.domElement);

    // Globe
    const globeG = new THREE.SphereGeometry(50, 64, 64);
    const globeM = new THREE.MeshPhongMaterial({
      color: 0x007bff,
      wireframe: true,
      transparent: true,
      opacity: 0.35, // More solid
      specular: 0x007bff,
      shininess: 30,
    });
    const globe = new THREE.Mesh(globeG, globeM);
    scene.add(globe);

    // Points / "Domains"
    const pointsG = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    const pointsCount = 400;

    for (let i = 0; i < pointsCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / pointsCount);
      const theta = Math.sqrt(pointsCount * Math.PI) * phi;
      const radius = 50.5;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      positions.push(x, y, z);
      colors.push(0 / 255, 123 / 255, 255 / 255); // Primary blue
    }

    pointsG.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    pointsG.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    const pointsM = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });
    const points = new THREE.Points(pointsG, pointsM);
    globe.add(points);

    // Arcs / Connecting lines
    const createArc = () => {
        const curve = new THREE.QuadraticBezierCurve3(
            new THREE.Vector3().setFromSphericalCoords(50, Math.random() * Math.PI, Math.random() * Math.PI * 2),
            new THREE.Vector3().setFromSphericalCoords(70, Math.random() * Math.PI, Math.random() * Math.PI * 2),
            new THREE.Vector3().setFromSphericalCoords(50, Math.random() * Math.PI, Math.random() * Math.PI * 2)
        );
        const pts = curve.getPoints(50);
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        const mat = new THREE.LineBasicMaterial({ color: 0x00c6ff, transparent: true, opacity: 0.15 });
        return new THREE.Line(geo, mat);
    };

    for(let i=0; i<8; i++) globe.add(createArc());

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(100, 100, 100);
    scene.add(pointLight);

    // Animation
    let frameId;
    const animate = () => {
      globe.rotation.y += 0.005; // Slightly faster vertical rotation
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      if(!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      if(mountRef.current) mountRef.current.removeChild(renderer.domElement);
      globeG.dispose();
      globeM.dispose();
      pointsG.dispose();
      pointsM.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%', cursor: 'grab' }} />;
};

export default GlobeCanvas;
