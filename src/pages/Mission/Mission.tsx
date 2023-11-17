import React, { useState, useEffect } from 'react';
import Modal from "../../components/Modal/Modal";
import useModal from "../../hooks/useModal";
import ModalCloseButton from "../../components/ModalCloseButton/ModalCloseButton";
import ModalOKButton from "../../components/ModalOKButton/ModalOKButton";
import { S } from "./style"
import useInput from '../../hooks/useInput';
import axios from 'axios';
import DecorationButton from '../../components/Buttons/DecorationButton/DecorationButton';
import Furnitures from '../../assets/Furniture';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from '../../atoms/loginAtom';
import {useQuery} from '@tanstack/react-query';
import {ICompletedMission} from '../../interfaces/mission';
import mission from '../../apis/mission';
import Cookies from 'js-cookie';


function Mission({ isOpen, onClose }) {
  const getAccessToken = () => {
    return Cookies.get('accessToken');
  };
  const accessToken = getAccessToken();

  
  const userInfo = useRecoilValue(userInfoAtom);
  const { todayMissionComplete } = userInfo; //이걸로 이미지와 메시지 post를 했냐 안했냐 판단

  // 모달 상태관리
  const {
    isOpen: isMissionArriveModalOpen,
    openModal: openMissionArriveModal,
    closeModal: closeMissionArriveModal,
  } = useModal();

    const content = useInput<HTMLTextAreaElement>(); // 편지 내용을 관리하는 상태
    const [uploadedImage, setUploadedImage] = useState<string | ArrayBuffer>(''); // 업로드 된 이미지 url 관리하는 상태
    const [imageFile, setImageFile] = useState(null); // 업로드할 이미지 파일을 관리하는 상태
    const [missionDate, setMissionDate] = useState<string>("2020-12-20");
    const [missionMessage, setMissionMessage] = useState<string>("오늘 먹은 점심");
    const [missionId, setMissionId] = useState<number>(1);
    const [modalStep, setModalStep] = useState(1);
    const [imageType, setImageType] = useState<'SmallModal' | 'MediumModal' | 'LargeModal' | 'FurnitureSelectModal'>('MediumModal');
    const [modalTitle, setModalTitle] = useState<string>("미션함")
    const [furnitureId, setFurnitureId] = useState(1);
    // ChangeButton을 보여줄지 말지 결정하는 상태 변수
    const [showChangeButton, setShowChangeButton] = useState(false);

    const {data} = useQuery<ICompletedMission>({
      queryKey: ['mission', missionDate],
      queryFn: () => mission.getCompletedMissionByDate(missionDate),
      staleTime: 10000,
    });

    const fetchTodayMissionData = async () => {
      const config = {
        headers: {
          'Authorization': `${accessToken}`
        }
      }

      try {
          const response = await axios.get('http://ec2-13-209-26-255.ap-northeast-2.compute.amazonaws.com:8080/missions/today-mission', config); //TODO: 엔드포인트 변경
          if (response.status === 200 && response.data) {
            // 데이터를 상태에 저장합니다.
            setMissionDate(response.data.data.missionDate);
            setMissionMessage(response.data.data.missionMessage)
            setMissionId(response.data.data.missionId)
          }
        } catch (error) {
          console.error('데이터를 가져오는데 실패했습니다.', error);
          // 적절한 에러 처리를 수행합니다.
        }
      }

    useEffect(() => {
      openMissionArriveModal(); // 모달을 열어야 할 때마다 호출
    }, [openMissionArriveModal]);

    useEffect(() => {
      fetchTodayMissionData();
    }, []); 


  

    // 날짜 형식을 "MM월 dd일"로 포매팅하는 함수
    const formatDate = (missionDate) => {
      const [year, month, day] = missionDate.split('-');
      const formatedDate = `${month}월 ${day}일`
      return formatedDate
    };

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
        setImageFile(file); // 나중에 업로드할 이미지 파일을 상태에 저장
      }
    };
    // 이미지와 메시지를 서버에 업로드하는 함수
    const handleCheckExistImageMessage = async () => {
      if (!imageFile || !content.value.trim()) {
        alert('이미지와 메시지를 모두 입력해야 합니다.');
        //return; //TODO: 실제 환경에서 주석 해제하기
        setModalStep(3); //TODO: 실제 환경에서 제거하기
      } else {
        setModalStep(3);
      }
      
    };

    // 이미지와 메시지를 서버에 업로드하는 함수
    const handleUploadImageMessageFurnitureId = async (method) => {
      // FormData 객체 생성
      const formData = new FormData();
      formData.append('missionCompleteImage', imageFile); // input의 name과 서버에서 요구하는 키를 맞추어야 함
      formData.append('missionCompleteContent', content.value);
      formData.append('furnitureId', furnitureId.toString());
      const requestConfig = {
        method: method,
        url: '~/mission-complete', // TODO: 실제 엔드포인트로 변경
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `${accessToken}`
        },
      };
      try {
        await axios(requestConfig);
          alert('업로드에 성공했습니다.');
          // 모달 닫기, 상태 초기화 등의 추가 작업
          setImageFile(null); // 이미지 파일 상태 초기화
          content.reset(); // 메시지 입력 상태 초기화
          setImageType('LargeModal');
          setModalTitle(formatDate(missionDate))
          setModalStep(5);
          //onClose();
      } catch (error: unknown) {
        //에러 일 경우
          alert('업로드에 실패했어요.');
          setImageType('LargeModal'); //TODO: 배포 시에 없애야 함. 테스트용
          setModalTitle(formatDate(missionDate)) //TODO: 배포 시에 없애야 함. 테스트용
          setModalStep(5); //TODO: 배포 시에 없애야 함. 테스트용
        //return null;
      }
    };

      // 가구 고르기 버튼 클릭
  const handleFurnitureClick = (
    id: number,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault(); // 기본 동작 방지
    setFurnitureId(id); // 서버로 보낼 furnitureId
  };

  // ShowMoreMenuButton 클릭 핸들러
  const handleOpenShowMoreMenu = () => {
    setShowChangeButton(!showChangeButton); // 상태를 반전시킵니다.
  };
  
    // 모달 내용을 결정하는 함수
    const renderModalContent = () => {
      // todayMissionComplete가 true일 때 case 5만 보여줌
      //TODO: 수정하기 기능 추가
      if (todayMissionComplete) {
        return (
          <>
            <S.ModalText2>{missionMessage}</S.ModalText2>
            <S.ShowMoreMenuButton />
            <S.ImageWrapper>
            <S.ImagePreview
            src={data?.missionCompleteImage}
            />
            </S.ImageWrapper>
            <S.TodayMessageLine/>
            <S.ShowMessage>
              {data?.missionCompleteContent}
            </S.ShowMessage>
          </>
        );
      }
      switch (modalStep) {
        case 1:
          return (
            <>
              <S.SwappingEnvelope />
              <S.ModalText>미션이 도착했어요!</S.ModalText>
              <S.ModalOkButtonWrapper>
                <ModalOKButton
                  buttonName="확인하기"
                  onClick={() => {
                    setModalStep(2);
                    setImageType('LargeModal');
                    setModalTitle(formatDate(missionDate))
                  }}
                />
              </S.ModalOkButtonWrapper>
              
            </>
          );
        case 2:
          return (
            <>
              <S.ModalText2>{missionMessage}</S.ModalText2>
              {/* 이미지 업로드 및 메시지 입력 폼 */}
              <S.ImageUploadLabel htmlFor="image-upload"
              onClick={(event) => event.stopPropagation()}
              >
                <S.ImageInput
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                />
                {uploadedImage ? (
                <S.ImagePreview
                src={uploadedImage as string}
                />
                ) : (
                  <>
                  </>
                )}
              </S.ImageUploadLabel>
              <S.MessageArea 
                placeholder="메시지를 입력하세요."
                maxLength={200}
                value={content.value}
                onChange={content.handleChange}
              />
              <S.ModalOkButtonWrapper>
                <ModalOKButton
                  buttonName="입력완료"
                  onClick={() => {
                    setImageType('MediumModal');
                    setModalTitle("오늘의 가구");
                    handleCheckExistImageMessage();
                  }}
                />
              </S.ModalOkButtonWrapper>
              
            </>
          );
        case 3:
          return (
            <>
              <S.GuestBookEntryGrid>
                  <DecorationButton size={90} image={Furnitures[`Furniture${missionId}1`]}/>
                  <DecorationButton size={90} image={Furnitures[`Furniture${missionId}2`]} />
                  <DecorationButton size={90} image={Furnitures[`Furniture${missionId}3`]} />
              </S.GuestBookEntryGrid>
              <S.ModalOkButtonWrapper>
                <ModalOKButton
                  buttonName="보러가기"
                  onClick={() => {
                    setModalStep(4);
                    setImageType('FurnitureSelectModal');
                    setModalTitle("하나를 선택해주세요!");
                  }}
                />
              </S.ModalOkButtonWrapper>

            </>
          );
          case 4:
            return (
              <>
                <S.DecorationButtonContainer>
                  <DecorationButton 
                  size={90} 
                  image={ Furnitures[`Furniture${missionId}1`]}
                  onClick={(
                      event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
                    ) => handleFurnitureClick((missionId-1)*3+1, event)}
                  dark={furnitureId === (missionId-1)*3+1}
                  />
                  <DecorationButton 
                  size={90} 
                  image={Furnitures[`Furniture${missionId}2`]} 
                  onClick={(
                    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
                  ) => handleFurnitureClick((missionId-1)*3+2, event)}
                  dark={furnitureId === (missionId-1)*3+2}
                  />
                  <DecorationButton 
                  size={90} 
                  image={Furnitures[`Furniture${missionId}3`]} 
                  onClick={(
                    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
                  ) => handleFurnitureClick((missionId-1)*3+3, event)}
                  dark={furnitureId === (missionId-1)*3+3}
                  />
                </S.DecorationButtonContainer>
                <S.ModalOkButtonWrapper>
                  <ModalOKButton
                    buttonName="다 골랐어요!"
                    onClick={() => {
                      handleUploadImageMessageFurnitureId("post");
                    }}
                  />
                </S.ModalOkButtonWrapper>
              </>
            );
          case 5:
            return (
              <>
                <S.TextAndButtonWrapper>
                  <S.ModalText2>{missionMessage}</S.ModalText2>
                  <S.ShowMoreMenuButton onClick={handleOpenShowMoreMenu}/>
                  {showChangeButton &&
                    <S.ChangeButton>
                      이미지/메시지 수정
                    </S.ChangeButton>
                  }
                </S.TextAndButtonWrapper>
                  
                <S.ImageWrapper>
                  <S.ImagePreview
                  src={data?.missionCompleteImage}
                  />
                </S.ImageWrapper>
                <S.TodayMessageLine/>
                <S.ShowMessage>
                  {data?.missionCompleteContent}
                </S.ShowMessage>
              </>
            );
        default:
          return null;
      }
    };
  
    return (
      <>
        <Modal
          modalTitle={modalTitle}
          isOpen={isOpen}
          onClose={onClose}
          imageType={imageType}
        >
          <ModalCloseButton onClick={onClose} />
          <S.ModalInnerWrapper>
            {renderModalContent()}
          </S.ModalInnerWrapper>
        </Modal>
      </>
    )
}
export default Mission;