import { useGLTF } from "@react-three/drei";

export function AsteroidLarge(props: any) {
  const { nodes, materials } = useGLTF("/models/asteroid_large.glb");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={29.011}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            geometry={(nodes.Group24690_Standard_0 as any).geometry}
            material={materials.Standard}
            rotation={[-Math.PI / 2, 0, 0]}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/asteroid_large.glb");

