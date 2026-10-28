"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, RoundedBox, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { useLayoutEffect, useMemo, useRef } from "react";

export const scroll = { p: 0 }; // lo escribe GSAP ScrollTrigger
const X = [0, 1.7, -1.7, 1.2, 0];
const V = (p: number[][]) => p.map(([x, y]) => new THREE.Vector2(x, y));
const rnd = (s: number) => { const x = Math.sin(s * 127.1) * 43758.5453; return x - Math.floor(x); };
const coneR = (y: number) => 0.68 + (0.32 * (y - 0.06)) / 2.24;

function useTex(draw: (g: CanvasRenderingContext2D, s: number) => void) {
  return useMemo(() => {
    const c = document.createElement("canvas"); c.width = c.height = 512;
    draw(c.getContext("2d")!, 512);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = THREE.RepeatWrapping; t.anisotropy = 8;
    return t;
  }, []); // eslint-disable-line
}

function Steam() {
  const refs = useRef<THREE.Mesh[]>([]);
  useFrame(({ clock }) => refs.current.forEach((m, i) => {
    const t = (clock.elapsedTime * 0.12 + i / 8) % 1;
    m.position.set(Math.sin(i * 7 + t * 3) * 0.6, 3.6 + t * 2, Math.cos(i * 5) * 0.5);
    m.scale.setScalar(0.3 + t * 0.6);
    (m.material as THREE.MeshBasicMaterial).opacity = Math.sin(t * Math.PI) * 0.05;
  }));
  return <>{Array.from({ length: 8 }, (_, i) => (
    <mesh key={i} ref={(r) => { if (r) refs.current[i] = r; }}><sphereGeometry args={[1, 12, 12]} />
      <meshBasicMaterial color="#fff" transparent depthWrite={false} /></mesh>))}</>;
}

