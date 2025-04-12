import logo from "./images/aliens/redsmile.png";

import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import "./screens.css";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { generateEncounter, generateEncounter2 } from "./alienframework";
import { SatAnimation } from "./helper";
gsap.registerPlugin(TextPlugin);

export function StartScreen() {
  const fullText = "Kosmomart";
  const [typedText, setTypedText] = useState("");
  const navigate = useNavigate();
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      const timeline = gsap.timeline({ repeat: -1 });

      timeline
        .to(textRef.current, {
          duration: 1,
          text: {
            value: fullText,
            delimiter: "",
          },
          ease: "none",
        })
        .to(textRef.current, {
          duration: 1,
          opacity: 1,
          ease: "power2.inOut",
        })
        .to(textRef.current, {
          duration: 1,
          opacity: 0.7,
          ease: "power2.inOut",
          delay: 1,
        });

      return () => timeline.kill();
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <br />
        <br />
        <button onClick={() => navigate("/second")} id="enterButton">
          <code ref={textRef} className="animated-text"></code>
        </button>
      </header>
    </div>
  );
}

export function SecondScreen() {
  const fullText =
    "Humanity has been ravaged by WW3, and in a last ditch effort to save themselves, they looked to the stars for guidance. They sent you, a fledging astronaut, to find help.\n Unfortunately, you used chatgpt to write your application essay, and thus, no nothing about flying a spaceship or intergalatic diplomacy.\n .";
  const navigate = useNavigate();
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      const timeline = gsap.timeline({ repeat: -1 });

      timeline
        .to(textRef.current, {
          duration: 5,
          text: {
            value: fullText,
            delimiter: "",
          },
          ease: "none",
        })
        .to(textRef.current, {
          duration: 1.5,
          opacity: 1,
          ease: "power2.inOut",
        })
        .to(textRef.current, {
          duration: 2,
          opacity: 0.7,
          ease: "power2.inOut",
          delay: 2,
        });

      return () => timeline.kill();
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <br />
        <button onClick={() => navigate("/tutorial")} id="enterButton">
          <code ref={textRef} className="animated-text"></code>
        </button>
      </header>
    </div>
  );
}

export function TutorialScreen() {
  const titleRef = useRef(null);
  const terminalTextRef = useRef(null);
  const proceedTextRef = useRef(null); // Ref for "PROCEED "
  const qMarkRef = useRef(null); // Ref for "?"
  const navigate = useNavigate(); // Add navigate hook

  useEffect(() => {
    let typingTimeline;
    let blinkTween; // Separate tween for blinking

    if (
      titleRef.current &&
      terminalTextRef.current &&
      proceedTextRef.current &&
      qMarkRef.current
    ) {
      // Animate title
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }
      );

      // Animate terminal text
      gsap.to(terminalTextRef.current, {
        duration: 2,
        text: { value: "TERMINAL READY >> AWAITING COMMANDS", delimiter: "" },
        ease: "steps(30)",
        repeat: -1,
        repeatDelay: 1,
        yoyo: true,
      });

      // Timeline for typing "PROCEED ?"
      typingTimeline = gsap.timeline();
      typingTimeline
        .to(proceedTextRef.current, {
          duration: 1, // Duration for "PROCEED "
          text: { value: "PROCEED", delimiter: "" },
          ease: "steps(8)", // Steps for "PROCEED "
        })
        .to(
          qMarkRef.current,
          {
            duration: 0.2, // Duration for "?"
            text: { value: "‎ ?", delimiter: "" },
            ease: "steps(1)", // Step for "?"
          },
          "-=0.1"
        ) // Start typing "?" slightly before "PROCEED " finishes
        .call(() => {
          // Start blinking after typing is done
          // Ensure qMarkRef.current exists before starting blink
          if (qMarkRef.current) {
            // Set initial opacity to 1 before starting blink
            gsap.set(qMarkRef.current, { opacity: 1 });
            blinkTween = gsap.to(qMarkRef.current, {
              opacity: 0.3,
              duration: 0.3,
              ease: "power1.inOut",
              repeat: -1,
              yoyo: true,
              repeatDelay: 0.2, // Add a short delay between blinks
            });
          }
        });
    }

    // Cleanup function
    return () => {
      if (typingTimeline) {
        typingTimeline.kill();
      }
      if (blinkTween) {
        blinkTween.kill(); // Kill the specific blink tween
      }
      // Kill other animations if necessary
      gsap.killTweensOf(titleRef.current);
      gsap.killTweensOf(terminalTextRef.current);
      // No need to kill tweens of proceedTextRef if they are part of the killed timeline
    };
  }, []);

  

  return (
    <div className="App">
      <header className="App-header">
        <SatAnimation />
        <h2 id="titleCss" ref={titleRef}>
          Mission Control
        </h2>
        <p>
          <code ref={terminalTextRef} className="terminal-text"></code>
        </p>
        <button
          id="happyButton"
          onClick={() => navigate("/encounter")} // Updated navigation
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 0,
            outline: "none",
            // Use inline-flex to keep elements on the same line
            display: "inline-flex",
            alignItems: "baseline", // Align text baselines if needed
          }}
        >
          <span>
            <code ref={proceedTextRef} className="button-text"></code>
            <code
              ref={qMarkRef}
              className="button-text button-qmark"
            ></code>{" "}
            {/* Add specific class */}
          </span>
        </button>
      </header>
    </div>
  );
}

// Add EncounterScreen placeholder if it doesn't exist
export function EncounterScreen() {
  // Placeholder content for the next screen
  const navigate = useNavigate();
  return (
    <div className="App">
      <header className="App-header">
        <h2>
          A {generateEncounter2().replace("_", " ") + " "} 
           stops a few meters from your viewport.
        </h2>{" "}
        {/* Add encounter logic here */}
      </header>
      <button
          id="happyButton"
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 0,
            outline: "none",
            // Use inline-flex to keep elements on the same line
            display: "inline-flex",
            alignItems: "baseline", // Align text baselines if needed
          }}
        ></button>
    </div>
  );
}
