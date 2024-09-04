import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Link, useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import "./App.css";
import { MdAccountCircle } from "react-icons/md";
import { RiLogoutBoxFill } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { BiSolidMessageSquareDetail } from "react-icons/bi";

const App = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [notificationCount, setNotificationCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const [infouser, setInfouser] = useState(null); // Initialize as null to check loading state

  useEffect(() => {
    fetchNotificationCount();
    fetchMessageCount();
    fetchinforuser();
  }, []);

  const fetchNotificationCount = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3005/notifications/count",
        { withCredentials: true }
      );
      setNotificationCount(response.data.notificationCount);
    } catch (error) {
      console.error("Error fetching notification count:", error);
    }
  };

  const fetchMessageCount = async () => {
    try {
      const response = await axios.get("http://localhost:3005/messages/count", {
        withCredentials: true,
      });
      setMessageCount(response.data.messageCount);
    } catch (error) {
      console.error("Error fetching message count:", error);
    }
  };

  const fetchinforuser = async () => {
    try {
      const res = await axios.get("http://localhost:3005/Account", {
        withCredentials: true,
      });
      setInfouser(res.data.user);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const Menus = [
    { title: "SuggestedUsers", src: <FaHome className="icons" />, gap: true },
    { title: "home", src: <FaHome className="icons" />, gap: true },
    {
      title: "notifications",
      src: (
        <IconButton aria-label="notifications" style={{ padding: 0 }}>
          <Badge badgeContent={notificationCount} color="secondary">
            <NotificationsIcon sx={{ color: "black" }} />
          </Badge>
        </IconButton>
      ),
    },
    {
      title: "messages",
      src: (
        <IconButton aria-label="messages" style={{ padding: 0 }}>
          <Badge badgeContent={messageCount} color="secondary">
            <BiSolidMessageSquareDetail className="icons" />
          </Badge>
        </IconButton>
      ),
    },
  ];

  const getInitials = (nom, prenom) => {
    if (!nom || !prenom) return "";
    return `${nom.charAt(0)}${prenom.charAt(0)}`.toUpperCase();
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/");
  };

  if (!infouser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-bold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex ">
      <div
        className={`${
          open ? "w-72" : "w-24"
        } bg-[#b968c7c4] h-screen p-5 pt-8 fixed duration-300`}
      >
        <img
          src="/assets/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
             border-2 rounded-full ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center ">
          <img
            src="/assets/logo.png"
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
            width="50px"
          />
          <h1
            className={`text-dark origin-left font-bold text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            SYBALINK
          </h1>
        </div>
        <ul className="pt-6">
          <Link
            to="/accounts"
            className={`flex items-center rounded-md p-2 cursor-pointer hover:bg-[#B968C7]   text-sm items-center gap-x-4 `}
          >
            <div>
              {infouser.profilePicture ? (
                <img
                  src={infouser.profilePicture}
                  alt="User Profile"
                  className={`w-10 h-10 rounded-full object-cover `}
                />
              ) : (
                <div
                  className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold text-lg"
                  title={`${infouser.nom} ${infouser.prenom}`}
                >
                  {getInitials(infouser.nom, infouser.prenom)}
                </div>
              )}
            </div>
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              <p className="text-base font-bold">{`${infouser.nom} ${infouser.prenom}`}</p>
              <p className="text-sm text-gray-500">{`@${infouser.nickname}`}</p>
            </span>
          </Link>
          {Menus.map((Menu, index) => (
            <Link
              key={index}
              to={`/${Menu.title.toLowerCase()}`}
              className={`flex items-center rounded-md p-2 cursor-pointer hover:bg-[#B968C7] font-bold text-sm items-center gap-x-4 ${
                Menu.gap ? "mt-9" : "mt-2"
              }`}
            >
              <div className="mb-1/5">{Menu.src}</div>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center rounded-md p-2 mt-36 cursor-pointer hover:bg-[#B968C7] hover:pr-2 font-bold text-sm items-center gap-x-4"
          >
            <div className="mb-0">
              <RiLogoutBoxFill className="icons" />
            </div>
            <span className={`${!open && "hidden"} origin-left duration-200 `}>
              Logout
            </span>
          </button>
        </ul>
      </div>
      <div
        className={`flex-1 p-7 ${
          open ? "ml-72" : "ml-20"
        } transition-all duration-300 overflow-y-auto`}
      >
        <ThemeProvider defaultTheme="Light" storageKey="vite-ui-theme">
          {children}
        </ThemeProvider>
      </div>
    </div>
  );
};

export default App;
