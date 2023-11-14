import {BrowserRouter, Route, Routes} from 'react-router-dom';
import GuestBook from './pages/GuestBook/GuestBook';
import Mission from './pages/Mission/Mission';
import Onboarding from './pages/Onboarding/Onboarding';
import Login from './pages/Login/Login';
import Build from './pages/Build/Build';
import Random from './pages/Build/Random/Random';
import Preview from './pages/Build/Preview/Preview';
import SplashScreen from './pages/SplashScreen/SplashScreen';
import Cookies from './pages/Build/Custom/Cookies/Cookies';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import PageLayout from './components/PageLayout/PageLayout';
import Icing from './pages/Build/Custom/Icing/Icing';
import BuildLayout from './pages/Build/BuildLayout';

export default function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/:id/guests" element={<GuestBook />} />
        <Route path="/mission" element={<Mission />} />

        {/* 쿠키하우스 빌딩 하위 경로 */}
        <Route path="/build" element={<BuildLayout />}>
          <Route path="" element={<Build />} />
          <Route path="random" element={<Random />} />
          <Route path="custom/cookies" element={<Cookies />} />
          <Route path="custom/icing" element={<Icing />} />
          <Route path="preview" element={<Preview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
