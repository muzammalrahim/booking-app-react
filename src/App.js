import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import "./index.css";
import { getBusinessInfo } from "./helpers/api";
import { BusinessInfoContext } from "./services/BusinessInfo.context";
import SuccessPage from "./components/success/SuccessPage";
import FailurePage from "./components/failure/FailurePage";
import CalanderView from "./views/CalanderView";
import CalanderSchd from "./views/CalanderSchd";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-calendar/dist/Calendar.css";

function App() {
  const { businessInfo, setBusinessInfo } = useContext(BusinessInfoContext);

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<CalanderView />} />
          <Route path='cal-shd' element={<CalanderSchd />} />
          <Route path='/success' element={<SuccessPage />} />
          <Route path='failure' element={<FailurePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
