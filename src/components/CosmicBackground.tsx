import React, { useEffect, useRef } from 'react';

interface CodeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  text: string;
  opacity: number;
  size: number;
  phase: number;
}

interface CircuitPulse {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  speed: number;
  axis: 'x' | 'y';
  progress: number;
  color: string;
}

export const CosmicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse proximity tracking for interactive hi-tech aura
    const mouse = { x: -1000, y: -1000, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Hi-tech code tokens that float subtly in the background
    const codeTokens = [
      '{ }', '</>', '=>', '0101', 'git:main', 'const', 'return', '&&', 
      '//', 'fn()', '[ ]', 'async', 'API', 'SQL', '8.2', 'export', 'await'
    ];

    const particles: CodeParticle[] = Array.from({ length: 22 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -0.15 - Math.random() * 0.2, // gently floats upward
      text: codeTokens[Math.floor(Math.random() * codeTokens.length)],
      opacity: 0.08 + Math.random() * 0.08,
      size: 11 + Math.random() * 3,
      phase: Math.random() * Math.PI * 2
    }));

    // High-tech circuit bus traces with moving data packets
    const gridStep = 48;
    const pulses: CircuitPulse[] = Array.from({ length: 6 }, () => {
      const isHorizontal = Math.random() > 0.5;
      const startX = Math.floor((Math.random() * width) / gridStep) * gridStep;
      const startY = Math.floor((Math.random() * height) / gridStep) * gridStep;
      return {
        x: startX,
        y: startY,
        targetX: isHorizontal ? startX + (Math.random() > 0.5 ? 240 : -240) : startX,
        targetY: !isHorizontal ? startY + (Math.random() > 0.5 ? 240 : -240) : startY,
        speed: 0.008 + Math.random() * 0.008,
        axis: isHorizontal ? 'x' : 'y',
        progress: Math.random(),
        color: Math.random() > 0.5 ? '#2563eb' : '#4f46e5'
      };
    });

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains('dark');

      // 1. Subtle Precision Engineering Grid with Crosshairs
      ctx.save();
      ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.10)' : 'rgba(148, 163, 184, 0.16)';
      ctx.strokeStyle = isDark ? 'rgba(59, 130, 246, 0.22)' : 'rgba(203, 213, 225, 0.25)';
      ctx.lineWidth = 1;

      // Draw faint dot grid
      const offsetX = 0;
      const offsetY = 0;

      for (let x = offsetX; x < width; x += gridStep) {
        for (let y = offsetY; y < height; y += gridStep) {
          // Draw tiny dot
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();

          // Every 4th point draw a subtle tech crosshair '+'
          if (x % (gridStep * 4) === 0 && y % (gridStep * 4) === 0) {
            ctx.beginPath();
            ctx.moveTo(x - 3, y);
            ctx.lineTo(x + 3, y);
            ctx.moveTo(x, y - 3);
            ctx.lineTo(x, y + 3);
            ctx.stroke();
          }

          // Interactive cursor proximity glow on nearby grid intersections
          if (mouse.active) {
            const dx = mouse.x - x;
            const dy = mouse.y - y;
            const dist = Math.hypot(dx, dy);
            if (dist < 110) {
              const proximityAlpha = (1 - dist / 110) * (isDark ? 0.45 : 0.35);
              ctx.fillStyle = isDark 
                ? `rgba(96, 165, 250, ${proximityAlpha})`
                : `rgba(37, 99, 235, ${proximityAlpha})`;
              ctx.beginPath();
              ctx.arc(x, y, 2.2, 0, Math.PI * 2);
              ctx.fill();
              ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.10)' : 'rgba(148, 163, 184, 0.16)';
            }
          }
        }
      }
      ctx.restore();

      // 2. High-Tech Circuit Bus Lines & Glowing Data Pulses
      pulses.forEach(pulse => {
        pulse.progress += pulse.speed;
        if (pulse.progress >= 1) {
          pulse.progress = 0;
          pulse.x = Math.floor((Math.random() * width) / gridStep) * gridStep;
          pulse.y = Math.floor((Math.random() * height) / gridStep) * gridStep;
          pulse.axis = Math.random() > 0.5 ? 'x' : 'y';
          if (pulse.axis === 'x') {
            pulse.targetX = pulse.x + (Math.random() > 0.5 ? 240 : -240);
            pulse.targetY = pulse.y;
          } else {
            pulse.targetX = pulse.x;
            pulse.targetY = pulse.y + (Math.random() > 0.5 ? 240 : -240);
          }
        }

        // Draw circuit track line
        ctx.save();
        ctx.strokeStyle = isDark ? 'rgba(51, 65, 85, 0.45)' : 'rgba(203, 213, 225, 0.35)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(pulse.x, pulse.y);
        ctx.lineTo(pulse.targetX, pulse.targetY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Current pulse position along the bus
        const curX = pulse.x + (pulse.targetX - pulse.x) * pulse.progress;
        const curY = pulse.y + (pulse.targetY - pulse.y) * pulse.progress;

        const pulseColor = isDark 
          ? (pulse.color === '#2563eb' ? '#38bdf8' : '#818cf8')
          : pulse.color;

        // Glowing pulse head
        ctx.fillStyle = pulseColor;
        ctx.shadowColor = pulseColor;
        ctx.shadowBlur = isDark ? 9 : 6;
        ctx.beginPath();
        ctx.arc(curX, curY, isDark ? 2.3 : 2, 0, Math.PI * 2);
        ctx.fill();

        // Subtle trace tail
        ctx.strokeStyle = pulseColor;
        ctx.lineWidth = 1.5;
        const tailLength = 16;
        const tailX = pulse.axis === 'x' 
          ? curX - Math.sign(pulse.targetX - pulse.x) * tailLength 
          : curX;
        const tailY = pulse.axis === 'y' 
          ? curY - Math.sign(pulse.targetY - pulse.y) * tailLength 
          : curY;
        
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(curX, curY);
        ctx.stroke();

        ctx.restore();
      });

      // 3. Floating Monospace Code & Developer Glyphs
      ctx.save();
      ctx.font = '500 12px "JetBrains Mono", "Fira Code", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      particles.forEach(p => {
        // Move particle
        p.x += p.vx + Math.sin(time + p.phase) * 0.15;
        p.y += p.vy;

        // Wrap around boundaries smoothly
        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        // Calculate dynamic subtle opacity pulse
        const dynamicAlpha = p.opacity + Math.sin(time * 1.5 + p.phase) * 0.03;

        // Interactive mouse repel / hover illumination
        let extraAlpha = 0;
        if (mouse.active) {
          const mdist = Math.hypot(mouse.x - p.x, mouse.y - p.y);
          if (mdist < 140) {
            extraAlpha = (1 - mdist / 140) * (isDark ? 0.3 : 0.22);
          }
        }

        const textColor = isDark 
          ? `rgba(148, 163, 184, ${Math.max(0.06, dynamicAlpha + extraAlpha)})`
          : `rgba(71, 85, 105, ${Math.max(0.04, dynamicAlpha + extraAlpha)})`;

        ctx.fillStyle = textColor;
        ctx.fillText(p.text, p.x, p.y);
      });
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#f8fafc] dark:bg-[#030712] transition-colors duration-300">
      {/* HTML5 Canvas for Interactive High-Tech Grid & Coding Particles */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Luminous Soft Ambient Multi-Hue Mesh Orbs */}
      <div 
        className="absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full blur-[110px] pointer-events-none opacity-45 dark:opacity-25 animate-pulse-subtle"
        style={{ 
          background: 'radial-gradient(circle, rgba(147, 197, 253, 0.5) 0%, rgba(199, 210, 254, 0.25) 50%, transparent 75%)' 
        }}
      />

      <div 
        className="absolute top-1/3 -right-32 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none opacity-40 dark:opacity-20"
        style={{ 
          background: 'radial-gradient(circle, rgba(199, 210, 254, 0.45) 0%, rgba(224, 231, 255, 0.2) 50%, transparent 75%)' 
        }}
      />

      <div 
        className="absolute bottom-1/4 left-1/4 w-[750px] h-[550px] rounded-full blur-[130px] pointer-events-none opacity-35 dark:opacity-15"
        style={{ 
          background: 'radial-gradient(circle, rgba(167, 243, 208, 0.35) 0%, rgba(186, 230, 253, 0.2) 60%, transparent 80%)' 
        }}
      />

      {/* Top Engineering Linear Edge Accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/35 to-transparent dark:via-blue-400/50" />
    </div>
  );
};
