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
import { generateEncounter} from "./alienframework";
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
  const sentences = [
    "Humanity has been ravaged by WW3, and in a last ditch effort to save themselves, they looked to the stars for guidance.",
    "They sent you, a fledgling astronaut, to find help.",
    "Unfortunately, you used chatgpt to write your application essay, and thus, know nothing about flying a spaceship or intergalactic diplomacy.",
    "With no fuel in the tank, and no money in your pocket, you land at the most famous crossroads in all of space: The KosmoMart convenience store."
  ];

  const navigate = useNavigate();
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      const tl = gsap.timeline({ repeat: -1 });

      sentences.forEach((sentence) => {
        tl.to(textRef.current, {
          duration: sentence.length * 0.03,
          text: { value: sentence, delimiter: "" },
          ease: "none",
        })
        .to(textRef.current, {
          duration: 1,
          delay: 0.5,
        })
        .to(textRef.current, {
          duration: sentence.length * 0.015,
          text: { value: "", delimiter: "" },
          ease: "none"
        });
      });

      return () => tl.kill();
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

     
      // Timeline for typing "PROCEED ?"
      typingTimeline = gsap.timeline();
      typingTimeline
      .to(terminalTextRef.current, {
        duration: 4,
        text: { value: "TERMINAL READY >> INITIATING LINK ", delimiter: "" },
        ease: "steps(40)",
      })
      .to(terminalTextRef.current, {
        duration: 2,
        text: { value: "", delimiter: "" },
        ease: "steps(30)",
        delay: 2,
      })
      .to(terminalTextRef.current, {
        duration: 7,
        text: { value: " \nP1L0T come in...The following debrief has been cleared for comms. ", delimiter: "" },
        ease: "steps(40)",
 
    
      })
      .to(terminalTextRef.current, {
        duration: 2,
        text: { value: "", delimiter: "" },
        ease: "steps(30)",
        delay: 2,
      })
      .to(terminalTextRef.current, {
        duration: 4,
        text: { value: "Upon traveling the stars, you will encounter alien species. Due to your helmet's translation limitations, alien names will be simplified into potential nonsensical english.", delimiter: "" },
        ease: "steps(30)",

      })
      .to(terminalTextRef.current, {
        duration: 2,
        text: { value: "", delimiter: "" },
        ease: "steps(30)",
        delay: 4,
      })
      .to(terminalTextRef.current, {
        duration: 4,
        text: { value: "Additionally, your helmet does not contain human to extraterrestial translation. There are other ways to communicate.", delimiter: "" },
        ease: "steps(30)",
      })
      .to(terminalTextRef.current, {
        duration: 2,
        text: { value:  "", delimiter: "" },
        ease: "steps(30)",
        delay: 3,
      })
      .to(terminalTextRef.current, {
        duration: 4,
        text: { value: "Remember, P1L0T, complete the mission. At all costs.", delimiter: "" },
        ease: "steps(30)",
        repeat: -1,
        repeatDelay: 10,
      })



      
      
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
        <br />
        <br />
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

export function EncounterScreen() {
  const navigate = useNavigate();
  const alienName = generateEncounter().replace("_", " ") + " ";

  return (
    <div className="App">
      <header className="App-header">
        <h2>
          A {alienName}stops a few meters from your viewport.
        </h2>
        <br />
        <button
          onClick={() => navigate("/game")}
          style={{
            background: "transparent",
            border: "none",
            color: "inherit",
            fontSize: "1.1rem",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          <code className="animated-text">Continue</code>
        </button>
      </header>
    </div>
  );
}

export function GameScreen() {
  // Placeholder content for the next screen
  const navigate = useNavigate();
  return (
    <div className="App">
      <header className="App-header">
        <h2>
          A {generateEncounter().replace("_", " ") + " "} 
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
