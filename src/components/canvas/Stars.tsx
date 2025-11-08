import { useState, useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import * as THREE from "three";
import { getDeviceCapabilities } from "../../utils/deviceDetection";
import { getQualitySettings } from "../../utils/qualityConfig";

interface StarsProps {
  [key: string]: unknown;
}

const Stars = (props: StarsProps) => {
  const ref = useRef<THREE.Points>(null);

  // Get device capabilities for particle count optimization
  const deviceCaps = useMemo(() => getDeviceCapabilities(), []);
  const qualitySettings = useMemo(() => getQualitySettings(deviceCaps.quality), [deviceCaps.quality]);

  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(qualitySettings.starParticles), { radius: 1.2 })
  );

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  return (
    <div className="absolute inset-0 z-[-1] h-auto w-full">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
