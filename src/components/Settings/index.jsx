import { NODE_LABEL_MAPPING, NODE_TYPES } from "../../constants/nodes";
import { useFlowBuilder } from "../../context/FlowBuilderContext";
import TextNodeSettings from "./TextNodeSettings";
import "./index.css";

export default function SettingsPanel() {
  const { selectedNodeId, nodes, setSelectedNodeId, handleNodeUpdate } =
    useFlowBuilder();

  const node = nodes.find((node) => node.id === selectedNodeId);

  const { type } = node;

  const getSettingsComponent = () => {
    switch (type) {
      case NODE_TYPES.TEXT:
        return <TextNodeSettings node={node} onChange={handleNodeUpdate} />;
      default:
        return <div>No settings available for this node type : {type}</div>;
    }
  };

  return (
    <div className="settings-panel">
      <div className="settings-panel-header">
        <img
          width={24}
          src="/src/assets/back.png"
          alt="Back"
          role="button"
          onClick={() => setSelectedNodeId(null)}
        />
        <span>{NODE_LABEL_MAPPING[type]}</span>
      </div>
      <div className="settings-panel-content">{getSettingsComponent()}</div>
    </div>
  );
}
