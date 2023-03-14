import { useState, useRef, useCallback, useEffect } from "react";
import { useGLTF, Html } from "@react-three/drei";
import { Select } from "@react-three/postprocessing";
import { useFrame, useThree } from "@react-three/fiber";
import { MathUtils, Vector3, MeshBasicMaterial } from "three";
import { create } from "zustand";
import Window from "./Window";
import Alert from "./Alert";

const TRANSITIONS = {
  mouse: new Vector3(2.5, -5.5, 5),
  keyboard: new Vector3(0, -6.5, 8),
  mac: new Vector3(-3, 0, 12),
  os: new Vector3(0, 1, 5),
};

const blackBasicMaterial = new MeshBasicMaterial({ color: "black" });

export const useMacintosh = create(() => ({
  selected: "all",
}));

function Macintosh() {
  const { nodes, materials } = useGLTF("/models/macintosh.glb");
  const [mouseHover, setMouseHover] = useState(false);
  const [keyboardHover, setKeyboardHover] = useState(false);
  const [macHover, setMacHover] = useState(false);
  const selected = useMacintosh((state) => state.selected);

  const { camera, mouse } = useThree();

  const sceneRef = useRef();

  const handleHover = useCallback((setHover, value) => {
    setHover(value);
    document.body.style.cursor = value ? "pointer" : "auto";
  }, []);

  const handleSelect = useCallback((value) => {
    useMacintosh.setState({ selected: value });
  }, []);

  useFrame(({ clock }) => {
    if (selected === "all") {
      if (camera.position !== [0, 0, 15]) {
        camera.position.x = MathUtils.lerp(camera.position.x, 0, 0.1);
        camera.position.y = MathUtils.lerp(camera.position.y, 0, 0.1);
        camera.position.z = MathUtils.lerp(camera.position.z, 15, 0.1);
      }
      sceneRef.current.rotation.y = MathUtils.lerp(
        sceneRef.current.rotation.y,
        mouse.x * 0.5 + Math.PI,
        0.1
      );
      sceneRef.current.rotation.x = MathUtils.lerp(
        sceneRef.current.rotation.x,
        -mouse.y * 0.5,
        0.1
      );
    }

    if (selected === "mouse") {
      camera.position.lerp(TRANSITIONS.mouse, 0.1);
    }

    if (selected === "keyboard") {
      camera.position.lerp(TRANSITIONS.keyboard, 0.1);
    }

    if (selected === "mac") {
      camera.position.lerp(TRANSITIONS.mac, 0.1);
      sceneRef.current.rotation.y = clock.getElapsedTime() % (Math.PI * 2);
    }

    if (selected === "os") {
      camera.position.lerp(TRANSITIONS.os, 0.1);
      sceneRef.current.rotation.y = MathUtils.lerp(
        sceneRef.current.rotation.y,
        Math.PI,
        0.1
      );
    }
  });

  useEffect(() => {
    let listener = null;

    if (selected === "mac") {
      sceneRef.current.rotation.set(0, Math.PI, 0);
    } else if (selected === "os") {
      // if OS is selected, don't rotate the scene
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          useMacintosh.setState({ selected: "mac" });
        }
      });
    } else if (selected !== "all") {
      sceneRef.current.rotation.set(1.3, Math.PI, 0);
    } else {
      sceneRef.current.rotation.set(0, Math.PI, 0);
    }

    return () => {
      if (listener) {
        document.removeEventListener("keydown", listener);
      }
    };
  }, [selected]);

  return (
    <>
      <group
        rotation={[Math.PI * 0.8, 0, 0]}
        position={[0, -2, 0]}
        ref={sceneRef}
        scale={0.5}
      >
        {selected === "all" && (
          <Html transform position={[0, 12, 0]} rotation={[0, Math.PI, 0]}>
            <div className="Logo">
              <div className="Logo__container">
                <span className="apple"></span>
                <h1>Macintosh 1983</h1>
              </div>
            </div>
          </Html>
        )}
        {["all", "mouse"].includes(selected) && (
          <>
            <Select enabled={mouseHover}>
              <group
                position={[-7.13, 0.34, -5.81]}
                onPointerOver={() => handleHover(setMouseHover, true)}
                onPointerOut={() => handleHover(setMouseHover, false)}
                onClick={() => handleSelect("mouse")}
              >
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Mouse_Lightplastic_0.geometry}
                  material={materials.Lightplastic}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Mouse_Darkplastic_0.geometry}
                  material={materials.Darkplastic}
                />
                {selected === "mouse" && (
                  <Html position={[5, 0, 0]}>
                    <Window title="Mouse">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Ut ipsa maiores distinctio. Repudiandae sed blanditiis
                      ullam voluptatem, fugiat voluptatum quas repellat, est
                      dolor velit totam ipsa iure eaque alias magnam.
                    </Window>
                  </Html>
                )}
              </group>
            </Select>
            <mesh
              position={[-5.5, 0.36, 1.45]}
              castShadow
              receiveShadow
              geometry={nodes.Mousechord_Darkplastic_0.geometry}
              material={materials.Darkplastic}
            />
          </>
        )}

        {selected === "all" && (
          <>
            <mesh
              position={[-1.8, 0.65, 4.7]}
              castShadow
              receiveShadow
              geometry={nodes.Mouseplug_Darkplastic_0.geometry}
              material={materials.Darkplastic}
            />
            <mesh
              position={[0.15, 0.23, -3.55]}
              castShadow
              receiveShadow
              geometry={nodes.Keyboardchord_Computer_0.geometry}
              material={materials.Computer}
            />
          </>
        )}
        {["all", "keyboard"].includes(selected) && (
          <Select enabled={keyboardHover}>
            <group
              position={[0.65, 0.73, -6.86]}
              onPointerOver={() => handleHover(setKeyboardHover, true)}
              onPointerOut={() => handleHover(setKeyboardHover, false)}
              onClick={() => handleSelect("keyboard")}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Keyboard_Blackplastic_0.geometry}
                material={materials.Blackplastic}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Keyboard_Lightplastic_0.geometry}
                material={materials.Lightplastic}
              />
              {selected === "keyboard" && (
                <Html position={[0, -9, 0]}>
                  <Window title="Keyboard">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut
                    ipsa maiores distinctio. Repudiandae sed blanditiis ullam
                    voluptatem, fugiat voluptatum quas repellat, est dolor velit
                    totam ipsa iure eaque alias magnam.
                  </Window>
                </Html>
              )}
            </group>
            <mesh
              position={[-0.05, 1, -8]}
              castShadow
              receiveShadow
              geometry={nodes.Space_Keys_0.geometry}
              material={materials.Keys}
            />
            <mesh
              position={[-2.32, 1, -8]}
              castShadow
              receiveShadow
              geometry={nodes.Enter_Keys_0.geometry}
              material={materials.Keys}
            />
            <mesh
              position={[2.21, 1, -8]}
              castShadow
              receiveShadow
              geometry={nodes.Start_Keys_0.geometry}
              material={materials.Keys}
            />
            <mesh
              position={[3.08, 1.11, -7.44]}
              castShadow
              receiveShadow
              geometry={nodes.Shift001_Keys_0.geometry}
              material={materials.Keys}
            />
            <mesh
              position={[3.43, 1.46, -5.8]}
              castShadow
              receiveShadow
              geometry={nodes["~_Keys_0"].geometry}
              material={materials.Keys}
            />
            <mesh
              position={[0.15, 1.11, -7.44]}
              castShadow
              receiveShadow
              geometry={nodes.B_Keys_0.geometry}
              material={materials.Keys}
            />
            <mesh
              position={[0.66, 1.11, -7.44]}
              castShadow
              receiveShadow
              geometry={nodes.V_Keys_0.geometry}
              material={materials.Keys}
            />
            <mesh
              position={[-2.74, 1.46, -5.8]}
              castShadow
              receiveShadow
              geometry={nodes["+_Keys_0"].geometry}
              material={materials.Keys}
            />
            <mesh
              position={[-3.4, 1.46, -5.8]}
              castShadow
              receiveShadow
              geometry={nodes.Backspace_Keys_0.geometry}
              material={materials.Keys}
            />
            <mesh
              position={[-3.01, 1.34, -6.35]}
              castShadow
              receiveShadow
              geometry={nodes._Keys_0.geometry}
              material={materials.Keys}
            />
            <mesh
              castShadow
              receiveShadow
              position={[-3.52, 1.34, -6.35]}
              geometry={nodes._Keys_0_1.geometry}
              material={materials.Keys}
            />
            <mesh
              position={[2.21, 1.11, -7.44]}
              castShadow
              receiveShadow
              geometry={nodes.Z_Keys_0.geometry}
              material={materials.Keys}
            />
            <mesh
              position={[1.69, 1.11, -7.44]}
              castShadow
              receiveShadow
              geometry={nodes.X_Keys_0.geometry}
              material={materials.Keys}
            />
            <mesh
              position={[1.18, 1.11, -7.44]}
              castShadow
              receiveShadow
              geometry={nodes.C_Keys_0.geometry}
              material={materials.Keys}
            />
            <mesh
              position={[-0.37, 1.11, -7.44]}
              castShadow
              receiveShadow
              geometry={nodes.N_Keys_0.geometry}
              material={materials.Keys}
            />
            <mesh
              position={[-0.88, 1.11, -7.44]}
              castShadow
              receiveShadow
              geometry={nodes.M_Keys_0.geometry}
              material={materials.Keys}
            />
            <mesh
              position={[-1.39, 1.11, -7.44]}
              castShadow
              receiveShadow
              geometry={nodes["<_Keys_0"].geometry}
              material={materials.Keys}
            />
            <mesh
              position={[-1.91, 1.11, -7.44]}
              castShadow
              receiveShadow
              geometry={nodes[">_Keys_0"].geometry}
              material={materials.Keys}
            />
            <mesh
              position={[-2.42, 1.11, -7.44]}
              castShadow
              receiveShadow
              geometry={nodes["?_Keys_0"].geometry}
              material={materials.Keys}
            />
            <mesh
              position={[-2.98, 1, -8]}
              castShadow
              receiveShadow
              geometry={nodes.Option_Keys_0.geometry}
              material={materials.Keys}
            />
            <mesh
              position={[2.86, 1, -8]}
              castShadow
              receiveShadow
              geometry={nodes.Option001_Keys_0.geometry}
              material={materials.Keys}
            />
            <mesh
              position={[0.08, 1.34, -6.35]}
              castShadow
              receiveShadow
              geometry={nodes.Y_Keys_0.geometry}
              material={materials.Keys}
            />
            <mesh
              position={[0.59, 1.34, -6.35]}
              castShadow
              receiveShadow
              geometry={nodes.T_Keys_0.geometry}
              material={materials.Keys}
            />
            <mesh
              position={[1.11, 1.34, -6.35]}
              castShadow
              receiveShadow
              geometry={nodes.R_Keys_0.geometry}
              material={materials.Keys}
            />
            <mesh
              position={[1.62, 1.34, -6.35]}
              castShadow
              receiveShadow
              geometry={nodes.E_Keys_0.geometry}
              material={materials.Keys}
            />
            <mesh
              position={[2.13, 1.34, -6.35]}
              castShadow
              receiveShadow
              geometry={nodes.W_Keys_0.geometry}
              material={materials.Keys}
            />
            <mesh
              position={[2.65, 1.34, -6.35]}
              castShadow
              receiveShadow
              geometry={nodes.Q_Keys_0.geometry}
              material={materials.Keys}
            />
            <mesh
              position={[3.3, 1.34, -6.35]}
              castShadow
              receiveShadow
              geometry={nodes.Tab_Keys_0.geometry}
              material={materials.Keys}
            />
            <mesh
              position={[3.2, 1.23, -6.9]}
              castShadow
              receiveShadow
              geometry={nodes.CapLock_Keys_0.geometry}
              material={materials.Keys}
            />
            <mesh
              position={[2.44, 1.23, -6.9]}
              castShadow
              receiveShadow
              geometry={nodes.A_Keys_0.geometry}
              material={materials.Keys}
            />
            <mesh
              position={[1.93, 1.23, -6.9]}
              castShadow
              receiveShadow
              geometry={nodes.S_Keys_0.geometry}
              material={materials.Keys}
            />
            <mesh
              position={[1.41, 1.23, -6.9]}
              castShadow
              receiveShadow
              geometry={nodes.D_Keys_0.geometry}
              material={materials.Keys}
            />
            <mesh
              position={[-3.38, 1.23, -6.9]}
              castShadow
              receiveShadow
              geometry={nodes.Return_Keys_0.geometry}
              material={materials.Keys}
            />
            <mesh
              position={[0.9, 1.23, -6.9]}
              castShadow
              receiveShadow
              geometry={nodes.F_Keys_0.geometry}
              material={materials.Keys}
            />
            <mesh
              position={[0.39, 1.23, -6.9]}
              castShadow
              receiveShadow
              geometry={nodes.G_Keys_0.geometry}
              material={materials.Keys}
            />
            <mesh
              position={[-0.13, 1.23, -6.9]}
              castShadow
              receiveShadow
              geometry={nodes.H_Keys_0.geometry}
              material={materials.Keys}
            />
            <mesh
              position={[-0.64, 1.23, -6.9]}
              castShadow
              receiveShadow
              geometry={nodes.J_Keys_0.geometry}
              material={materials.Keys}
            />
            <mesh
              position={[-1.16, 1.23, -6.9]}
              castShadow
              receiveShadow
              geometry={nodes.K_Keys_0.geometry}
              material={materials.Keys}
            />
            <mesh
              position={[-1.67, 1.23, -6.9]}
              castShadow
              receiveShadow
              geometry={nodes.L_Keys_0.geometry}
              material={materials.Keys}
            />
            <mesh
              position={[-2.19, 1.23, -6.9]}
              castShadow
              receiveShadow
              geometry={nodes[";_Keys_0"].geometry}
              material={materials.Keys}
            />
            <mesh
              position={[-2.7, 1.23, -6.9]}
              castShadow
              receiveShadow
              geometry={nodes["'_Keys_0"].geometry}
              material={materials.Keys}
            />
            <mesh
              position={[-0.7, 1.46, -5.79]}
              castShadow
              receiveShadow
              geometry={nodes["8_Keys_0"].geometry}
              material={materials.Keys}
            />
            <mesh
              position={[2.91, 1.46, -5.8]}
              castShadow
              receiveShadow
              geometry={nodes["1_Keys_0"].geometry}
              material={materials.Keys}
            />
            <mesh
              position={[2.4, 1.46, -5.8]}
              castShadow
              receiveShadow
              geometry={nodes["2_Keys_0"].geometry}
              material={materials.Keys}
            />
            <mesh
              position={[1.88, 1.46, -5.8]}
              castShadow
              receiveShadow
              geometry={nodes["3_Keys_0"].geometry}
              material={materials.Keys}
            />
            <mesh
              position={[1.37, 1.46, -5.8]}
              castShadow
              receiveShadow
              geometry={nodes["4_Keys_0"].geometry}
              material={materials.Keys}
            />
            <mesh
              position={[0.86, 1.46, -5.8]}
              castShadow
              receiveShadow
              geometry={nodes["5_Keys_0"].geometry}
              material={materials.Keys}
            />
            <mesh
              position={[-3.24, 1.11, -7.44]}
              castShadow
              receiveShadow
              geometry={nodes.Shift_Keys_0.geometry}
              material={materials.Keys}
            />
            <mesh
              position={[0.34, 1.46, -5.8]}
              castShadow
              receiveShadow
              geometry={nodes["6_Keys_0"].geometry}
              material={materials.Keys}
            />
            <mesh
              position={[-0.17, 1.46, -5.8]}
              castShadow
              receiveShadow
              geometry={nodes["7_Keys_0"].geometry}
              material={materials.Keys}
            />
            <mesh
              position={[-1.2, 1.46, -5.8]}
              castShadow
              receiveShadow
              geometry={nodes["9_Keys_0"].geometry}
              material={materials.Keys}
            />
            <mesh
              position={[-1.72, 1.46, -5.8]}
              castShadow
              receiveShadow
              geometry={nodes["0_Keys_0"].geometry}
              material={materials.Keys}
            />
            <mesh
              position={[-2.23, 1.46, -5.8]}
              castShadow
              receiveShadow
              geometry={nodes["-_Keys_0"].geometry}
              material={materials.Keys}
            />
            <mesh
              position={[-2.49, 1.34, -6.35]}
              castShadow
              receiveShadow
              geometry={nodes._Keys_0_2.geometry}
              material={materials.Keys}
            />
            <mesh
              position={[-1.98, 1.34, -6.35]}
              castShadow
              receiveShadow
              geometry={nodes.P_Keys_0.geometry}
              material={materials.Keys}
            />
            <mesh
              position={[-1.47, 1.34, -6.35]}
              castShadow
              receiveShadow
              geometry={nodes.O_Keys_0.geometry}
              material={materials.Keys}
            />
            <mesh
              position={[-0.95, 1.34, -6.35]}
              castShadow
              receiveShadow
              geometry={nodes.I_Keys_0.geometry}
              material={materials.Keys}
            />
            <mesh
              position={[-0.44, 1.34, -6.35]}
              castShadow
              receiveShadow
              geometry={nodes.U_Keys_0.geometry}
              material={materials.Keys}
            />
          </Select>
        )}
        {["all", "mac", "os"].includes(selected) && (
          <Select
            enabled={macHover}
            onPointerOver={() => handleHover(setMacHover, true)}
            onPointerOut={() => handleHover(setMacHover, false)}
            onClick={() => {
              if (selected !== "os") handleSelect("mac");
            }}
          >
            <group position={[-0.02, 2.49, 2.04]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Computer_Metal_0.geometry}
                material={materials.Metal}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Computer_Screen_0.geometry}
                material={
                  selected === "os" ? blackBasicMaterial : materials.Screen
                }
              />
              {selected === "os" && (
                <Html
                  occlude
                  transform
                  position={[0, 3.3, -4.2]}
                  rotation={[Math.PI * 0.03, Math.PI, 0]}
                  scale={0.32}
                >
                  <iframe
                    src="/os/"
                    frameBorder="0"
                    className="os-container"
                    width={512}
                    height={346}
                  ></iframe>
                  <Alert />
                </Html>
              )}
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Computer_Whiteplastic_0.geometry}
                material={materials.Whiteplastic}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Computer_Blackplastic_0.geometry}
                material={materials.Blackplastic}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Computer_Computer_0.geometry}
                material={materials.Computer}
              />
            </group>
            <mesh
              position={[2.3, 1.5, -2.29]}
              castShadow
              receiveShadow
              geometry={nodes.Brightness_Computer_0.geometry}
              material={materials.Computer}
            />
          </Select>
        )}
      </group>
      {selected === "mac" && (
        <Html position={[-10, 3, 0]}>
          <Window title="Macintosh" ActionButton={ActionButton}>
            <div
              style={{
                minWidth: 400,
              }}
            >
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut ipsa
              maiores distinctio. Repudiandae sed blanditiis ullam voluptatem,
              fugiat voluptatum quas repellat, est dolor velit totam ipsa iure
              eaque alias magnam.
            </div>
          </Window>
        </Html>
      )}
    </>
  );
}

const ActionButton = () => {
  return (
    <button
      className="btn"
      onClick={() => useMacintosh.setState({ selected: "os" })}
    >
      Start Macintosh
    </button>
  );
};

useGLTF.preload("/models/macintosh.glb");

export default Macintosh;
