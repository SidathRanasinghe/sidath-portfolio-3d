const LightingController = () => {
  return (
    <>
      <ambientLight intensity={0.5} color="#1a1a2e" />

      <directionalLight
        position={[10, 0, -0.5]}
        intensity={5}
        color="#003566"
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        castShadow
      />

      <directionalLight
        position={[4.002, -9.93, 3.144]}
        intensity={1}
        color="#fff8dc"
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        castShadow
      />

      <pointLight position={[0, 0, -1]} intensity={0.25} color="#fff8dc" />
      <pointLight position={[-2, -1, -2]} intensity={5} color="#00ffff" />
      <pointLight position={[0, 1, -1]} intensity={10} color="#7209b7" />
      <pointLight position={[2, 1, -2]} intensity={10} color="#0d00a4" />

      <spotLight
        position={[1.385, 0, -4]}
        angle={0.8}
        penumbra={0.5}
        intensity={10}
        color="#0d00a4"
        target-position={[0, 0, 0]}
        castShadow
      />

      <spotLight
        position={[4.002, -9.93, 3.144]}
        angle={0.8}
        penumbra={0.5}
        intensity={10}
        color="#fff8dc"
        target-position={[0, 0, 0]}
        castShadow
      />
    </>
  );
};

export default LightingController;