function Cup() {
  const g = useRef<THREE.Group>(null!);
  const drops = useRef<THREE.InstancedMesh>(null!);
  const outer = useMemo(() => V([[0, 0], [.6, 0], [.68, .06], [1, 2.3]]), []);
  const inner = useMemo(() => V([[0, .1], [.57, .1], [.65, .16], [.97, 2.2], [0, 2.2]]), []);
  const rim = useMemo(() => V([[.98, 2.28], [1.12, 2.3], [1.12, 2.42], [.98, 2.4]]), []);
  const bowl = useMemo(() => V([[0, 0], [.35, 0], [.75, .12], [1.1, .55], [1.25, .68]]), []);
  const syrup = useMemo(() => V([[0, .04], [.33, .04], [.7, .15], [1.05, .5], [0, .5]]), []);

  const glass = useMemo(() => new THREE.MeshPhysicalMaterial({ transmission: 1, thickness: .25, roughness: .05, ior: 1.45, envMapIntensity: 1.8, side: THREE.DoubleSide, attenuationColor: new THREE.Color("#ffd9c8"), attenuationDistance: 5 }), []);
  const slush = useTex((c, s) => {
    c.fillStyle = "#FFB21E"; c.fillRect(0, 0, s, s);
    for (let i = 0; i < 900; i++) {
      const x = rnd(i) * s, y = rnd(i + 2) * s, r = 4 + rnd(i + 3) * 18;
      c.fillStyle = `hsla(${28 + rnd(i + 4) * 22}, 95%, ${48 + rnd(i + 5) * 28}%, ${0.15 + rnd(i + 6) * 0.4})`;
      c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill();
    }
  });
  const pulp = useTex((c, s) => {
    c.fillStyle = "#FF8A00"; c.fillRect(0, 0, s, s);
    for (let i = 0; i < 600; i++) {
      c.fillStyle = `hsla(${20 + rnd(i) * 30}, 90%, ${40 + rnd(i + 1) * 30}%, .5)`;
      c.fillRect(rnd(i + 2) * s, rnd(i + 3) * s, 8 + rnd(i + 4) * 30, 6 + rnd(i + 5) * 20);
    }
  });

  const chunks = useMemo(() => Array.from({ length: 34 }, (_, i) => {
    const a = i * 2.1 + rnd(i) * .4, r = 0.18 + rnd(i + 2) * 0.55;
    return {
      p: [Math.cos(a) * r, 3.62 + rnd(i + 4) * .38, Math.sin(a) * r] as [number, number, number],
      s: [.25 + rnd(i + 1) * .22, .20 + rnd(i + 2) * .17, .24 + rnd(i + 3) * .2] as [number, number, number],
      r: [rnd(i + 5) * .5, rnd(i + 6) * 3, rnd(i + 7) * .5] as [number, number, number],
      c: i % 5 === 0 ? "#FF6B00" : i % 3 === 0 ? "#FFC62B" : "#FF9800",
    };
  }), []);

  const chiles = useMemo(() => Array.from({ length: 6 }, (_, i) => ({
    a: (i / 6) * Math.PI * 2 + .3, r: 1.35 + rnd(i) * .15, ry: rnd(i + 1) * 6,
  })), []);

  useLayoutEffect(() => {
    if (!drops.current) return;
    const m = new THREE.Object3D();
    for (let i = 0; i < 40; i++) {
      const th = rnd(i) * Math.PI, ph = rnd(i + 1) * Math.PI * 2, r = .2 + rnd(i + 2) * .7;
      m.position.set(r * Math.sin(th) * Math.cos(ph), 2.4 + r * Math.cos(th), r * Math.sin(th) * Math.sin(ph));
      m.scale.setScalar(.04 + rnd(i + 3) * .08);
      m.updateMatrix();
      drops.current.setMatrixAt(i, m.matrix);
    }
    drops.current.instanceMatrix.needsUpdate = true;
  }, []);

  useFrame((s, dt) => {
    const p = scroll.p, n = X.length - 1, f = p * n, k = Math.min(Math.floor(f), n - 1);
    const mobile = s.size.width < 768;
    const sc = mobile ? .72 : 1;
    g.current.scale.setScalar(sc);
    g.current.position.y = -2.35 * sc + (mobile ? 1.18 : .08);
    g.current.position.x = THREE.MathUtils.damp(g.current.position.x, THREE.MathUtils.lerp(X[k], X[k + 1], f - k) * (mobile ? .25 : 1), 4, dt);
    g.current.rotation.y = THREE.MathUtils.damp(g.current.rotation.y, s.clock.elapsedTime * .18 + p * Math.PI * 3.5, 3, dt);
    s.camera.position.z = THREE.MathUtils.damp(s.camera.position.z, mobile ? 10.2 : 8.1 - Math.sin(p * Math.PI) * .45, 3, dt);
  });

  return (
    <group ref={g} position={[0, -2.35, 0]}>
      <mesh position={[0, 1.1, 0]}>
        <latheGeometry args={[outer, 64]} /><primitive object={glass} attach="material" />
      </mesh>
      <mesh><latheGeometry args={[inner, 64]} /><meshPhysicalMaterial map={slush} roughness={.55} clearcoat={.4} /></mesh>
      <mesh><latheGeometry args={[rim, 32]} /><primitive object={glass} attach="material" /></mesh>
      <mesh position={[0, 2.4, 0]} material={glass}><sphereGeometry args={[.95, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2]} /></mesh>
      <mesh><latheGeometry args={[bowl, 48]} /><meshPhysicalMaterial color="#8B1A1A" roughness={.4} metalness={.1} /></mesh>
      <mesh><latheGeometry args={[syrup, 48]} /><meshPhysicalMaterial map={pulp} roughness={.35} clearcoat={.6} /></mesh>
      <group position={[0, 3.3, 0]}>
        <instancedMesh ref={drops} args={[undefined, undefined, 40]}><sphereGeometry args={[1, 8, 8]} /><meshPhysicalMaterial color="#FF4A1C" roughness={.2} clearcoat={1} /></instancedMesh>
      </group>
      {chunks.map((c, i) => (
        <RoundedBox key={i} args={[...c.s]} radius={.07} smoothness={3} position={[...c.p]} rotation={[...c.r]}>
          <meshPhysicalMaterial color={c.c} roughness={.3} clearcoat={.9} clearcoatRoughness={.15} /></RoundedBox>))}
      <mesh position={[.35, 4.12, 0]} rotation={[0, 0, -.035]}><capsuleGeometry args={[.17, 2.15, 8, 18]} /><meshStandardMaterial color="#57170F" roughness={.92} /></mesh>
      {Array.from({ length: 18 }, (_, i) => {
        const a = (i / 18) * Math.PI * 2, r = .12 + rnd(i) * .08, y = 4.4 + rnd(i + 2) * 1.1;
        return <mesh key={`spice-${i}`} position={[.35 + Math.cos(a) * r, y, Math.sin(a) * r]} scale={[.018 + rnd(i + 9) * .018, .025 + rnd(i + 3) * .025, .018 + rnd(i + 4) * .018]}>
          <boxGeometry args={[1, 7, 6]} /><meshBasicMaterial color={i % 3 === 0 ? "#F18A27" : "#8F241A"} />
        </mesh>;
      })}
      <mesh position={[.34, 5.72, 0]}><cylinderGeometry args={[.07, .07, .92, 16]} /><meshStandardMaterial color="#FFD21E" roughness={.4} /></mesh>
      <group position={[-.55, 3.6, .1]} rotation={[0, 0, .32]}>
        <mesh position={[0, 1.1, 0]}><cylinderGeometry args={[.03, .03, 2.2, 8]} /><meshStandardMaterial color="#fff" /></mesh>
        <mesh position={[0, .05, 0]}><capsuleGeometry args={[.15, .3, 6, 14]} /><meshPhysicalMaterial color="#D8182E" roughness={.35} clearcoat={1} /></mesh>
      </group>
      {chiles.map((c, i) => (
        <group key={i} position={[Math.cos(c.a) * c.r, .12, Math.sin(c.a) * c.r]} rotation={[0, c.ry, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]} scale={[1, 1, 1]}><capsuleGeometry args={[.11, .9, 6, 14]} /><meshPhysicalMaterial color="#C4101E" roughness={.3} clearcoat={1} /></mesh>
          <mesh position={[.62, 0, 0]} rotation={[0, 0, 1.2]}><cylinderGeometry args={[.03, .05, .25, 8]} /><meshStandardMaterial color="#3E7B2A" /></mesh>
        </group>))}
      <ContactShadows position={[0, .01, 0]} opacity={.4} scale={8} blur={2.6} far={3} />
      <Sparkles count={60} scale={[3, 4, 3]} position={[0, 2.8, 0]} size={4} speed={.4} color="#FF4A1C" />
      <Sparkles count={30} scale={[3, 3, 3]} position={[0, 1.2, 0]} size={3} speed={.3} color="#FFC62B" />
      <Steam />
    </group>
  );
}

export default function Hero3D() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 8.1], fov: 36 }} gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}>
      <ambientLight intensity={.82} />
      <spotLight position={[4, 8, 5]} angle={.42} penumbra={1} intensity={115} color="#FFE7A0" />
      <pointLight position={[-4, 2, -3]} intensity={38} color="#FF4A1C" />
      <pointLight position={[2, 3, 5]} intensity={18} color="#FFF0D7" />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={4} position={[0, 5, 3]} scale={[8, 3, 1]} />
        <Lightformer form="rect" intensity={2.5} color="#FFC62B" position={[-6, 1, 2]} scale={[2, 8, 1]} />
        <Lightformer form="rect" intensity={2} position={[6, 2, 1]} scale={[2, 8, 1]} />
        <Lightformer form="ring" intensity={3} color="#FF4A1C" position={[0, 1, -5]} scale={5} />
      </Environment>
      <Cup />
    </Canvas>
  );
}
