"use client";

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';

const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
});

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  isBTB?: boolean;
  rotation?: number;
  rotationSpeed?: number;
}

export function ParticleSystem() {
  const particles = useRef<Particle[]>([]);
  const { theme } = useTheme();
  const btbLogoRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = document.createElement('img');
    img.src = '/btb-logo.png';
    img.onload = () => {
      btbLogoRef.current = img;
    };
  }, []);

  const setup = (p5: any, canvasParentRef: Element) => {
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef);
    initParticles(p5);

    const handleResize = () => {
      p5.resizeCanvas(window.innerWidth, window.innerHeight);
      initParticles(p5);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  };

  const initParticles = (p5: any) => {
    particles.current = [];
    const numParticles = Math.floor((p5.width * p5.height) / 20000);
    const numBTBLogos = Math.floor(numParticles * 0.1);
    
    // Create regular particles
    for (let i = 0; i < numParticles - numBTBLogos; i++) {
      particles.current.push({
        x: p5.random(p5.width),
        y: p5.random(p5.height),
        vx: p5.random(-0.3, 0.3),
        vy: p5.random(-0.3, 0.3),
        size: p5.random(2, 4),
        alpha: p5.random(40, 80),
        isBTB: false
      });
    }

    // Create BTB logo particles
    for (let i = 0; i < numBTBLogos; i++) {
      particles.current.push({
        x: p5.random(p5.width),
        y: p5.random(p5.height),
        vx: p5.random(-0.2, 0.2),
        vy: p5.random(-0.2, 0.2),
        size: 30,
        alpha: p5.random(40, 60),
        isBTB: true,
        rotation: p5.random(0, 360),
        rotationSpeed: p5.random(-0.5, 0.5)
      });
    }
  };

  const draw = (p5: any) => {
    p5.clear();
    
    const primaryColor = theme === 'dark' ? [227, 30, 36] : [227, 30, 36];
    
    // Draw connections
    particles.current.forEach((particle, i) => {
      particles.current.forEach((other, j) => {
        if (i !== j) {
          const d = p5.dist(particle.x, particle.y, other.x, other.y);
          const maxDist = particle.isBTB || other.isBTB ? 120 : 80;
          
          if (d < maxDist) {
            const alpha = p5.map(d, 0, maxDist, 30, 0);
            p5.stroke(...primaryColor, alpha * 0.15);
            p5.line(particle.x, particle.y, other.x, other.y);
          }
        }
      });
    });

    // Draw particles
    particles.current.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Wrap around screen edges
      if (particle.x < 0) particle.x = p5.width;
      if (particle.x > p5.width) particle.x = 0;
      if (particle.y < 0) particle.y = p5.height;
      if (particle.y > p5.height) particle.y = 0;

      if (particle.isBTB && btbLogoRef.current) {
        particle.rotation! += particle.rotationSpeed!;
        
        p5.push();
        p5.translate(particle.x, particle.y);
        p5.rotate(p5.radians(particle.rotation!));
        p5.tint(255, particle.alpha);
        p5.imageMode(p5.CENTER);
        p5.image(btbLogoRef.current, 0, 0, particle.size, particle.size);
        p5.pop();
      } else {
        p5.noStroke();
        p5.fill(...primaryColor, particle.alpha * 0.2);
        
        // Draw star shape
        p5.push();
        p5.translate(particle.x, particle.y);
        p5.rotate(p5.frameCount * 0.02);
        p5.beginShape();
        for (let i = 0; i < 5; i++) {
          const angle = p5.TWO_PI * i / 5;
          const x = p5.cos(angle) * particle.size;
          const y = p5.sin(angle) * particle.size;
          p5.vertex(x, y);
          
          const innerAngle = angle + p5.TWO_PI / 10;
          const innerX = p5.cos(innerAngle) * (particle.size * 0.4);
          const innerY = p5.sin(innerAngle) * (particle.size * 0.4);
          p5.vertex(innerX, innerY);
        }
        p5.endShape(p5.CLOSE);
        p5.pop();
      }
    });
  };

  return (
    <>
      <div className="fixed inset-0 -z-20 bg-gradient-to-b from-red-50/90 via-background to-background dark:from-red-950/20 dark:via-background dark:to-background" />
      <div className="fixed inset-0 -z-10 opacity-30">
        <Sketch setup={setup} draw={draw} />
      </div>
    </>
  );
}