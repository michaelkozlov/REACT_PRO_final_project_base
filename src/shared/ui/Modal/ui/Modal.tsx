import { Box } from '@mui/material';
import { useEffect, useRef, type FC } from 'react';
import { createPortal } from 'react-dom';
import { getModalRoot } from '../getModalRoot';
import styles from './Modal.module.css';
import { Button } from 'shared/ui/Button/ui/Button';

interface IModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

export const Modal: FC<IModalProps> = ({ isOpen, onClose, children }) => {
	const modalRef = useRef<HTMLDivElement>(null);
	const closeBtnRef = useRef<HTMLButtonElement>(null);
	const triggerRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		if (isOpen) {
			triggerRef.current = document.activeElement as HTMLElement;
		}
	}, [isOpen]);

	useEffect(() => {
		if (!isOpen) return;

		if (isOpen) {
			if (closeBtnRef.current) {
				closeBtnRef.current.focus();
			}
		}

		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		const handleClickOutside = (e: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEsc);
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('keydown', handleEsc);
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, onClose]);

	useEffect(() => {
		return () => {
			if (!isOpen && triggerRef.current) {
				triggerRef.current.focus();
			}
		};
	}, [isOpen]);

	const handleClose = (e?: React.MouseEvent<HTMLButtonElement>) => {
		e?.stopPropagation();
		onClose();
	};

	if (!isOpen) return null;

	return createPortal(
		<Box
			ref={modalRef}
			className={styles.root}
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexFlow: 'column',
				backgroundColor: 'white',
			}}>
			<>
				<Button
					ref={closeBtnRef}
					onClick={handleClose}
					className={styles.closeButton}>
					×
				</Button>
				{children}
			</>
		</Box>,
		getModalRoot()
	);
};
