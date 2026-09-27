'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function HeroGlobe() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 4;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Particle sphere
    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const colorOptions = [
      new THREE.Color(0x6366f1), // indigo
      new THREE.Color(0x22d3ee), // cyan
      new THREE.Color(0xa855f7), // purple
      new THREE.Color(0x3b82f6), // blue
    ];

    for (let i = 0; i < particleCount; i++) {
      // Fibonacci sphere distribution for even spread
      const phi = Math.acos(1 - (2 * (i + 0.5)) / particleCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      const radius = 1.8 + (Math.random() - 0.5) * 0.3;
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi);
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.025,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
    });

    const particleSphere = new THREE.Points(geometry, material);
    scene.add(particleSphere);

    // Inner glowing core
    const coreGeometry = new THREE.SphereGeometry(0.8, 64, 64);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.06,
      wireframe: false,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(core);

    // Wire sphere overlay
    const wireGeometry = new THREE.SphereGeometry(1.82, 24, 24);
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      wireframe: true,
      transparent: true,
      opacity: 0.06,
    });
    const wireSphere = new THREE.Mesh(wireGeometry, wireMaterial);
    scene.add(wireSphere);

    // Floating nodes (opportunity nodes)
    const nodeCount = 8;
    const nodes: THREE.Mesh[] = [];
    const nodeGeometry = new THREE.SphereGeometry(0.06, 16, 16);
    const nodeMaterials = [
      new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.9 }),
      new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.9 }),
      new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.9 }),
    ];

    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / nodeCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const radius = 2.1;
      const node = new THREE.Mesh(nodeGeometry, nodeMaterials[i % nodeMaterials.length]);
      node.position.set(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );
      scene.add(node);
      nodes.push(node);
    }

    // Mouse tracking
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetY = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth damping toward mouse
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      particleSphere.rotation.y = elapsed * 0.15 + currentX * 0.4;
      particleSphere.rotation.x = currentY * 0.25;
      wireSphere.rotation.y = -elapsed * 0.08;
      wireSphere.rotation.x = elapsed * 0.04;

      // Animate nodes
      nodes.forEach((node, i) => {
        node.position.y += Math.sin(elapsed * 0.8 + i * 1.2) * 0.002;
        node.scale.setScalar(1 + Math.sin(elapsed * 1.5 + i) * 0.15);
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full"
      style={{ minHeight: 400 }}
      aria-label="Interactive 3D opportunity globe"
    />
  );
}
