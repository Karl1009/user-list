// styledComponents.ts
import styled from 'styled-components';

const UserListContainer = styled.div`
    padding: 2em;
`;

const TableContainer = styled.div`
    margin: 0 auto;
    width: 100%;
    display: block;

    @media (max-width: 73.5em) {
        display: none;
    }
`;

const MobileContainer = styled.div`
    display: none;
    @media (max-width: 73.5em) {
        display: block;
    }
`;

const Table = styled.table`
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.th<{ isSorted: boolean }>`
    background: #36304a;
    color: white;
    padding: 1em;
    cursor: pointer;
    width:100%;
    background-color: ${props => props.isSorted ? "#50486c" : "defaultColor"}
    &:hover {
        background-color: #50486c;
    }
`;

const MobileSortContainer = styled.div`
    display: grid;
    gap: 0.5em;
    grid-template-columns: repeat(3, 1fr);
`;

const Button = styled.button<{ isSorted: boolean }>`
    padding: 0.5em 0.25em;
    cursor: pointer;
    background: #36304a;
    color: white;
    border-radius: 0.5em;
    background-color: ${props => props.isSorted ? "#50486c" : "defaultColor"}

    &:hover {
        background-color: #50486c;
    }
`;

const PageButton = styled.button<{ isSelected: boolean }>`
    padding: 0.5em 1em;
    background-color: ${props => props.isSelected ? "#5f74ed" : "#fff"};
    border-radius: 0.5em;
`;

const PagingContainer = styled.div`
    margin: 0.5em 0;
    display: flex;
    gap: 0.5em;
`;

export const UserListStyled = {
    UserListContainer,
    TableContainer,
    MobileContainer,
    Table,
    TableHeader,
    MobileSortContainer,
    Button,
    PageButton,
    PagingContainer
};
