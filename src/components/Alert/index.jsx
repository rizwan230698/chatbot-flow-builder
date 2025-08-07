import React, { useEffect } from "react";
import { useFlowBuilder } from "../../context/FlowBuilderContext";
import "./index.css";

export default function Alert() {
  const { alert, hideAlert } = useFlowBuilder();
  const { type, message = "", show } = alert || {};
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        hideAlert();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, hideAlert]);

  return (
    <div className={`top-alert ${type} ${show ? "show" : ""}`}>{message}</div>
  );
}
