import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import userService from '../../services/UserService';
import { IUser } from '../../services/types';
import UserComponent from '../../components/UserComponent';
import { FiChevronDown } from "react-icons/fi";
import { FiChevronUp } from "react-icons/fi";
import MobileUserComponent from '../../components/MobileUserComponent';
import { FilterBar } from '../../components/FilterBar';
import { UserListStyled as Styled } from "./styled";
import useUserList from '../../useHook/useUserList';

const fetchUsers = async () => {
    const res = await userService.getUsers();
    return res.data;
}

const TABLE_HEADERS: Array<keyof IUser> = ['name', 'email', 'phone', 'website', 'address', 'company'];

const UserList = () => {
    const { data: users, isLoading, error } = useQuery<IUser[], AxiosError>('users', fetchUsers);

    const {
        paginatedUsers,
        filterKey,
        sortField,
        sortDirection,
        setFilterKey,
        filterStr,
        setFilterStr,
        handleSort,
        handlePageChange,
        currentPage,
        totalPages
    } = useUserList(users!);

    if (isLoading) return <div>Loading...</div>

    if (error) return <div>An error has occurred: {error.message}</div>

    if (!users || users?.length === 0) return <div>no users found</div>

    return (
        <Styled.UserListContainer>
            <FilterBar
                filterKey={filterKey}
                filterStr={filterStr}
                onFilterKeyChange={setFilterKey}
                onFilterStrChange={setFilterStr}
                TABLE_HEADERS={TABLE_HEADERS}
            />
            <Styled.TableContainer>
                <Styled.Table>
                    <thead >
                        <tr>
                            {TABLE_HEADERS.map((TABLE_HEADER) =>
                                //for sorting
                                <Styled.TableHeader
                                    isSorted={TABLE_HEADER === sortField}
                                    onClick={() => handleSort(TABLE_HEADER)}>
                                    {TABLE_HEADER}
                                    {TABLE_HEADER === sortField && sortDirection === "asc"
                                        ? <FiChevronUp />
                                        : <FiChevronDown />}
                                </Styled.TableHeader>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedUsers && paginatedUsers.length > 0
                            ? paginatedUsers.map((user) => <UserComponent user={user} />
                            )
                            : <tr>
                                <td colSpan={7}>No users found.</td>
                            </tr>
                        }
                    </tbody>
                </Styled.Table>

            </Styled.TableContainer>
            <Styled.MobileContainer>
                <Styled.MobileSortContainer>
                    {TABLE_HEADERS.map((TABLE_HEADER) =>
                        //for sorting
                        <Styled.Button
                            isSorted={TABLE_HEADER === sortField}
                            onClick={() => handleSort(TABLE_HEADER)}>
                            {TABLE_HEADER}
                            {TABLE_HEADER === sortField && sortDirection === "asc"
                                ? <FiChevronUp />
                                : <FiChevronDown
                                />}
                        </Styled.Button>
                    )}
                </Styled.MobileSortContainer>
                <div>
                    {paginatedUsers && paginatedUsers.length > 0
                        ? paginatedUsers.map((user) => <MobileUserComponent user={user} />
                        )
                        : <div>No users found.</div>
                    }
                </div>
            </Styled.MobileContainer>
            <Styled.PagingContainer>
                {Array.from({ length: totalPages }, (_, index) => (
                    <Styled.PageButton isSelected={currentPage === index + 1} key={index} onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                    </Styled.PageButton>
                ))}
            </Styled.PagingContainer>
        </Styled.UserListContainer>
    );
}

export default UserList;