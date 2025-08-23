const CaseStudyHeader = ({ title, subtitle, imageUrl }) => (
  <div className="flex flex-col items-center justify-center text-center py-10">
    <img src={imageUrl} alt="Case Study Image" className="w-40 h-40 mb-6" />
    <h1 className="h1 text-cream-100 mb-2">{title}</h1>
    <h2 className="text-lg text-cream-200">{subtitle}</h2>
  </div>
);
export default CaseStudyHeader;
