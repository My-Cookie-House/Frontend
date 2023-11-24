import {fetchTodayMissionData} from '@/apis/mission';
import {ITodayMission} from '@/interfaces/mission';
import {useQuery, useSuspenseQuery} from '@tanstack/react-query';

const STALE_MIN = 5;

export default function useTodayMission(
  userId: number,
): ITodayMission & {completed: boolean} {
  const {data} = useSuspenseQuery<ITodayMission>({
    queryKey: ['mission', 'today', userId],
    queryFn: () => fetchTodayMissionData(),
    staleTime: 1000 * 60 * STALE_MIN,
    gcTime: Infinity,
  });
  return {...data, completed: data?.missionCompleteId !== null};
}
