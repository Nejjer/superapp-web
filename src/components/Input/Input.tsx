import { InputHTMLAttributes, forwardRef } from 'react';
import styles from './styles.module.scss'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, id, ...rest }, ref) => {
        const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`;

        return (
            <div className={styles.inputWrapper}>
                {label && <label htmlFor={inputId}>{label}</label>}
                <input
                    id={inputId}
                    ref={ref}
                    {...rest}
                />
                {error && <span role="alert">{error}</span>}
            </div>
        );
    }
);

Input.displayName = 'Input';
