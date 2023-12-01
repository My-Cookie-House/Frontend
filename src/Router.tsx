import {Route, Routes} from 'react-router-dom';
import SplashScreen from './pages/SplashScreen/SplashScreen';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import BuildLayout from './pages/Build/BuildLayout';
import RouteChangeTracker from './RouteChangeTracker';
import Build from './pages/Build/Build';
import Icing from './pages/Build/Custom/Icing/Icing';
import Name from './pages/Build/Name/Name';
import Cookies from './pages/Build/Custom/Cookies/Cookies';
import Preview from './pages/Build/Preview/Preview';
import Random from './pages/Build/Random/Random';
import GuestBook from './pages/GuestBook/GuestBook';
import Inside from './pages/House/Inside/Inside';
import Outside from './pages/House/Outside/Outside';
import Login from './pages/Login/Login';
import MissionFurniturePreview from './pages/MissionFurniturePreview/MissionFurniturePreview';
import Onboarding from './pages/Onboarding/Onboarding';
import Redirect from './pages/Login/Redirect';
import House from './pages/House/House';
import Wallpaper from './pages/Build/Custom/Wallpaper/Wallpaper';

export default function Router() {
  RouteChangeTracker();

  return (
    <>
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
    </>
  );
}
