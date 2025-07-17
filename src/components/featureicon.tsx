import {
  Wifi,
  Wind,
  Utensils,
  Music,
  Shield,
  Anchor,
  Fuel,
  type LucideIcon,
} from 'lucide-react';

interface FeatureIconProps {
  iconName: string;
  className?: string;
}

const iconMap: Record<string, LucideIcon> = {
  wifi: Wifi,
  wind: Wind,
  utensils: Utensils,
  music: Music,
  shield: Shield,
  anchor: Anchor,
  fuel: Fuel,
};

export default function FeatureIcon({
  iconName,
  className = 'h-5 w-5',
}: FeatureIconProps) {
  const IconComponent = iconMap[iconName] || Shield;

  return <IconComponent className={className} />;
}
