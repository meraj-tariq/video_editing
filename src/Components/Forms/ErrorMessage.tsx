import React from 'react';
import styled from 'styled-components';

type Props = {
	error: boolean;
	visible: boolean;
};

function ErrorMessage({ error, visible }: Props) {
	if (!visible || !error) return null;

	return <Text>{error}</Text>;
}

const Text = styled.p`
	color: ${({ theme }) => theme.colors.DANGER};
	font-size: 12px;
`;
export default ErrorMessage;
