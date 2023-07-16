import styled from 'styled-components';
import { IUser } from '../../services/types';

interface Props {
    user: IUser
}

const Card = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1rem;
    padding: 1rem;
    border-radius: 10px;
    background-color: #f5f5f5;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const CardProperty = styled.p`
    margin: 0.5rem 0;
`;

const MobileUserComponent: React.FC<Props> = ({ user }) => {
    return (
        <Card>
            <h2>{user.name}</h2>
            <CardProperty>Email: {user.email}</CardProperty>
            <CardProperty>Phone: {user.phone}</CardProperty>
            <CardProperty>Website: {user.website}</CardProperty>
            <CardProperty>Address: {`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}</CardProperty>
            <CardProperty>Company: {user.company.name}</CardProperty>
        </Card>
    );
}

export default MobileUserComponent;
