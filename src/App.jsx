import { Canvas } from "@react-three/fiber";
import "./App.css";
import Scene from "./components/Scene";
// import { Perf } from "r3f-perf";
import Header from "./components/Header";

function App() {
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
