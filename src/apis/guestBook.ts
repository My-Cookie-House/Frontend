import axios from 'axios';
import Cookies from 'js-cookie';


const API_BASE_URL = 'http://15.165.156.94'; // API 기본 URL

// accessToken을 가져오는 함수
export const getAccessToken = () => {
  return Cookies.get('accessToken');
};

// 사용자의 방명록 정보를 가져오는 함수
export const getUserInfoFromServer = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/guest-book/${userId}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// 편지를 보내는 함수
export const sendGuestBook = async (userId, author, ornamentId, content) => {
  try {
   await axios.post(`${API_BASE_URL}/guest-book`, {
        userId : userId,
        author : author,
        ornamentId : ornamentId,
        content : content,
    });
  } catch (error) {
    throw error;
  }
};
