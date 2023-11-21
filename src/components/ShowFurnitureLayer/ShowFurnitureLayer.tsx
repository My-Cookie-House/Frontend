import React from 'react';
import FurnitureLayer from '../../assets/FurnitureLayer';
import Overlap from '../Overlap/Overlap';

interface ShowFurnitureLayerProps {
  missionId: number;
  furnitureNum: number;
}

const ShowFurnitureLayer: React.FC<ShowFurnitureLayerProps> = ({
  missionId,
  furnitureNum,
}) => {
  return (
    <>
      <Overlap
        width={300}
        height={400}
        margin="40px 0 0 0"
        imgs={FurnitureLayer[`FurnitureLayer${missionId}${furnitureNum}`]}
      />
    </>
  );
};
// Cookies[`Cookie${num1}${num2}`],
export default ShowFurnitureLayer;
