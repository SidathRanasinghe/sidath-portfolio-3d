import type { TechStackIcon } from "@/constants/types";
import { Environment, Float, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";

interface TechIconCardExperienceProps {
  model: TechStackIcon;
}

const TechIconCardExperience = ({ model }: TechIconCardExperienceProps) => {
  const scene = useGLTF(model.modelPath);

  useEffect(() => {
    if (model.id === "THREE") {
      scene.scene.traverse(child => {
        if (child instanceof THREE.Mesh) {
          if (child.name === "Object_5") {
            child.material = new THREE.MeshStandardMaterial({ color: "white" });
          }
        }
      });
    }
  }, [scene, model.id]);

  return (
    <Canvas>
      <ambientLight intensity={0.5} castShadow />
      <directionalLight position={[0, 0, 5]} intensity={0.5} color="#ffffff" castShadow />
      <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={10} castShadow />
      <Environment preset="sunset" />

      {/* 
        The Float component from @react-three/drei is used to 
        create a simple animation of the model floating in space.
        The rotationIntensity and floatIntensity props control the
        speed of the rotation and float animations respectively.

        The group component is used to scale and rotate the model.
        The rotation is set to the value of the model.rotation property,
        which is an array of three values representing the rotation in
        degrees around the x, y and z axes respectively.

        The primitive component is used to render the 3D model.
        The object prop is set to the scene object returned by the
        useGLTF hook, which is an instance of THREE.Group. The
        THREE.Group object contains all the objects (meshes, lights, etc)
        that make up the 3D model.
      */}
      <Float speed={5.5} rotationIntensity={0.5} floatIntensity={0.9}>
        <group scale={model.scale} rotation={model.rotation} position={model.position}>
          <primitive object={scene.scene} />
        </group>
      </Float>

      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

export default TechIconCardExperience;
