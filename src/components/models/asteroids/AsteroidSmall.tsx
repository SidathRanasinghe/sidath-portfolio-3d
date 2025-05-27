import { useGLTF } from "@react-three/drei";

export function AsteroidSmall(props: any) {
  const { nodes, materials } = useGLTF("/models/asteroid_2.glb");
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

useGLTF.preload("/models/asteroid_2.glb");

