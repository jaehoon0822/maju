import classNames from "classnames";

const EditorImageInput = (onChangeImage: () => void) => {
  return (
    <input
      name="img"
      type="file"
      multiple
      className={classNames("hidden")}
      onChange={onChangeImage}
    />
  );
};

export default EditorImageInput;
