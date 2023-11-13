import {BrowserRouter, Route, Routes} from 'react-router-dom';
import GuestBook from './pages/GuestBook/GuestBook';
import Mission from './pages/Mission/Mission';
import OnboardingPage from './pages/OnboardingPage/OnboardingPage';
import Login from './pages/Login/Login';
import Build from './pages/Build/Build';
import Random from './pages/Build/Random/Random';
import Preview from './pages/Build/Preview/Preview';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<OnboardingPage />} />
        <Route path="/:id/guests" element={<GuestBook />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/build" element={<Build />} />
        <Route path="/build/random" element={<Random />} />
        <Route path="/build/custom" />
        <Route path="/build/preview" element={<Preview />} />
      </Routes>
    </BrowserRouter>
  );
}
