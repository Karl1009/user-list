import styled from 'styled-components';
import { IUser } from '../../services/types';

interface Props {
    user: IUser
}

const TableRow = styled.tr`
    &:nth-child(even) {
        background: var(--var-third-clr);
    }
`;

const TableCell = styled.td`
    border: 1px solid #f5f5f5;
    padding: 8px;
`;

const UserComponent = ({ user }: Props) => {

    return (
        <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.phone}</TableCell>
            <TableCell>{user.website}</TableCell>
            <TableCell>{`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}</TableCell>
            <TableCell>{user.company.name}</TableCell>
        </TableRow>
    )
}

export default UserComponent;
