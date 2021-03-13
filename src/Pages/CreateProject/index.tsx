import React, { useState } from 'react';
import styled from 'styled-components';
import AccountBar from '../../Components/AccountBar';
import useModal from '../../Hooks/UseModal';
import UploadVideo from './UploadVideoModal';

// import ClipPath from '../../Assets/Images/clip-path.png';
import { Button } from '../../Styles/styles.global';
import { useHistory } from 'react-router-dom';

import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import PublishIcon from '@material-ui/icons/Publish';

const CreateProject = () => {
	const uploadModal = useModal();
	const history = useHistory();
	const [project, setProject] = useState('new');

	const handleProject = () => {
		if (project === 'new') return uploadModal.open();
		if (project === 'videos') return history.push('/videos');
	};
	return (
		<AccountBar upload>
			<UploadVideo controller={uploadModal} />

			<ProjectActionWrapper>
				<Container
					onClick={() => setProject('new')}
					selectBorder={project === 'new'}
				>
					{/* <img src={ClipPath} alt='no video' /> */}
					<IconWrapper>
						<PublishIcon fontSize='inherit' />
					</IconWrapper>
					<Title>Add New Video</Title>
					<Notice>
						You do not have any video project uploaded to your
						workspace.
					</Notice>
				</Container>

				<Container
					onClick={() => setProject('videos')}
					selectBorder={project === 'videos'}
				>
					{/* <img src={ClipPath} alt='no video' /> */}
					<IconWrapper>
						<VideoLibraryIcon fontSize='inherit' />
					</IconWrapper>
					<Title>Edit From List</Title>
					<Notice>
						Edit video from a list of videos already uploaded to
						your workspace.
					</Notice>
				</Container>
			</ProjectActionWrapper>
			<StyledButton onClick={handleProject}>Start Project</StyledButton>
		</AccountBar>
	);
};

export default CreateProject;
const IconWrapper = styled.div`
	font-size: 6rem;
	margin: 1rem 0;
	color: ${({ theme }) => theme.colors.PRIMARY_DARK};
`;

const Container = styled.div<{ selectBorder?: boolean }>`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	width: 235px;
	color: ${({ theme }) => theme.colors.PRIMARY_TEXT};
	margin: 0.5rem 1rem;
	border: ${({ selectBorder, theme }) =>
		selectBorder ? `2px solid ${theme.colors.PRIMARY}` : 'none'};
	padding: 1rem;
	cursor: pointer;
	margin-bottom: 3rem;
	box-shadow: ${({ theme }) => theme.shadows.S2};
	border-radius: ${({ theme }) => theme.shape.BORDER_RADIUS};
	overflow: hidden;

	&:hover {
		/* border: 4px solid #369daa; */

		${IconWrapper} {
			opacity: 0.5;
			transition: all 0.3s linear;
		}
	}
`;

const Title = styled.p`
	font-family: ${({ theme }) => theme.fonts.CIRCULAR_BOLD};
	font-size: 20px;
	color: ${({ theme }) => theme.colors.SECONDARY_TEXT};
`;

const Notice = styled.p`
	margin: 1.5rem 0;
	color: ${({ theme }) => theme.colors.PRIMARY_TEXT};
`;

const StyledButton = styled(Button)`
	width: 14rem;
`;

const ProjectActionWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	justify-items: center;
	align-content: center;
	justify-content: center;
`;
