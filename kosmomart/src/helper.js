import satframe1 from "./images/satframe1.png";
import satframe2 from "./images/satframe2.png";
import satframe3 from "./images/satframe3.png";
import { useEffect, useState } from "react";

export function SatAnimation(){
    const images = [satframe1, satframe2, satframe3];
    const [satAnimIndex, setSatAnimIndex] = useState(0);
    useEffect(()=>{
      const interval = setInterval(() => {
        setSatAnimIndex((prevIndex) => (prevIndex + 1) % 3);
      }, 1000);
      return () => clearInterval(interval);
    })

    return(
      <img src={images[satAnimIndex]} alt="satellite" id="satImage" />
    )
  }