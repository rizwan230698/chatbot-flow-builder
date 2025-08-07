import { DndContext } from "@dnd-kit/core";
import FlowBuilder from "./components/FlowBuilder";
import NodesPanel from "./components/NodesPanel";
import SettingsPanel from "./components/Settings";
import { useFlowBuilder } from "./context/FlowBuilderContext";
import Header from "./components/Header";
import Alert from "./components/Alert";

function App() {
  const { selectedNodeId, handleDragEnd } = useFlowBuilder();

  return (
    <div className="container">
      <Header />
      <div className="flow-builder-container">
        <DndContext onDragEnd={handleDragEnd}>
          <FlowBuilder />
          <NodesPanel />
        </DndContext>
        {selectedNodeId && <SettingsPanel />}
      </div>
      <Alert />
    </div>
  );
}

export default App;
