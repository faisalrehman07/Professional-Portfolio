import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface TechNode {
  name: string;
  category: string;
  description: string;
  techStack: string;
  targetSection: string;
  color: string;
  position: THREE.Vector3;
}

export const CosmicGlobe3D: React.FC<{ isDark?: boolean; onSelectNode?: (targetId: string) => void }> = ({
  isDark = true,
  onSelectNode,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [hoveredNode, setHoveredNode] = useState<TechNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<TechNode | null>(null);

  const techNodesData = [
    { 
      name: 'Artificial Intelligence & ML', 
      category: 'AI & Deep Learning', 
      description: 'Supervised & unsupervised learning, feature selection, loss optimization, and neural model evaluation.',
      techStack: 'TensorFlow, Keras, Scikit-Learn',
      targetSection: 'skills', 
      color: '#38bdf8', 
      phi: 0.8, 
      theta: 0.5 
    },
    { 
      name: 'Full-Stack Development', 
      category: 'Software Engineering', 
      description: 'Enterprise web systems, database design, backend API logic, and responsive UI/UX architecture.',
      techStack: '.NET Framework, MySQL DB, Web Dev',
      targetSection: 'projects', 
      color: '#818cf8', 
      phi: 1.4, 
      theta: 4.8 
    },
    { 
      name: 'Data Science & Analytics', 
      category: 'Analytics & BI', 
      description: 'Exploratory data analysis, statistical modeling, data wrangling, and actionable business intelligence.',
      techStack: 'Pandas, NumPy, Tableau, Power BI',
      targetSection: 'skills', 
      color: '#34d399', 
      phi: 1.8, 
      theta: 1.1 
    },
    { 
      name: 'Cybersecurity & VAPT', 
      category: 'Web & Network Security', 
      description: 'Hands-on vulnerability assessment, web application penetration testing, scanning, and defense mechanisms.',
      techStack: 'VAPT, Web App Security, NICC',
      targetSection: 'experience', 
      color: '#f43f5e', 
      phi: 2.4, 
      theta: 5.6 
    },
    { 
      name: 'Python Ecosystem', 
      category: 'Core Programming', 
      description: 'Primary programming language for AI/ML modeling, script automation, data pipelines, and signal processing.',
      techStack: 'Python 3, Matplotlib, Seaborn',
      targetSection: 'skills', 
      color: '#fbbf24', 
      phi: 2.2, 
      theta: 3.4 
    },
    { 
      name: 'Database Engineering (SQL)', 
      category: 'DBMS & Storage', 
      description: 'Relational schema modeling, table normalization, complex SQL joins, indexing, and data integrity.',
      techStack: 'MySQL, Relational Databases, SQL',
      targetSection: 'skills', 
      color: '#2dd4bf', 
      phi: 2.0, 
      theta: 2.6 
    },
    { 
      name: 'Internet of Things (IoT)', 
      category: 'Embedded & Robotics', 
      description: 'Hardware-software integration, telemetry acquisition, autonomous guidance, and rover teleoperation.',
      techStack: 'Autonomous Rover, Telemetry, IoT',
      targetSection: 'projects', 
      color: '#a78bfa', 
      phi: 0.6, 
      theta: 3.8 
    },
    { 
      name: 'UI / UX Design', 
      category: 'Interface Architecture', 
      description: 'User-centric wireframing, component hierarchy, responsive layouts, and modern accessibility standards.',
      techStack: 'Lucid Charts, Responsive Web, CSS',
      targetSection: 'skills', 
      color: '#ec4899', 
      phi: 1.0, 
      theta: 6.0 
    }
  ];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let animFrameId: number;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // 1. Scene & Camera
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 8.5;

    // 2. Renderer
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3. Globe Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Primary Core Sphere
    const sphereRadius = 2.8;
    const sphereGeometry = new THREE.SphereGeometry(sphereRadius, 24, 24);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: isDark ? 0x0369a1 : 0x0284c7,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.22 : 0.2,
    });
    const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    globeGroup.add(sphereMesh);

    // Outer Equatorial Rings
    const ringGeo1 = new THREE.RingGeometry(3.2, 3.25, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: isDark ? 0.35 : 0.3,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 3;
    globeGroup.add(ringMesh1);

    const ringGeo2 = new THREE.RingGeometry(3.6, 3.63, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: isDark ? 0.3 : 0.25,
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.x = -Math.PI / 4;
    ringMesh2.rotation.y = Math.PI / 6;
    globeGroup.add(ringMesh2);

    // 4. Ambient Stardust Particles
    const particlesCount = 180;
    const particlePositions = new Float32Array(particlesCount * 3);
    const particleColors = new Float32Array(particlesCount * 3);

    const c1 = new THREE.Color(0x38bdf8);
    const c2 = new THREE.Color(0x818cf8);
    const c3 = new THREE.Color(0x34d399);

    for (let i = 0; i < particlesCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = sphereRadius + 0.2 + Math.random() * 1.5;

      const sinPhi = Math.sin(phi);
      particlePositions[i * 3] = r * sinPhi * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * sinPhi * Math.sin(theta);
      particlePositions[i * 3 + 2] = r * Math.cos(phi);

      const color = i % 3 === 0 ? c1 : i % 3 === 1 ? c2 : c3;
      particleColors[i * 3] = color.r;
      particleColors[i * 3 + 1] = color.g;
      particleColors[i * 3 + 2] = color.b;
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particlesGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.8 : 0.7,
    });

    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    globeGroup.add(particleSystem);

    const nodesList: TechNode[] = [];
    const nodeMeshes: THREE.Mesh[] = [];

    techNodesData.forEach(item => {
      const r = sphereRadius + 0.1;
      const x = r * Math.sin(item.phi) * Math.cos(item.theta);
      const y = r * Math.sin(item.phi) * Math.sin(item.theta);
      const z = r * Math.cos(item.phi);

      const pos = new THREE.Vector3(x, y, z);
      const nodeObj: TechNode = {
        name: item.name,
        category: item.category,
        description: item.description,
        techStack: item.techStack,
        targetSection: item.targetSection,
        color: item.color,
        position: pos,
      };
      nodesList.push(nodeObj);

      // Node Glowing Dot Mesh
      const nodeGeo = new THREE.SphereGeometry(0.14, 16, 16);
      const nodeMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(item.color),
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.copy(pos);
      nodeMesh.userData = nodeObj;
      globeGroup.add(nodeMesh);
      nodeMeshes.push(nodeMesh);

      // Connecting line from center
      const lineGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), pos]);
      const lineMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(item.color),
        transparent: true,
        opacity: isDark ? 0.3 : 0.25,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      globeGroup.add(line);
    });

    if (nodesList.length > 0) {
      setSelectedNode(nodesList[0]);
    }

    // 6. Interaction & Mouse Raycasting
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-100, -100);
    let targetRotationX = 0;
    let isMouseOver = false;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = event.clientX - rect.left;
      const clientY = event.clientY - rect.top;

      mouse.x = (clientX / rect.width) * 2 - 1;
      mouse.y = -(clientY / rect.height) * 2 + 1;

      targetRotationX = mouse.y * 0.6;
      isMouseOver = true;
    };

    const handleMouseLeave = () => {
      mouse.x = -100;
      mouse.y = -100;
      isMouseOver = false;
      setHoveredNode(null);
    };

    const handleClick = () => {
      if (!camera) return;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes);
      if (intersects.length > 0) {
        const selected = intersects[0].object.userData as TechNode;
        if (selected) {
          setSelectedNode(selected);
          if (selected.targetSection && onSelectNode) {
            onSelectNode(selected.targetSection);
          }
        }
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('click', handleClick);

    // 7. Animation Loop
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);

      if (!prefersReducedMotion) {
        globeGroup.rotation.y += 0.003;
        ringMesh1.rotation.z += 0.004;
        ringMesh2.rotation.z -= 0.003;
      }

      if (isMouseOver) {
        globeGroup.rotation.x += (targetRotationX - globeGroup.rotation.x) * 0.05;
      }

      if (camera && isMouseOver) {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(nodeMeshes);
        if (intersects.length > 0) {
          const hovered = intersects[0].object.userData as TechNode;
          setHoveredNode(hovered);
          setSelectedNode(hovered);
          document.body.style.cursor = 'pointer';
        } else {
          setHoveredNode(null);
          document.body.style.cursor = 'default';
        }
      }

      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
    };

    animate();

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newW = container.clientWidth || 400;
      const newH = container.clientHeight || 400;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer?.dispose();
    };
  }, [isDark, onSelectNode]);

  const activeNode = hoveredNode || selectedNode;

  return (
    <div className="relative w-full h-full min-h-[460px] flex flex-col items-center justify-between select-none">
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="w-full flex-1 min-h-[300px] cursor-grab active:cursor-grabbing relative" />

      {/* Floating Interactive Skill Dossier Bar */}
      {activeNode && (
        <div className="w-full px-3 pb-3 z-20">
          <div className="p-4 rounded-2xl glass-panel border border-cyan-500/30 bg-slate-900/90 dark:bg-slate-900/95 shadow-xl transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <span 
                className="w-3.5 h-3.5 rounded-full shrink-0 mt-1 shadow-md"
                style={{ backgroundColor: activeNode.color, boxShadow: `0 0 10px ${activeNode.color}` }} 
              />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold font-display text-slate-100 dark:text-white">
                    {activeNode.name}
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                    {activeNode.category}
                  </span>
                </div>
                <p className="text-xs text-slate-300 dark:text-slate-300 mt-1 max-w-lg leading-relaxed">
                  {activeNode.description}
                </p>
                <div className="text-[10px] font-mono text-cyan-400 mt-1">
                  Stack: {activeNode.techStack}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                if (onSelectNode && activeNode.targetSection) {
                  onSelectNode(activeNode.targetSection);
                }
              }}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-colors shrink-0"
            >
              Explore Domain →
            </button>
          </div>
        </div>
      )}

      {/* Interactive Legend Hint */}
      <div className="absolute top-2 right-2 text-[10px] font-mono text-slate-400 dark:text-slate-400 flex items-center gap-1.5 bg-slate-900/80 dark:bg-slate-950/80 px-2.5 py-1 rounded-full border border-slate-700/50 pointer-events-none">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        Interactive Cosmos • Rotate & Select Nodes
      </div>
    </div>
  );
};
