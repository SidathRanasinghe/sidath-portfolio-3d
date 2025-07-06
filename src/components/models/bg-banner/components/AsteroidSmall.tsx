import { useGLTF } from "@react-three/drei";
import { getModelPath } from "@/lib/assets";

export function AsteroidSmall(props: any) {
  const { nodes, materials } = useGLTF(getModelPath("asteroid_small.glb"));
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={(nodes.pPlatonic2_aiStandardSurface2_0 as any).geometry}
        material={materials.aiStandardSurface2}
        scale={0.01}
      />
    </group>
  );
}

useGLTF.preload(getModelPath("asteroid_small.glb"));
