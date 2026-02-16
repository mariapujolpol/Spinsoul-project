import { Routes, Route } from "react-router-dom";
import ReleasesListPage from "./pages/ReleasesListPage";

export default function App() {
  return (
    <Routes>
      <Route path="/releases" element={<ReleasesListPage />} />
    </Routes>
  );
}
