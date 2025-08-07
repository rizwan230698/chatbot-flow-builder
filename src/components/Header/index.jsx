import React from "react";
import "./index.css";
import { useFlowBuilder } from "../../context/FlowBuilderContext";

export default function Header() {
  const { handleSave } = useFlowBuilder();
  return (
    <header>
      <button onClick={handleSave}>Save Changes</button>
    </header>
  );
}
