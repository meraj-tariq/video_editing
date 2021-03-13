import { useState } from 'react';

interface TUseFileUploadConfig {
	mimeTypes: string[];
	maxSize?: number;
}

interface TUseFileUploadError {
	type: 'size' | 'mimeType';
	file: File;
}

const useFileUpload = (config: TUseFileUploadConfig) => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [fileError, setFileError] = useState<TUseFileUploadError | null>(
		null
	);
	const [dragState, setDragState] = useState(false);

	const validateFile = (file: File) => {
		if (!config.mimeTypes.includes(file?.type)) {
			setFileError({ type: 'mimeType', file });
			return false;
		}

		if (config.maxSize && file.size > config.maxSize) {
			return false;
		}

		if (fileError) {
			setFileError(null);
		}

		return true;
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.currentTarget.files) return;

		const file = e.currentTarget.files[0];
		const isValid = validateFile(file);

		if (isValid) setSelectedFile(file);
	};

	const onDrop = (e: React.DragEvent<HTMLElement>) => {
		e.preventDefault();
		setDragState(false);

		let file: File | null;

		if (e.dataTransfer.items) {
			const [item] = Array.from(e.dataTransfer.items);

			file = item.getAsFile();
		} else {
			const [item] = Array.from(e.dataTransfer.files);

			file = item;
		}

		const isValid = file && validateFile(file);

		if (isValid) setSelectedFile(file!);
	};

	const onDragLeave = (e: React.DragEvent<HTMLElement>) => {
		e.preventDefault();
		setDragState(false);
	};

	const onDragOver = (e: React.DragEvent<HTMLElement>) => {
		e.preventDefault();
		setDragState(true);
	};

	const clear = () => {
		setSelectedFile(null);
		setFileError(null);
	};

	return {
		file: selectedFile,
		error: fileError,
		clear,
		dragState,
		onChange,
		onDragLeave,
		onDragOver,
		onDrop,
	};
};

export default useFileUpload;
