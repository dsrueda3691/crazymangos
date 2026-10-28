"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, MeshTransmissionMaterial, RoundedBox, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef } from "react";

export const scroll = { p: 0 }; // 0..1, lo escribe GSAP ScrollTrigger
const X = [0, 1.7, -1.7, 1.2, 0]; // posición del vaso por sección

const profile = (pts: number[][]) => pts.map(([x, y]) => new THREE.Vector2(x, y));

function Steam() {
  const refs = useRef<THREE.Mesh[]>([]);
  useFrame(({ clock }) => refs.current.forEach((m, i) => {
    const t = (clock.elapsedTime * 0.25 + i / 12) % 1;
    m.position.set(Math.sin(i * 7 + t * 4) * 0.4, 3.2 + t * 2.2, Math.cos(i * 5) * 0.4);
    m.scale.setScalar(0.25 + t * 0.7);
    (m.material as THREE.MeshBasicMaterial).opacity = Math.sin(t * Math.PI) * 0.09;
  }));
  return <>{Array.from({ length: 12 }, (_, i) => (
    <mesh key={i} ref={(r) => { if (r) refs.current[i] = r; }}>
      <sphereGeometry args={[1, 16, 16]} /><meshBasicMaterial color="#fff" transparent depthWrite={false} />
    </mesh>))}</>;
}

function Cup() {
  const g = useRef<THREE.Group>(null!);
  const outer = useMemo(() => profile([[0, 0], [.6, 0], [.68, .06], [1.05, 2.5], [1.1, 2.6]]), []);
  const liquid = useMemo(() => profile([[0, .12], [.58, .12], [.64, .16], [.98, 2.15], [0, 2.15]]), []);
  const chunks = useMemo(() => Array.from({ length: 16 }, (_, i) => {
    const a = i * 2.4, r = 0.15 + (i % 5) * 0.14;
    return {
      p: [Math.cos(a) * r, 2.2 + Math.floor(i / 6) * 0.28 + (i % 3) * 0.05, Math.sin(a) * r] as [number, number, number],
      rot: [i, i * 2, i * 3] as [number, number, number],
    };
  }), []);

  useFrame((s, dt) => {
    const p = scroll.p, n = X.length - 1, f = p * n, k = Math.min(Math.floor(f), n - 1);
    const mobile = s.size.width < 768;
    const tx = THREE.MathUtils.lerp(X[k], X[k + 1], f - k) * (mobile ? 0.25 : 1);
    g.current.position.x = THREE.MathUtils.damp(g.current.position.x, tx, 4, dt);
    g.current.rotation.y = THREE.MathUtils.damp(g.current.rotation.y, s.clock.elapsedTime * 0.25 + p * Math.PI * 4, 3, dt);
    g.current.rotation.z = Math.sin(p * Math.PI * 2) * 0.12;
    s.camera.position.z = THREE.MathUtils.damp(s.camera.position.z, mobile ? 11 : 8.5 - Math.sin(p * Math.PI) * 1.5, 3, dt);
  });

  return (
    <group ref={g} position={[0, -1.6, 0]}>
      <mesh><latheGeometry args={[outer, 64]} />
        <MeshTransmissionMaterial transmission={1} thickness={0.35} roughness={0.04} ior={1.45} chromaticAberration={0.04} backside samples={6} resolution={512} side={THREE.DoubleSide} /></mesh>
      <mesh><latheGeometry args={[liquid, 64]} />
        <meshPhysicalMaterial color="#B3121F" roughness={0.25} clearcoat={1} clearcoatRoughness={0.1} /></mesh>
      {chunks.map((c, i) => (
        <RoundedBox key={i} args={[.42, .42, .42]} radius={.08} position={c.p} rotation={c.rot}>
          <meshPhysicalMaterial color={i % 4 ? "#FFB800" : "#FF8A00"} roughness={.35} clearcoat={.6} />
        </RoundedBox>))}
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} position={[Math.cos(i * 1.6) * .35, 2.65, Math.sin(i * 1.6) * .35]}><sphereGeometry args={[.22, 24, 24]} />
          <meshPhysicalMaterial color="#9E0B1A" clearcoat={1} roughness={.15} /></mesh>))}
      <mesh position={[.35, 3.2, 0]} rotation={[0, 0, -.18]}><cylinderGeometry args={[.09, .09, 2.2, 24]} />
        <meshStandardMaterial color="#D8182E" roughness={.5} /></mesh>
      <Sparkles count={70} scale={[2.6, 3.2, 2.6]} position={[0, 2.5, 0]} size={4} speed={.5} color="#FF4A1C" />
      <Sparkles count={30} scale={[2.2, 3, 2.2]} position={[0, 2.5, 0]} size={3} speed={.3} color="#FFC62B" />
      <Steam />
    </group>
  );
}

export default function Hero3D() {
  return (
    <Canvas dpr={[1, 1.8]} camera={{ position: [0, 0, 8.5], fov: 38 }} gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[5, 8, 5]} angle={.4} penumbra={1} intensity={90} color="#FFE7A0" />
      <pointLight position={[-4, 2, -3]} intensity={30} color="#FF4A1C" />
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={4} position={[0, 5, 3]} scale={[8, 3, 1]} />
        <Lightformer form="rect" intensity={2.5} color="#FFC62B" position={[-6, 1, 2]} scale={[2, 8, 1]} />
        <Lightformer form="ring" intensity={3} color="#FF4A1C" position={[6, 0, -2]} scale={4} />
      </Environment>
      <Cup />
    </Canvas>
  );
}
