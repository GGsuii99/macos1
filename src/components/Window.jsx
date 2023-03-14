import { useMacintosh } from "./Macintosh";

function Window({ title, ActionButton, children }) {
  const handleClose = () => {
    useMacintosh.setState({ selected: "all" });
  };
  return (
    <div
      className="window"
      style={{
        position: "absolute",
      }}
    >
      <div className="title-bar">
        <button
          aria-label="Close"
          className="close"
          onClick={handleClose}
        ></button>
        <h1 className="title">{title}</h1>
        <button aria-label="Resize" className="resize"></button>
      </div>
      <div className="separator"></div>

      <div className="window-pane">
        {children}

        <section
          className="field-row"
          style={{
            marginTop: 20,
            flexDirection: "row-reverse",
            gap: 10,
          }}
        >
          {ActionButton && <ActionButton />}
          <button className="btn" onClick={handleClose}>
            Cancel
          </button>
        </section>
      </div>
    </div>
  );
}

export default Window;
