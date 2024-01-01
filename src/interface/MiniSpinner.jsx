function MiniSpinner({ width, height }) {
  return (
    <div className="w-10 h-10 relative">
      <div
        className={`like-spinner border-[3px] border-white w-${width} h-${height} rounded-[50%] border-b-transparent`}
      ></div>
    </div>
  );
}

export default MiniSpinner;
