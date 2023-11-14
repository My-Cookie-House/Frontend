import {BrowserRouter, Route, Routes} from 'react-router-dom';
import GuestBook from './pages/GuestBook/GuestBook';
import Mission from './pages/Mission/Mission';
import Onboarding from './pages/Onboarding/Onboarding';
import Login from './pages/Login/Login';
import Build from './pages/Build/Build';
import Random from './pages/Build/Random/Random';
import Preview from './pages/Build/Preview/Preview';
import SplashScreen from './pages/SplashScreen/SplashScreen';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/onboarding" element={<Onboarding />} />
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
