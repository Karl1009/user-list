import { useState, useMemo } from 'react';
import { IUser } from '../services/types';
import { sortUserHelper } from '../helpers/sortUserHelper';

const ITEMS_PER_PAGE = 5;

const useUserList = (users: IUser[]) => {
    const [filterKey, setFilterKey] = useState<keyof IUser>('name');
    const [filterStr, setFilterStr] = useState<string>('');
    const [sortField, setSortField] = useState<keyof IUser>('name');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [currentPage, setCurrentPage] = useState(1);

    const handleSort = (field: keyof IUser) => {
        if (sortField === field) {
            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
        setCurrentPage(1);
    }

    const sortedUsers = useMemo(() => {
        return sortUserHelper(users!, sortField, sortDirection, filterKey, filterStr);
    }, [users, sortField, sortDirection, filterKey, filterStr]);

    const paginatedUsers = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return sortedUsers?.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [sortedUsers, currentPage]);

    const totalPages = sortedUsers ? Math.ceil(sortedUsers.length / ITEMS_PER_PAGE) : 0;

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    }

    return {
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
    };
};

export default useUserList;
