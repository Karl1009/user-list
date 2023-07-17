import styled from 'styled-components';
import { IUser } from '../../services/types';

interface Props {
    user: IUser
}

const Card = styled.div`
    padding: 1em;
    margin: 1em 0;
    border-radius: 1 em;
    background-color: #f5f5f5;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;


const MobileUserComponent: React.FC<Props> = ({ user }) => {
    return (
        <Card>
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Website: {user.website}</p>
            <p>Address: {`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}</p>
            <p>Company: {user.company.name}</p>
        </Card>
    );
}

export default MobileUserComponent;
