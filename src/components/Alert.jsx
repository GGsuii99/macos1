import { useState } from "react";

function Alert() {
  const [hide, setHide] = useState(false);

  if (hide) return null;

  return (
    <div
      className="alert-box outer-border scale-down"
      style={{
        width: "30rem",
        position: "absolute",
        top: "20%",
      }}
    >
      <div className="inner-border">
        <div
          className="alert-contents"
          style={{
            paddingLeft: 30,
            paddingRight: 20,
          }}
        >
          <h1 className="modal-text">Welcome to Macintosh OS Simulator</h1>
          <section
            className="field-row"
            style={{
              justifyContent: "flex-start",
            }}
          >
            <div className="square"></div>

            <p
              className="alert-text"
              style={{
                paddingLeft: 10,
              }}
            >
              To exit the Macintosh OS Simulator, press Esc.
            </p>
          </section>
          <section
            className="field-row"
            style={{
              justifyContent: "flex-end",
            }}
          >
            <button className="btn" onClick={() => setHide(true)}>
              Cancel
            </button>
            <button
              className="btn"
              style={{
                width: 95,
              }}
              onClick={() => setHide(true)}
            >
              OK
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Alert;
