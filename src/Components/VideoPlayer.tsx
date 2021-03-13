import React from 'react';
import styled from 'styled-components';

export const VideoPlayer = ({ src }: any) => {
	return (
		<Root
			className='video'
			style={{
				position: 'relative',
				paddingBottom: '56.25%' /* 16:9 */,
				paddingTop: 25,
				height: 0,
			}}
		>
			<video
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '90%',
				}}
				src={src}
			/>
		</Root>
	);
};

const Root = styled.div`
	background-color: ${({ theme }) => theme.colors.PRIMARY_TEXT};
`;
