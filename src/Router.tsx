import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import ReactGA from 'react-ga4';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import GuestBook from './pages/GuestBook/GuestBook';
import Onboarding from './pages/Onboarding/Onboarding';
import Login from './pages/Login/Login';
import Build from './pages/Build/Build';
import Random from './pages/Build/Random/Random';
import Preview from './pages/Build/Preview/Preview';
import SplashScreen from './pages/SplashScreen/SplashScreen';
import Cookies from './pages/Build/Custom/Cookies/Cookies';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Icing from './pages/Build/Custom/Icing/Icing';
import BuildLayout from './pages/Build/BuildLayout';
import Name from './pages/Build/Name/Name';
import House from './pages/House/House';
import Outside from './pages/House/Outside/Outside';
import Inside from './pages/House/Inside/Inside';
import Redirect from './pages/Login/Redirect';
import MissionFurniturePreview from './pages/MissionFurniturePreview/MissionFurniturePreview';
import Wallpaper from './pages/Build/Custom/Wallpaper/Wallpaper';

export default function Router() {
  /* src/RouteChangeTracker.js */

  /**
   * uri 변경 추적 컴포넌트
   * uri가 변경될 때마다 pageview 이벤트 전송
   */
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  // 구글 애널리틱스 운영서버만 적용
  useEffect(() => {
    if (process.env.REACT_APP_GOOGLE_ANALYTICS) {
      ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS);
      setInitialized(true);
    }
  }, []);

  // location 변경 감지시 pageview 이벤트 전송
  useEffect(() => {
    if (initialized) {
      ReactGA.set({page: location.pathname});
      ReactGA.send('pageview');
    }
  }, [initialized, location]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/:id/guests" element={<GuestBook />} />
        <Route path="/redirect" element={<Redirect />} />

        {/* 쿠키하우스 하위 경로 */}
        <Route path="/:id" element={<House />}>
          <Route path="" element={<Outside />} />
          <Route path="inside" element={<Inside />} />
          <Route
            path="custom/furniture"
            element={<MissionFurniturePreview />}
          />
        </Route>

        {/* 쿠키하우스 빌딩 하위 경로 */}
        <Route path="/build" element={<BuildLayout />}>
          <Route path="" element={<Build />} />
          <Route path="random" element={<Random />} />
          <Route path="custom/cookies" element={<Cookies />} />
          <Route path="custom/icing" element={<Icing />} />
          <Route path="custom/wallpaper" element={<Wallpaper />} />
          <Route path="preview" element={<Preview />} />
          <Route path="name" element={<Name />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
