import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import "./index.css";
import Home from "./components/home/Home";
import Notification from "./components/Notification";
import { ThemeProvider } from "@/components/theme-provider";
import Message from "./components/Message";
import Accounts from "./components/account/Accounts";
import Signpage from "./components/Signpage";
import Modifier from "./components/account/Modifier";
import Profile from "./components/account/Profile";
import SuggestedUsers from "./components/SuggestedUsers";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="Light" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          {/* Route without sidebar */}
          <Route path="/" element={<Signpage />} />

          {/* Routes with sidebar */}
          <Route
            path="/*"
            element={
              <App>
                <Routes>
                  {/* <Route path="/" element={<Home />} /> */}
                  <Route path="/home" element={<Home />} />
                  <Route path="/messages" element={<Message />} />
                  <Route path="/notifications" element={<Notification />} />
                  <Route path="/suggestedusers" element={<SuggestedUsers />} />

                  <Route path="/modifierch" element={<Modifier />} />
                  <Route path="/accounts" element={<Accounts />} />
                  <Route path="/profile/:userId" element={<Profile />} />
                </Routes>
              </App>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
