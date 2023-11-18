// mission.ts
import {instance} from './axios';

// 특정 날짜의 완료된 미션 데이터를 가져오는 함수
export const getCompletedMissionByDate = async (missionDate) => {
  try {
    const response = await instance.get(`/mission-complete?date=${missionDate}`);
    return response.data.data;
  } catch (error) {
    console.error('미션 데이터를 가져오는데 실패했습니다.', error);
    throw error;
  }
};

// 오늘의 미션 데이터를 가져오는 함수
export const fetchTodayMissionData = async () => {
  try {
    const response = await instance.get('/missions/today-mission');
    return response.data.data; // 데이터 반환
  } catch (error) {
    console.error('데이터를 가져오는데 실패했습니다.', error);
    throw error;
  }
};

// 이미지와 메시지를 서버에 업로드하는 함수
export const uploadImageMessageFurnitureId = async (imageFile, content, furnitureId, method) => {
  const formData = new FormData();
  formData.append('missionCompleteImage', imageFile);
  formData.append('missionCompleteContent', content);
  formData.append('furnitureId', furnitureId.toString());
  
  
  try {
    await instance.post('/mission-complete', formData)

    // 성공 처리 로직
  } catch (error) {
    console.error('업로드에 실패했습니다.', error);
    throw error;
  }
};

export const getAllCompletedMissions = async (id) => {
  try {
    const response = await instance.get(`/mission-complete/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('데이터를 가져오는데 실패했습니다.', error);
    throw error;
  }
}