import React, { useState } from 'react';
import styled from 'styled-components';

import { FormField } from '../../Components/Forms';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

function FormFieldToggle(props: any) {
	const [showPassword, setShowPassword] = useState(false);
	const togglePassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
	};

	return (
		<PasswordInputWrapper>
			<FormField
				id='password'
				label='Password'
				name='password'
				placeholder='Enter Password'
				type={showPassword ? 'text' : 'password'}
				{...props}
			/>
			<IconWrapper
				aria-label='toggle password visibility'
				onClick={togglePassword}
				onMouseDown={handleMouseDownPassword}
			>
				{showPassword ? <MdVisibility /> : <MdVisibilityOff />}
			</IconWrapper>
		</PasswordInputWrapper>
	);
}
export default FormFieldToggle;

export const PasswordInputWrapper = styled.div`
	position: relative;
`;

export const IconWrapper = styled.button`
	position: absolute;
	right: 0.75rem;
	top: 2.25rem;
	cursor: pointer;
	border-radius: 50%;
	border: none;
	font-size: 1.5rem;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: transparent;
	color: ${({ theme }) => theme.colors.PRIMARY_TEXT};
`;
