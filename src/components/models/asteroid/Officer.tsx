/* eslint-disable no-unused-vars */
import * as THREE from "three";
import { useEffect, useMemo, useRef, useState, type JSX } from "react";
import { useGraph } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";

type AnimationName = "IDEL" | "DEEP_SEE" | "RELAX" | "STATIC" | "SHOOT";

const ActionType: Record<AnimationName, string> = {
  IDEL: "Sci_fi_Soldier_black_orange|Armature.002|Armature|Armature|2137922060912_TempMotion",
  DEEP_SEE: "Sci_fi_Soldier_black_orange|Armature.005|5217387904512_TempMotion",
  RELAX: "Sci_fi_Soldier_black_orange|Armature.006|5217387904512_TempMotion",
  STATIC: "Sci_fi_Soldier_black_orange|Armature|0_T-Pose",
  SHOOT: "Sci_fi_Soldier_black_orange|Sci_fi_Soldier_black_orange|FBXExportClip_0",
};

interface AnimationSequenceItem {
  name: AnimationName;
  duration: number; // Duration in seconds
  fadeInTime?: number; // Optional fade in time (default: 0.5s)
  fadeOutTime?: number; // Optional fade out time (default: 0.5s)
}

interface OfficerProps {
  animationName?: AnimationName; // Single animation (legacy support)
  animationSequence?: AnimationSequenceItem[]; // Sequential animations
  loop?: boolean; // Whether to loop the entire sequence (default: false)
  onSequenceComplete?: () => void; // Callback when sequence completes
  onAnimationChange?: (currentAnimation: AnimationName, index: number) => void; // Callback on animation change
}

