import { cn, generateUniqueId } from "@/lib/utils";

type LinkButtonProps = {
  text: string;
  id?: string;
  className?: string;
  groupClassName?: string;
  showAnimatedCircle?: boolean;
};

const LinkButton = ({
  text,
  id = generateUniqueId(),
  className = "",
  groupClassName = "",
  showAnimatedCircle = true,
}: LinkButtonProps) => {
  return (
    <a
      id={id}
      className={cn("cta-wrapper", className)}
      onClick={e => {
        e.preventDefault();
        const target = document.getElementById("counter");
        if (target && id) {
          const offset = window.innerHeight * 0.15;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }}
    >
      <div className={cn("cta-button group", groupClassName)}>
        {showAnimatedCircle && <div className="bg-circle" />}
        <p className="text">{text}</p>
        <div className="arrow-wrapper">
          <img src="/images/arrow-down.svg" alt="arrow" />
        </div>
      </div>
    </a>
  );
};

export default LinkButton;
