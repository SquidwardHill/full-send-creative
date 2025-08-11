import { Link } from "@remix-run/react";
import type { LinkProps } from "@remix-run/react";
import type { ReactNode } from "react";

type InlineLinkVariant = "bold" | "thin";

type InlineLinkProps = Omit<LinkProps, "className" | "children"> & {
  variant?: InlineLinkVariant;
  className?: string;
  children: ReactNode;
};

function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

const variantClassNameByVariant: Record<InlineLinkVariant, string> = {
  bold: "font-semibold uppercase tracking-wide",
  thin: "font-normal italic font-serif",
};

export default function InlineLink({
  variant = "thin",
  className,
  children,
  ...linkProps
}: InlineLinkProps) {
  const baseClassName = "text-bubblegum-400 hover:underline transition-colors";
  return (
    <Link
      {...linkProps}
      className={cn(baseClassName, variantClassNameByVariant[variant], className)}
    >
      {children}
    </Link>
  );
}

export type { InlineLinkProps, InlineLinkVariant };
