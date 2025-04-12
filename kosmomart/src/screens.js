import red from "./images/aliens/redsmile.png";
import abstract from "./images/aliens/abstract.png";
import cuboid from "./images/aliens/cuboid.png";
import maw from "./images/aliens/maw.png";
import starsmile from "./images/aliens/starsmile.png";
import triocular from "./images/aliens/triocular.png";
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
import { generateEmotions} from "./alienframework";
// Ensure resetConversation is imported if needed elsewhere, but not called on every load
import { fetchReply, resetConversation } from "./ai";
// import {fetch}
import { SatAnimation } from "./helper";
import StarryBackground from "./background.js" // Removed {starryBackground} named import
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
    <>
    <StarryBackground />
    <div id='gameBody'>
    <div className="App">
      <header className="App-header">
        <img src={red} className="App-logo" alt="logo" />
        <br />
        <br />
        <button onClick={() => navigate("/second")} id="enterButton">
          <code ref={textRef} className="animated-text"></code>
        </button>
      </header>
    </div>
    </div>
    </>
  );
}

export function SecondScreen() {
  const sentences = [
    "Humanity has been ravaged by WW3, and in a last ditch effort to save themselves, they looked to the stars for guidance.",
    "They sent you, a fledgling astronaut, to find help.",
    "Unfortunately, you used chatgpt to write your application essay, and thus, know nothing about flying a spaceship or intergalactic diplomacy.",
    "With no fuel in the tank, you land at the most famous crossroads in all of space: The KosmoMart convenience store."
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
          delay: 2,
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
    <>
    <StarryBackground />
    <div id='gameBody'>
    <div className="App">
      <header className="App-header">
        <img src={red} className="App-logo" alt="logo" />
        <br />
        <button onClick={() => navigate("/tutorial")} id="enterButton">
          <code ref={textRef} className="animated-text"></code>
        </button>
      </header>
    </div>
    </div>
    </>
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
    <>
    <StarryBackground />
    <div id='gameBody'>
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
    </div>
    </>
  );
}
var numberOfAliens = 0;

export function EncounterScreen() {
  const navigate = useNavigate();
  function navToGame(){
    navigate("/game")
    numberOfAliens++
  }
  function randomEncounterText(){
    const texts = [
      "A ship lands on the station.",
      "You notice a creature walk out of KosmoMart.",
      "Space splits open with a low, guttural hum..",
      "A ship touches down with a light thud.",
      "A ship descends through thin atmosphere.",
      "Dust clouds swirl around a ship, as it lands.",
      "A ship brakes at high speeds, kicking up space dust as it lands.",
      "A vessel aligns with the landing zone.",
      "Navigation lights blink against the dusk as a ship lands.",
      "A craft levels out before contact with the ground."
    ];
    return texts[Math.floor(Math.random() * texts.length)];
  }

  return (
    <>
    <StarryBackground />
    <div id='gameBody'>
    <div className="App">
      <header className="App-header">
        <h2>
          {randomEncounterText()}
        </h2>
        <br />
        <button
          onClick={() => navToGame()}
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
    </div>
    </>
  );
}
var responseCount = 0;

