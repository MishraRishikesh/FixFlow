import clsx from "clsx";
import { radius, shadow as shadowTokens, spacing } from "../../styles/tokens";
function Card({ children, className = "", padding = "md", shadow = "md" }) {
  return (
    <div
      className={clsx(
        "w-full bg-white border border-slate-200",
        radius.xl,
        spacing[padding] || spacing.md,
        shadowTokens[shadow] || shadowTokens.md,
        className,
      )}
    >
      {children}
    </div>
  );
}

export default Card;
