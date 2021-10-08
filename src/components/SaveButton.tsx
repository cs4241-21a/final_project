import * as React from "react";

const SaveButton = (props: { updatePrefs: () => void }): JSX.Element => {
  const handleSave = () => {
      props.updatePrefs();
  };

  React.useEffect(() => {}, []);

  return <button onClick={handleSave}>Save</button>;
};

export default SaveButton;
