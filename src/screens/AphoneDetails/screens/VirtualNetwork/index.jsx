import { useEffect, useRef, useState } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faEye,
  faHandPointUp,
  faMobile,
  faMicrophone,
  faCamera,
  faCameraRotate,
  faStop,
  faLock,

  // FALTA UNLOCK
} from "@fortawesome/free-solid-svg-icons";
// import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

function VirtualNetwork() {
  const canvasRef = useRef(null);
  const [ws, setWs] = useState(null);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [isTapEnabled, setIsTapEnabled] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const _id = params.get("id");
    setId(_id);
  }, []);

  useEffect(() => {
    if (!id) return;

    const socket = new WebSocket(`wss://ws-ryzt.onrender.com/${id}`);
    socket.binaryType = "blob";
    setWs(socket);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    socket.onmessage = (event) => {
      if (typeof event.data === "string") return;
      const blob = new Blob([event.data], { type: "image/jpeg" });
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(img.src);
      };
      img.src = URL.createObjectURL(blob);
    };

    const handleCanvasClick = (e) => {
      if (!isTapEnabled || ws.readyState !== WebSocket.OPEN) return;
      const rect = canvas.getBoundingClientRect();
      const tx = (e.clientX - rect.left) / rect.width;
      const ty = (e.clientY - rect.top) / rect.height;
      const realX = Math.round(tx * 1080);
      const realY = Math.round(ty * 1920);

      ws.send(
        JSON.stringify({
          type: "tap",
          x: realX,
          y: realY,
          id,
        })
      );
      console.log("Enviado tap ->", realX, realY);
    };

    canvas.addEventListener("click", handleCanvasClick);

    return () => {
      canvas.removeEventListener("click", handleCanvasClick);
      socket.close();
    };
  }, [id, isTapEnabled]);

  const handleStart = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: "transmission", id, transmission: true }));
      setIsTransmitting(true);
    }
  };

  const handleStop = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({ type: "transmission", id, transmission: false })
      );
      setIsTransmitting(false);
    }
  };

  const toggleTap = () => {
    setIsTapEnabled((prev) => !prev);
  };

  return (
    <>
      <div className="text-main-aa">
        <p>
          VNC (Virtual Network Computing) It allows remote access and control of
          another computer over a network connection. It is widely used for
          technical support, system administration, and remote access, offering
          convenience and security by enabling users to interact with the
          graphical interface of another device as if they were physically
          present.
        </p>
      </div>
      <div className="main-vnc">
        <div className="box-vnh">
          <div className="vnc-controls">
            <div className="text">
              <h1>VNC CONTROLS</h1>
            </div>

            <div className="box-actions">
              <div className="warn">
                <FontAwesomeIcon
                  icon={faMobile}
                  color="#B9B9BB"
                  style={{ fontSize: "1em", marginLeft: 10 }}
                />
                <h1>SCREEN</h1>
              </div>
              <div className="funcs">
                {!isTransmitting ? (
                  <div className="action" onClick={handleStart}>
                    <FontAwesomeIcon
                      icon={faPlay}
                      color="#B9B9BB"
                      style={{ fontSize: "1em" }}
                    />
                    <p>Start</p>
                  </div>
                ) : (
                  <div className="action a" onClick={handleStop}>
                    <FontAwesomeIcon
                      icon={faStop}
                      color="#B9B9BB"
                      style={{ fontSize: "1em" }}
                    />
                    <p>Stop</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="vnc-view">
            <div className="text">
              <h1>VNC VIEWPORT</h1>
            </div>

            <div className="vncs">
              <div className="aphone">
                <p>
                  no screen information (permission denied or device offline or
                  service not even activated)
                </p>

                <canvas
                  ref={canvasRef}
                  id="screen"
                  width="400"
                  height="700"
                  style={{
                    maxWidth: "720px",
                    maxHeight: "1280px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VirtualNetwork;