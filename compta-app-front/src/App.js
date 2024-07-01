import "./App.css";
import Header from "./components/molecules/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ManualReconsiliationPage from "./components/organisms/ManualReconsiliationPage";

import ImageReader from "./components/molecules/ImageReader";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
          <Routes>
          <Route path="/ManualReconsiliationPage" element={<ManualReconsiliationPage />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
