// import React, { useEffect } from "react";
// import { ParticleSystem } from "../utils/animations";

// export default function BackgroundParticles() {
//   useEffect(() => {
//     // Small delay ensures the 'particles' div below is in the DOM
//     const timer = setTimeout(() => {
//       new ParticleSystem();
//     }, 50);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div 
//       id="particles" 
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100vw",
//         height: "100vh",
//         pointerEvents: "none",
//         zIndex: 0
//       }}
//     />
//   );
// }