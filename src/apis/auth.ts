// 아래는 모킹 함수

// TODO: 실제 api로 함수 바꿔야 함
export async function getLoginUserInfo() {
  try {
    const response: any = await new Promise((res, rej) => {
      res({
        code: 200,
        message: '유저 조회에 성공했습니다.',
        data: {
          userId: 1,
          userName: '황태환',
          isHouseBuilt: false,
          todayMissionComplete: false,
        },
      });
      // rej(new Error());
    });
    return response.data;
  } catch (err) {
    return new Error();
  }
}

import axios from 'axios';
import {Data} from '../atoms/loginAtom';

export default async function tryLogin(
  code: string,
  provider: string,
  state: string,
): Promise<Data> {
  const response = await axios.post<Data>(
    `http://127.0.0.1:5173/auth/${provider}?code=${code}&state=${state}`,
  );
  return response.data;
}
