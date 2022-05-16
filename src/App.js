import {BrowserRouter, Routes, Route} from "react-router-dom";
import Config from "./Config";
import AppProvider from "./AppProvider";
import SignInPage from "./pages/signin/SignInPage";
import MainPage from "./pages/main/MainPage";

Config.set('SERVER_URL', 'https://api.cliqode.com/v1');
Config.set('APPLICATION_ID', '6560588f36297abd70cb7433774d5e09');

function App() {
    return (
        <AppProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/signin" element={<SignInPage/>}/>
                    <Route path="/*" element={<MainPage/>}/>
                </Routes>
            </BrowserRouter>
        </AppProvider>
    );
}

export default App;
