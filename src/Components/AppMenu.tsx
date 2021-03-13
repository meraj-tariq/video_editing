import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {
	Menu,
	IconButton,
	ListItemText,
	withStyles,
	Theme,
	MenuItem,
} from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

type Props = {
	icon?: ReactNode;
	listItem: any;
	tableIcon?: boolean;
	patient?: boolean | undefined;
};

export const StyledMenuItem = withStyles((theme: Theme) => ({
	root: {
		'&:focus': {
			// backgroundColor: theme.palette.primary.main,
			'& .MuiListItemIcon-root, & .MuiListItemText-primary': {
				// color: theme.palette.common.white,
			},
		},
	},
}))(MenuItem);

export default function AppMenu({ patient, listItem, icon, tableIcon }: Props) {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleMenuItem = (item: any) => {
		item[0]();
		handleClose();
	};

	return (
		<Wrapper patient={patient}>
			<IconButton aria-controls='menu' onClick={handleClick}>
				{icon ? icon : tableIcon ? <MoreHorizIcon /> : <MoreVertIcon />}
			</IconButton>
			<Menu
				id='customized-menu'
				elevation={5}
				getContentAnchorEl={null}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				anchorEl={anchorEl}
				// keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				{listItem.map((_item: any, i: any) => (
					<StyledMenuItem
						key={i}
						onClick={() => handleMenuItem(Object.values(_item))}
					>
						<ListItemText primary={Object.keys(_item)} />
					</StyledMenuItem>
				))}
			</Menu>
		</Wrapper>
	);
}

const Wrapper = styled.div<{ patient: boolean | undefined }>`
	position: ${({ patient }) => (patient ? 'absolute' : 'none')};
	top: 0;
	right: 0;
`;