export function Officer({
  animationName,
  animationSequence,
  loop = false,
  onSequenceComplete,
  onAnimationChange,
  ...props
}: OfficerProps & JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group | null>(null);
  const { scene, animations } = useGLTF("/models/officer.glb");
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone) as any;
  const { actions, mixer } = useAnimations(animations, group);

  const [currentAnimationIndex, setCurrentAnimationIndex] = useState(0);
  const timeoutRef = useRef<number | null>(null);
  const currentActionRef = useRef<THREE.AnimationAction | null>(null);

  // Function to play a single animation
  const playAnimation = (animationName: AnimationName, fadeInTime = 0.5) => {
    if (!actions) return null;

    const actionKey = ActionType[animationName];
    const action = actions[actionKey];

    if (action) {
      // Stop current animation with fade out
      if (currentActionRef.current && currentActionRef.current !== action) {
        currentActionRef.current.fadeOut(fadeInTime);
      }

      // Play new animation with fade in
      action.reset().fadeIn(fadeInTime).play();
      currentActionRef.current = action;
      return action;
    }
    return null;
  };

  // Function to play the next animation in sequence
  const playNextAnimation = () => {
    if (!animationSequence || animationSequence.length === 0) return;

    const currentAnim = animationSequence[currentAnimationIndex];
    const action = playAnimation(currentAnim.name, currentAnim.fadeInTime);

    if (action && onAnimationChange) {
      onAnimationChange(currentAnim.name, currentAnimationIndex);
    }

    // Set timeout for the next animation
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    timeoutRef.current = window.setTimeout(() => {
      const nextIndex = currentAnimationIndex + 1;

      if (nextIndex < animationSequence.length) {
        // Move to next animation
        setCurrentAnimationIndex(nextIndex);
      } else if (loop) {
        // Loop back to the beginning
        setCurrentAnimationIndex(0);
      } else {
        // Sequence complete
        if (onSequenceComplete) {
          onSequenceComplete();
        }
      }
    }, currentAnim.duration * 1000);
  };

  // Effect to handle sequential animations
  useEffect(() => {
    if (
      animationSequence &&
      animationSequence.length > 0 &&
      actions &&
      Object.keys(actions).length > 0
    ) {
      playNextAnimation();
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [currentAnimationIndex, animationSequence, actions]);

  // Effect to handle single animation (legacy support)
  useEffect(() => {
    if (!animationSequence && animationName && actions && Object.keys(actions).length > 0) {
      playAnimation(animationName);
    }
  }, [animationName, actions]);

  // Effect to handle fallback to first available animation
  useEffect(() => {
    if (!animationSequence && !animationName && actions && Object.keys(actions).length > 0) {
      const firstActionName = Object.keys(actions)[0];
      if (firstActionName && actions[firstActionName]) {
        actions[firstActionName]?.reset().fadeIn(0.5).play();
        currentActionRef.current = actions[firstActionName];
      }
    }
  }, [actions, animationSequence, animationName]);

  // Cleanup function
  useEffect(() => {
    return () => {
      if (mixer) {
        mixer.stopAllAction();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [mixer]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group
            name="84379d408b7344779104c4d1216573d5fbx"
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.01}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="Area"
                  position={[3.479, 200.266, 7.531]}
                  rotation={[0, 0, -Math.PI]}
                  scale={[-123.128, -100, -853.042]}
                >
                  <group name="Object_5" rotation={[Math.PI / 2, 0, 0]}>
                    <group name="Object_6" />
                  </group>
                </group>
                <group name="Armature004" rotation={[-Math.PI / 2, 0, 0]} />
                <group name="Cylinder" rotation={[-Math.PI / 2, 0, 0]} />
                <group name="Cylinder_001" rotation={[-Math.PI / 2, 0, 0]} />
                <group name="Sci_fi_Soldier_black_orange" rotation={[-Math.PI / 2, 0, 0]}>
                  <group name="Object_11">
                    <primitive object={nodes._rootJoint} />
                    <group name="Object_13" rotation={[-Math.PI / 2, 0, 0]} />
                    <group name="Object_16" rotation={[-Math.PI / 2, 0, 0]} />
                    <group name="Object_164" rotation={[-Math.PI / 2, 0, 0]} />
                    <group name="Object_166" rotation={[-Math.PI / 2, 0, 0]} />
                    <group name="Object_168" rotation={[-Math.PI / 2, 0, 0]} />
                    <group name="Object_170" rotation={[-Math.PI / 2, 0, 0]} />
                    <group name="Object_172" rotation={[-Math.PI / 2, 0, 0]} />
                    <skinnedMesh
                      name="Object_14"
                      geometry={nodes.Object_14.geometry}
                      material={materials.arms}
                      skeleton={nodes.Object_14.skeleton}
                      morphTargetDictionary={nodes.Object_14.morphTargetDictionary}
                      morphTargetInfluences={nodes.Object_14.morphTargetInfluences}
                    />
                    <skinnedMesh
                      name="Object_15"
                      geometry={nodes.Object_15.geometry}
                      material={materials.Material_003}
                      skeleton={nodes.Object_15.skeleton}
                      morphTargetDictionary={nodes.Object_15.morphTargetDictionary}
                      morphTargetInfluences={nodes.Object_15.morphTargetInfluences}
                    />
                    <skinnedMesh
                      name="Object_17"
                      geometry={nodes.Object_17.geometry}
                      material={materials.arms}
                      skeleton={nodes.Object_17.skeleton}
                      morphTargetDictionary={nodes.Object_17.morphTargetDictionary}
                      morphTargetInfluences={nodes.Object_17.morphTargetInfluences}
                    />
                    <skinnedMesh
                      name="Object_18"
                      geometry={nodes.Object_18.geometry}
                      material={materials.Material_003}
                      skeleton={nodes.Object_18.skeleton}
                      morphTargetDictionary={nodes.Object_18.morphTargetDictionary}
                      morphTargetInfluences={nodes.Object_18.morphTargetInfluences}
                    />
                    <skinnedMesh
                      name="Object_165"
                      geometry={nodes.Object_165.geometry}
                      material={materials.Default}
                      skeleton={nodes.Object_165.skeleton}
                      morphTargetDictionary={nodes.Object_165.morphTargetDictionary}
                      morphTargetInfluences={nodes.Object_165.morphTargetInfluences}
                    />
                    <skinnedMesh
                      name="Object_167"
                      geometry={nodes.Object_167.geometry}
                      material={materials.torso}
                      skeleton={nodes.Object_167.skeleton}
                      morphTargetDictionary={nodes.Object_167.morphTargetDictionary}
                      morphTargetInfluences={nodes.Object_167.morphTargetInfluences}
                    />
                    <skinnedMesh
                      name="Object_171"
                      geometry={nodes.Object_171.geometry}
                      material={materials.helmet}
                      skeleton={nodes.Object_171.skeleton}
                      morphTargetDictionary={nodes.Object_171.morphTargetDictionary}
                      morphTargetInfluences={nodes.Object_171.morphTargetInfluences}
                    />
                    <skinnedMesh
                      name="Object_173"
                      geometry={nodes.Object_173.geometry}
                      material={materials.arms}
                      skeleton={nodes.Object_173.skeleton}
                      morphTargetDictionary={nodes.Object_173.morphTargetDictionary}
                      morphTargetInfluences={nodes.Object_173.morphTargetInfluences}
                    />
                    <skinnedMesh
                      name="Object_174"
                      geometry={nodes.Object_174.geometry}
                      material={materials.legs}
                      skeleton={nodes.Object_174.skeleton}
                      morphTargetDictionary={nodes.Object_174.morphTargetDictionary}
                      morphTargetInfluences={nodes.Object_174.morphTargetInfluences}
                    />
                    <skinnedMesh
                      name="Object_169"
                      geometry={nodes.Object_169.geometry}
                      material={materials.Scifi_gun_4k}
                      skeleton={nodes.Object_169.skeleton}
                    />
                  </group>
                </group>
                <group name="Sphere_001" rotation={[-Math.PI / 2, 0, 0]} />
                <group name="model" rotation={[-Math.PI / 2, 0, 0]} />
                <group name="model_001" rotation={[-Math.PI / 2, 0, 0]} />
                <group name="model_002" rotation={[-Math.PI / 2, 0, 0]} />
                <group name="model_004" rotation={[-Math.PI / 2, 0, 0]} />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/officer.glb");

