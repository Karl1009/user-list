import { useState, useMemo } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { AxiosError } from 'axios';
import userService from '../../services/UserService';
import { IUser } from '../../services/types';
import UserComponent from '../../components/UserComponent';
import { sortUsers } from '../../utils/sortUsers';
import { FiChevronDown } from "react-icons/fi";
import { FiChevronUp } from "react-icons/fi";
import MobileUserComponent from '../../components/MobileUserComponent';
import { FilterBar } from '../../components/FilterBar';

const fetchUsers = async () => {
    const res = await userService.getUsers();
    return res.data;
}
const UserContainer = styled.div`
    padding: 2em;
`

const UserTableContainer = styled.div`
    margin: 0 auto;
    width: 100%;
    display: block;

    @media (max-width: 73.5em) {
        display: none;
    }
`;

const UserMobileContainer = styled.div`
    display: none;
    @media (max-width: 73.5em) {
        display: block;
    }
`;



const UserTable = styled.table`
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`


const TableHeader = styled.tr`
    background: #36304a;
    color: white;
`

const TableHeaderCol = styled.th<{ isSorted: boolean }>`
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
`


const MobileSortButton = styled.button<{ isSorted: boolean }>`
    padding: 0.5em 0.25em;
    cursor: pointer;
    background: #36304a;
    color: white;
    border-radius: 0.5em;
    background-color: ${props => props.isSorted ? "#50486c" : "defaultColor"}

    &:hover {
        background-color: #50486c;
    }
`

const TABLE_HEADERS: Array<keyof IUser> = ['name', 'email', 'phone', 'website', 'address', 'company'];

const UserList = () => {
    const { data: users, isLoading, error } = useQuery<IUser[], AxiosError>('users', fetchUsers);
    const [filterKey, setFilterKey] = useState<keyof IUser>('name'); // Default filter by 'name'.
    const [filterStr, setFilterStr] = useState<string>(''); // Default filtering string is empty.
    const [sortField, setSortField] = useState<keyof IUser>('name');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const handleSort = (field: keyof IUser) => {
        if (sortField === field) {
            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    }

    const sortedUsers = useMemo(() => {
        return sortUsers(users!, sortField, sortDirection, filterKey, filterStr);
    }, [users, sortField, sortDirection, filterKey, filterStr]);

    if (isLoading) return <div>Loading...</div>

    if (error) return <div>An error has occurred: {error.message}</div>

    if (!users || users?.length === 0) return <div>no users found</div>

    return (
        <UserContainer>
            <FilterBar
                filterKey={filterKey}
                filterStr={filterStr}
                onFilterKeyChange={setFilterKey}
                onFilterStrChange={setFilterStr}
                TABLE_HEADERS={TABLE_HEADERS}
            />
            <UserTableContainer>
                <UserTable>
                    <thead style={{ width: "100%" }}>
                        <TableHeader>
                            {TABLE_HEADERS.map((TABLE_HEADER) =>
                                <TableHeaderCol
                                    isSorted={TABLE_HEADER === sortField}
                                    onClick={() => handleSort(TABLE_HEADER)}>
                                    {TABLE_HEADER}
                                    {TABLE_HEADER === sortField && sortDirection === "asc"
                                        ? <FiChevronUp />
                                        : <FiChevronDown />}
                                </TableHeaderCol>
                            )}
                        </TableHeader>
                    </thead>
                    <tbody>
                        {sortedUsers && sortedUsers.length > 0
                            ? sortedUsers.map((user) => <UserComponent user={user} />
                            )
                            : <tr>
                                <td colSpan={7}>No users found.</td>
                            </tr>
                        }
                    </tbody>
                </UserTable>
            </UserTableContainer>
            <UserMobileContainer>
                <MobileSortContainer>
                    {TABLE_HEADERS.map((TABLE_HEADER) =>
                        <MobileSortButton
                            isSorted={TABLE_HEADER === sortField}
                            onClick={() => handleSort(TABLE_HEADER)}>
                            {TABLE_HEADER}
                            {TABLE_HEADER === sortField && sortDirection === "asc"
                                ? <FiChevronUp />
                                : <FiChevronDown
                                />}
                        </MobileSortButton>
                    )}
                </MobileSortContainer>
                <div>
                    {sortedUsers && sortedUsers.length > 0
                        ? sortedUsers.map((user) => <MobileUserComponent user={user} />
                        )
                        : <div>No users found.</div>
                    }
                </div>
            </UserMobileContainer>
        </UserContainer>
    );
}

export default UserList;