import React, { createContext, useContext, useState } from "react";
import { NODE_TYPES } from "../constants/nodes";
import { EDGE_DEFAULT_PROPS } from "../constants/config";

const FlowBuilderContext = createContext(null);

const initialNodes = [
  {
    id: "n1",
    position: { x: 100, y: 400 },
    data: { value: "test message 1" },
    type: NODE_TYPES.TEXT,
  },
  {
    id: "n2",
    position: { x: 500, y: 300 },
    data: { value: "test message 2" },
    type: NODE_TYPES.TEXT,
  },
];
const initialEdges = [
  {
    id: "n1-n2",
    source: "n1",
    target: "n2",
    ...EDGE_DEFAULT_PROPS,
  },
];

export default function FlowBuilderProvider({ children }) {
  const [nodes, setNodes] = useState(() => {
    const nodes = JSON.parse(localStorage.getItem("nodes"));
    if (nodes) return nodes;
    return initialNodes;
  });
  const [edges, setEdges] = useState(() => {
    const edges = JSON.parse(localStorage.getItem("edges"));
    if (edges) return edges;
    return initialEdges;
  });
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [alert, setAlert] = useState(null);

  const showAlert = ({ type, message }) => {
    setAlert({ show: true, type, message });
  };

  const hideAlert = () => setAlert(null);

  const validateBeforeSave = () => {
    if (nodes.length <= 1) return true; // valid if 1 or 0 nodes

    const nodesWithNoIncomingEdges = nodes.filter((node) => {
      const hasIncoming = edges.some((edge) => edge.target === node.id);
      return !hasIncoming;
    });

    if (nodesWithNoIncomingEdges.length > 1) return false;

    return true;
  };

  const handleSave = () => {
    const isValid = validateBeforeSave();

    if (!isValid) {
      showAlert({
        type: "error",
        message: "Error: More than one node has no target handles.",
      });
      return;
    }

    localStorage.setItem("nodes", JSON.stringify(nodes));
    localStorage.setItem("edges", JSON.stringify(edges));
    showAlert({
      type: "success",
      message: "Chatbot flow builder saved successfully.",
    });
  };

  const handleNodeUpdate = (nodeId, data) => {
    setNodes((prev) =>
      prev.map((node) => (node.id === nodeId ? { ...node, data: data } : node))
    );
  };

  const handleDragEnd = (event) => {
    if (!event.over) return;
    const { activatorEvent, delta, active } = event;
    const { height, width } = document
      .getElementById(active.data.current.type)
      .getBoundingClientRect();

    const x = activatorEvent.x + delta.x - width;
    const y = activatorEvent.y + delta.y - height;

    const { data, type } = active.data.current;
    const id = `n${nodes.length + 1}`;
    const node = {
      id,
      position: { x, y },
      data,
      type,
    };

    setNodes((prev) => [...prev, node]);
  };

  return (
    <FlowBuilderContext.Provider
      value={{
        nodes,
        setNodes,
        edges,
        setEdges,
        selectedNodeId,
        setSelectedNodeId,
        handleNodeUpdate,
        handleDragEnd,
        handleSave,
        hideAlert,
        alert,
      }}
    >
      {children}
    </FlowBuilderContext.Provider>
  );
}

export const useFlowBuilder = () => {
  const context = useContext(FlowBuilderContext);

  if (!context)
    throw new Error("useFlowBuilder must be used inside FlowBuilderProvider");

  return context;
};