export function GameScreen() {
  const navigate = useNavigate();
  // Generate alien details once per component mount
  const [alienDetails, setAlienDetails] = useState(() => generateEncounter());
  const alienName = alienDetails.name.replace("_", " ") + " ";
  const [alienDialogue, setAlienDialogue] = useState("..."); // Keep for potential loading state
  const [responses, setResponses] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const chatHistoryRef = useRef(null); // Ref for scrolling chat history
  const alienImages = [abstract, cuboid, maw, red, starsmile, triocular];
  // Select and set alien image once per mount
  const [currentAlienImage] = useState(() => alienImages[Math.floor(Math.random() * alienImages.length)]);
  const [emotions, setEmotions] = useState([]); // State for emotions

  
  // Function to scroll chat history to the bottom
  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [chatHistory]); // Run whenever chatHistory changes

  useEffect(() => {
    // Define the system prompt containing the core instructions for the AI
  
    const systemPrompt = `You are an alien with the following emotions ${alienDetails.emotions}. You have the following tone: ${alienDetails.tone}, so speak in that way. Act like you are speaking to them or making an action towards them, and discard all other parts of your response. Do not break character under any circumstance. Contextualize to the best of your ability. Remember not to respond like you are narrating your own thoughts, so don't respond like 'I approach cautiously', etc. Respond in 1 to 2 sentences. Don't use any emojis. You should talk like a normal human being, and not refer to yourself as you. Simply say what a regular person would say. Say your trust level from 0 to 1 with 0 as low. Avoid talking only about the human's emotion. Also, don't describe yourself in intricate detail randomly. Do this for every response following this.`;

    // Define the initial user message to kick off the conversation
    const initialUserMessage = "You encounter another being upon landing. What is your initial reaction?";

    // Clear local history and add a system message indicating the start/continuation
    setChatHistory([{ sender: 'system', content: `Encountering ${alienName}` }]);
    setAlienDialogue("Connecting..."); // Initial loading state

    // Fetch the first response from the backend, providing both the initial user message
    // and the system prompt containing the AI's instructions.
    // The backend uses the session cookie to manage the conversation state.
    fetchReply(initialUserMessage, systemPrompt) // Pass systemPrompt here
      .then(reply => {
        setAlienDialogue(reply); // Update dialogue state (optional now)
        // Add alien's response to chat history
        setChatHistory(prev => [...prev, { sender: 'alien', content: reply }]);
        // Generate initial emotion response options
        setResponses(generateEmotionResponses());
      })
      .catch(error => {
        console.error("Error initializing/continuing conversation:", error);
        setAlienDialogue("*The alien seems unresponsive due to a connection issue.*");
        setChatHistory(prev => [...prev, { sender: 'system', content: "Error connecting to alien translator." }]);
        // Still provide fallback responses
        setResponses(generateEmotionResponses());
      });

   
    return () => {
     
    };

  }, []); 

  const generateEmotionResponses = () => {
    return generateEmotions(6);
  };

  const concatEmotionResponses = (responses) => {
    setEmotions(prev => [...prev, responses + " "]);
  }

  function clearEmotions(){
    setEmotions([]);
  }
  // Handle player response selection (updated error handling and state updates)
  const handleResponseSelect = (response) => {
    clearEmotions()
    responseCount++
      
    const playerMessage = { sender: 'player', content: response };
    setChatHistory(prev => [...prev, playerMessage]);
    setAlienDialogue("..."); 
    setResponses([]); 

    // Send the response to the AI backend.
    // No need to send the system prompt again, the backend should retain it in the session history.
    fetchReply(response) // Only send the user message here
      .then(reply => {
        setAlienDialogue(reply); // Update dialogue state (optional)
        // Add alien response to chat history
        const alienMessage = { sender: 'alien', content: reply };
        setChatHistory(prev => [...prev, alienMessage]);
        // Generate new emotion responses
        setResponses(generateEmotionResponses());
      })
      .catch(error => {
        console.error("Error getting AI response:", error);
        setAlienDialogue("*The alien looks confused due to a translation error.*");
        // Add error message to chat history
        setChatHistory(prev => [...prev, { sender: 'system', content: "Translation error." }]);
        // Re-enable responses even on error
        setResponses(generateEmotionResponses());
      });
      if(responseCount > 3){
        if(numberOfAliens > 3){
          navigate("/end")
        }else{
        navigate("/encounter")
        setAlienDetails(generateEncounter())
        responseCount = 0;
      }
    }
  };

  return (
    <>
    <StarryBackground />
    <div id='gameBody' >
      <div className="App">
        <header className="App-header">
          <img src={currentAlienImage} alt="Alien" style={{ height: '180px', marginBottom: '1rem', borderRadius: '50%' }} />
          <h3 style={{ marginBottom: '0.5rem' }}>
            {alienName}
          </h3>

    
          <div
            ref={chatHistoryRef} 
            style={{
              height: '300px',
              overflowY: 'auto',
              width: '80%',
              maxWidth: '600px', 
              marginBottom: '1.5rem', 
              padding: '1rem', 
              backgroundColor: 'rgba(0,0,0,0.4)',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.2)',
              display: 'flex',
              flexDirection: 'column', 
              gap: '0.5rem' 
            }}
          >
            {/* Map through chat history */}
            {chatHistory.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  textAlign: msg.sender === 'player' ? 'right' : 'left',
                  padding: '0.6rem 0.9rem', // Adjusted padding
                  backgroundColor: msg.sender === 'system'
                    ? 'rgba(120, 120, 120, 0.5)' // System message color
                    : (msg.sender === 'player' ? 'rgba(70, 130, 190, 0.7)' : 'rgba(190, 130, 70, 0.7)'), // Player/Alien colors
                  borderRadius: '10px', // More rounded corners
                  fontSize: msg.sender === 'system' ? '0.9rem' : '1rem',
                  fontStyle: msg.sender === 'system' ? 'italic' : 'normal',
                  color: msg.sender === 'system' ? '#ccc' : 'white', // System text color
                  alignSelf: msg.sender === 'player' ? 'flex-end' : 'flex-start',
                  maxWidth: '75%', // Prevent messages from taking full width
                  wordWrap: 'break-word' // Ensure long words break
                }}
              >
                {msg.content}
              </div>
            ))}
             {/* Display loading indicator if alienDialogue is '...' */}
             {alienDialogue === "..." && (
                <div style={{ fontStyle: 'italic', color: '#aaa', alignSelf: 'center', padding: '0.5rem' }}>Alien is thinking...</div>
             )}
          </div>
             <div id="emotionDisplay">
              {emotions}
             </div>
             <br></br>
             <br></br>
          {/* Emotion response options - improved styling */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", flexDirection: "row", gap: "0.8rem", width: "70%", maxWidth: '500px' }}>
            {responses.map((response, index) => (
              <button
                key={index}
                onClick={() => concatEmotionResponses(response)}
                disabled={responses.length === 0} // Disable if no responses (loading)
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.6)",
                  borderRadius: "8px",
                  color: "white",
                  padding: "0.8rem 1rem", // Slightly larger padding
                  fontSize: "1rem",
                  cursor: responses.length === 0 ? 'not-allowed' : 'pointer',
                  transition: "background-color 0.2s ease, border-color 0.2s ease",
                  textAlign: 'center',
                  opacity: responses.length === 0 ? 0.6 : 1 // Dim button when disabled
                }}
                onMouseEnter={(e) => { if (responses.length > 0) e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)"; }}
                onMouseLeave={(e) => { if (responses.length > 0) e.target.style.backgroundColor = "rgba(255, 255, 255, 0.08)"; }}
              >
                {response}
              </button>
            ))}
           
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", flexDirection: "row", gap: "0.5rem", width: "90%", maxWidth: '700px' }}>
          <button
          onClick ={() =>  handleResponseSelect(emotions)}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.6)",
            borderRadius: "8px",
            color: "white",
            padding: "0.8rem 2rem", // Slightly larger padding
            margin: "1rem",
            fontSize: "1rem",
            cursor: responses.length === 0 ? 'not-allowed' : 'pointer',
            transition: "background-color 0.2s ease, border-color 0.2s ease",
            textAlign: 'center',
            opacity: responses.length === 0 ? 0.6 : 1
          }}
          >Transmit Emotions</button>
          <button
          onClick ={() => clearEmotions() }
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.6)",
            borderRadius: "8px",
            color: "white",
            padding: "0.8rem 2rem", // Slightly larger padding
            margin: "1rem",
            fontSize: "1rem",
            cursor: responses.length === 0 ? 'not-allowed' : 'pointer',
            transition: "background-color 0.2s ease, border-color 0.2s ease",
            textAlign: 'center',
            opacity: responses.length === 0 ? 0.6 : 1
          }}
          >Clear Emotions</button>
          </div>
          {/* Navigation button */}
          <button
            onClick={() => navigate("/")} // Consider if resetConversation should be called here
            style={{
              marginTop: "2rem",
              backgroundColor: "transparent",
              border: "1px solid white",
              borderRadius: "8px",
              color: "white",
              padding: "0.6rem 0.8rem", // Adjusted padding
              fontSize: "0.9rem",
              cursor: 'pointer'
            }}
          >
            Return to Ship
          </button>
        </header>
      </div>
    </div>
    </>
  );
}

export function EndScreen() {
  const navigate = useNavigate();

  return (
    <>
    <StarryBackground />
    <div id='gameBody'>
    <div className="App">
      <header className="App-header">
        <h2>
          {}
        </h2>
        <br />
        <button
          onClick={() => navigate("/")}
          style={{
            background: "transparent",
            border: "none",
            color: "inherit",
            fontSize: "1.1rem",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          <code className="animated-text">Try Again</code>
        </button>
      </header>
    </div>
    </div>
    </>
  );
}