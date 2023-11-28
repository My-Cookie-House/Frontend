// mission.ts
import {ApiError} from '@/Error/ApiError';
import {isAxiosError} from 'axios';
import {instance} from './axios';
import * as Sentry from '@sentry/react';

// 특정 날짜의 완료된 미션 데이터를 가져오는 함수
export const getCompletedMissionById = async (missionCompleteId: number) => {
  try {
    const response = await instance.get(
      `/mission-complete/${missionCompleteId}`,
    );
    return response.data.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw Sentry.captureException(
        new ApiError(error, 'getCompletedMissionById'),
      );
    }
  }
};

// 오늘의 미션 데이터를 가져오는 함수
export const fetchTodayMissionData = async () => {
  try {
    const response = await instance.get('/missions/today-mission');
    return response.data.data; // 데이터 반환
  } catch (error) {
    if (isAxiosError(error)) {
      throw Sentry.captureException(
        new ApiError(error, 'fetchTodayMissionData'),
      );
    }
  }
};

// 이미지와 메시지를 서버에 업로드하는 함수
export const uploadImageMessageFurnitureId = async (
  imageFile,
  content,
  furnitureId,
  method,
) => {
  const formData = new FormData();
  formData.append('missionCompleteImage', imageFile);
  formData.append('missionCompleteContent', content);
  formData.append('furnitureId', furnitureId.toString());

  try {
    await instance.post('/mission-complete', formData);
    // 성공 처리 로직
  } catch (error) {
    if (isAxiosError(error)) {
      throw Sentry.captureException(
        new ApiError(error, 'uploadImageMessageFurnitureId'),
      );
    }
  }
};

export const getAllCompletedMissions = async (id: number) => {
  try {
    const response = await instance.get(`/mission-complete`, {
      params: {
        userId: id,
      },
    });
    return response.data.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw Sentry.captureException(
        new ApiError(error, 'getAllCompletedMissions'),
      );
    }
  }
};
