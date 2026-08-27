import { storyblokEditable } from "@storyblok/react/rsc";
import type { SbBlokData } from "@storyblok/react/rsc";
import { Button } from "@/components/ui/Button";

export interface SbButtonBlok extends SbBlokData {
  component: "button";
  label: string;
  variant?: "primary" | "secondary" | "outline";
  disabled?: boolean;
}

interface SbButtonProps {
  blok: SbButtonBlok;
}

export default function SbButton({ blok }: SbButtonProps) {
  return (
    <Button 
      {...storyblokEditable(blok)} 
      variant={blok.variant || "primary"}
      disabled={blok.disabled}
    >
      {blok.label}
    </Button>
  );
}