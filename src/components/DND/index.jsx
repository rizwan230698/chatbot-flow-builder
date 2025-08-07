import React from "react";
import { useDroppable, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export function Droppable(props) {
  const { setNodeRef } = useDroppable({
    id: "droppable",
  });

  const style = {
    height: "100%",
    width: "100%",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}

export function Draggable(props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${props.id}-draggable`,
    data: props.data,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <button
      id={props.id}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {props.children}
    </button>
  );
}
