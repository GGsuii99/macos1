import { Canvas } from "@react-three/fiber";
import "./App.css";
import Scene from "./components/Scene";
// import { Perf } from "r3f-perf";
import Header from "./components/Header";
import { useEffect } from "react";
import { useMacintosh } from "./components/Macintosh";

function App() {
  const audio = new Audio("/audio/macstartup.wav");
  const selected = useMacintosh((state) => state.selected);
  useEffect(() => {
    let timer;
    if (selected === "os") {
      timer = setTimeout(() => {
        audio.play();
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [selected]);
  return (
    <div className="App__container">
      <Header />
      <Canvas
        camera={{
          fov: 50,
        }}
        style={{
          position: "fixed",
          top: 0,
        }}
      >
        {/* <Perf /> */}
        <Scene />
      </Canvas>
    </div>
  );
}

export default App;
