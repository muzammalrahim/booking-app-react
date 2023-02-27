import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';


import CalanderView from "./views/CalanderView";
import CalanderSchd from "./views/CalanderSchd";


import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-calendar/dist/Calendar.css';





function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<CalanderView />} />
          <Route path="cal-shd" element={<CalanderSchd />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;


