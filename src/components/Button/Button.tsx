import { ButtonHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';
import './styles.scss';
export type ButtonVariant = 'filled' | 'outlined' | 'text';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant = 'filled', loading, disabled, children, className, ...rest }, ref) => {
        return (
            <button
                ref={ref}
                className={clsx('btn', `btn--${variant}`, className)}
                disabled={disabled || loading}
                {...rest}
            >
                {loading ? 'Загрузка…' : children}
            </button>
        );
    }
);

Button.displayName = 'Button';
