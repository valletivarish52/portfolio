import { useEffect, useRef } from "react";
import * as THREE from "three";
import "./three-bg.css";

export default function ThreeScene() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b0b0b, 0.055);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Soft circular sprite so points render as round glows, not squares.
    const spriteCanvas = document.createElement("canvas");
    spriteCanvas.width = spriteCanvas.height = 64;
    const sctx = spriteCanvas.getContext("2d")!;
    const grad = sctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.4, "rgba(255,255,255,0.55)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    sctx.fillStyle = grad;
    sctx.fillRect(0, 0, 64, 64);
    const sprite = new THREE.CanvasTexture(spriteCanvas);

    // Main particle field: wide shallow box.
    const mainCount = 1600;
    const mainPositions = new Float32Array(mainCount * 3);
    for (let i = 0; i < mainCount; i++) {
      mainPositions[i * 3] = THREE.MathUtils.randFloat(-14, 14);
      mainPositions[i * 3 + 1] = THREE.MathUtils.randFloat(-8, 8);
      mainPositions[i * 3 + 2] = THREE.MathUtils.randFloat(-7, -2.5);
    }
    const mainGeometry = new THREE.BufferGeometry();
    mainGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(mainPositions, 3)
    );
    // Fixed pixel size (no attenuation): particles can never render large.
    const mainMaterial = new THREE.PointsMaterial({
      size: 2,
      map: sprite,
      color: 0xffffff,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: false,
    });
    const mainPoints = new THREE.Points(mainGeometry, mainMaterial);
    group.add(mainPoints);

    // Accent particle field: sparse lime points for depth.
    const accentCount = 120;
    const accentPositions = new Float32Array(accentCount * 3);
    for (let i = 0; i < accentCount; i++) {
      accentPositions[i * 3] = THREE.MathUtils.randFloat(-14, 14);
      accentPositions[i * 3 + 1] = THREE.MathUtils.randFloat(-8, 8);
      accentPositions[i * 3 + 2] = THREE.MathUtils.randFloat(-7, -2.5);
    }
    const accentGeometry = new THREE.BufferGeometry();
    accentGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(accentPositions, 3)
    );
    const accentMaterial = new THREE.PointsMaterial({
      size: 3,
      map: sprite,
      color: 0xcde64b,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: false,
    });
    const accentPoints = new THREE.Points(accentGeometry, accentMaterial);
    group.add(accentPoints);

    const clock = new THREE.Clock();
    const mouse = { x: 0, y: 0 };

    // Konami party mode: lime warp for a few seconds.
    let partyUntil = 0;
    let partyTimer = 0;
    const onParty = () => {
      partyUntil = performance.now() + 6000;
      mainMaterial.color.set(0xcde64b);
      mainMaterial.opacity = 0.75;
      window.clearTimeout(partyTimer);
      partyTimer = window.setTimeout(() => {
        mainMaterial.color.set(0xffffff);
        mainMaterial.opacity = 0.5;
      }, 6000);
    };
    window.addEventListener("vv:party", onParty);

    const onPointerMove = (event: PointerEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    const onResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      if (prefersReduced) {
        renderer.render(scene, camera);
      }
    };

    window.addEventListener("resize", onResize);

    if (prefersReduced) {
      // Static single frame: no loop, no parallax.
      renderer.render(scene, camera);
    } else {
      window.addEventListener("pointermove", onPointerMove);
      renderer.setAnimationLoop(() => {
        const t = clock.getElapsedTime();
        const party = performance.now() < partyUntil;

        group.rotation.y += party ? 0.006 : 0.0004;
        group.rotation.x = Math.sin(t * 0.1) * 0.03;
        group.position.y = Math.sin(t * 0.15) * 0.2;

        camera.position.x += (mouse.x * 0.6 - camera.position.x) * 0.04;
        camera.position.y += (-mouse.y * 0.4 - camera.position.y) * 0.04;

        renderer.render(scene, camera);
      });
    }

    return () => {
      renderer.setAnimationLoop(null);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("vv:party", onParty);
      window.clearTimeout(partyTimer);
      mainGeometry.dispose();
      mainMaterial.dispose();
      accentGeometry.dispose();
      accentMaterial.dispose();
      sprite.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div className="three-bg" ref={containerRef} />;
}
