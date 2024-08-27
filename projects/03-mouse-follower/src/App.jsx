import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.log("efecto ", { enabled });

    const handleMove = (event) => {
      const { clientX, clientY } = event;
      console.log("handleMove ", { clientX, clientY });
      setPosition({ x: clientX, y: clientY });
    };

    if (enabled) {
      window.addEventListener("pointermove", handleMove);
    }

    // cleanup se ejecuta:
    // -> cuando el componente se desmonta
    // -> cuando cambian las dependencias, antes de ejecutar
    // el efecto nuevamente
    return () => {
      console.log("cleanup");
      window.removeEventListener("pointermove", handleMove);
    };
  }, [enabled]);

  return (
    <>
      <div
        style={{
          position: "absolute",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          border: "1px solid #fff",
          borderRadius: "50%",
          opacity: 0.8,
          pointerEvents: "none",
          left: -25,
          top: -25,
          width: 50,
          height: 50,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      ></div>
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? "Desactivar" : "Activar"} seguir puntero
      </button>
    </>
  );
};
function App() {
  const [mounted, setMounted] = useState(true);

  return (
    <main>
      <FollowMouse />
    </main>
  );
}

//para desplegar la aplicacion en produccion ejecutar:
// npm run build
//luego copiar la carpet /dist con todos sus fichero en el sitio https://app.netlify.com/drop 

export default App;
