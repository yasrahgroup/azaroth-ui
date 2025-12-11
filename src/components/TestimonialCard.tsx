import { useState } from "react";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  name,
  role,
  avatar,
}) => {
  const [imageError, setImageError] = useState(false);

  // Fallback avatar using the first letter of the name
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=128`;

  return (
    <figure
      className="rounded-2xl bg-white/80 dark:bg-slate-900/70 border border-slate-100/60 dark:border-slate-800 shadow-soft p-6 flex flex-col gap-4"
      aria-labelledby={`testimonial-${name.toLowerCase().replace(/\s+/g, "-")}-title`}
    >
      <blockquote>
        <p
          className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed"
          id={`testimonial-${name.toLowerCase().replace(/\s+/g, "-")}-title`}
        >
          "{quote}"
        </p>
      </blockquote>
      <div className="flex items-center gap-3">
        <div className="relative h-10 w-10 flex-shrink-0">
          <img
            src={imageError ? fallbackAvatar : avatar}
            alt={name}
            onError={() => setImageError(true)}
            className="h-full w-full rounded-full object-cover"
            aria-hidden="true"
          />
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-900 dark:text-white">
            {name}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {role}
          </div>
        </div>
      </div>
    </figure>
  );
};

export default TestimonialCard;
