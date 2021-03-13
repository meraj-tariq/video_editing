import React, { FC, ReactNode } from 'react';
import { string, oneOfType, node, arrayOf } from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

type Props = {
	to: string;
	className?: string;
	children: ReactNode;
};

export const StyledLink: FC<Props> = ({ to, className, children }) => (
	<SLink to={to} className={className} children={children} />
);

const SLink = styled(Link)`
	text-decoration: none;
	color: inherit;
	font-size: 1em;
	line-height: 1.38;
	letter-spacing: 0.32px;

	&:focus,
	&:hover,
	&:visited,
	&:link,
	&:active {
		text-decoration: none;
	}
`;

StyledLink.propTypes = {
	to: string.isRequired,
	className: string,
	children: oneOfType([arrayOf(node), node]).isRequired,
};
