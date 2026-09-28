'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface Marker {
  name: string;
  lat: number;
  lng: number;
}

const LOCATIONS: Marker[] = [
  { name: 'CHINA', lat: 35.8617, lng: 104.1954 },
  { name: 'SYRIA', lat: 34.8021, lng: 38.9968 },
];

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

export default function InteractiveEarth() {
  const containerRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    const isMobile = width < 768;
    
    // Adjusted mobile radius down to 35 to make it slightly smaller
    const currentGlobeRadius = isMobile ? 35 : 100;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, isMobile ? 180 : 260);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.enableZoom = false;

    const globeGroup = new THREE.Group();
    const geometry = new THREE.SphereGeometry(currentGlobeRadius, 64, 64);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.crossOrigin = 'anonymous';
    
    const earthTexture = textureLoader.load(
      'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/planets/earth_atmos_2048.jpg'
    );

    const material = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.7,
      metalness: 0.1,
      color: 0x88aabb,
    });

    const globe = new THREE.Mesh(geometry, material);
    globeGroup.add(globe);

    scene.add(globeGroup);
    globeGroup.rotation.y = -1.2;

    scene.add(new THREE.AmbientLight(0xffffff, 1.8));
    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(300, 200, 300);
    scene.add(dirLight);

    const tempV = new THREE.Vector3();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      globeGroup.rotation.y += 0.0008;
      controls.update();

      LOCATIONS.forEach(loc => {
        const el = labelRefs.current[loc.name];
        if (!el) return;

        const worldPos = latLngToVector3(loc.lat, loc.lng, currentGlobeRadius + 1.5);
        worldPos.applyMatrix4(globeGroup.matrixWorld);

        const cameraToPt = worldPos.clone().sub(camera.position).normalize();
        const normal = worldPos.clone().normalize();
        const dot = cameraToPt.dot(normal);

        if (dot < 0.1) {
          tempV.copy(worldPos);
          tempV.project(camera);

          const x = (tempV.x * 0.5 + 0.5) * width;
          const y = (-tempV.y * 0.5 + 0.5) * height;

          el.style.display = 'flex';
          el.style.transform = `translate(-50%, -100%) translate3d(${x}px, ${y}px, 0px)`;
        } else {
          el.style.display = 'none';
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        width = entry.contentRect.width;
        height = entry.contentRect.height;
        if (width > 0 && height > 0) {
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animId);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative size-full overflow-hidden">
      <div ref={containerRef} className="absolute inset-0 size-full cursor-grab active:cursor-grabbing" />
      {LOCATIONS.map(loc => (
        <div
          key={loc.name}
          ref={el => {
            labelRefs.current[loc.name] = el;
          }}
          className="absolute left-0 top-0 pointer-events-none hidden items-center gap-1.5 transition-opacity duration-300 z-20"
          style={{ willChange: 'transform' }}
        >
          <div className="size-1.5 rounded-full bg-phoenix shadow-[0_0_8px_#ff3333]" />
          <span className="rounded bg-black/80 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-white/90 border border-white/15 uppercase shadow-md backdrop-blur-xs">
            {loc.name}
          </span>
        </div>
      ))}
    </div>
  );
}