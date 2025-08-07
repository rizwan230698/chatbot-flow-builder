import { Handle } from "@xyflow/react";
import { useFlowBuilder } from "../../context/FlowBuilderContext";
import { HANDLE_STYLES } from "../../constants/config";

export default function TextNode({ id, data }) {
  const { selectedNodeId } = useFlowBuilder();
  const isSelected = id === selectedNodeId;
  return (
    <div className={`text-node ${isSelected ? "selected" : ""}`}>
      <div className="text-node-header">
        <div>
          <img width={16} src="/assets/text.png" alt="" />
          <span>Send Message</span>
        </div>
        <div>
          <img width={16} src="/assets/whatsapp.png" alt="" />
        </div>
      </div>
      <div className="text-node-content">{data.value}</div>
      <Handle style={HANDLE_STYLES} type="source" position="right" />
      <Handle style={HANDLE_STYLES} type="target" position="left" />
    </div>
  );
}
