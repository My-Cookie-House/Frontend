import {lazy} from 'react';
import {Route, Routes} from 'react-router-dom';
import SplashScreen from './pages/SplashScreen/SplashScreen';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import BuildLayout from './pages/Build/BuildLayout';
import RouteChangeTracker from './RouteChangeTracker';

const Login = lazy(() => import('./pages/Login/Login'));
const Build = lazy(() => import('./pages/Build/Build'));
const Random = lazy(() => import('./pages/Build/Random/Random'));
const Preview = lazy(() => import('./pages/Build/Preview/Preview'));
const Cookies = lazy(() => import('./pages/Build/Custom/Cookies/Cookies'));
const Icing = lazy(() => import('./pages/Build/Custom/Icing/Icing'));
const Name = lazy(() => import('./pages/Build/Name/Name'));
const House = lazy(() => import('./pages/House/House'));
const Outside = lazy(() => import('./pages/House/Outside/Outside'));
const Inside = lazy(() => import('./pages/House/Inside/Inside'));
const MissionFurniturePreview = lazy(
  () => import('./pages/MissionFurniturePreview/MissionFurniturePreview'),
);
const Redirect = lazy(() => import('./pages/Login/Redirect'));
const GuestBook = lazy(() => import('./pages/GuestBook/GuestBook'));
const Onboarding = lazy(() => import('./pages/Onboarding/Onboarding'));
const Wallpaper = lazy(
  () => import('./pages/Build/Custom/Wallpaper/Wallpaper'),
);

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
