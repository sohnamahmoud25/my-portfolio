
import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
// @ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import { 
  X, Globe, Layout, Smartphone, 
  Code2, Layers, Zap, Database, Palette, 
  Terminal, Search, Monitor, Sparkles, Move, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- DATA ---
const SERVICES_DATA = [
  { id: 1, title: 'UI/UX Design', icon: Layout, desc: 'Crafting intuitive interfaces that prioritize user experience through research-driven wireframing and prototyping.' },
  { id: 2, title: 'Web Design', icon: Globe, desc: 'Designing modern, responsive websites that align with brand identity and convert visitors into customers.' },
  { id: 3, title: 'Branding', icon: Palette, desc: 'Developing cohesive brand identities including logos, typography, and color palettes that resonate with audiences.' },
  { id: 4, title: 'App Dev', icon: Smartphone, desc: 'Building robust mobile and web applications ensuring performance, scalability, and a native feel.' },
  { id: 5, title: 'Frontend', icon: Code2, desc: 'Transforming designs into clean, semantic code using modern frameworks like React and Vue.' },
  { id: 6, title: 'Prototyping', icon: Layers, desc: 'Creating high-fidelity interactive simulations to test flows and interactions before development.' },
  { id: 7, title: 'Animation', icon: Sparkles, desc: 'Adding life to interfaces with subtle micro-interactions and complex motion graphics.' },
  { id: 8, title: 'Strategy', icon: Search, desc: 'Aligning digital products with business goals through market analysis and user research.' },
  { id: 9, title: 'Systems', icon: Database, desc: 'Creating scalable design systems to maintain consistency and speed up development workflows.' },
  { id: 10, title: 'Performance', icon: Zap, desc: 'Optimizing web applications for speed, accessibility (WCAG), and SEO best practices.' },
  { id: 11, title: 'Backend', icon: Terminal, desc: 'Connecting frontends to powerful APIs and databases for full-stack functionality.' },
  { id: 12, title: 'Responsive', icon: Monitor, desc: 'Ensuring flawless experiences across all devices, from 4K desktops to mobile screens.' }
];

