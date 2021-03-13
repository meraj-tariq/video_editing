import React from 'react';
import styled from 'styled-components';

type TAppBar = {
	children: React.ReactNode;
	upload?: boolean;
};
const AppBarHeight = 72;

export default function AppBarContainer({ children, upload }: TAppBar) {
	return <AppBar upload={upload}>{children}</AppBar>;
}

const AppBar = styled.div<{ upload?: boolean }>`
	align-items: center;
	position: ${({ upload }) => upload && 'fixed'};
	background-color: ${({ theme }) => theme.colors.WHITE};
	box-shadow: ${({ theme }) => theme.shadows.S1};
	display: flex;
	height: ${AppBarHeight}px;
	overflow: hidden;
	width: 100%;
	z-index: ${({ theme }) => theme.zIndex.DRAWER} + 1;
`;
