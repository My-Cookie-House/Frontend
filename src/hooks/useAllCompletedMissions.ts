import {getAllCompletedMissions} from '@/apis/mission';
import FurnitureLayer from '@/assets/FurnitureLayer';
import {IAllCompletedMissions} from '@/interfaces/mission';
import {useSuspenseQuery} from '@tanstack/react-query';

export function useAllCompletedMissions(userId: number) {
  const {data} = useSuspenseQuery<IAllCompletedMissions>({
    queryKey: ['house', 'inside', userId],
    queryFn: () => getAllCompletedMissions(userId),
  });

  // 가구들의 이미지들을 배열로 리턴
  const furnitureImgs = data?.completedMissions?.map(
    (mission) =>
      FurnitureLayer[`FurnitureLayer${mission.missionCompleteFurnitureId}`],
  );

  return {...data, furnitureImgs};
}
