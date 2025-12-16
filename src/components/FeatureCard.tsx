import { memo } from "react";

interface FeatureCardProps {
  /** The emoji or icon to display */
  icon: string;
  /** The title of the feature */
  title: string;
  /** Description of the feature */
  description: string;
  /** Additional class names */
  className?: string;
  /** RTL support */
  dir?: "ltr" | "rtl";
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  className = "",
  dir = "ltr",
}) => {
  return (
    <article
      className={`
        rounded-2xl bg-white/80 dark:bg-slate-900/70 
        border border-slate-100/60 dark:border-slate-800 
        shadow-soft hover:-translate-y-1 hover:shadow-xl 
        transition-all duration-300 p-6 flex flex-col gap-3
        focus-within:ring-2 focus-within:ring-brand-500 focus-within:ring-offset-2
        ${className}
      `}
      dir={dir}
      aria-labelledby={`feature-${title
        .toLowerCase()
        .replace(/\s+/g, "-")}-title`}
      tabIndex={0}
    >
      <div
        className="text-2xl w-10 h-10 rounded-full bg-brand-50 dark:bg-slate-800 flex items-center justify-center"
        aria-hidden="true"
      >
        {icon}
      </div>
      <h3
        id={`feature-${title.toLowerCase().replace(/\s+/g, "-")}-title`}
        className="text-base font-semibold text-slate-900 dark:text-white"
      >
        {title}
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-300">
        {description}
      </p>
    </article>
  );
};

// Using memo to prevent unnecessary re-renders
const MemoizedFeatureCard = memo(FeatureCard);

// Add display name for better debugging
MemoizedFeatureCard.displayName = "FeatureCard";

export default MemoizedFeatureCard;
