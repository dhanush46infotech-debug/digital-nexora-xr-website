import React, { Suspense, useEffect, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";

import CanvasLoader from "../layout/Loader";
import { getSafePixelRatio, isMobileDevice } from "../../utils/deviceDetection";

interface BallProps {
  imgUrl: string;
}

const Ball: React.FC<BallProps> = ({ imgUrl }) => {
  const [decal] = useTexture([imgUrl]);
  const mobile = useMemo(() => isMobileDevice(), []);

  // Cleanup texture on unmount
  useEffect(() => {
    return () => {
      if (decal) {
        decal.dispose();
      }
    };
  }, [decal]);

  return (
    <Float
      speed={mobile ? 1.2 : 1.75}
      rotationIntensity={mobile ? 0.5 : 1}
      floatIntensity={mobile ? 1 : 2}
    >
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow={!mobile} receiveShadow={!mobile} scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
        />
      </mesh>
    </Float>
  );
};

const BallCanvas: React.FC<{ icon: string }> = ({ icon }) => {
  const pixelRatio = useMemo(() => getSafePixelRatio(), []);

  return (
    <Canvas
      frameloop="demand"
      dpr={pixelRatio}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enablePan={false} enableZoom={false} />
        <Ball imgUrl={icon} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;
