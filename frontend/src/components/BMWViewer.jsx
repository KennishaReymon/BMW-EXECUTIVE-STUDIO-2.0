import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center } from "@react-three/drei";

import i7Model from "../assets/models/BMW i7.glb";
import iXModel from "../assets/models/BMW iX.glb";
import M5Model from "../assets/models/BMW M5.glb";
import XMModel from "../assets/models/BMW XM .glb";
import M4Model from "../assets/models/M4.glb";
import M8Model from "../assets/models/M8.glb";


function BMWModel({ model }) {
  const models = {
  "BMW i7.glb": i7Model,
  "BMW iX.glb": iXModel,
  "BMW M5.glb": M5Model,
  "BMW XM.glb": XMModel,
  "M4.glb": M4Model,
  "M8.glb": M8Model,
};
 const { scene } = useGLTF(models[model]);

  return (
    <primitive
      object={scene}
      scale={1.5}
      position={[0, -0.8, 0]}
    />
  );
}

export default function BMWViewer({ model }) {
  return (
    <div
      style={{
        width: "100%",
        height: "500px",
        background: "#050505",
        borderRadius: "24px",
        overflow: "hidden",
      }}
    >
      <Canvas camera={{ position: [4, 2, 6], fov: 50 }}>
        <ambientLight intensity={1.5} />

        <directionalLight
          position={[5, 5, 5]}
          intensity={3}
        />

        <directionalLight
          position={[-5, 3, -5]}
          intensity={1.5}
        />

       <Center>
  <BMWModel model={model} />
</Center>

       <OrbitControls
  enablePan={false}
  enableZoom={true}
  minDistance={0.5}
  maxDistance={15}
  minPolarAngle={Math.PI / 3}
  maxPolarAngle={Math.PI / 2.1}
  target={[0, 0, 0]}
  enableDamping
  dampingFactor={0.08}
/>
      </Canvas>
    </div>
  );
}