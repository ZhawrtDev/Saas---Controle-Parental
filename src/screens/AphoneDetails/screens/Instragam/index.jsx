import React from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

function Whatssap() {
  return (
    <div className="main-Whatsapp">
      <div className="nav-lateral">
        <div className="nav-top-w">
          <h1>Instragam</h1>

          <div className="icon">
            <FontAwesomeIcon
              icon={faChevronDown}
              color="#B9B9BB"
              style={{ fontSize: "1em" }}
            />
          </div>
        </div>
        <div className="search-main">
          <div className="search">
            <div className="icon">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                color="#b9b9bb8b"
                style={{ fontSize: "1em" }}
              />
            </div>
            <input type="text" placeholder="John Doe.." />
          </div>
        </div>

        <div className="people-main">
          <div className="box">
            <div className="people">
              <div className="img">
                <img src="https://cdn.discordapp.com/avatars/1304750291169579039/1ea1d7b13969435fd0b2c43b9032a564.png?size=512" />
              </div>
              <div className="text">
                <h1>John Doe</h1>
                <p className="mesage">Hahahah oh man why you make that?</p>
              </div>
              <div className="oth">
                <p className="time">05:14 PM</p>
              </div>
            </div>
          </div>

           <div className="box">
            <div className="people">
              <div className="img">
                <img src="https://cdn.discordapp.com/avatars/1304750291169579039/1ea1d7b13969435fd0b2c43b9032a564.png?size=512" />
              </div>
              <div className="text">
                <h1>John Doe</h1>
                <p className="mesage">Hahahah oh man why you make that?</p>
              </div>
              <div className="oth">
                <p className="time">05:14 PM</p>
              </div>
            </div>
          </div>

           <div className="box">
            <div className="people">
              <div className="img">
                <img src="https://cdn.discordapp.com/avatars/1304750291169579039/1ea1d7b13969435fd0b2c43b9032a564.png?size=512" />
              </div>
              <div className="text">
                <h1>John Doe</h1>
                <p className="mesage">Hahahah oh man why you make that?</p>
              </div>
              <div className="oth">
                <p className="time">05:14 PM</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      <div className="people-mensages">
        <div className="nav-top-mesage">
          <div className="profile">
            <div className="img">
              <img src="https://cdn.discordapp.com/avatars/1304750291169579039/1ea1d7b13969435fd0b2c43b9032a564.png?size=512" />
            </div>
            <h1>John Doe</h1>
          </div>
        </div>

        <div className="mensagens">
          <div className="me">
            <div className="msg">
              <p>Hi how are you?</p>
              <div className="time">
                <h4>13:55</h4>
              </div>
            </div>
          </div>

          <div className="you">
            <div className="msg">
              <p>i'm good and you?</p>
              <div className="time">
                <h4>13:55</h4>
              </div>
            </div>
          </div>

          <div className="me">
            <div className="msg">
              <p>bro this is just a simulation</p>
              <div className="time">
                <h4>13:55</h4>
              </div>
            </div>
          </div>

          <div className="you">
            <div className="msg">
              <p>0x80070017</p>
              <div className="time">
                <h4>13:55</h4>
              </div>
            </div>
          </div>

          <div className="you">
            <div className="msg">
              <img src="https://res.cloudinary.com/dyxzyy2wj/image/upload/v1754837690/3e9050f3589a5277/1754837689377.jpg" />
              <div className="time">
                <h4>13:55</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Whatssap;