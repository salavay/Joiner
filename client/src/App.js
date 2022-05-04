import './App.css';
import {BrowserRouter as Router, withRouter} from "react-router-dom";
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {ThemeProvider} from "@mui/material";
import {THEME} from "./theme/theme";
import Loader from "./components/loader/Loader";


function App() {
    const theme = THEME;
    const {token, login, logout, userId, ready} = useAuth();
    const isAuthenticated = !!token;
    const routes = useRoutes(isAuthenticated);

    if (!ready) {
        return <Loader/>
    }

    return (
        <ThemeProvider theme={theme}>
            <AuthContext.Provider value={{
                token, login, logout, userId, isAuthenticated
            }}>
                <Router>
                    <div className="container">
                        {routes}
                    </div>
                </Router>
            </AuthContext.Provider>
        </ThemeProvider>
    );
}

export default App;
