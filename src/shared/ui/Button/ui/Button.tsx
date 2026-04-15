import React from 'react';
import type { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './Button.module.css';

type Props = {
	className?: string;
	type?: 'button' | 'submit' | 'reset';
	loading?: boolean;
	disabled?: boolean;
	variant?: 'primary' | 'secondary';
	size?: 'small' | 'medium';
	children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<Props> = ({
	className = '',
	type = 'button',
	loading = false,
	disabled = false,
	variant = 'primary',
	size = 'small',
	children,
	onClick,
	...props
}) => {
	const classes = classNames(
		styles.button,
		{
			[styles[`button_type_${variant}`]]: variant !== undefined,
			[styles[`button_size_${size}`]]: size !== undefined,
		},
		className
	);

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (!loading && !disabled && onClick) {
			onClick(e);
		}
	};

	return (
		<button
			type={type}
			className={classes}
			disabled={disabled || loading}
			{...props}
			onClick={handleClick}>
			{children}
		</button>
	);
};
