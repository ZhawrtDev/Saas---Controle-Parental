import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  faLayerGroup,
  faMobileScreen,
  faAngleDown,
  faDownload,
  faCircleInfo,
  faArrowRightFromBracket,
  faCreditCard,
  faBars,
  faHeadset,
  faMobileRetro,
  faFile,
  faVideo,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import "./style.css";
// import AphoneDetails from "../../screens/AphoneDetails";
import AphoneDetails from "../../screens/AphoneDetails";
import ApkDownload from "../../screens/ApkDownload";
import Information from "../../screens/Information";
import Aphones from "../../Aphones";

function Nav() {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [discordUsername, setDiscordUsername] = useState("");
  const [discordRole, setDiscordRole] = useState("");
  const [avatar, setAvatar] = useState("");
  const [activeComponent, setActiveComponent] = useState({
    name: "AphoneDetails",
  });

  const AphonehandleClick = () => {
    navigate(`/`);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    const fetchAndStoreUserData = async () => {
      const userId = localStorage.getItem("userId");

      if (!userId) return;

      try {
        const response = await fetch(
          `https://backend-ryzt.onrender.com/user?userId=${userId}`
        );
        const data = await response.json();

        const { email, discordUsername, discordRole, avatar } = data;

        if (email) {
          localStorage.setItem("email", email);
          setEmail(email);
        }

        if (discordUsername) {
          localStorage.setItem("discordUsername", discordUsername);
          setDiscordUsername(discordUsername);
        }

        if (discordRole) {
          localStorage.setItem("discordRole", discordRole);
          setDiscordRole(discordRole);
        }

        if (avatar) {
          localStorage.setItem("avatar", avatar);
          setAvatar(avatar);
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    fetchAndStoreUserData();

    const interval = setInterval(fetchAndStoreUserData, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="nav-top">
        <div className="fst-content">
          <div
            className="nav-icon"
            onClick={() => setIsActive((prev) => !prev)}
          >
            <FontAwesomeIcon
              icon={faBars}
              color="#101010"
              style={{ fontSize: "1em" }}
            />
          </div>

          <h1 className="titl">
            Aphones > <span>ALL</span>
          </h1>
        </div>

        <div className="second-content">
          <div className="s1">
            <div className="bx">
              <p>1.29.12</p>
            </div>
          </div>
          <div className="s2">
            <div className="box-aew">
              <FontAwesomeIcon
                icon={faHeadset}
                color="#B9B9BB"
                style={{ fontSize: "1em" }}
              />
              <a
                target="_bank"
                href="https://discord.gg/fqt3nStueJ"
                className="p-d"
              >
                Support
              </a>
            </div>
            <div
              className="download-box a"
              onClick={() => setActiveComponent("apkDownload")}
            >
              <FontAwesomeIcon
                icon={faDownload}
                color="#B9B9BB"
                style={{ fontSize: "1em" }}
              />
              <p className="p-d">Download</p>
            </div>
          </div>
          <div className="s3">
            <div className="profile">
              <img src={avatar} />
            </div>
          </div>
        </div>
      </div>

      <div className={`main-nav ${isActive ? "a" : ""}`}>
        
        <div className="logo">
          <div className="img-content">
            <FontAwesomeIcon
              icon={faLayerGroup}
              color="#B9B9BB"
              style={{ fontSize: 40 }}
            />
          </div>
          <div className="text-content">
            <h1>RYZEON</h1>
          </div>
        </div>

        <div className="nav-items">
          <div
            className="box-oth-d a"
            onClick={() => setActiveComponent("apkDownload")}
          >
            <div className="boxMain-arrow">
              <div className="content">
                <div className="icon">
                  <FontAwesomeIcon
                    icon={faMobileScreen}
                    color="#B9B9BB"
                    style={{ fontSize: "1em" }}
                  />
                </div>
                <p>Aphones</p>
              </div>
            </div>
          </div>

          <div
            className="box-oth-d"
            onClick={() => setActiveComponent("apkDownload")}
          >
            <div className="boxMain-arrow">
              <div className="content">
                <div className="icon">
                  <FontAwesomeIcon
                    icon={faMobileRetro}
                    color="#B9B9BB"
                    style={{ fontSize: "1em" }}
                  />
                </div>
                <p>Registro de Atividades</p>
              </div>
            </div>
          </div>

          <div
            className="box-oth-d"
            onClick={() => setActiveComponent("apkDownload")}
          >
            <div className="boxMain-arrow">
              <div className="content">
                <div className="icon">
                  <FontAwesomeIcon
                    icon={faTriangleExclamation}
                    color="#B9B9BB"
                    style={{ fontSize: "1em", marginLeft: "-3px" }}
                  />
                </div>
                <p>Emergência</p>
              </div>
            </div>
          </div>

          <div
            className="box-oth-d"
            onClick={() => setActiveComponent("information")}
          >
            <div className="boxMain-arrow">
              <div className="content">
                <div className="icon">
                  <FontAwesomeIcon
                    icon={faFile}
                    color="#B9B9BB"
                    style={{ fontSize: "1em" }}
                  />
                </div>
                <p>Aplicativos</p>
              </div>
            </div>
          </div>

          <div
            className="box-oth-d"
            onClick={() => setActiveComponent("information")}
          >
            <div className="boxMain-arrow">
              <div className="content">
                <div className="icon">
                  <FontAwesomeIcon
                    icon={faVideo}
                    color="#B9B9BB"
                    style={{ fontSize: "1em" }}
                  />
                </div>
                <p>VNC</p>
              </div>
            </div>
          </div>

          <div
            className="box-oth-d"
            onClick={() => setActiveComponent("information")}
          >
            <div className="boxMain-arrow">
              <div className="content">
                <div className="icon">
                  <FontAwesomeIcon
                    icon={faWhatsapp}
                    color="#B9B9BB"
                    style={{ fontSize: "1em" }}
                  />
                </div>
                <p>Whatsapp</p>
              </div>
            </div>
          </div>

          <div
            className="box-oth-d"
            onClick={() => setActiveComponent("information")}
          >
            <div className="boxMain-arrow">
              <div className="content">
                <div className="icon">
                  <FontAwesomeIcon
                    icon={faInstagram}
                    color="#B9B9BB"
                    style={{ fontSize: "1em" }}
                  />
                </div>
                <p>Instagram</p>
              </div>
            </div>
          </div>
        </div>

        <div className="nav-items-category">
          <div className="category">
            <p>Server</p>
          </div>

          <div className="main0oth">
            <a
              target="_bank"
              href="https://discord.gg/fqt3nStueJ"
              className="box-oth"
            >
              <div className="boxMain-arrow">
                <div className="content">
                  <div className="icon">
                    <FontAwesomeIcon
                      icon={faDiscord}
                      color="#B9B9BB"
                      style={{ fontSize: "1em" }}
                    />
                  </div>
                  <p>Discord</p>
                </div>
              </div>
            </a>

            <div className="box-oth" style={{ marginTop: 5, marginBottom: 10 }}>
              <div className="boxMain-arrow">
                <div className="content">
                  <div className="icon">
                    <FontAwesomeIcon
                      icon={faCreditCard}
                      color="#B9B9BB"
                      style={{ fontSize: "1em" }}
                    />
                  </div>
                  <p>
                    Plan - <span>{discordRole}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bottom-fixed">
          <div className="box-oth" onClick={handleLogout}>
            <div className="boxMain-arrow">
              <div className="content">
                <div className="icon">
                  <FontAwesomeIcon
                    icon={faArrowRightFromBracket}
                    color="#B9B9BB"
                    style={{ fontSize: "1em" }}
                  />
                </div>
                <p>Logout</p>
              </div>

              <h3>Version: 1.29.12</h3>
            </div>
          </div>
        </div>
      </div>

      <div className={`render-nav ${isActive ? "a" : ""}`}>
        {activeComponent.name === "AphoneDetails" && <AphoneDetails />}
        {activeComponent.name === "apkDownload" && <ApkDownload />}
        {activeComponent.name === "information" && <Information />}
        <div className="b-effect"></div>
        <div className="blur"></div>
      </div>
    </>
  );
}

export default Nav;

// import React, { useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useNavigate } from "react-router-dom";
// import {
//   faLayerGroup,
//   faMobileScreen,
//   faAngleDown,
//   faDownload,
//   faCircleInfo,
//   faArrowRightFromBracket,
//   faCreditCard,
//   faBars,
//   faHeadset,
// } from "@fortawesome/free-solid-svg-icons";
// import { faDiscord } from "@fortawesome/free-brands-svg-icons";
// import "./style.css";
// // import AphoneDetails from "../../screens/AphoneDetails";
// import AphoneDetails from "../../screens/AphoneDetails";
// import ApkDownload from "../../screens/ApkDownload";
// import Information from "../../screens/Information";
// import Aphones from "../../Aphones";

// function Nav() {
//   const [isActive, setIsActive] = useState(false);
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [discordUsername, setDiscordUsername] = useState("");
//   const [discordRole, setDiscordRole] = useState("");
//   const [avatar, setAvatar] = useState("");
//   const [activeComponent, setActiveComponent] = useState({
//     name: "AphoneDetails",
//   });

//   const AphonehandleClick = () => {
//     navigate(`/`);
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.reload();
//   };

//   useEffect(() => {
//     const fetchAndStoreUserData = async () => {
//       const userId = localStorage.getItem("userId");

//       if (!userId) return;

//       try {
//         const response = await fetch(
//           `https://backend-ryzt.onrender.com/user?userId=${userId}`
//         );
//         const data = await response.json();

//         const { email, discordUsername, discordRole, avatar } = data;

//         if (email) {
//           localStorage.setItem("email", email);
//           setEmail(email);
//         }

//         if (discordUsername) {
//           localStorage.setItem("discordUsername", discordUsername);
//           setDiscordUsername(discordUsername);
//         }

//         if (discordRole) {
//           localStorage.setItem("discordRole", discordRole);
//           setDiscordRole(discordRole);
//         }

//         if (avatar) {
//           localStorage.setItem("avatar", avatar);
//           setAvatar(avatar);
//         }
//       } catch (error) {
//         console.error("Erro ao buscar dados do usuário:", error);
//       }
//     };

//     fetchAndStoreUserData();

//     const interval = setInterval(fetchAndStoreUserData, 10000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <>
//       <div className="nav-top">
//         <div className="fst-content">
//           <div
//             className="nav-icon"
//             onClick={() => setIsActive((prev) => !prev)}
//           >
//             <FontAwesomeIcon
//               icon={faBars}
//               color="#101010"
//               style={{ fontSize: "1em" }}
//             />
//           </div>

//           <h1 className="titl">
//             Aphones > <span>ALL</span>
//           </h1>
//         </div>

//         <div className="second-content">
//           <div className="s1">
//             <div className="bx">
//               <p>1.29.12</p>
//             </div>
//           </div>
//           <div className="s2">
//             <div className="box-aew">
//               <FontAwesomeIcon
//                 icon={faHeadset}
//                 color="#B9B9BB"
//                 style={{ fontSize: "1em" }}
//               />
//               <a
//                 target="_bank"
//                 href="https://discord.gg/fqt3nStueJ"
//                 className="p-d"
//               >
//                 Support
//               </a>
//             </div>
//             <div
//               className="download-box a"
//               onClick={() => setActiveComponent("apkDownload")}
//             >
//               <FontAwesomeIcon
//                 icon={faDownload}
//                 color="#B9B9BB"
//                 style={{ fontSize: "1em" }}
//               />
//               <p className="p-d">Download</p>
//             </div>
//           </div>
//           <div className="s3">
//             <div className="profile">
//               <img src={avatar} />
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className={`main-nav ${isActive ? "a" : ""}`}>
//         <div className="logo">
//           <div className="img-content">
//             <FontAwesomeIcon
//               icon={faLayerGroup}
//               color="#B9B9BB"
//               style={{ fontSize: 40 }}
//             />
//           </div>
//           <div className="text-content">
//             <h1>RYZEON</h1>
//           </div>
//         </div>

//         <div className="nav-items">
//           <div className="box-arrow">
//             <div className="boxMain-arrow">
//               <div className="content">
//                 <div className="icon">
//                   <FontAwesomeIcon
//                     icon={faMobileScreen}
//                     color="#B9B9BB"
//                     style={{ fontSize: "1em" }}
//                   />
//                 </div>
//                 <p>Aphones</p>
//               </div>

//               <div className="icon">
//                 <FontAwesomeIcon
//                   icon={faAngleDown}
//                   color="#b9b9bb7d"
//                   style={{ fontSize: "1em" }}
//                 />
//               </div>
//             </div>

//             <div className="boxs">
//               <div className="box a" onClick={() => AphonehandleClick()}>
//                 <p>All</p>
//                 <div className="num">30</div>
//               </div>

//               <div className="box" onClick={() => AphonehandleClick()}>
//                 <p>Online</p>
//                 <div className="num">9</div>
//               </div>

//               <div className="box" onClick={() => AphonehandleClick()}>
//                 <p>Offline</p>
//                 <div className="num">21</div>
//               </div>
//             </div>
//           </div>

//           <div
//             className="box-oth"
//             onClick={() => setActiveComponent("apkDownload")}
//           >
//             <div className="boxMain-arrow">
//               <div className="content">
//                 <div className="icon">
//                   <FontAwesomeIcon
//                     icon={faDownload}
//                     color="#B9B9BB"
//                     style={{ fontSize: "1em" }}
//                   />
//                 </div>
//                 <p>Download</p>
//               </div>
//             </div>
//           </div>

//           <div
//             className="box-oth"
//             onClick={() => setActiveComponent("information")}
//           >
//             <div className="boxMain-arrow">
//               <div className="content">
//                 <div className="icon">
//                   <FontAwesomeIcon
//                     icon={faCircleInfo}
//                     color="#B9B9BB"
//                     style={{ fontSize: "1em" }}
//                   />
//                 </div>
//                 <p>Information</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="nav-items-category">
//           <div className="category">
//             <p>Server</p>
//           </div>

//           <div className="main0oth">
//             <a
//               target="_bank"
//               href="https://discord.gg/fqt3nStueJ"
//               className="box-oth"
//             >
//               <div className="boxMain-arrow">
//                 <div className="content">
//                   <div className="icon">
//                     <FontAwesomeIcon
//                       icon={faDiscord}
//                       color="#B9B9BB"
//                       style={{ fontSize: "1em" }}
//                     />
//                   </div>
//                   <p>Discord</p>
//                 </div>
//               </div>
//             </a>

//             <div className="box-oth" style={{ marginTop: 5, marginBottom: 10 }}>
//               <div className="boxMain-arrow">
//                 <div className="content">
//                   <div className="icon">
//                     <FontAwesomeIcon
//                       icon={faCreditCard}
//                       color="#B9B9BB"
//                       style={{ fontSize: "1em" }}
//                     />
//                   </div>
//                   <p>
//                     Plan - <span>{discordRole}</span>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="bottom-fixed">
//           <div className="profile">
//             <div className="blur"></div>
//             <div className="undo">
//               <img src={avatar} />
//             </div>
//             <div className="img">
//               <img src={avatar} />
//             </div>
//             <div className="text">
//               <h1>{discordUsername}</h1>
//               <p>{email}</p>
//             </div>
//           </div>

//           <div className="box-oth" onClick={handleLogout}>
//             <div className="boxMain-arrow">
//               <div className="content">
//                 <div className="icon">
//                   <FontAwesomeIcon
//                     icon={faArrowRightFromBracket}
//                     color="#B9B9BB"
//                     style={{ fontSize: "1em" }}
//                   />
//                 </div>
//                 <p>Logout</p>
//               </div>

//               <h3>Version: 1.29.12</h3>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className={`render-nav ${isActive ? "a" : ""}`}>
//         {activeComponent.name === "AphoneDetails" && <AphoneDetails />}
//         {activeComponent.name === "apkDownload" && <ApkDownload />}
//         {activeComponent.name === "information" && <Information />}
//         <div className="b-effect"></div>
//         <div className="blur"></div>
//       </div>
//     </>
//   );
// }

// export default Nav;
