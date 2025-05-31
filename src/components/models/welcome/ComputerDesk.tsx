import { useGLTF } from "@react-three/drei";
import { useEffect, useRef, type JSX } from "react";
import * as THREE from "three";

export function ComputerDesk(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/computer_desk.glb") as any;
  const spotLightRef = useRef<THREE.SpotLight>(null);
  const screenRef = useRef<THREE.Mesh>(null);

  // Create texture and material for the monitor screen
  const screenTexture = new THREE.TextureLoader().load("/images/vsCode.png");

  const screenMaterial = new THREE.MeshStandardMaterial({
    map: screenTexture, // Apply the VS Code image
    emissive: "#000000", // Subtle dark blue emissive glow
    emissiveIntensity: 0, // Reduced intensity to show the image better
    roughness: 0,
    metalness: 0,
    transparent: false,
    opacity: 10,
  });

  // Create screen geometry - a thin rectangular plane
  const screenGeometry = new THREE.BoxGeometry(0.45, 0.3, 0.005);

  useEffect(() => {
    if (spotLightRef.current) {
      const target = new THREE.Object3D();
      target.position.set(4.002, -9.93, 3.144);
      spotLightRef.current.target = target;
      spotLightRef.current.target.updateMatrixWorld();
    }
  }, []);

  return (
    <group {...props} dispose={null}>
      {/* Monitor screen light */}
      <pointLight
        position={[0.548, 1.3, 0.1]} // Positioned in front of the monitor
        color="#4a90e2"
        intensity={2}
        distance={3}
        decay={2}
        castShadow
      />

      {/* Desk lamp light */}
      <spotLight
        ref={spotLightRef}
        position={[-1.2, 1.58, 0.5]}
        color="#fff8dc"
        intensity={5}
        angle={Math.PI / 4}
        penumbra={0.15}
        distance={10}
        decay={2}
        castShadow
      />

      <group position={[-0.9, 0.975, 0.1]} rotation={[0, -1, 0]}>
        <mesh geometry={nodes.DeskLamp_DeskLamp_0.geometry} material={materials.DeskLamp} />
        <mesh geometry={nodes.DeskLamp_Alpha_0.geometry} material={materials.Alpha} />
      </group>
      <group position={[-0.218, 0.974, -0.142]} rotation={[Math.PI, -1.03, Math.PI]}>
        <mesh
          geometry={nodes.StationeryCup_StationeryCup_0.geometry}
          material={materials.StationeryCup}
        />
        <mesh
          geometry={nodes.Scissors001_StationeryCup_0.geometry}
          material={materials.StationeryCup}
          position={[-0.031, 0.121, 0.01]}
          rotation={[0, 0, 0.198]}
        />
        <mesh
          geometry={nodes.Pencel001_StationeryCup_0.geometry}
          material={materials.StationeryCup}
          position={[0, 0.136, -0.031]}
          rotation={[-0.125, -0.052, 0.004]}
        />
        <mesh
          geometry={nodes.Pen02001_StationeryCup_0.geometry}
          material={materials.StationeryCup}
          position={[0.017, 0.072, 0.013]}
          rotation={[0.71, 1.183, -0.672]}
        />
        <mesh
          geometry={nodes.Pen01001_StationeryCup_0.geometry}
          material={materials.StationeryCup}
          position={[0.017, 0.07, -0.017]}
          rotation={[0.007, 1.055, -0.219]}
        />
      </group>
      <mesh
        geometry={nodes.Desk_Desk_0.geometry}
        material={materials.Desk}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        geometry={nodes.Drawer03_Desk_0.geometry}
        material={materials.Desk}
        position={[-0.83, 0.139, 0.282]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        geometry={nodes.Drawer02_Desk_0.geometry}
        material={materials.Desk}
        position={[-0.83, 0.39, 0.387]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        geometry={nodes.Drawer01_Desk_0.geometry}
        material={materials.Desk}
        position={[-0.83, 0.64, 0.321]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        geometry={nodes.Book01_Book01_0.geometry}
        material={materials.Book01}
        position={[-0.473, 1, 0.024]}
        rotation={[0, 0.621, 0]}
      />
      <mesh
        geometry={nodes.Book02_Book02_0.geometry}
        material={materials.Book02}
        position={[-0.509, 0.974, 0.004]}
        rotation={[0, 0.409, 0]}
      />
      <mesh
        geometry={nodes.Chair_Chair_0.geometry}
        material={materials.Chair}
        position={[0.002, 0, 0.699]}
        rotation={[-1.541, 0.021, 2.192]}
      />
      <mesh
        geometry={nodes.Computer_Computer_0.geometry}
        material={materials.Computer}
        position={[0.869, 0.112, -0.02]}
      />
      <mesh
        geometry={nodes.Cup_Cup_0.geometry}
        material={materials.material}
        position={[-0.225, 0.974, 0.065]}
        rotation={[Math.PI, -0.68, Math.PI]}
      />
      <mesh
        geometry={nodes.Keyboard_Keyboard_0.geometry}
        material={materials.Keyboard}
        position={[0.333, 0.975, 0.235]}
        rotation={[-Math.PI / 2, 0, -0.459]}
      />
      <mesh
        geometry={nodes.Loudspeaker01_Loudspeaker01_0.geometry}
        material={materials.Loudspeaker01}
        position={[0.08, 0.975, -0.156]}
        rotation={[-Math.PI / 2, 0, -0.225]}
      />
      <mesh
        geometry={nodes.Loudspeaker02_Loudspeaker02_0.geometry}
        material={materials.Loudspeaker02}
        position={[0.97, 0.975, 0.25]}
        rotation={[-Math.PI / 2, 0, -0.718]}
      />

      {/* Monitor with glowing screen */}
      <mesh
        geometry={nodes.Monitor_Monitor_0.geometry}
        material={materials.Monitor}
        position={[0.548, 0.975, -0.029]}
        rotation={[0, -0.445, 0]}
        scale={[1.5, 1.5, 1]}
      />

      {/* Custom glowing screen - positioned in front of the monitor */}
      <mesh
        ref={screenRef}
        geometry={screenGeometry}
        material={screenMaterial}
        position={[0.545, 1.327, -0.031]}
        rotation={[-0.09, -0.4435, -0.04]}
        scale={[1.78, 1.645, 1]}
      />

      <mesh
        geometry={nodes.Mouse_Mouse_0.geometry}
        material={materials.Mouse}
        position={[0.704, 0.976, 0.367]}
        rotation={[0, 0.172, 0]}
      />
      <mesh
        geometry={nodes.Mat_Mouse_0.geometry}
        material={materials.Mouse}
        position={[0.727, 0.974, 0.376]}
        rotation={[0, -0.281, 0]}
      />
    </group>
  );
}

useGLTF.preload("/models/computer_desk.glb");

