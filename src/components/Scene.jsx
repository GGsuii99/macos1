import { Suspense } from "react";
import { Environment, Html, useProgress } from "@react-three/drei";
import Macintosh, { useMacintosh } from "./Macintosh";

import {
  EffectComposer,
  Outline,
  Selection,
} from "@react-three/postprocessing";

function Scene() {
  const selected = useMacintosh((state) => state.selected);
  const progress = useProgress((state) => state.progress);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={0.8} />

      <Suspense
        fallback={
          <Html center>
            <div
              className="standard-dialog center scale-down window-pane"
              style={{
                width: "30rem",
                textAlign: "center",
              }}
            >
              <h1 className="dialog-text">
                The Macintosh Simulator, Version 1.0 (18 Jan 84)
              </h1>
              <p className="dialog-text">
                This is a simulation of the Macintosh computer. It is not a real
                Macintosh, but it is a very good simulation. It is intended to
                be used as a training tool for people who are learning to use
                the Macintosh.
              </p>
              <h1 className="dialog-text center">
                Loading {Math.floor(progress)}%
              </h1>
            </div>
          </Html>
        }
      >
        <Macintosh />

        <Environment preset="apartment" />
        <Selection enabled={selected === "all"}>
          <EffectComposer multisampling={0} autoClear={false}>
            <Outline
              visibleEdgeColor="red"
              hiddenEdgeColor="red"
              blur
              edgeStrength={100}
            />
          </EffectComposer>
          <Macintosh />
        </Selection>
      </Suspense>
    </>
  );
}

export default Scene;
