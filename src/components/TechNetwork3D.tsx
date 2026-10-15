import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface TechNode {
  id: string;
  name: string;
  category: string;
  description: string;
  techStack: string;
  targetSection: string;
  color: string;
  position: THREE.Vector3;
}

export const TechNetwork3D: React.FC<{ onSelectNode?: (targetId: string) => void }> = ({
  onSelectNode,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [hoveredNode, setHoveredNode] = useState<TechNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<TechNode | null>(null);

  const techNodesData: TechNode[] = [
    { 
      id: 'ai-ml',
      name: 'Artificial Intelligence & Deep Learning', 
      category: 'Neural Networks & Research', 
      description: 'Convolutional neural architectures, contactless rPPG facial video stress estimation, MTCNN face detection, and machine learning pipelines.',
      techStack: 'Python, PyTorch, TensorFlow, OpenCV, MTCNN, Scikit-learn',
      targetSection: 'projects',
      color: '#38bdf8', // Cyan
      position: new THREE.Vector3(2.5, 1.2, 0.8)
    },
    { 
      id: 'fullstack',
      name: 'Full-Stack Software Engineering', 
      category: 'Enterprise Web & Systems', 
      description: 'End-to-end full stack web architecture, RESTful microservices, reactive frontend state machines, relational and NoSQL schemas.',
      techStack: 'React.js, Node.js, Express, JavaScript/ES6+, Tailwind CSS, MongoDB, MySQL',
      targetSection: 'projects',
      color: '#818cf8', // Indigo
      position: new THREE.Vector3(-2.4, 1.4, -0.6)
    },
    { 
      id: 'iot',
      name: 'IoT Teleoperation & Robotics', 
      category: 'Hardware & Edge Systems', 
      description: 'Microcontroller hardware firmware, dual joystick wireless remote teleoperation, Wi-Fi web socket control, and telemetry tracking.',
      techStack: 'ESP32, ESP8266, C++, Arduino IDE, Wi-Fi WebSockets, Embedded Sensors',
      targetSection: 'projects',
      color: '#34d399', // Emerald
      position: new THREE.Vector3(0.3, -2.4, 1.5)
    },
    { 
      id: 'cybersecurity',
      name: 'Cybersecurity & VAPT', 
      category: 'Security Analysis', 
      description: 'Vulnerability assessment, network packet dissection, penetration testing methodologies, OWASP security remediation.',
      techStack: 'Kali Linux, Wireshark, Nmap, Burp Suite, Network Protocols',
      targetSection: 'experience',
      color: '#f43f5e', // Rose
      position: new THREE.Vector3(-1.8, -1.6, -1.4)
    },
    { 
      id: 'data-eng',
      name: 'Data Science & Analytics', 
      category: 'Statistical Modeling', 
      description: 'Exploratory data analysis (EDA), multi-dimensional matrix operations, statistical feature engineering, and high-impact data visualization.',
      techStack: 'Pandas, NumPy, Matplotlib, Seaborn, SQL, Tableau',
      targetSection: 'skills',
      color: '#fbbf24', // Amber
      position: new THREE.Vector3(1.9, -1.2, -1.8)
    },
    { 
      id: 'cloud-db',
      name: 'Cloud & Database Architecture', 
      category: 'Data Persistence & CI', 
      description: 'Relational database normalisation, ACID transaction safety, document-based NoSQL storage, and Git branch orchestration.',
      techStack: 'PostgreSQL, MySQL, MongoDB, Git/GitHub, Linux CLI, Postman',
      targetSection: 'skills',
      color: '#c084fc', // Purple
      position: new THREE.Vector3(-0.6, 2.3, 1.6)
    }
  ];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 480;
    const height = container.clientHeight || 420;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Master Rotation Pivot Group
    const cosmosGroup = new THREE.Group();
    scene.add(cosmosGroup);

    // 1. Central Cosmic Core Sphere with glowing wireframe
    const coreGeo = new THREE.IcosahedronGeometry(0.8, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    cosmosGroup.add(coreMesh);

    // Inner glowing core
    const innerCoreGeo = new THREE.SphereGeometry(0.5, 16, 16);
    const innerCoreMat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.6,
    });
    const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    cosmosGroup.add(innerCoreMesh);

    // 2. Orbital Celestial Rings
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const ringGeo1 = new THREE.RingGeometry(2.3, 2.35, 64);
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    cosmosGroup.add(ring1);

    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const ringGeo2 = new THREE.RingGeometry(2.9, 2.94, 64);
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 5;
    cosmosGroup.add(ring2);

    // 3. Surrounding Stardust particle cloud
    const stardustCount = 380;
    const stardustGeo = new THREE.BufferGeometry();
    const stardustPos = new Float32Array(stardustCount * 3);
    const stardustColors = new Float32Array(stardustCount * 3);

    const colorPalette = [
      new THREE.Color(0x38bdf8),
      new THREE.Color(0x818cf8),
      new THREE.Color(0x34d399),
      new THREE.Color(0xffffff)
    ];

    for (let i = 0; i < stardustCount; i++) {
      const radius = 1.2 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      stardustPos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      stardustPos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      stardustPos[i * 3 + 2] = radius * Math.cos(phi);

      const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      stardustColors[i * 3] = col.r;
      stardustColors[i * 3 + 1] = col.g;
      stardustColors[i * 3 + 2] = col.b;
    }

    stardustGeo.setAttribute('position', new THREE.BufferAttribute(stardustPos, 3));
    stardustGeo.setAttribute('color', new THREE.BufferAttribute(stardustColors, 3));

    const stardustMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
    });
    const stardustMesh = new THREE.Points(stardustGeo, stardustMat);
    cosmosGroup.add(stardustMesh);

    // 4. Interactive Tech Nodes & Constellation Lines
    const nodeMeshes: THREE.Mesh[] = [];
    const interactiveMeshes: THREE.Mesh[] = [];

    techNodesData.forEach((data) => {
      // Outer Halo Sphere
      const haloGeo = new THREE.SphereGeometry(0.32, 16, 16);
      const haloMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(data.color),
        wireframe: true,
        transparent: true,
        opacity: 0.5,
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      haloMesh.position.copy(data.position);

      // Solid glowing core
      const nodeGeo = new THREE.SphereGeometry(0.18, 16, 16);
      const nodeMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(data.color),
      });
      const solidNode = new THREE.Mesh(nodeGeo, nodeMat);
      haloMesh.add(solidNode);

      // Store node data on userData
      haloMesh.userData = { nodeData: data };
      solidNode.userData = { nodeData: data };

      cosmosGroup.add(haloMesh);
      nodeMeshes.push(haloMesh);
      interactiveMeshes.push(haloMesh, solidNode);

      // Connecting line to core
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        data.position
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(data.color),
        transparent: true,
        opacity: 0.25,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      cosmosGroup.add(line);
    });

    // Inter-node constellation chords
    for (let i = 0; i < techNodesData.length; i++) {
      for (let j = i + 1; j < techNodesData.length; j++) {
        if (techNodesData[i].position.distanceTo(techNodesData[j].position) < 4.2) {
          const chordGeo = new THREE.BufferGeometry().setFromPoints([
            techNodesData[i].position,
            techNodesData[j].position
          ]);
          const chordMat = new THREE.LineBasicMaterial({
            color: 0x818cf8,
            transparent: true,
            opacity: 0.12,
          });
          const chord = new THREE.Line(chordGeo, chordMat);
          cosmosGroup.add(chord);
        }
      }
    }

    // Interactive Raycaster
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-100, -100);

    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let rotSpeedX = 0.002;
    let rotSpeedY = 0.003;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        cosmosGroup.rotation.y += deltaX * 0.006;
        cosmosGroup.rotation.x += deltaY * 0.006;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleMouseLeave = () => {
      isDragging = false;
      mouse.x = -100;
      mouse.y = -100;
      setHoveredNode(null);
    };

    const handleClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes, false);
      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const nodeData = hit.userData?.nodeData as TechNode | undefined;
        if (nodeData) {
          setSelectedNode(nodeData);
        }
      }
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('click', handleClick);

    // Animation Loop
    let animFrameId: number;

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);

      if (!isDragging) {
        cosmosGroup.rotation.y += rotSpeedY;
        cosmosGroup.rotation.x += rotSpeedX;
      }

      // Rotate inner elements
      coreMesh.rotation.x -= 0.005;
      coreMesh.rotation.y += 0.007;
      ring1.rotation.z += 0.002;
      ring2.rotation.z -= 0.0015;
      stardustMesh.rotation.y -= 0.001;

      // Pulse nodes
      const time = Date.now() * 0.002;
      nodeMeshes.forEach((mesh, idx) => {
        const scale = 1 + Math.sin(time + idx * 1.2) * 0.08;
        mesh.scale.set(scale, scale, scale);
      });

      // Raycasting check
      if (mouse.x > -2 && mouse.x < 2) {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(interactiveMeshes, false);
        if (intersects.length > 0) {
          const hit = intersects[0].object;
          const nodeData = hit.userData?.nodeData as TechNode | undefined;
          if (nodeData) {
            setHoveredNode(nodeData);
            document.body.style.cursor = 'pointer';
          }
        } else {
          setHoveredNode(null);
          document.body.style.cursor = 'default';
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const newW = container.clientWidth || 480;
      const newH = container.clientHeight || 420;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameId);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      document.body.style.cursor = 'default';
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const activeNode = hoveredNode || selectedNode;

  return (
    <div className="relative w-full h-full min-h-[460px] flex flex-col items-center justify-between select-none">
      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="w-full flex-1 min-h-[300px] cursor-grab active:cursor-grabbing relative" />

      {/* Cosmic Technical Node Inspector Card */}
      {activeNode && (
        <div className="w-full px-2 pb-2 z-20">
          <div className="p-4 rounded-2xl glass-panel bg-slate-900/90 border border-cyan-500/30 shadow-[0_0_25px_rgba(6,182,212,0.15)] transition-all duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shadow-[0_0_10px_currentColor]" style={{ backgroundColor: activeNode.color, color: activeNode.color }} />
                <span className="font-bold text-white font-display text-sm">{activeNode.name}</span>
              </div>
              <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/60 px-2.5 py-0.5 rounded-full border border-cyan-700/60">
                {activeNode.category}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              {activeNode.description}
            </p>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/80">
              <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 truncate mr-2">
                <span className="text-cyan-400">stack:</span>
                <span className="text-slate-300">{activeNode.techStack}</span>
              </div>
              <button
                onClick={() => {
                  if (onSelectNode && activeNode.targetSection) {
                    onSelectNode(activeNode.targetSection);
                  }
                }}
                className="text-xs font-mono font-semibold text-cyan-300 hover:text-cyan-200 hover:underline shrink-0"
              >
                Inspect Section &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cosmic Orbit HUD Indicator */}
      <div className="absolute top-2 right-2 text-[10px] font-mono text-slate-400 flex items-center gap-2 bg-slate-950/80 px-3 py-1 rounded-full border border-slate-800 pointer-events-none backdrop-blur-md">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
        <span>CELESTIAL_GRAPH: ACTIVE</span>
      </div>
    </div>
  );
};
