import { useTexture } from "@react-three/drei"
import { Mesh } from "three";

function Card(props: { faceTextureUrl: string, idx: number, beginX: number, serial: number }) {
  let _selectedOffsetY = .2;
  let _beginX = props.beginX;
  const _texture = useTexture({
    map: props.faceTextureUrl
  })
  return (
    <mesh
      position={[_beginX + props.idx * .5, 0, props.idx*0.001]}
      onClick={(e: any) => {
        e.stopPropagation();
        let _targetMesh = e["eventObject"] as Mesh;
        let _pos = _targetMesh.position;
        let _upY;
        if (_pos.y == 0) _upY = _selectedOffsetY;
        else _upY = 0;
        _targetMesh.position.set(_pos.x, _upY, _pos.z);
      }}
      userData={{"_d_cardSerial":props.serial}}
    >
      <boxGeometry args={[2, 2, .001]} />
      <meshStandardMaterial {..._texture} />
    </mesh>
  );
}

export default Card;