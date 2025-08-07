import { Draggable } from "../DND";
import nodes from "../../constants/nodes";
import "./index.css";

export default function NodesPanel() {
  return (
    <div className="nodes-panel">
      {nodes.map((item) => (
        <Draggable id={item.id} data={item} key={item.id}>
          <img className="node-icon" src={`/assets/${item.type}.png`} alt="" />
          {item.label}
        </Draggable>
      ))}
    </div>
  );
}
