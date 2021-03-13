import styled from "styled-components";

const Root = styled.div`
  /* display: none; */
  position: relative;
  padding: 16px calc(16px + 0.5rem) 0 16px;
  height: calc(100% - 16px);
  overflow: auto;
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 5px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
    border-radius: 5px;
  }

  @media ${({ theme }) => theme.screens.SMALL_TABLET} {
    height: fit-content;
  }
`;
export { Root };
