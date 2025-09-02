import Label from "../typography/Label.js";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface CaseStudySectionProps {
  title: string;
  body?: string;
  isStrong?: boolean;
}

const CaseStudySection = ({
  title,
  body = "Splines reticulating",
  isStrong = false,
}: CaseStudySectionProps) => (
  <section className="mt-12 mb-14">
    {isStrong ? (
      <h4 className="text-2xl font-bold text-cream-100 tracking-wide w-full mb-2">{title}</h4>
    ) : (
      <Label text={title} />
    )}
    {body && (
      <div className="text-md text-cream-200 font-light">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // Custom styling for markdown elements
            p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
            ol: ({ children }) => (
              <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
            ),
            li: ({ children }) => <li className="text-cream-200 ml-4">{children}</li>,
            h1: ({ children }) => (
              <h1 className="text-2xl font-bold text-cream-100 mb-4">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-xl font-bold text-cream-100 mb-3">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-lg font-bold text-cream-100 mb-3">{children}</h3>
            ),
            h4: ({ children }) => (
              <h4 className="text-base font-bold text-cream-100 mb-2">{children}</h4>
            ),
            strong: ({ children }) => (
              <strong className="font-bold text-cream-100 ">{children}</strong>
            ),
            em: ({ children }) => <em className="italic text-pink-300">{children}</em>,
            code: ({ children }) => (
              <code className="bg-gray-800 px-2 py-1 rounded text-sm font-mono text-pink-300 border border-gray-700">
                {children}
              </code>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 pl-6 py-4 my-6 rounded-r-lg shadow-lg backdrop-blur-sm">
                <div className="text-cream-100 font-medium leading-relaxed">{children}</div>
              </blockquote>
            ),
            // Add support for custom callout syntax
            div: ({ className, children, ...props }) => {
              if (className?.includes("callout")) {
                const calloutType = className.includes("info")
                  ? "info"
                  : className.includes("warning")
                    ? "warning"
                    : className.includes("success")
                      ? "success"
                      : "default";

                const calloutStyles = {
                  info: "border-blue-400 bg-blue-900/20 text-blue-100",
                  warning: "border-yellow-400 bg-yellow-900/20 text-yellow-100",
                  success: "border-green-400 bg-green-900/20 text-green-100",
                  default: "border-pink-400 bg-pink-900/20 text-pink-100",
                };

                return (
                  <div
                    className={`border-l-4 ${calloutStyles[calloutType]} pl-6 py-4 my-6 rounded-r-lg shadow-lg backdrop-blur-sm`}
                    {...props}
                  >
                    <div className="font-medium leading-relaxed">{children}</div>
                  </div>
                );
              }
              return (
                <div className={className} {...props}>
                  {children}
                </div>
              );
            },
          }}
        >
          {body}
        </ReactMarkdown>
      </div>
    )}
  </section>
);
export default CaseStudySection;
