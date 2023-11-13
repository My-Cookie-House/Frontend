import {BrowserRouter, Route, Routes} from 'react-router-dom';
import GuestBook from './pages/GuestBook/GuestBook';
import Mission from './pages/Mission/Mission';
import OnboardingPage from './pages/OnboardingPage/OnboardingPage';
import Login from './pages/Login/Login';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<OnboardingPage />} />
        <Route path="/:id/guests" element={<GuestBook />} />
        <Route path="/mission" element={<Mission />} />
      </Routes>
    </BrowserRouter>
  );
}