export const Services: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Refs for 3D Engine
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const globeGroupRef = useRef<THREE.Group | null>(null);
  
  // Refs for Interaction (Raycasting)
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2(-100, -100)); // Init off-screen
  const hoveredIndexRef = useRef<number | null>(null);
  
  // Refs for Synchronization
  const markerAnchorsRef = useRef<THREE.Object3D[]>([]);
  const markerDomRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const requestRef = useRef<number>(0);
  const isZoomedRef = useRef(false);
  const [activeService, setActiveService] = useState<typeof SERVICES_DATA[0] | null>(null);

  // --- INITIALIZATION ---
  useEffect(() => {
    if (!mountRef.current || !containerRef.current) return;

    // Safety: Clear previous canvas if any exists (helps with strict mode/hot reload)
    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0f1724, 0.0015); 
    sceneRef.current = scene;

    // 2. Camera
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    // Initial position distance ~29.15 units
    camera.position.set(0, 15, 25);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Controls
    // Attach to container to capture all drag events
    const controls = new OrbitControls(camera, containerRef.current);
    controls.enableDamping = true; 
    controls.dampingFactor = 0.05;
    controls.enableZoom = false; 
    controls.enableRotate = true; 
    controls.autoRotate = false; 
    controls.rotateSpeed = 0.5;
    controls.minDistance = 5;
    controls.maxDistance = 50;
    renderer.domElement.style.touchAction = 'none'; 
    controlsRef.current = controls;

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    // Main directional light to create shadows/depth on the sphere
    const dirLight = new THREE.DirectionalLight(0xffffff, 2);
    dirLight.position.set(10, 20, 10);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0xf39c12, 3, 50);
    pointLight.position.set(-5, 5, 10);
    scene.add(pointLight);

    // 6. Globe Object
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);
    globeGroupRef.current = globeGroup;

    // Wireframe Sphere
    const geometry = new THREE.IcosahedronGeometry(8, 2);
    const wireframeMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x3b82f6, 
      wireframe: true, 
      transparent: true, 
      opacity: 0.15 
    });
    const wireframeSphere = new THREE.Mesh(geometry, wireframeMaterial);
    globeGroup.add(wireframeSphere);

    // Core Sphere (Occluder & Visual Body)
    const coreGeometry = new THREE.IcosahedronGeometry(7.9, 2);
    const coreMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x0f1724,
      emissive: 0x07101a,
      specular: 0x111111,
      shininess: 10,
      flatShading: false, 
    });
    const coreSphere = new THREE.Mesh(coreGeometry, coreMaterial);
    globeGroup.add(coreSphere);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 1500; 
    const posArray = new Float32Array(particleCount * 3);
    for(let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 18;
    }
    // Project to sphere surface
    for(let i = 0; i < particleCount; i++) {
        const x = posArray[i*3];
        const y = posArray[i*3+1];
        const z = posArray[i*3+2];
        const v = new THREE.Vector3(x,y,z).normalize().multiplyScalar(8); 
        posArray[i*3] = v.x;
        posArray[i*3+1] = v.y;
        posArray[i*3+2] = v.z;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1, 
      color: 0xf39c12,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true
    });
    const particleMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    globeGroup.add(particleMesh);

    // Background Stars
    const starsGeometry = new THREE.BufferGeometry();
    const starsPos = new Float32Array(1000 * 3);
    for(let i = 0; i < 1000 * 3; i++) starsPos[i] = (Math.random() - 0.5) * 120;
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPos, 3));
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.12, transparent: true, opacity: 0.3 });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // 7. Initialize Marker Anchors
    const phi = Math.PI * (3 - Math.sqrt(5));
    markerAnchorsRef.current = SERVICES_DATA.map((_, i) => {
      const y = 1 - (i / (SERVICES_DATA.length - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;
      
      const r = 8.2; 
      const x = Math.cos(theta) * radius * r;
      const z = Math.sin(theta) * radius * r;
      const yPos = y * r;

      const vector = new THREE.Vector3(x, yPos, z);
      
      const anchor = new THREE.Mesh(
        new THREE.SphereGeometry(0.6), 
        new THREE.MeshBasicMaterial({ visible: false })
      );
      anchor.position.copy(vector);
      anchor.userData = { index: i }; 
      globeGroup.add(anchor);
      
      return anchor;
    });

    // 8. Animation Loop with Raycasting
    const animate = () => {
      requestRef.current = requestAnimationFrame(animate);
      
      controls.update();

      if (camera && markerAnchorsRef.current.length > 0) {
        raycasterRef.current.setFromCamera(mouseRef.current, camera);
        const intersects = raycasterRef.current.intersectObjects(markerAnchorsRef.current);
        
        if (intersects.length > 0) {
           const idx = intersects[0].object.userData.index;
           hoveredIndexRef.current = idx;
           if (containerRef.current) containerRef.current.style.cursor = 'pointer';
        } else {
           hoveredIndexRef.current = null;
           if (containerRef.current) containerRef.current.style.cursor = 'move';
        }
      }

      renderer.render(scene, camera);

      if (mountRef.current && camera && globeGroup) {
        const containerWidth = mountRef.current.clientWidth;
        const containerHeight = mountRef.current.clientHeight;
        const tempV = new THREE.Vector3();

        markerAnchorsRef.current.forEach((anchor, i) => {
          const domElem = markerDomRefs.current[i];
          if (!domElem) return;

          anchor.getWorldPosition(tempV);

          const globeCenter = new THREE.Vector3();
          globeGroup.getWorldPosition(globeCenter);
          const surfaceNormal = tempV.clone().sub(globeCenter).normalize();
          const cameraVector = camera.position.clone().sub(tempV).normalize();
          
          const dot = surfaceNormal.dot(cameraVector);
          const isVisible = dot > 0.15; 

          tempV.project(camera);
          const x = (tempV.x * .5 + .5) * containerWidth;
          const y = (tempV.y * -.5 + .5) * containerHeight;

          const isHovered = hoveredIndexRef.current === i;
          const scale = isHovered ? 1.2 : 1.0;

          domElem.style.transform = `translate3d(${x}px, ${y}px, 0px) translate(-50%, -50%) scale(${scale})`;
          
          domElem.style.opacity = isVisible ? (isZoomedRef.current ? '0' : '1') : '0';
          domElem.style.visibility = isVisible && !isZoomedRef.current ? 'visible' : 'hidden';
          domElem.style.zIndex = isVisible ? (isHovered ? '30' : '20') : '0';
        });
      }
    };
    animate();

    const resizeObserver = new ResizeObserver(() => {
        if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;
        const w = mountRef.current.clientWidth;
        const h = mountRef.current.clientHeight;
        cameraRef.current.aspect = w / h;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(w, h);
    });
    resizeObserver.observe(mountRef.current);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(requestRef.current);
      // Proper cleanup
      if (mountRef.current && rendererRef.current && mountRef.current.contains(rendererRef.current.domElement)) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      geometry.dispose();
      wireframeMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      renderer.dispose();
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
    };
  }, []);

  // --- MOUSE EVENT HANDLERS (Raycasting Input) ---
  const handleContainerMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    if (isZoomedRef.current) return;
    if (hoveredIndexRef.current !== null) {
        handleMarkerSelect(hoveredIndexRef.current);
    }
  };

  // --- LOGIC HANDLERS ---
  const handleMarkerSelect = (index: number) => {
    if (isZoomedRef.current || !cameraRef.current || !controlsRef.current) return;
    
    isZoomedRef.current = true;
    setActiveService(SERVICES_DATA[index]);
    
    const anchor = markerAnchorsRef.current[index];
    const targetWorldPos = new THREE.Vector3();
    anchor.getWorldPosition(targetWorldPos);

    const direction = targetWorldPos.clone().normalize();
    const cameraEndPos = direction.clone().multiplyScalar(12);
    
    gsap.to(cameraRef.current.position, {
        x: cameraEndPos.x,
        y: cameraEndPos.y,
        z: cameraEndPos.z,
        duration: 1.5,
        ease: "power3.inOut",
        onUpdate: () => controlsRef.current?.update()
    });

    controlsRef.current.enabled = false;
  };

  const handleClose = () => {
    if (!cameraRef.current || !controlsRef.current) return;
    
    setActiveService(null);
    isZoomedRef.current = false;

    // Fixed calculation for zoom out:
    // Original pos (0,15,25) has length ~29.15
    // We want to pull back to roughly that distance while maintaining current angle
    const currentPos = cameraRef.current.position.clone().normalize();
    const backPos = currentPos.multiplyScalar(29.2); // Increased from 25 to 29.2 to return to full view

    gsap.to(cameraRef.current.position, {
        x: backPos.x,
        y: backPos.y,
        z: backPos.z,
        duration: 1.2,
        ease: "power3.out",
        onComplete: () => {
            if (controlsRef.current) {
                controlsRef.current.enabled = true;
                controlsRef.current.enableRotate = true; 
                controlsRef.current.update(); // Explicit update after re-enabling
            }
        }
    });
  };

  return (
    <section id="services" className="min-h-screen relative flex items-center py-16 lg:py-0 overflow-hidden">
      
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full relative z-10">
        
        {/* LEFT COLUMN: Text Content */}
        <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-1 z-20 pointer-events-none text-center lg:text-left pt-10 lg:pt-0"
        >
            <div className="pointer-events-auto">
              <span className="text-brand-orange font-bold uppercase tracking-widest text-sm mb-2 block">
                  Interactive Skills
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight break-words">
                  Exploring The <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-yellow-400">
                      Digital Universe
                  </span>
              </h2>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0 break-words">
                  Navigate the 3D globe to discover my technical expertise. Drag to rotate the network, click to zoom in.
              </p>
              
              <div className="flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center animate-pulse">
                         <Move size={14} className="text-brand-orange" />
                      </div>
                      <span className="inline">Drag to Rotate</span>
                  </div>
                  <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center">
                         <div className="w-2 h-2 bg-brand-orange rounded-full" />
                      </div>
                      <span className="inline">Click to Zoom</span>
                  </div>
              </div>
            </div>
        </motion.div>

        {/* RIGHT COLUMN: 3D Sphere Container */}
        <div 
            ref={containerRef} 
            className="order-2 lg:order-2 w-full h-[400px] sm:h-[500px] lg:h-[800px] relative cursor-move" 
            style={{ touchAction: 'none' }}
            // Handlers for Raycasting Interaction
            onMouseMove={handleContainerMouseMove}
            onClick={handleContainerClick}
        >
           {/* Canvas Container */}
           <div ref={mountRef} className="absolute inset-0 z-10 pointer-events-none" />
           
           {/* Marker Container - Labels only, interaction via Raycasting */}
           <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden top-0 left-0 w-full h-full">
                {SERVICES_DATA.map((service, i) => (
                    <div
                        key={service.id}
                        ref={(el) => { markerDomRefs.current[i] = el; }}
                        // Pointer events none ensures mouse falls through to container for Raycasting & Dragging
                        className="absolute top-0 left-0 will-change-transform origin-center pointer-events-none" 
                    >
                        <div
                            className="group flex flex-col items-center gap-2 pointer-events-none transition-colors"
                        >
                            <div className="relative">
                                <div className="w-4 h-4 bg-brand-orange rounded-full shadow-[0_0_15px_rgba(243,156,18,0.8)]" />
                            </div>
                            <span className="text-[10px] uppercase tracking-widest font-bold text-brand-orange/80 bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm whitespace-nowrap border border-brand-orange/20">
                                {service.title}
                            </span>
                        </div>
                    </div>
                ))}
           </div>
        </div>

        {/* DETAILS OVERLAY */}
        <AnimatePresence>
            {activeService && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-50 flex items-center justify-center p-4 lg:pl-[40%]" 
                >
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                        className="bg-brand-dark/90 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-2xl max-w-sm w-full shadow-2xl relative overflow-hidden"
                    >
                        {/* Decorative Background */}
                        <div className="absolute -top-20 -right-20 w-48 h-48 md:w-64 md:h-64 bg-brand-orange/20 rounded-full blur-3xl pointer-events-none" />

                        <button 
                            onClick={handleClose}
                            className="absolute top-4 right-4 md:top-6 md:right-6 text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-xs md:text-sm font-medium z-10 bg-white/5 px-2 py-1 rounded-full border border-white/5"
                        >
                            CLOSE <X size={14} />
                        </button>
                        
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-brand-orange mb-4 md:mb-6 border border-brand-orange/20 shadow-[0_0_30px_rgba(243,156,18,0.15)] relative z-10">
                            <activeService.icon size={24} className="md:w-8 md:h-8" />
                        </div>

                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 relative z-10 break-words">{activeService.title}</h3>
                        <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6 md:mb-8 border-l-2 border-brand-orange pl-4 relative z-10 break-words">
                            {activeService.desc}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 relative z-10">
                            <a 
                              href="#work" 
                              onClick={(e) => { e.preventDefault(); handleClose(); document.getElementById('work')?.scrollIntoView({behavior:'smooth'}); }}
                              className="flex-1 px-5 py-3 bg-brand-orange text-white font-bold rounded-xl hover:bg-brand-orangeDark transition-all shadow-lg shadow-brand-orange/20 flex items-center justify-center gap-2 group text-sm"
                            >
                                View Projects <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a 
                              href="#contact"
                              onClick={(e) => { e.preventDefault(); handleClose(); document.getElementById('contact')?.scrollIntoView({behavior:'smooth'}); }}
                              className="flex-1 px-5 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center text-sm"
                            >
                                Hire Me
                            </a>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

      </div>
      
      {/* Background Gradient */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full md:w-1/2 h-full bg-[radial-gradient(circle_at_center,rgba(243,156,18,0.03)_0%,transparent_70%)] pointer-events-none" />

    </section>
  );
};
