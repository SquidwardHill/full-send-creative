interface TitleTagProps {
  text: string;
  color?: string;
  size?: string;
}

const TitleTag = ({
  text,
  color = "text-cream-200",
  size = "text-sm lg:text-md",
}: TitleTagProps) => (
  <p className={`font-mono uppercase italic font-bold ${size} tracking-wide ${color} pb-4`}>
    {text}
  </p>
);
export default TitleTag;
