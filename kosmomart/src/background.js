import React, { useEffect, useRef } from "react";

const StarryBackground = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };
    window.addEventListener("resize", handleResize);

    const stars = [];
    const numStars = 150;

    function initStars() {
      stars.length = 0;
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.5 + 0.5,
          speed: Math.random() * 0.5 + 0.2,
        });
      }
    }

    initStars();

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // transparent clear
      for (let star of stars) {
        star.y += star.speed;
        if (star.y > height) {
          star.y = 0;
          star.x = Math.random() * width;
        }
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)"; 
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        backgroundColor: "#282c34",
        pointerEvents: "none", // allows clicks to pass through
      }}
    />
  );
};

export default StarryBackground;