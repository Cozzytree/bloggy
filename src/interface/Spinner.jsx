function Spinner({ bg }) {
  return (
    <div className={`fixed inset-0 ${bg} backdrop-blur-sm z-[999] h-full`}>
      <div className="spinner"></div>
    </div>
  );
}

export default Spinner;
