import classNames from 'classnames';
import type { InputHTMLAttributes } from 'react';
import s from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
}

export const Input = ({ label, id, ...props }: InputProps) => {
	const inputId = id || props.name;

	return (
		<div>
			{label && (
				<label htmlFor={inputId} className={s.label}>
					{label}
				</label>
			)}

			<input id={inputId} className={classNames(s.input)} {...props} />
		</div>
	);
};
