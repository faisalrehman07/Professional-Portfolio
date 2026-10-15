import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import { 
  RotateCw, 
  Play, 
  Pause, 
  ZoomIn, 
  ZoomOut, 
  Layers, 
  ArrowRight, 
  Globe2,
  CheckCircle2,
  Code,
  Database,
  Brain,
  Cpu,
  Workflow,
  Compass,
  Gauge
} from 'lucide-react';
import { resumeData } from '../data/resume';
import type { UniversalSkillNode } from '../data/resume';
import { soundEngine } from '../utils/sound';

interface SkillUniversalGlobeProps {
  onSelectNode?: (targetSection: string) => void;
  onFilterProject?: (techName: string) => void;
  theme?: 'dark' | 'light';
}

const CATEGORIES = [
  'All Technologies',
  'Programming and Databases',
  'Web Development',
  'AI and Machine Learning',
  'Data Science',
  'Developer and AI Tools',
  'Additional Tools'
] as const;

export const SkillUniversalGlobe: React.FC<SkillUniversalGlobeProps> = ({ 
  onSelectNode,
  onFilterProject,
  theme = 'light'
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  const [selectedCategory, setSelectedCategory] = useState<string>('All Technologies');
  const [selectedNode, setSelectedNode] = useState<UniversalSkillNode>(resumeData.universalSkillNodes[0]);
  const [hoveredNode, setHoveredNode] = useState<UniversalSkillNode | null>(null);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState<1 | 2>(1);
  const [webGLSupported, setWebGLSupported] = useState(true);

  // References for Three.js state
  const isAutoRotatingRef = useRef(true);
  isAutoRotatingRef.current = isAutoRotating;

  const rotationSpeedRef = useRef<number>(1);
  rotationSpeedRef.current = rotationSpeed;

  const selectedCategoryRef = useRef(selectedCategory);
  selectedCategoryRef.current = selectedCategory;

  const selectedNodeRef = useRef(selectedNode);
  selectedNodeRef.current = selectedNode;

  const hoveredNodeRef = useRef<UniversalSkillNode | null>(null);
  hoveredNodeRef.current = hoveredNode;

  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const globeGroupRef = useRef<THREE.Group | null>(null);
  const markersRef = useRef<{ mesh: THREE.Mesh; sprite: THREE.Sprite; node: UniversalSkillNode }[]>([]);
  const connectionsGroupRef = useRef<THREE.Group | null>(null);

  // Calculate Fibonacci sphere coordinates for 30 nodes so they are evenly distributed
  const nodesWithPositions = useMemo(() => {
    const nodes = resumeData.universalSkillNodes;
    const count = nodes.length;
    const radius = 2.65;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    return nodes.map((node, i) => {
      const y = 1 - (i / (count - 1)) * 2; // from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = (2 * Math.PI * i) / goldenRatio;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      return {
        ...node,
        pos: new THREE.Vector3(x * radius, y * radius, z * radius),
        normPos: new THREE.Vector3(x, y, z)
      };
    });
  }, []);

  // Filtered nodes
  const filteredNodes = useMemo(() => {
    if (selectedCategory === 'All Technologies') {
      return nodesWithPositions;
    }
    return nodesWithPositions.filter(n => n.category === selectedCategory);
  }, [nodesWithPositions, selectedCategory]);

  // Recenter / Reset View
  const handleResetCamera = useCallback(() => {
    soundEngine.playClick();
    if (globeGroupRef.current) {
      globeGroupRef.current.rotation.set(0.2, 0, 0);
    }
    if (cameraRef.current) {
      cameraRef.current.position.set(0, 0, 7.8);
    }
  }, []);

  // Zoom control
  const handleZoom = useCallback((direction: 'in' | 'out') => {
    soundEngine.playClick();
    if (!cameraRef.current) return;
    const step = direction === 'in' ? -1 : 1;
    const newZ = Math.max(5.5, Math.min(10.5, cameraRef.current.position.z + step));
    cameraRef.current.position.z = newZ;
  }, []);

  // Handle selecting a node
  const handleNodeClick = useCallback((node: UniversalSkillNode) => {
    soundEngine.playClick();
    setSelectedNode(node);
  }, []);

  // Three.js Scene Setup & Loop
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGLSupported(false);
        return;
      }
    } catch {
      setWebGLSupported(false);
      return;
    }

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.8);
    cameraRef.current = camera;

    // Renderer in clean light mode with antialiasing
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    canvasRef.current = renderer.domElement;

    // Master Globe Group
    const globeGroup = new THREE.Group();
    globeGroup.rotation.x = 0.2;
    scene.add(globeGroup);
    globeGroupRef.current = globeGroup;

    const isDark = theme === 'dark' || document.documentElement.classList.contains('dark');

    // 1. Clean Geodesic Core Wireframe Sphere
    const sphereRadius = 2.65;
    const sphereGeo = new THREE.IcosahedronGeometry(sphereRadius, 3);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x38bdf8 : 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.22 : 0.16
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(sphereMesh);

    // 2. Translucent Inner Frosted Core
    const innerGeo = new THREE.SphereGeometry(sphereRadius * 0.97, 32, 24);
    const innerMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x0a101f : 0xf1f5f9,
      transparent: true,
      opacity: isDark ? 0.85 : 0.65
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    globeGroup.add(innerMesh);

    // 3. Technical Coordinate Rings (Equatorial + Tilted Meridiens)
    const ringMat = new THREE.LineBasicMaterial({
      color: isDark ? 0x60a5fa : 0x2563eb,
      transparent: true,
      opacity: isDark ? 0.45 : 0.38
    });
    const ringGeo1 = new THREE.BufferGeometry();
    const ringPts1: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      ringPts1.push(new THREE.Vector3(Math.cos(angle) * (sphereRadius + 0.12), 0, Math.sin(angle) * (sphereRadius + 0.12)));
    }
    ringGeo1.setFromPoints(ringPts1);
    const ringLine1 = new THREE.Line(ringGeo1, ringMat);
    globeGroup.add(ringLine1);

    // Tilted Ring
    const ringLine2 = ringLine1.clone();
    ringLine2.rotation.x = Math.PI / 3;
    ringLine2.rotation.y = Math.PI / 5;
    globeGroup.add(ringLine2);

    // Vertical Meridian Ring
    const ringLine3 = ringLine1.clone();
    ringLine3.rotation.z = Math.PI / 2;
    globeGroup.add(ringLine3);

    // 4. Interactive Connected Tech Splines/Conduits between Related Skills
    const connectionsGroup = new THREE.Group();
    globeGroup.add(connectionsGroup);
    connectionsGroupRef.current = connectionsGroup;

    const connectionLines: { line: THREE.Line; nodeA: UniversalSkillNode; nodeB: UniversalSkillNode }[] = [];

    // Find connections based on relatedSkills
    nodesWithPositions.forEach(nodeA => {
      nodeA.relatedSkills.forEach(relName => {
        const nodeB = nodesWithPositions.find(n => n.name.toLowerCase() === relName.toLowerCase());
        if (nodeB && nodeA.id < nodeB.id) { // Prevent duplicates
          // Create 3D arc that bows outward slightly from the globe surface
          const midPoint = new THREE.Vector3()
            .addVectors(nodeA.pos, nodeB.pos)
            .multiplyScalar(0.5);
          const distance = nodeA.pos.distanceTo(nodeB.pos);
          const elevation = 1.05 + distance * 0.08;
          midPoint.normalize().multiplyScalar(sphereRadius * elevation);

          const curve = new THREE.QuadraticBezierCurve3(nodeA.pos, midPoint, nodeB.pos);
          const points = curve.getPoints(24);
          const curveGeo = new THREE.BufferGeometry().setFromPoints(points);
          const curveMat = new THREE.LineBasicMaterial({
            color: new THREE.Color(nodeA.color),
            transparent: true,
            opacity: 0.28
          });

          const line = new THREE.Line(curveGeo, curveMat);
          connectionsGroup.add(line);
          connectionLines.push({ line, nodeA, nodeB });
        }
      });
    });

    // 5. Build Interactive Markers & Light-Mode Labels
    const markerGeometry = new THREE.SphereGeometry(0.09, 16, 16);
    const markerList: { mesh: THREE.Mesh; sprite: THREE.Sprite; node: UniversalSkillNode }[] = [];

    // Canvas generator for crisp, readable light-mode text pills
    const createTextSprite = (text: string, colorHex: string) => {
      const c = document.createElement('canvas');
      c.width = 340;
      c.height = 76;
      const ctx = c.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, 340, 76);

        // Draw crisp white rounded pill background
        const pillWidth = Math.min(320, Math.max(130, text.length * 15 + 36));
        const pillX = (340 - pillWidth) / 2;
        const pillY = 14;
        const pillH = 48;
        const radius = 24;

        ctx.beginPath();
        ctx.moveTo(pillX + radius, pillY);
        ctx.lineTo(pillX + pillWidth - radius, pillY);
        ctx.quadraticCurveTo(pillX + pillWidth, pillY, pillX + pillWidth, pillY + radius);
        ctx.lineTo(pillX + pillWidth, pillY + pillH - radius);
        ctx.quadraticCurveTo(pillX + pillWidth, pillY + pillH, pillX + pillWidth - radius, pillY + pillH);
        ctx.lineTo(pillX + radius, pillY + pillH);
        ctx.quadraticCurveTo(pillX, pillY + pillH, pillX, pillY + pillH - radius);
        ctx.lineTo(pillX, pillY + radius);
        ctx.quadraticCurveTo(pillX, pillY, pillX + radius, pillY);
        ctx.closePath();

        ctx.fillStyle = isDark ? 'rgba(15, 23, 42, 0.94)' : 'rgba(255, 255, 255, 0.96)';
        ctx.shadowColor = isDark ? 'rgba(0, 0, 0, 0.6)' : 'rgba(15, 23, 42, 0.12)';
        ctx.shadowBlur = isDark ? 12 : 10;
        ctx.shadowOffsetY = 3;
        ctx.fill();

        ctx.strokeStyle = colorHex;
        ctx.lineWidth = isDark ? 2.5 : 2;
        ctx.shadowBlur = 0;
        ctx.stroke();

        // High contrast text
        ctx.font = 'bold 22px "Plus Jakarta Sans", system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = isDark ? '#f8fafc' : '#0f172a';
        ctx.fillText(text, 170, 38);
      }
      const texture = new THREE.CanvasTexture(c);
      texture.minFilter = THREE.LinearFilter;
      const spriteMat = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.95,
        depthWrite: false
      });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(1.4, 0.34, 1);
      return sprite;
    };

    nodesWithPositions.forEach(node => {
      const color = new THREE.Color(node.color);
      const markerMaterial = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.95
      });

      const markerMesh = new THREE.Mesh(markerGeometry, markerMaterial);
      markerMesh.position.copy(node.pos);

      // Label sprite positioned outward
      const sprite = createTextSprite(node.name, node.color);
      const labelPos = node.pos.clone().multiplyScalar(1.15);
      sprite.position.copy(labelPos);

      // Outer Pulsing Halo Ring
      const haloGeo = new THREE.RingGeometry(0.11, 0.16, 16);
      const haloMat = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.55,
        side: THREE.DoubleSide
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      haloMesh.lookAt(node.pos.clone().multiplyScalar(2));
      markerMesh.add(haloMesh);

      // Data association
      markerMesh.userData = { node };

      globeGroup.add(markerMesh);
      globeGroup.add(sprite);

      markerList.push({ mesh: markerMesh, sprite, node });
    });

    markersRef.current = markerList;

    // Raycasting & Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let dragVelocity = { x: 0, y: 0 };

    const getPointerPos = (e: MouseEvent | TouchEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      return {
        x: ((clientX - rect.left) / rect.width) * 2 - 1,
        y: -((clientY - rect.top) / rect.height) * 2 + 1,
        screenX: clientX,
        screenY: clientY
      };
    };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const pos = 'touches' in e ? e.touches[0] : e;
      previousMousePosition = { x: pos.clientX, y: pos.clientY };
      dragVelocity = { x: 0, y: 0 };
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const pointer = getPointerPos(e);
      mouse.x = pointer.x;
      mouse.y = pointer.y;

      if (isDragging) {
        const pos = 'touches' in e ? e.touches[0] : e;
        const deltaX = pos.clientX - previousMousePosition.x;
        const deltaY = pos.clientY - previousMousePosition.y;

        dragVelocity = { x: deltaX * 0.005, y: deltaY * 0.005 };

        globeGroup.rotation.y += dragVelocity.x;
        globeGroup.rotation.x += dragVelocity.y;

        previousMousePosition = { x: pos.clientX, y: pos.clientY };
      }

      // Check hover when not dragging
      if (!isDragging && 'clientX' in e) {
        raycaster.setFromCamera(mouse, camera);
        const markerMeshes = markerList.map(m => m.mesh);
        const intersects = raycaster.intersectObjects(markerMeshes);

        if (intersects.length > 0) {
          const hovered = intersects[0].object.userData.node as UniversalSkillNode;
          setHoveredNode(hovered);
          renderer.domElement.style.cursor = 'pointer';
        } else {
          setHoveredNode(null);
          renderer.domElement.style.cursor = 'grab';
        }
      }
    };

    const handlePointerUp = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      isDragging = false;

      // Click detection if movement was minimal
      const pos = 'changedTouches' in e ? e.changedTouches[0] : e;
      const dist = Math.hypot(pos.clientX - previousMousePosition.x, pos.clientY - previousMousePosition.y);
      if (dist < 5) {
        raycaster.setFromCamera(mouse, camera);
        const markerMeshes = markerList.map(m => m.mesh);
        const intersects = raycaster.intersectObjects(markerMeshes);
        if (intersects.length > 0) {
          const targetNode = intersects[0].object.userData.node as UniversalSkillNode;
          handleNodeClick(targetNode);
        }
      }
    };

    const domElement = renderer.domElement;
    domElement.style.touchAction = 'none';
    domElement.style.cursor = 'grab';

    domElement.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    domElement.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp, { passive: true });

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop with Visibility Optimization
    let animationFrameId: number;
    let isVisible = true;

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.1 });

    observer.observe(container);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      // Auto rotation with selectable speed
      if (isAutoRotatingRef.current && !isDragging) {
        globeGroup.rotation.y += 0.0035 * rotationSpeedRef.current;
      }

      // Smooth damping after drag release
      if (!isDragging && (Math.abs(dragVelocity.x) > 0.0001 || Math.abs(dragVelocity.y) > 0.0001)) {
        globeGroup.rotation.y += dragVelocity.x;
        globeGroup.rotation.x += dragVelocity.y;
        dragVelocity.x *= 0.92;
        dragVelocity.y *= 0.92;
      }

      // Keep rotation x bounded
      globeGroup.rotation.x = Math.max(-0.8, Math.min(0.8, globeGroup.rotation.x));

      // Category opacity & scale highlighting
      const currentCategory = selectedCategoryRef.current;
      const activeHovered = hoveredNodeRef.current;
      const activeSelected = selectedNodeRef.current;

      markerList.forEach(({ mesh, sprite, node }) => {
        const isCatMatch = currentCategory === 'All Technologies' || node.category === currentCategory;
        const isHoverMatch = activeHovered ? activeHovered.id === node.id || activeHovered.relatedSkills.includes(node.name) : true;
        const isSelectedMatch = activeSelected ? activeSelected.id === node.id : false;

        const targetOpacity = isCatMatch && isHoverMatch ? (isSelectedMatch ? 1 : 0.95) : 0.2;
        const targetScale = isSelectedMatch ? 1.25 : (isCatMatch && isHoverMatch ? 1 : 0.7);

        (mesh.material as THREE.MeshBasicMaterial).opacity += (targetOpacity - (mesh.material as THREE.MeshBasicMaterial).opacity) * 0.12;
        sprite.material.opacity += (targetOpacity - sprite.material.opacity) * 0.12;
        mesh.scale.setScalar(targetScale);
      });

      // Highlight connection lines for hovered/selected nodes
      const activeNodeForLines = activeHovered || activeSelected;
      connectionLines.forEach(({ line, nodeA, nodeB }) => {
        const isConnected = activeNodeForLines 
          ? (activeNodeForLines.id === nodeA.id || activeNodeForLines.id === nodeB.id)
          : false;

        const targetOpacity = isConnected ? 0.85 : 0.12;
        (line.material as THREE.LineBasicMaterial).opacity += (targetOpacity - (line.material as THREE.LineBasicMaterial).opacity) * 0.12;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();

      domElement.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);

      domElement.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);

      window.removeEventListener('resize', handleResize);

      // Dispose resources
      sphereGeo.dispose();
      sphereMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringGeo1.dispose();
      markerGeometry.dispose();

      connectionLines.forEach(({ line }) => {
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
      });

      markerList.forEach(({ mesh, sprite }) => {
        (mesh.material as THREE.Material).dispose();
        sprite.material.map?.dispose();
        sprite.material.dispose();
      });

      renderer.dispose();
      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
    };
  }, [nodesWithPositions, handleNodeClick, theme]);

  // Category Icon Resolver
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Programming and Databases':
        return <Database className="w-3.5 h-3.5 text-blue-600" />;
      case 'Web Development':
        return <Code className="w-3.5 h-3.5 text-emerald-600" />;
      case 'AI and Machine Learning':
        return <Brain className="w-3.5 h-3.5 text-indigo-600" />;
      case 'Data Science':
        return <Layers className="w-3.5 h-3.5 text-amber-600" />;
      case 'Developer and AI Tools':
        return <Cpu className="w-3.5 h-3.5 text-sky-600" />;
      default:
        return <Workflow className="w-3.5 h-3.5 text-purple-600" />;
    }
  };

  return (
    <section 
      id="skills-globe" 
      className="relative py-20 md:py-28 overflow-hidden bg-slate-50/30 backdrop-blur-2xs border-y border-slate-200/70"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs text-blue-700 font-semibold mb-4 shadow-2xs">
            <Cpu className="w-3.5 h-3.5 text-blue-600" />
            <span>Interactive 3D Skill Mesh</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight mb-4">
            Interactive Technical <span className="tech-gradient-text">Ecosystem</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            An interactive 3D spatial visualization mapping 30 verified technologies with dynamic relational conduits. 
            Rotate the sphere, inspect connected frameworks, and filter practical projects.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 max-w-5xl mx-auto">
          {CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  soundEngine.playClick();
                  setSelectedCategory(cat);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white font-semibold shadow-sm scale-105'
                    : 'bg-white text-slate-700 hover:text-blue-600 border border-slate-200 hover:border-blue-300 shadow-2xs'
                }`}
              >
                {cat !== 'All Technologies' && getCategoryIcon(cat)}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Main 3D Globe Visualizer & Info Inspector Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left / Center: Three.js Interactive 3D Sphere */}
          <div className="lg:col-span-7 xl:col-span-8 relative">
            <div className="relative w-full h-[420px] sm:h-[500px] md:h-[560px] rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-md">
              {/* Globe Canvas Container */}
              {webGLSupported ? (
                <div 
                  ref={containerRef} 
                  className="w-full h-full cursor-grab active:cursor-grabbing select-none"
                  title="Click & Drag to rotate 3D Skills Sphere"
                />
              ) : (
                /* 2D Fallback for environments lacking WebGL */
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                  <Globe2 className="w-16 h-16 text-blue-600 mb-4 animate-spin" />
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Technical Skills Constellation</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-80 overflow-y-auto w-full p-2">
                    {filteredNodes.map(node => (
                      <button
                        key={node.id}
                        onClick={() => handleNodeClick(node)}
                        className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                          selectedNode.id === node.id 
                            ? 'bg-blue-50 border-blue-400 text-blue-700' 
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="font-semibold text-slate-900">{node.name}</div>
                        <div className="text-[10px] text-slate-500">{node.category}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Floating Toolbar Controls */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-sm">
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setIsAutoRotating(prev => !prev);
                  }}
                  className={`p-2 rounded-xl text-xs transition-colors cursor-pointer ${
                    isAutoRotating 
                      ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title={isAutoRotating ? "Pause Auto-Rotation" : "Resume Auto-Rotation"}
                >
                  {isAutoRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setRotationSpeed(prev => (prev === 1 ? 2 : 1));
                  }}
                  className="px-2 py-1.5 rounded-xl text-xs font-mono font-bold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer flex items-center gap-1"
                  title="Toggle Rotation Speed (1x / 2x)"
                >
                  <Gauge className="w-3.5 h-3.5" />
                  <span>{rotationSpeed}x</span>
                </button>

                <button
                  onClick={handleResetCamera}
                  className="p-2 rounded-xl text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                  title="Recenter Globe View"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleZoom('in')}
                  className="p-2 rounded-xl text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleZoom('out')}
                  className="p-2 rounded-xl text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Real-time Telemetry HUD Pill */}
              <div className="absolute top-4 right-4 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 text-[11px] font-mono text-slate-500 shadow-2xs">
                <Compass className="w-3.5 h-3.5 text-blue-600" />
                <span>RELATIONAL CONDUITS ACTIVE</span>
              </div>

              {/* Skill Counter & Guidance Pill */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                <div className="px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 text-[11px] text-slate-600 shadow-2xs">
                  <span className="text-blue-600 font-semibold">{filteredNodes.length}</span> technologies visible &bull; Drag to rotate
                </div>
                {hoveredNode && (
                  <div className="hidden sm:inline-flex px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-blue-300 text-[11px] text-blue-700 shadow-2xs animate-fadeIn">
                    Hovering: <span className="font-semibold text-slate-900 ml-1">{hoveredNode.name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Selected Skill Details Inspector Card */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col">
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-md relative overflow-hidden transition-all">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span 
                    className="inline-block text-[11px] font-mono uppercase tracking-wider font-semibold px-2.5 py-1 rounded-md mb-2 border"
                    style={{ 
                      color: selectedNode.color, 
                      borderColor: `${selectedNode.color}40`,
                      backgroundColor: `${selectedNode.color}15`
                    }}
                  >
                    {selectedNode.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
                    {selectedNode.name}
                  </h3>
                </div>

                <div 
                  className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border shadow-2xs"
                  style={{ 
                    borderColor: `${selectedNode.color}50`,
                    backgroundColor: `${selectedNode.color}15`,
                    color: selectedNode.color
                  }}
                >
                  <Cpu className="w-5 h-5" />
                </div>
              </div>

              {/* Technical Overview */}
              <div className="mb-5">
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block mb-1.5 font-semibold">
                  Technical Architecture:
                </span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {selectedNode.description}
                </p>
              </div>

              {/* Practical Use Case */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 mb-5">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 mb-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Practical Implementation</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {selectedNode.practicalUse}
                </p>
              </div>

              {/* Connected Skills */}
              {selectedNode.relatedSkills && selectedNode.relatedSkills.length > 0 && (
                <div className="mb-6">
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block mb-2 font-semibold">
                    Interconnected Technologies:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedNode.relatedSkills.map(rel => (
                      <span
                        key={rel}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-slate-100 text-slate-700 border border-slate-200"
                      >
                        {rel}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action: Explore Related Projects */}
              <button
                onClick={() => {
                  soundEngine.playClick();
                  if (onFilterProject) {
                    onFilterProject(selectedNode.name);
                  }
                  if (onSelectNode) {
                    onSelectNode('projects');
                  }
                }}
                className="w-full py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Filter Projects Using {selectedNode.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
