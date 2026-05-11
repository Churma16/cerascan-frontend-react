import { Button } from "./button";

export function LinkButton({
  href,
  children,
  variant = "default",
  icon,
  iconRight,
  size = "lg"
}) {
  return (
    <Button variant={variant} size={size} asChild>
      <a href={href}>
        {icon}
        {children}
        {iconRight}
      </a>
    </Button>
  );
}
