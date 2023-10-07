import './App.css';
import Notes from './components/Notes';
import SignUp from './components/SignUp';
import AttendancePage from './components/AttendancePage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import PrePage from './components/PrePage';
import Shop from './components/Shop';
import Shoppre from './components/Shoppre';
import LoginSign from './components/LoginSign';
import PrivateRoutes from './components/PrivateRoutes';
import ItemDetails from './components/ItemDetails'; // Import ItemDetails
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './components/Profile';
import About from './components/About';
import ScrollToTop from './components/ScrollToTop';






function App() {
  return (
    <Router>
       <ScrollToTop/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/Logisign" element={<LoginSign />} />
        <Route path="/LoginPage/SignUp" element={<SignUp />} />
          <Route path="/Notes" element={<Notes />} />
          <Route path="/About" element={<About/>} />
          <Route path="/note/PrePage/:id" element={<PrePage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/Shop" element={<Shop />} />
          <Route path="/shop/:itemId" element={<ItemDetails />} /> {/* Pass posts as prop here */}
          
          <Route path="/Shop/Shoppre" element={<Shoppre />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/AttendancePage" element={<AttendancePage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
