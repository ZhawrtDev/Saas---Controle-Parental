import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Nav from "./Nav";
import AphoneDetails from "./components/Nav";
import AuthPage from "./screens/AuthPage";
import "./App.css";

function App() {
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
  const isLoggedIn =
    localStorage.getItem("token") &&
    userId &&
    localStorage.getItem("discordId");

  useEffect(() => {
    const checkLocalStorage = setInterval(() => {
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        setUserId(storedUserId);
        clearInterval(checkLocalStorage);
      }
    }, 500);

    return () => clearInterval(checkLocalStorage);
  }, []);

  useEffect(() => {
    fetch("https://backend-ryzt.onrender.com/")
      .then(() => console.log("🔄 Backend acordado"))
      .catch((err) => console.warn("⚠️ Erro ao acordar o backend", err));
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://backend-ryzt.onrender.com/user?userId=${userId}`
        );
        if (!response.ok) throw new Error("Erro ao buscar dados do usuário");

        const data = await response.json();

        if (
          localStorage.getItem("discordUsername") !== data.discordUsername ||
          localStorage.getItem("avatar") !== data.avatar ||
          localStorage.getItem("discordRole") !== data.discordRole ||
          localStorage.getItem("robloxUsername") !== data.robloxUsername
        ) {
          localStorage.setItem("discordUsername", data.discordUsername);
          localStorage.setItem("avatar", data.avatar);
          localStorage.setItem("discordRole", data.discordRole);
          localStorage.setItem("robloxUsername", data.robloxUsername);

          console.log("✅ Dados do usuário salvos!");
        }
      } catch (error) {
        console.error("❌ Erro ao buscar os dados:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <>
      <div className="main">
        <Router>
          <Routes>
            <Route
              path="/"
              element={isLoggedIn ? <Nav /> : <Navigate to="/auth" />}
            />
            <Route path="/aphone" element={<AphoneDetails />} />
            <Route path="/auth/*" element={<AuthPage />} />
          </Routes>
        </Router>
      </div>
        <div className="b-effect"></div>
    </>
  );
}

export default App;
