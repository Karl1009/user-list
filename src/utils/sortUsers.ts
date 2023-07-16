import { Address, Company, IUser } from "../services/types";

export const sortUsers = (users: IUser[] = [], sortField: keyof IUser, sortDirection: 'asc' | 'desc', filterKey: keyof IUser, filterStr: string): IUser[] => {
    // First, filter the users.
    const filteredUsers = users.filter(user => {
        let userFieldValue: string | number | Address | Company | undefined = user[filterKey];


        if (filterKey === 'address') {
            userFieldValue = user.address.street;
        } else if (filterKey === 'company') {
            userFieldValue = user.company.name;
        }

        if (typeof userFieldValue === 'string') {
            return userFieldValue.toLowerCase().includes(filterStr.toLowerCase());
        }

        return true; // If the user field value is not a string, don't filter out this user.
    });

    // Then, sort the filtered users.
    const sortedUsers = filteredUsers.sort((a, b) => {
        let aFieldValue: string | number | Address | Company | undefined = a[sortField];
        let bFieldValue: string | number | Address | Company | undefined = b[sortField];

        if (sortField === 'address') {
            aFieldValue = a.address.street;
            bFieldValue = b.address.street;
        } else if (sortField === 'company') {
            aFieldValue = a.company.name;
            bFieldValue = b.company.name;
        }

        if (typeof aFieldValue === 'number' && typeof bFieldValue === 'number') {
            return sortDirection === 'asc' ? aFieldValue - bFieldValue : bFieldValue - aFieldValue;
        }

        if (typeof aFieldValue === 'string' && typeof bFieldValue === 'string') {
            return sortDirection === 'asc'
                ? aFieldValue.localeCompare(bFieldValue)
                : bFieldValue.localeCompare(aFieldValue);
        }

        return 0;
    });

    return sortedUsers;
}
