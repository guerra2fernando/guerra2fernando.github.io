"use client";

import { useEffect, useRef, useState } from "react";
import type * as Three from "three";
import { MousePointer2 } from "lucide-react";

import { cn } from "@/lib/utils";

type SceneStatus = "loading" | "ready" | "failed";

export function HeroScene({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [status, setStatus] = useState<SceneStatus>("loading");

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const boot = async () => {
      try {
        const THREE = await import("three");
        if (cancelled) return;

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        });
        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
        camera.position.set(0, 0, 6.4);

        const group = new THREE.Group();
        group.rotation.set(-0.08, 0.4, 0);
        scene.add(group);

        const ambient = new THREE.AmbientLight(0xf1f3e9, 0.35);
        scene.add(ambient);

        const limeLight = new THREE.PointLight(0xc9f25f, 18, 22, 2);
        limeLight.position.set(4, 3.5, 4);
        scene.add(limeLight);

        const mintLight = new THREE.PointLight(0x8ce8c2, 10, 18, 2);
        mintLight.position.set(-4, -2, 2.5);
        scene.add(mintLight);

        const warmLight = new THREE.PointLight(0xff7a45, 5, 14, 2);
        warmLight.position.set(2, -4, 2);
        scene.add(warmLight);

        const coreGeometry = new THREE.IcosahedronGeometry(0.94, 3);
        const coreMaterial = new THREE.MeshStandardMaterial({
          color: 0x0a0f08,
          metalness: 0.9,
          roughness: 0.3,
          emissive: 0x1a2a06,
          emissiveIntensity: 0.8,
        });
        const core = new THREE.Mesh(coreGeometry, coreMaterial);
        group.add(core);

        const coreLight = new THREE.PointLight(0xc9f25f, 8, 7, 2);
        coreLight.position.set(0, 0, 0);
        group.add(coreLight);

        const heart = new THREE.Mesh(
          new THREE.SphereGeometry(0.065, 20, 20),
          new THREE.MeshBasicMaterial({
            color: 0xe3ff9b,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          }),
        );
        heart.position.set(0, 0, 0.92);
        group.add(heart);

        const coreRings: Three.Mesh[] = [];
        [
          { rotationX: Math.PI / 2, rotationY: 0, opacity: 0.34 },
          { rotationX: Math.PI / 2, rotationY: Math.PI / 2, opacity: 0.2 },
          { rotationX: Math.PI / 3, rotationY: Math.PI / 4, opacity: 0.14 },
        ].forEach((config) => {
          const ring = new THREE.Mesh(
            new THREE.TorusGeometry(1.0, 0.004, 6, 160),
            new THREE.MeshBasicMaterial({
              color: 0xc9f25f,
              transparent: true,
              opacity: config.opacity,
              blending: THREE.AdditiveBlending,
              depthWrite: false,
            }),
          );
          ring.rotation.x = config.rotationX;
          ring.rotation.y = config.rotationY;
          group.add(ring);
          coreRings.push(ring);
        });

        const wireGeometry = new THREE.EdgesGeometry(coreGeometry, 24);
        const wireMaterial = new THREE.LineBasicMaterial({
          color: 0xc9f25f,
          transparent: true,
          opacity: 0.3,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const wireframe = new THREE.LineSegments(wireGeometry, wireMaterial);
        group.add(wireframe);

        const innerGlow = new THREE.Mesh(
          new THREE.SphereGeometry(0.66, 32, 32),
          new THREE.MeshBasicMaterial({
            color: 0xc9f25f,
            transparent: true,
            opacity: 0.08,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          }),
        );
        group.add(innerGlow);

        const makeGlowTexture = () => {
          const glowCanvas = document.createElement("canvas");
          glowCanvas.width = 256;
          glowCanvas.height = 256;
          const ctx = glowCanvas.getContext("2d");
          if (!ctx) return null;
          const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
          gradient.addColorStop(0, "rgba(201,242,95,0.55)");
          gradient.addColorStop(0.25, "rgba(201,242,95,0.18)");
          gradient.addColorStop(0.6, "rgba(140,232,194,0.04)");
          gradient.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, 256, 256);
          const texture = new THREE.CanvasTexture(glowCanvas);
          texture.colorSpace = THREE.SRGBColorSpace;
          return texture;
        };

        const glowTexture = makeGlowTexture();
        if (glowTexture) {
          const glowSprite = new THREE.Sprite(
            new THREE.SpriteMaterial({
              map: glowTexture,
              transparent: true,
              opacity: 0.9,
              blending: THREE.AdditiveBlending,
              depthWrite: false,
            }),
          );
          glowSprite.scale.set(8.4, 8.4, 1);
          scene.add(glowSprite);

          const coreSprite = new THREE.Sprite(
            new THREE.SpriteMaterial({
              map: glowTexture,
              transparent: true,
              opacity: 0.55,
              blending: THREE.AdditiveBlending,
              depthWrite: false,
            }),
          );
          coreSprite.scale.set(2.1, 2.1, 1);
          group.add(coreSprite);
        }

        const isMobile = window.innerWidth < 768;
        const particleCount = isMobile ? 1500 : 2800;
        const basePositions = new Float32Array(particleCount * 3);
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const seeds = new Float32Array(particleCount);

        const lime = new THREE.Color(0xc9f25f);
        const pale = new THREE.Color(0xf1f3e9);
        const mint = new THREE.Color(0x8ce8c2);
        const ember = new THREE.Color(0xff7a45);
        const goldenAngle = Math.PI * (3 - Math.sqrt(5));

        for (let i = 0; i < particleCount; i += 1) {
          const y = 1 - (i / (particleCount - 1)) * 2;
          const radius = Math.sqrt(Math.max(0, 1 - y * y));
          const theta = goldenAngle * i;
          const shell = 2.02 + (Math.random() - 0.5) * 0.22;
          const x = Math.cos(theta) * radius * shell;
          const z = Math.sin(theta) * radius * shell;
          const yy = y * shell;

          basePositions[i * 3] = x;
          basePositions[i * 3 + 1] = yy;
          basePositions[i * 3 + 2] = z;
          positions[i * 3] = x;
          positions[i * 3 + 1] = yy;
          positions[i * 3 + 2] = z;

          const pick = Math.random();
          const color = new THREE.Color();
          if (pick > 0.94) color.copy(ember);
          else if (pick > 0.82) color.copy(pale);
          else if (pick > 0.62) color.copy(mint);
          else color.copy(lime);
          color.multiplyScalar(0.65 + Math.random() * 0.5);

          colors[i * 3] = color.r;
          colors[i * 3 + 1] = color.g;
          colors[i * 3 + 2] = color.b;
          seeds[i] = Math.random();
        }

        const particleGeometry = new THREE.BufferGeometry();
        particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

        const makeParticleTexture = () => {
          const dotCanvas = document.createElement("canvas");
          dotCanvas.width = 64;
          dotCanvas.height = 64;
          const ctx = dotCanvas.getContext("2d");
          if (!ctx) return null;
          const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
          gradient.addColorStop(0, "rgba(255,255,255,1)");
          gradient.addColorStop(0.35, "rgba(255,255,255,0.8)");
          gradient.addColorStop(1, "rgba(255,255,255,0)");
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, 64, 64);
          const texture = new THREE.CanvasTexture(dotCanvas);
          texture.colorSpace = THREE.SRGBColorSpace;
          return texture;
        };

        const particleTexture = makeParticleTexture();
        const particleMaterial = new THREE.PointsMaterial({
          size: isMobile ? 0.055 : 0.048,
          map: particleTexture ?? undefined,
          vertexColors: true,
          transparent: true,
          opacity: 0.92,
          alphaTest: 0.01,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          sizeAttenuation: true,
        });

        const particles = new THREE.Points(particleGeometry, particleMaterial);
        group.add(particles);

        const linePositions: number[] = [];
        for (let i = 0; i < 260; i += 1) {
          const a = Math.floor(Math.random() * particleCount);
          const b = Math.floor(Math.random() * particleCount);
          if (a === b) continue;
          const ax = basePositions[a * 3];
          const ay = basePositions[a * 3 + 1];
          const az = basePositions[a * 3 + 2];
          const bx = basePositions[b * 3];
          const by = basePositions[b * 3 + 1];
          const bz = basePositions[b * 3 + 2];
          const distance = Math.hypot(ax - bx, ay - by, az - bz);
          if (distance < 0.58) {
            linePositions.push(ax, ay, az, bx, by, bz);
          }
        }

        const lineGeometry = new THREE.BufferGeometry();
        lineGeometry.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(linePositions, 3),
        );
        const lineMaterial = new THREE.LineBasicMaterial({
          color: 0xc9f25f,
          transparent: true,
          opacity: 0.075,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const constellation = new THREE.LineSegments(lineGeometry, lineMaterial);
        group.add(constellation);

        const rings: Three.Group[] = [];
        const ringDots: Three.Mesh[] = [];
        const ringConfigs = [
          { radius: 2.72, tiltX: 1.18, tiltZ: 0.16, speed: 0.0016, opacity: 0.24 },
          { radius: 3.12, tiltX: 1.32, tiltZ: -0.42, speed: -0.0011, opacity: 0.16 },
          { radius: 3.52, tiltX: 0.94, tiltZ: 0.58, speed: 0.0008, opacity: 0.1 },
        ];

        ringConfigs.forEach((config, index) => {
          const ringGroup = new THREE.Group();
          ringGroup.rotation.x = config.tiltX;
          ringGroup.rotation.z = config.tiltZ;

          const points: Three.Vector3[] = [];
          const segments = 160;
          for (let i = 0; i <= segments; i += 1) {
            const angle = (i / segments) * Math.PI * 2;
            points.push(
              new THREE.Vector3(
                Math.cos(angle) * config.radius,
                Math.sin(angle) * config.radius,
                0,
              ),
            );
          }

          const ringGeometry = new THREE.BufferGeometry().setFromPoints(points);
          const ringMaterial = new THREE.LineBasicMaterial({
            color: index === 0 ? 0xc9f25f : 0xf1f3e9,
            transparent: true,
            opacity: config.opacity,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          });
          ringGroup.add(new THREE.Line(ringGeometry, ringMaterial));

          const dot = new THREE.Mesh(
            new THREE.SphereGeometry(index === 0 ? 0.035 : 0.022, 12, 12),
            new THREE.MeshBasicMaterial({
              color: index === 0 ? 0xc9f25f : 0x8ce8c2,
              transparent: true,
              opacity: 0.95,
            }),
          );
          ringGroup.add(dot);
          ringDots.push(dot);
          rings.push(ringGroup);
          group.add(ringGroup);
        });

        const starCount = 420;
        const starPositions = new Float32Array(starCount * 3);
        for (let i = 0; i < starCount; i += 1) {
          const radius = 4.6 + Math.random() * 4.2;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
          starPositions[i * 3 + 1] = radius * Math.cos(phi);
          starPositions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
        }
        const starGeometry = new THREE.BufferGeometry();
        starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
        const starMaterial = new THREE.PointsMaterial({
          color: 0xf1f3e9,
          size: 0.022,
          transparent: true,
          opacity: 0.34,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          sizeAttenuation: true,
        });
        const stars = new THREE.Points(starGeometry, starMaterial);
        scene.add(stars);

        const pointer = new THREE.Vector2(0.25, 0.1);
        const targetPointer = new THREE.Vector2(0.25, 0.1);
        const localPointer = new THREE.Vector3();
        const pointerWorld = new THREE.Vector3();
        let autoRotation = 0.5;
        let dragOffsetY = 0;
        let dragOffsetX = 0;
        let dragging = false;
        let lastX = 0;
        let lastY = 0;
        let pulse = 0;
        let hover = 0;
        let visible = true;
        let frameId = 0;
        const clock = new THREE.Clock();

        const onPointerMove = (event: PointerEvent) => {
          const rect = container.getBoundingClientRect();
          targetPointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
          targetPointer.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
          if (dragging) {
            dragOffsetY += (event.clientX - lastX) * 0.005;
            dragOffsetX += (event.clientY - lastY) * 0.0035;
            lastX = event.clientX;
            lastY = event.clientY;
          }
        };

        const onPointerDown = (event: PointerEvent) => {
          dragging = true;
          lastX = event.clientX;
          lastY = event.clientY;
          pulse = 1;
          container.setPointerCapture?.(event.pointerId);
        };

        const onPointerUp = (event: PointerEvent) => {
          dragging = false;
          if (container.hasPointerCapture?.(event.pointerId)) {
            container.releasePointerCapture(event.pointerId);
          }
        };

        const onPointerEnter = () => {
          hover = 1;
        };

        const onPointerLeave = () => {
          hover = 0;
        };

        const resize = () => {
          const rect = container.getBoundingClientRect();
          const width = Math.max(1, rect.width);
          const height = Math.max(1, rect.height);
          renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
        };

        resize();

        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(container);

        const intersectionObserver = new IntersectionObserver(
          ([entry]) => {
            visible = entry.isIntersecting;
          },
          { threshold: 0.02 },
        );
        intersectionObserver.observe(container);

        container.addEventListener("pointermove", onPointerMove);
        container.addEventListener("pointerdown", onPointerDown);
        container.addEventListener("pointerup", onPointerUp);
        container.addEventListener("pointercancel", onPointerUp);
        container.addEventListener("pointerenter", onPointerEnter);
        container.addEventListener("pointerleave", onPointerLeave);

        const animate = () => {
          frameId = window.requestAnimationFrame(animate);
          if (!visible) return;

          const delta = Math.min(clock.getDelta(), 0.05);
          const elapsed = clock.elapsedTime;

          pointer.lerp(targetPointer, 0.045);
          autoRotation += delta * 0.075;
          group.rotation.y +=
            (autoRotation + pointer.x * 0.32 + dragOffsetY - group.rotation.y) * 0.035;
          group.rotation.x +=
            (pointer.y * 0.18 + dragOffsetX - group.rotation.x) * 0.035;

          group.updateMatrixWorld();
          pointerWorld.set(pointer.x * 3.1, pointer.y * 2.35, 0);
          localPointer.copy(pointerWorld);
          group.worldToLocal(localPointer);

          const posAttr = particleGeometry.getAttribute("position") as Three.BufferAttribute;
          const arr = posAttr.array as Float32Array;

          for (let i = 0; i < particleCount; i += 1) {
            const index = i * 3;
            const bx = basePositions[index];
            const by = basePositions[index + 1];
            const bz = basePositions[index + 2];
            const seed = seeds[i];
            const wave = Math.sin(elapsed * 1.05 + seed * 9.4) * 0.028;
            let x = bx + (bx / 2.02) * wave;
            let y = by + (by / 2.02) * wave;
            let z = bz + (bz / 2.02) * wave;

            const dx = x - localPointer.x;
            const dy = y - localPointer.y;
            const dz = z - localPointer.z;
            const distanceSq = dx * dx + dy * dy + dz * dz;
            const influence = 0.72 + hover * 0.2;
            if (distanceSq < influence) {
              const force = (1 - distanceSq / influence) * (0.28 + hover * 0.12);
              x += dx * force;
              y += dy * force;
              z += dz * force;
            }

            if (pulse > 0.001) {
              const radial = 1 + pulse * 0.24;
              x *= radial;
              y *= radial;
              z *= radial;
            }

            arr[index] = x;
            arr[index + 1] = y;
            arr[index + 2] = z;
          }

          posAttr.needsUpdate = true;
          pulse *= 0.935;
          core.rotation.y -= delta * 0.12;
          wireframe.rotation.y += delta * 0.05;
          innerGlow.scale.setScalar(1 + Math.sin(elapsed * 1.6) * 0.04 + pulse * 0.18);
          heart.scale.setScalar(1 + Math.sin(elapsed * 2.2) * 0.12 + pulse * 0.4);
          group.scale.setScalar(1 + pulse * 0.035);

          rings.forEach((ring, index) => {
            ring.rotation.z += delta * (index % 2 === 0 ? 0.04 : -0.03);
            const dot = ringDots[index];
            const angle = elapsed * (0.18 + index * 0.06) + index * 2.1;
            const radius = ringConfigs[index].radius;
            dot.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
          });

          stars.rotation.y += delta * 0.006;
          stars.rotation.x += delta * 0.002;

          camera.position.x += (pointer.x * 0.22 - camera.position.x) * 0.03;
          camera.position.y += (pointer.y * 0.14 - camera.position.y) * 0.03;
          camera.lookAt(0, 0, 0);

          renderer.render(scene, camera);
        };

        renderer.render(scene, camera);
        setStatus("ready");

        if (!reducedMotion) {
          animate();
        }

        cleanup = () => {
          window.cancelAnimationFrame(frameId);
          resizeObserver.disconnect();
          intersectionObserver.disconnect();
          container.removeEventListener("pointermove", onPointerMove);
          container.removeEventListener("pointerdown", onPointerDown);
          container.removeEventListener("pointerup", onPointerUp);
          container.removeEventListener("pointercancel", onPointerUp);
          container.removeEventListener("pointerenter", onPointerEnter);
          container.removeEventListener("pointerleave", onPointerLeave);
          particleGeometry.dispose();
          particleMaterial.dispose();
          particleTexture?.dispose();
          lineGeometry.dispose();
          lineMaterial.dispose();
          starGeometry.dispose();
          starMaterial.dispose();
          coreGeometry.dispose();
          coreMaterial.dispose();
          wireGeometry.dispose();
          wireMaterial.dispose();
          innerGlow.geometry.dispose();
          (innerGlow.material as Three.Material).dispose();
          heart.geometry.dispose();
          (heart.material as Three.Material).dispose();
          coreRings.forEach((ring) => {
            ring.geometry.dispose();
            (ring.material as Three.Material).dispose();
          });
          rings.forEach((ring) => {
            ring.traverse((child) => {
              if (child instanceof THREE.Line) {
                child.geometry.dispose();
                (child.material as Three.Material).dispose();
              }
              if (child instanceof THREE.Mesh) {
                child.geometry.dispose();
                (child.material as Three.Material).dispose();
              }
            });
          });
          glowTexture?.dispose();
          renderer.dispose();
        };
      } catch (error) {
        console.error("Hero scene failed to initialise", error);
        if (!cancelled) setStatus("failed");
      }
    };

    boot();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-full w-full touch-none select-none",
        className,
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-[64%] w-[64%] max-h-[520px] max-w-[520px]">
          <div
            className={cn(
              "orb-fallback absolute inset-0 transition-opacity duration-1000",
              status === "ready" ? "opacity-0" : "opacity-100",
            )}
          />
          <canvas
            ref={canvasRef}
            className={cn(
              "relative h-full w-full transition-opacity duration-1000",
              status === "ready" ? "opacity-100" : "opacity-0",
            )}
          />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 hidden xl:block">
        <div className="absolute left-[4%] top-[19%]">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-acid/50" />
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-acid/80">
              Neural core
            </span>
          </div>
          <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-bone-muted/50">
            2,800 nodes / live
          </p>
        </div>

        <div className="absolute right-[2%] top-[17%] text-right">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-bone-muted/60">
            Signal engine
          </p>
          <div className="mt-2 flex items-center justify-end gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-acid animate-pulse-dot" />
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-acid/80">
              {status === "ready" ? "link established" : status === "failed" ? "static fallback" : "booting"}
            </span>
          </div>
        </div>

        <div className="absolute bottom-[15%] left-[2%]">
          <div className="h-14 w-px bg-gradient-to-b from-acid/60 to-transparent" />
          <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-bone-muted/50">
            AI / growth / product
          </p>
        </div>

        <div className="absolute bottom-[12%] right-[3%] flex items-center gap-2 text-bone-muted/50">
          <MousePointer2 className="h-3.5 w-3.5" />
          <span className="font-mono text-[9px] uppercase tracking-[0.16em]">
            drag to orbit
          </span>
        </div>
      </div>
    </div>
  );
}
