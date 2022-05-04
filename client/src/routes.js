import React from "react";
import {Route, Routes} from "react-router-dom";
import {CreatePage} from "./components/auth/CreatePage";
import {StartPage} from "./components/start/StartPage";
import {LoginPage} from "./components/login/LoginPage";
import {RegisterPage} from "./components/register/RegisterPage";
import Toolbar from "./components/toolbar/Toolbar";
import HomePage from "./components/home/HomePage";
import SearchPage from "./components/search/SearchPage";
import ProfilePage from "./components/profile/ProfilePage";
import ChatsPage from "./components/chats/ChatsPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <div>
                <div>
                    <Routes>
                        <Route path={"/"} exact element={<HomePage/>}/>
                        <Route path={"/search"} element={<SearchPage/>}/>
                        <Route path={"/create"} element={<CreatePage/>}/>
                        <Route path={"/chats"} element={<ChatsPage/>}/>
                        <Route path={"/profile"} element={<ProfilePage/>}/>
                    </Routes>
                </div>
                <Toolbar/>
            </div>
        )
    }
    return (
        <Routes>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/" element={<StartPage/>}/>
        </Routes>
    )
}