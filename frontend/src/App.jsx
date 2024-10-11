import LandingPage from "./pages/LandingPage"
import "./App.css"
import {Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Authentication from "./pages/Authentication";
import { AuthProvider } from "./contexts/AuthContext";
import VideoMeet from "./pages/VideoMeet";
import Home from "./pages/Home";
import History from "./pages/History";



function App() {

  return (
    <>
       <Router>
        <AuthProvider>
        <Routes>
          {/* <Route path="/home"></Route> */}
          <Route path="/" element={<LandingPage/>}></Route>
          <Route path="/auth" element={<Authentication/>}></Route>
          <Route path="/:url" element={<VideoMeet />}></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/history" element={<History/>}/>
        </Routes>
        </AuthProvider>
       </Router>
    </>
  )
}

export default App
