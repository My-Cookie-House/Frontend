import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import ReactGA from 'react-ga4';

/**
 * uri 변경 추적 컴포넌트
 * uri가 변경될 때마다 pageview 이벤트 전송
 */
const RouteChangeTracker = () => {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  // 구글 애널리틱스 운영서버만 적용
  useEffect(() => {
    const key = 'G-5VXNV6XPET';
    if (key) {
      ReactGA.initialize(key);
      setInitialized(true);
      console.log(1);
    }
  }, []);

  // location 변경 감지시 pageview 이벤트 전송
  useEffect(() => {
    if (initialized) {
      ReactGA.set({page: location.pathname});
      ReactGA.send('pageview');
      console.log(2);
    }
  }, [initialized, location]);
};

export default RouteChangeTracker;
