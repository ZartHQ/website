export interface ToggleButtonProps {
  patronActive: boolean;
  onToggle: () => void;
}

export interface MarqueeTextProps {
  text: string;
  className?: string;
}

export interface ContentConfig {
  title: string;
  description: string;
  buttonText: string;
  marqueeText: string;
  formLink?: string;
  name?: string;
}
