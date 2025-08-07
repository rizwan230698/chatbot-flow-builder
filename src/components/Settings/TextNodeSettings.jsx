export default function TextNodeSettings({ node, onChange }) {
  const { id, data } = node;

  const handleChange = (e) => {
    const value = e.target.value;
    const data = { value };
    onChange(id, data);
  };

  return (
    <div className="text-field-container">
      <label htmlFor="text-node-label">Text</label>
      <textarea
        id="text-node-label"
        value={data.value}
        onChange={handleChange}
      ></textarea>
    </div>
  );
}
