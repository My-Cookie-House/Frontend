// mission.ts
import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'http://15.165.156.94'; // API 기본 URL

// accessToken을 가져오는 함수
export const getAccessToken = () => {
  return Cookies.get('accessToken');
};

// 특정 날짜의 완료된 미션 데이터를 가져오는 함수
export const getCompletedMissionByDate = async (missionDate) => {
  // API 호출 로직
  // 예시입니다. 실제 API 엔드포인트와 데이터 구조에 맞게 수정하세요.
  try {
    const response = await axios.get(`${API_BASE_URL}/missions/completed?date=${missionDate}`);
    return response.data.data;
  } catch (error) {
    console.error('미션 데이터를 가져오는데 실패했습니다.', error);
    throw error;
  }
};

// 오늘의 미션 데이터를 가져오는 함수
export const fetchTodayMissionData = async () => {
  const accessToken = getAccessToken();
  const config = {
    headers: { 'Authorization': `${accessToken}` }
  };

  try {
    const response = await axios.get(`${API_BASE_URL}/missions/today-mission`, config);
    return response.data; // 데이터 반환
  } catch (error) {
    console.error('데이터를 가져오는데 실패했습니다.', error);
    throw error;
  }
};

// 이미지와 메시지를 서버에 업로드하는 함수
export const uploadImageMessageFurnitureId = async (imageFile, content, furnitureId, method) => {
  const accessToken = Cookies.get('accessToken');
  const formData = new FormData();
  formData.append('missionCompleteImage', imageFile);
  formData.append('missionCompleteContent', content);
  formData.append('furnitureId', furnitureId.toString());
  
  const requestConfig = {
    method: method,
    url: `${API_BASE_URL}/mission-complete`, // 실제 엔드포인트로 변경
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `${accessToken}`
    },
  };
  
  try {
    await axios(requestConfig);
    // 성공 처리 로직
  } catch (error) {
    console.error('업로드에 실패했습니다.', error);
    throw error;
  }
};