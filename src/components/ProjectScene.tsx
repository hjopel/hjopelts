import { OrbitControls, Text } from "@react-three/drei";

const ProjectScene = ({ target: HTMLElement }) => {
  return (
    <>
      {/* <OrbitControls enableRotate={false} /> */}
      {/* <mesh>
        <boxBufferGeometry />
        <meshNormalMaterial />
        <pointLight intensity={1} />
      </mesh> */}
      <Text
        fontSize={10}
        fillOpacity={0}
        outlineOpacity={0.1}
        outlineWidth={0.01}
        strokeOpacity={0}
        outlineBlur={0}
      > 
        hjopel
      </Text>
    </>
  );
};
export default ProjectScene;
