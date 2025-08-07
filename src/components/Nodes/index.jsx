import { NODE_TYPES } from "../../constants/nodes";
import TextNode from "./TextNode";
import "./index.css";

const nodeTypes = {
  [NODE_TYPES.TEXT]: TextNode,
  // add more types
};

export default nodeTypes;
