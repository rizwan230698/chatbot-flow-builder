import { useCallback } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import nodeTypes from "../Nodes";
import { Droppable } from "../DND";
import { useFlowBuilder } from "../../context/FlowBuilderContext";
import { EDGE_DEFAULT_PROPS } from "../../constants/config";

export default function FlowBuilder() {
  const { nodes, setNodes, edges, setEdges, setSelectedNodeId } =
    useFlowBuilder();

  const onNodesChange = useCallback(
    (changes) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );

  const onConnect = useCallback((params) => {
    setEdges((edgesSnapshot) =>
      addEdge(
        {
          ...params,
          ...EDGE_DEFAULT_PROPS,
        },
        edgesSnapshot
      )
    );
  }, []);

  const onNodeClick = useCallback((e, node) => setSelectedNodeId(node.id), []);

  return (
    <div className="flow-builder">
      <Droppable>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onNodeClick={onNodeClick}
          isValidConnection={({ source }) => {
            // Can only have one edge originating from a source handle
            return !edges.some((edge) => edge.source === source);
          }}
        />
      </Droppable>
    </div>
  );
}
