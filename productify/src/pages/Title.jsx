import React,{useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Typewriter from "typewriter-effect";
import "@/pages/styles/Title.css";

const Title = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    const timer=setTimeout(()=>{
      navigate("/home")
    },5000);
    return ()=>clearTimeout(timer)
  },[navigate])

  return (
    <div className="container">
      <div className="lottie">
        <DotLottieReact
          src="https://lottie.host/de121427-197e-47e7-9e03-162d26f586a5/LS3DmuecGQ.lottie"
          loop
          autoplay
        />
      </div>
      <h1
        className="title">
        Prodify
      </h1>
        <div className="tagline">
        <Typewriter
          options={{
            strings: ["Simplifying Product Management"],
            autoStart: true,
            loop: true,
            delay: 30,
          }}
        />
      </div>
    </div>
  );
};

export default Title;
