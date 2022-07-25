import {BrowserRouter, Routes, Route} from "react-router-dom";
import Config from "./Config";
import AppProvider from "./AppProvider";
import SignInPage from "./pages/signin/SignInPage";
import MainPage from "./pages/main/MainPage";
import SignUpPage from "./pages/signup/SignUpPage";
import NotFoundPage from "./pages/notfound";
import React from "react";
import AccessDeniedPage from "./pages/denied";
import Queue from 'nq';

// Config.set('SERVER_URL', 'https://api.mweeb.com/v1');
// Config.set('SERVER_URL', 'http://165.232.167.26:8888/v1');
// Config.set('APPLICATION_ID', '6560588f36297abd70cb7433774d5e09');



// Queue.setUrl('https://api.pwrdv.com/v1');
Queue.setUrl('https://api.mweeb.com/v1');
Queue.setApplicationId('6560588f36297abd70cb7433774d5e09');

function App() {
    return (
        <AppProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/signin" element={<SignInPage/>}/>
                    <Route path="/signin/:masterKey" element={<SignInPage/>}/>
                    <Route path="/signup" element={<SignUpPage/>}/>
                    <Route path="/*" element={<MainPage/>}/>
                    <Route path={'/denied'} element={<AccessDeniedPage/>}/>
                </Routes>
            </BrowserRouter>
        </AppProvider>
    );
}

export default App;
