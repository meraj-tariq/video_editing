import React from 'react';

export const YoutubePlayer = ({ youtubeId }: any) => {
	return (
		<div
			className='video'
			style={{
				position: 'relative',
				paddingBottom: '56.25%' /* 16:9 */,
				paddingTop: 25,
				height: 0,
			}}
		>
			<iframe
				title='telios'
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '90%',
				}}
				src={`https://www.youtube.com/embed/${youtubeId}`}
				frameBorder='0'
			/>
		</div>
	);
};
