import { BrowserRouter, Route, Routes } from "react-router-dom";
import GuestBook from "./pages/GuestBook/GuestBook";
import Mission from "./pages/Mission/Mission";


export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:id/guests" element={<GuestBook />} />
        <Route path="/mission" element={<Mission />} />
      </Routes>
    </BrowserRouter>
  );
}
