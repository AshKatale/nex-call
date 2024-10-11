import React from "react";
import "../App.css";
import myImage from "../assets/logo.png";
import myImage2 from "../assets/video-call.svg";
import { Link, useNavigate } from "react-router-dom";

export default function LandingPage() {

  const router = useNavigate();

  return (
    /* From Uiverse.io by jeremyssocial */
    <div className="landingPageContainer">
      <nav>
        <div className="navHeader" style={{ display: "flex" }}>
          <img style={{ width: 95 }} src={myImage}></img>
          <h2 className="outfit-regular">NexCall</h2>
        </div>
        <div className="navList">
          <p onClick={()=>{
            router('/juahgsd123')
          }}>Join as Guest</p>
          <p onClick={()=>{router('/auth')}}>Register</p>
          <div onClick={()=>{router('/auth')}} role="button">Login</div>
        </div>
      </nav>
      <div className="mainContainer outfit-regular">
        <div style={{ marginTop: -90 }}>
          <h2>
            <span style={{ color: "#abcaf5" }}>Strengthening Connections,</span>{" "}
          </h2>
          <h2>Bridging Distances</h2>
          <p style={{ fontSize: 26, paddingBottom: 10 }}>
            Get Connected by NexCall
          </p>
          <div
            style={{
              backgroundColor: "#e6ecf5",
              width: "fit-content",
              padding: 8,
              borderRadius: 20,
              fontSize: 18,
              marginTop:10
            }}
            role="button"
          >
            <Link style={{color:'black'}} to={"/auth"}>Get Started</Link>
          </div>
        </div>
        <div>
          <img style={{ width: 550, marginRight: 10 }} src={myImage2}></img>
        </div>
      </div>
    </div>
  );
}
