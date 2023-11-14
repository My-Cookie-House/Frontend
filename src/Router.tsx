import {BrowserRouter, Route, Routes} from 'react-router-dom';
import GuestBook from './pages/GuestBook/GuestBook';
import Mission from './pages/Mission/Mission';
import OnboardingPage from './pages/OnboardingPage/OnboardingPage';
import Login from './pages/Login/Login';
import Build from './pages/Build/Build';
import Random from './pages/Build/Random/Random';
import Preview from './pages/Build/Preview/Preview';
import Cookies from './pages/Build/Custom/Cookies/Cookies';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import PageLayout from './components/PageLayout/PageLayout';
import Icing from './pages/Build/Custom/Icing/Icing';

export default function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<OnboardingPage />} />
        <Route path="/:id/guests" element={<GuestBook />} />
        <Route path="/mission" element={<Mission />} />
      </Routes>

      {/* 쿠키하우스 빌딩 하위 경로 */}
      <PageLayout>
        <Routes>
          <Route path="/build" element={<Build />} />
          <Route path="/build/random" element={<Random />} />
          <Route path="/build/custom/cookies" element={<Cookies />} />
          <Route path="/build/custom/icing" element={<Icing />} />
          <Route path="/build/preview" element={<Preview />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  );
}
