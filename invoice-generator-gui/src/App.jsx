import {BrowserRouter, Route, Routes} from "react-router-dom";
import MenuBar from "./components/MenuBar.jsx";
import LandingPage from "./pages/landingPage/LandingPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import MainPage from "./pages/MainPage.jsx";
import PreviewPage from "./pages/PreviewPage.jsx";
import {Toaster} from "react-hot-toast";

const App = () => {
    return(
        <BrowserRouter>
            <MenuBar/>
            <Toaster/>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/generate" element={<MainPage/>}/>
                <Route path="/preview" element={<PreviewPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;