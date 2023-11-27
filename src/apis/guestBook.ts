import {instance} from './axios';

// 사용자의 방명록 정보를 가져오는 함수
export const getGuestBookInfo = async (userId: number) => {
  try {
    const response = await instance.get(`/guest-book/${userId}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// 편지를 보내는 함수
export const sendGuestBook = async (userId, author, ornamentId, content) => {
  try {
    await instance.post(`/guest-book`, {
      userId: userId,
      author: author,
      ornamentId: ornamentId,
      content: content,
    });
  } catch (error) {
    throw error;
  }
};
