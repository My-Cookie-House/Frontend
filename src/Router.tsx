import {BrowserRouter, Route, Routes} from 'react-router-dom';
import GuestBook from './pages/GuestBook/GuestBook';
import Mission from './pages/Mission/Mission';
import OnboardingPage from './pages/OnboardingPage/OnboardingPage';
import Login from './pages/Login/Login';
import Build from './pages/Build/Build';
import Random from './pages/Build/Random/Random';
import Preview from './pages/Build/Preview/Preview';
import Custom from './pages/Build/Custom/Custom';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import PageLayout from './components/PageLayout/PageLayout';

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
      <PageLayout>
        <Routes>
          <Route path="/build" element={<Build />} />
          <Route path="/build/random" element={<Random />} />
          <Route path="/build/custom" element={<Custom />} />
          <Route path="/build/preview" element={<Preview />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  );
}
