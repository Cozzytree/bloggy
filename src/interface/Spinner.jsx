function Spinner({ bg }) {
  return (
    <div className={`fixed inset-0 ${bg} backdrop-blur-[2px] z-[999] h-full`}>
      <div className="spinner fixed w-14 h-14 border-[4px] border-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[50%] border-b-transparent"></div>
    </div>
  );
}

export default Spinner;
