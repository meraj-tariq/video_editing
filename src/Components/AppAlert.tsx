import React from 'react';
import styled from 'styled-components';

export default function AppAlert({ error, open, msg }: any) {
	return (
		<SuccessResponseWrapper open={open} error={error}>
			<Response open={open}>{error ? error : msg}</Response>
		</SuccessResponseWrapper>
	);
}
const SuccessResponseWrapper = styled.div<{ open: boolean; error: boolean }>`
	border: 1px solid ${({ error }) => (error ? 'red' : 'green')};
	color: ${({ error }) => (error ? 'red' : 'green')};
	width: 100%;
	text-align: center;
	margin-top: ${({ open }) => (open ? '1.5rem' : '0')};
	margin-bottom: ${({ open }) => (open ? '1rem' : '0')};
	padding: ${({ open }) => (open ? '2px 0' : '0')};
	opacity: ${({ open }) => (open ? '1' : '0')};
	transition: all 0.75s ease-in-out;
	transition: color 0ms ease-in-out;
`;

const Response = styled.p<{ open: boolean }>`
	margin: 0;
	font-size: ${({ open }) => (open ? '13px' : '0')};
	transition: all 0.75s ease-in-out;
`;
