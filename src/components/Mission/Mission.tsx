import {useState, useEffect, Suspense} from 'react';
import {useRecoilValue} from 'recoil';
import {userInfoAtom} from '../../atoms/loginStateAtom';
import useTodayMission from '@/hooks/useTodayMission';
import {useCallback} from 'react';
import EnvelopeModal from '../Modal/EnvelopeModal/EnvelopeModal';
import SetMissionContentsModal from '../Modal/SetMissionContentsModal/SetMissionContentsModal';
import SeeFurnitureModal from '../Modal/SeeFurnitureModal/SeeFurnitureModal';
import CompletedMissionModal from '../Modal/CompletedMissionModal/CompletedMissionModal';

export enum MissionSteps {
  'Envelope', // 편지지
  'SetContents', // 이미지, 내용 입력
  'SeeFurniture', // 가구 제시
  'Edit', // 미션 콘텐츠 수정
  'Finished', // 미션 이미 수행했음
}

export type ModalSize =
  | 'SmallModal'
  | 'MediumModal'
  | 'LargeModal'
  | 'FurnitureSelectModal';

export type MissionModalProps = {
  closeMission: () => void;
  isOpen: boolean;
  setNextStep: () => void;
};

function Mission({isOpen, onClose}) {
  const userInfo = useRecoilValue(userInfoAtom);

  const [missionStep, setMissionStep] = useState<MissionSteps>(
    MissionSteps.Envelope,
  );

  const todayMissionData = useTodayMission(userInfo.userId);

  useEffect(() => {
    if (todayMissionData.completed) {
      // 오늘 미션을 이미 수행 한 경우
      setMissionStep(MissionSteps.Finished);
    } else {
      setMissionStep(MissionSteps.Envelope);
    }
  }, [todayMissionData.completed]);

  const setNextStep = useCallback(
    () => setMissionStep((prev) => prev + 1),
    [missionStep],
  );

  return (
    <Suspense>
      {isOpen && (
        <>
          {missionStep === MissionSteps.Envelope && (
            <EnvelopeModal
              isOpen={missionStep === MissionSteps.Envelope}
              closeMission={onClose}
              setNextStep={setNextStep}
            />
          )}
          {missionStep === MissionSteps.SetContents && (
            <SetMissionContentsModal
              isOpen={missionStep === MissionSteps.SetContents}
              closeMission={onClose}
              setNextStep={setNextStep}
            />
          )}
          {missionStep === MissionSteps.SeeFurniture && (
            <SeeFurnitureModal
              isOpen={missionStep === MissionSteps.SeeFurniture}
              closeMission={onClose}
            />
          )}
          {missionStep === MissionSteps.Finished && (
            <CompletedMissionModal
              closeModal={onClose}
              isOpen={missionStep === MissionSteps.Finished}
              date={todayMissionData.missionDate}
              missionCompleteId={todayMissionData.missionCompleteId}
            />
          )}
        </>
      )}
    </Suspense>
  );
}

export default Mission;
