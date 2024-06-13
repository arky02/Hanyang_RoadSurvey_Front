function SmallBtn({
  text,
  onClick,
  isSelected,
  style,
}: {
  text: string;
  onClick: () => void;
  isSelected: boolean;
  style?: {};
}) {
  return (
    <button
      className={`hover:bg-[#0091ff49] hover:text-black  hover:shadow-xl hover:font-semibold rounded-2xl md:px-4 md:py-[5px] px-[5px] py-[2px] font-semibold text-[#505050] shadow-md border-[1px] border-[#0091ff] md:text-[16px] text-[12px] ${
        isSelected && "bg-[#0091ff] text-white hover:text-black"
      } ${style}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default SmallBtn;
