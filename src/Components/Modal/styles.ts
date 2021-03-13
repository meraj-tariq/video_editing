import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		modal: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			padding: theme.spacing(2),
		},
		paper: {
			backgroundColor: theme.palette.background.paper,
			boxShadow: theme.shadows[5],
			// padding: theme.spacing(2, 4, 3),
			borderRadius: 5,
			width: 584,
			overflowY: 'hidden',
			overflowX: 'hidden',
			padding: '1rem 0',

			[theme.breakpoints.down('sm')]: {
				width: '100%',
			},
		},
	})
);
