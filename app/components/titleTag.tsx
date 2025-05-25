interface TitleTagProps {
  text: string;
  color?: string;
  size?: string;
}

const TitleTag = ({ text, color = "text-cream-200", size = "text-[30px]" }: TitleTagProps) => (
  <p className={`font-sans ${size} tracking-[3.5px] ${color} pb-4`}>{text}</p>
);
export default TitleTag;
