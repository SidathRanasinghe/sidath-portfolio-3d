const SceneLighting = () => {
  return (
    <>
      {/* ============= ambient light for whole 3d model group ============= */}
      {/* dark blue */}
      <ambientLight intensity={0.5} color="#1a1a2e" />

      {/* ============= directional lights ============ */}
      {/* navy blue from left */}
      <directionalLight
        position={[4, 1, 1]}
        intensity={10}
        color="#003566"
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        castShadow
      />
      {/* amber from bottom */}
      <directionalLight
        position={[-4, 1, 4]}
        intensity={4}
        color="#fff8dc"
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        castShadow
      />

      {/* ============= point lights ============ */}
      {/* amber */}
      <pointLight position={[4, 0, -1]} intensity={0.25} color="#fff8dc" />
      {/* cyan */}
      <pointLight position={[2, -2, -1]} intensity={10} color="#00ffff" />
      {/* purple */}
      <pointLight position={[-1, 0, -1.5]} intensity={10} color="#7209b7" />
      {/* deep blue */}
      <pointLight position={[2, 1, -2]} intensity={10} color="#0d00a4" />

      {/* ============= spot lights ============ */}
      {/* amber from top */}
      <spotLight
        position={[1.385, 0, -4]}
        angle={0.8}
        penumbra={0.5}
        intensity={10}
        color="#0d00a4"
        target-position={[0, 0, 0]}
        castShadow
      />
      {/* amber from bottom */}
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

export default SceneLighting;
