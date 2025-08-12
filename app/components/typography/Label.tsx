interface LabelProps {
  text: string;
  color?: string;
  size?: string;
}

const Label = ({
  text,
  color = "text-pink-300",
  size = "text-sm md:text-md lg:text-[15.5px]",
}: LabelProps) => (
  <p className={`font-serif italic tracking-wider uppercase ${size} ${color} pb-2`}>{text}</p>
);
export default Label;
