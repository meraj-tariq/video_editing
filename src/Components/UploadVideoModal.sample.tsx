import React from 'react';
import styled from 'styled-components';

import { TModalController } from '../Hooks/UseModal';

interface TModalComponentProps {
	closeable?: boolean;
	title?: string;
	children: React.ReactElement | React.ReactElement[];
	controller: TModalController | TModalController<any>;
}

export const UploadVideoModal = (props: TModalComponentProps) => {
	const closeModal = (e: any) => {
		if (e.target.id !== 'wrapper') {
			return; // child was clicked, ignore onClick
		}
		props.controller.close();
	};

	return (
		<Container open={props.controller.isOpen}>
			<Wrapper onClickCapture={closeModal} id='wrapper'>
				<Box>
					<Title>{props.title}</Title>
					{props.children}
				</Box>
			</Wrapper>
		</Container>
	);
};

const Container = styled.div<{ open: boolean }>`
	display: ${({ open }) => (open ? '' : 'none')};
	background: #0e213bcc;
	position: fixed;
	max-width: 100%;
	width: 100%;
	height: 100%;
	z-index: 100;
	opacity: 1;

	@media (max-width: ${({ theme }) => theme.screens.SMALL_MOBILE}) {
		left: 0;
		height: 105%;
		width: 105%;
	}
`;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: calc(100% - 1rem);
	padding: 0 0.5rem;
	height: 100%;
`;

const Box = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: ${({ theme }) => theme.colors.PRIMARY_TEXT};
	background-color: ${({ theme }) => theme.colors.WHITE};
	border-radius: ${({ theme }) => theme.shape.BORDER_RADIUS};
	max-width: 696px;
	row-gap: 1rem;
	height: 360px;
	width: 100%;
	padding: 0.5rem;
	transition: all 0.5s ease-in-out;
	text-align: center;
	opacity: 1;
`;

const Title = styled.h1`
	font-size: 32px;
`;
