function FormRow({ children, label, errors, logo }) {
  return (
    <div className="flex items-start flex-col justify-between px-4 text-sm md:text-md">
      {label && (
        <label
          className="text-zinc-900 dark:text-zinc-100"
          htmlFor={children?.props?.id}
        >
          {label}
        </label>
      )}
      <div className="flex justify-center gap-0 items-center relative">
        <span className="absolute left-0">{logo}</span>
        {children}
      </div>
      {errors && <p className="text-xs text-red-400">{errors} </p>}
    </div>
  );
}

export default FormRow;
