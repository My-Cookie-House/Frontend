// Mission 컴포넌트 (일부 생략)
import RenderMissionModalContent from '../RenderMissionModalContent/RenderMissionModalContent';
import {useState, useEffect} from 'react';
import Modal from '../Modal/Modal';
import useModal from '../../hooks/useModal';
import ModalCloseButton from '../ModalCloseButton/ModalCloseButton';
import * as S from './style';
import useInput from '../../hooks/useInput';
import {useRecoilValue} from 'recoil';
import {userInfoAtom} from '../../atoms/loginStateAtom';
import {useQuery} from '@tanstack/react-query';
import {ICompletedMission} from '../../interfaces/mission';
import {
  fetchTodayMissionData,
  getCompletedMissionById,
} from '../../apis/mission';
import {useRecoilState} from 'recoil';
import {missionIdAtom} from '../../atoms/missionAtomState'; // atoms 파일 경로에 따라 수정
import {useNavigate} from 'react-router';
import {missionStateAtom} from '../../atoms/missionState';

function Mission({isOpen, onClose}) {
  const userInfo = useRecoilValue(userInfoAtom);
  // 모달 상태관리
  const {
    isOpen: isMissionArriveModalOpen,
    openModal: openMissionArriveModal,
    closeModal: closeMissionArriveModal,
  } = useModal();
  const navigate = useNavigate();
  const content = useInput<HTMLTextAreaElement>(); // 편지 내용을 관리하는 상태
  const [uploadedImage, setUploadedImage] = useState<string | ArrayBuffer>(''); // 업로드 된 이미지 url 관리하는 상태
  const [imageFile, setImageFile] = useState(null); // 업로드할 이미지 파일을 관리하는 상태
  const [missionDate, setMissionDate] = useState<string>('');
  const [missionCompleteId, setMissionCompleteId] = useState<null | number>(
    null,
  );
  const [missionMessage, setMissionMessage] =
    useState<string>('오늘 먹은 점심');
  //const [missionId, setMissionId] = useState<number>(1);
  const [modalStep, setModalStep] = useState(1);
  const [imageType, setImageType] = useState<
    'SmallModal' | 'MediumModal' | 'LargeModal' | 'FurnitureSelectModal'
  >('MediumModal');
  const [modalTitle, setModalTitle] = useState<string>('미션함');
  // ChangeButton을 보여줄지 말지 결정하는 상태 변수
  const [showChangeButton, setShowChangeButton] = useState(false);

  // Recoil을 사용하여 missionId와 furnitureNum 상태를 가져옴
  const [missionId, setMissionId] = useRecoilState(missionIdAtom);

  const [missionState, setMissionState] = useRecoilState(missionStateAtom);

  useEffect(() => {
    openMissionArriveModal(); // 모달을 열어야 할 때마다 호출
  }, [openMissionArriveModal]);

  // useEffect 내에서 fetchTodayMissionData 함수 사용
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTodayMissionData();
      if (data) {
        setMissionDate(data.missionDate);
        setMissionMessage(data.missionMessage);
        setMissionId(data.missionId);
        setMissionCompleteId(data.missionCompleteId);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setMissionState((prev) => ({
      ...prev,
      missionCompleteContent: content.value,
    }));
  }, [content.value]);
  const {data, isSuccess, isError} = useQuery<ICompletedMission>({
    queryKey: ['mission', missionCompleteId, userInfo.userId],
    queryFn: () => getCompletedMissionById(missionCompleteId),
    staleTime: 10000,
  });

  // 이미지 업로드 핸들링
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // 이미지 객체를 생성하여 크기 확인
        const img = new Image();
        img.onload = () => {
          setUploadedImage(reader.result as string); // 타입 단언을 사용하여 string으로 설정
        };
        img.src = reader.result as string; // 여기도 타입 단언을 사용하여 string으로 설정
      };
      reader.readAsDataURL(file);
      setMissionState((prev) => ({
        ...prev,
        missionCompleteImage: file,
      }));
      setImageFile(file); // 나중에 업로드할 이미지 파일을 상태에 저장
    }
  };

  // 이미지와 메시지를 서버에 업로드하는 함수
  const handleCheckExistImageMessage = async () => {
    if (!imageFile || !content.value.trim()) {
      alert('이미지와 메시지를 모두 입력해야 합니다.');
      return; //TODO: 실제 환경에서 주석 해제하기
      //setModalStep(3); //TODO: 실제 환경에서 제거하기
    } else {
      setModalStep(3);
    }
  };

  // ShowMoreMenuButton 클릭 핸들러
  const handleOpenShowMoreMenu = () => {
    setShowChangeButton(!showChangeButton); // 상태를 반전시킵니다.
  };
  useEffect(() => {
    if (data) {
      setImageType('LargeModal');
    }
  }, [data]);

  return (
    <Modal
      modalTitle={modalTitle}
      isOpen={isOpen}
      onClose={onClose}
      imageType={imageType}
    >
      <ModalCloseButton onClick={onClose} />
      <S.ModalInnerWrapper>
        <RenderMissionModalContent
          modalStep={modalStep}
          missionMessage={missionMessage}
          missionId={missionId}
          data={data}
          uploadedImage={uploadedImage}
          contentValue={content.value}
          handleFileInputChange={handleFileInputChange}
          handleCheckExistImageMessage={handleCheckExistImageMessage}
          handleOpenShowMoreMenu={handleOpenShowMoreMenu}
          showChangeButton={showChangeButton}
          onClose={onClose}
        />
      </S.ModalInnerWrapper>
    </Modal>
  );
}

export default Mission;
