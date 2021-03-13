import React from "react";
import BackDrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";

export interface TableField<T> {
  name: keyof T;
  displayName?: string;
}

export interface tableData<T> {
  items: T[];
}

export type FieldBuilder<T, D> = (
  field: TableField<T>,
  data: D,
  row: number,
  column: number
) => React.ReactNode;

export interface TableProps<T, D> {
  fields: TableField<T>[];
  tableData: D[];
  title?: string;
  noDataMessage?: string;
  builder: FieldBuilder<T, D>;
  isLoading?: boolean;
  startColumn?: number;
  startRow?: number;
  columns?: number;
  rows?: number;
  before?: React.ReactNode;
  after?: React.ReactNode;
}

function Table<TField, TData = TField>({
  tableData,
  title,
  fields,
  builder,
  isLoading = false,
  columns,
  rows,
  after,
  noDataMessage = "No records found to display",
  startColumn = 0,
  startRow = 0,
}: TableProps<TField, TData>) {
  const numberOfColumns = columns || fields.length;
  const numberOfRows = tableData.length > 0 ? rows || tableData.length : 0;
  const columnElements: React.ReactNode[] = [];

  for (let i = startRow; i < startRow + numberOfRows; i += 1) {
    const data = tableData[i];
    const rowElements: React.ReactNode[] = [];

    for (let j = startColumn; j < startColumn + numberOfColumns; j += 1) {
      const field = fields[j];
      rowElements.push(<td key={j}>{builder(field, data, i, j)}</td>);
    }

    columnElements.push(<tr key={i}>{rowElements}</tr>);
  }

  return (
    <Container>
      <Title>{title}</Title>
      <HR />
      <TableContainer>
        <StyledTable>
          <THead>
            <TR>
              {fields.map((data) => (
                <TH scope="col" key={Math.random().toString()}>
                  {data.displayName || data.name}
                </TH>
              ))}
            </TR>
          </THead>
          <tbody>{columnElements}</tbody>
        </StyledTable>
        <StyledBackdrop open={!tableData.length && isLoading}>
          <CircularProgress size={25} />
        </StyledBackdrop>

        <NoResultCover hide={columnElements?.length > 0}>
          <NoResult hide={isLoading}>{noDataMessage}</NoResult>
        </NoResultCover>
        <TableAfter>{after || null}</TableAfter>
      </TableContainer>
    </Container>
  );
}

export default Table;

export const Container = styled.div`
  margin-top: 2rem;
  border: 1px solid #e5e5e6;
  box-shadow: 3px 4px 5px #ebebec;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  padding: 0 1rem;
  position: relative;
`;

export const TableContainer = styled.div`
  min-height: 150px;
  color: ${({ theme }) => theme.colors.DARK};
  font-family: ${({ theme }) => theme.fonts.CIRCULAR_BOOK};
  overflow-x: auto;

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
`;

export const StyledTable = styled.table``;

export const StyledBackdrop = styled(BackDrop)`
  z-index: 10;
  position: absolute;
  top: 0;
  background-color: #f7f8fc80;
  margin-top: 40px;
`;

export const NoResultCover = styled.div<{ hide: boolean }>`
  min-height: 130px;
  font-family: ${({ theme }) => theme.fonts.CIRCULAR_MEDIUM};
  display: flex;
  justify-content: center;
  align-items: center;
  display: ${({ hide }) => hide && "none"};
`;

export const NoResult = styled.div<{ hide: boolean }>`
  display: ${({ hide }) => hide && "none"};
`;

export const TableAfter = styled.div`
  padding-bottom: 10px;
`;

const Title = styled.h3`
  margin: 10px 0;
  font-family: ${({ theme }) => theme.fonts.CIRCULAR_BOLD};
`;

export const HR = styled.hr`
  border: 1px solid #e5e5e6;
`;

export const TH = styled.th`
  white-space: nowrap;
  min-width: 100px;
  text-align: start;
`;

export const TR = styled.tr`
  line-height: 30px;
  border-bottom: 1px solid #f1f1f1;
`;

export const TD = styled.td`
  white-space: nowrap;
`;

export const THead = styled.thead`
  border-bottom: 2px solid #e5e5e6;
  font-family: ${({ theme }) => theme.fonts.CIRCULAR_BOLD};
`;
