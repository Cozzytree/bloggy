function Column({ children, className }) {
  return (
    <div
      className={`flex items-start px-4 space-y-3 rounded-md text-xs py-3 ${className}`}
    >
      {children}
    </div>
  );
}

export default Column;
