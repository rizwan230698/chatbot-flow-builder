export const NODE_TYPES = {
  TEXT: "text",
  // Add more types here as needed
};

export const NODE_LABEL_MAPPING = {
  [NODE_TYPES.TEXT]: "Message",
};

// Available Nodes to list in the nodes panel.
const nodes = [
  {
    id: NODE_TYPES.TEXT,
    type: NODE_TYPES.TEXT,
    label: NODE_LABEL_MAPPING[NODE_TYPES.TEXT],
    data: {
      value: "Click to edit message",
    },
  },
  // Add more node types here as needed
];

export default nodes;
