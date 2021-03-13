import React from 'react';
import styled from 'styled-components';

export default function NavIcon({ icon }: any) {
	return <StyledIcon>{icon}</StyledIcon>;
}
// const Button = styled.button`
// 	padding: 0;
// 	margin: 10px;
// 	border: none;
// 	outline: none;
// 	background-color: transparent;
// 	cursor: pointer;

// `;
const StyledIcon = styled.div`
	align-items: center;
	background-color: ${({ theme }) => theme.colors.PRIMARY};
	color: ${({ theme }) => theme.colors.WHITE};
	border-radius: 50%;
	display: flex;
	height: 15px;
	justify-content: center;
	width: 15px;
	margin: 10px;
`;
