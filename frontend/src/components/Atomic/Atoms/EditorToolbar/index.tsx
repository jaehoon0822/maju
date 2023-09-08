const EditorToolbar = () => {
  return (
    <div
      id="toolbar"
      style={{
        border: "none",
      }}
    >
      <span className="ql-formats">
        <button
          className="ql-image z-50 bg-black/50"
          style={{
            width: "32px",
            height: "32px",
          }}
        />
      </span>
    </div>
  );
};

export default EditorToolbar;
