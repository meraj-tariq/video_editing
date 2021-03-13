import React from 'react';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		fade: {
			'&:focus': {
				outline: 'none',
			},
			[theme.breakpoints.down('sm')]: {
				width: '100%',
			},
		},
	})
);

interface FadeProps {
	children?: React.ReactElement;
	in: boolean;
	onEnter?: () => {};
	onExited?: () => {};
}

export const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(
	props,
	ref
) {
	const { in: open, children, onEnter, onExited, ...other } = props;
	const style = useSpring({
		from: { opacity: 0 },
		to: { opacity: open ? 1 : 0 },
		onStart: () => {
			if (open && onEnter) {
				onEnter();
			}
		},
		onRest: () => {
			if (!open && onExited) {
				onExited();
			}
		},
	});
	const classes = useStyles();
	return (
		<animated.div
			ref={ref}
			style={style}
			className={classes.fade}
			{...other}
		>
			{children}
		</animated.div>
	);
});
