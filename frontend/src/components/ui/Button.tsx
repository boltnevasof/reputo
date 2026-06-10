import type { ButtonHTMLAttributes } from 'react';
import { Icon, type IconName } from './Icon';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'lg' | 'block';
  icon?: IconName;
  iconRight?: IconName;
}

export function Button({ variant = 'primary', size, icon, iconRight, children, ...rest }: ButtonProps) {
  const cls = [
    'btn',
    `btn-${variant}`,
    size === 'lg' ? 'btn-lg' : '',
    size === 'block' ? 'btn-block' : '',
    iconRight ? 'btn-icon-r' : '',
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <button className={cls} {...rest}>
      {icon && <Icon name={icon} size={size === 'lg' ? 20 : 18} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === 'lg' ? 20 : 18} />}
    </button>
  );
}
