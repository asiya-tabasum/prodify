import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Typewriter from "typewriter-effect";
import "@/pages/styles/Title.css";

const Title = () => {
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
