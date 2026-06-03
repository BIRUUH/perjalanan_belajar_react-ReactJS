export default function Button ({ action, label }) {
  return (
    <button 
    className="button"
    onClick={action}
    >
      {label}
    </button>
  );
}