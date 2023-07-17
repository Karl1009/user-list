import { render, screen, waitFor } from '@testing-library/react';
import userService from '../services/UserService';
import UserList from '../pages/UserList';
import { QueryClient, QueryClientProvider } from 'react-query';

jest.mock('../services/UserService');

const users = [
    {
        id: 1,
        name: 'Karl Cheung',
        username: 'Bret',
        email: 'Sincere@april.biz',
        address: {
            street: 'Kulas Light',
            suite: 'Apt. 556',
            city: 'Gwenborough',
            zipcode: '92998-3874',
            geo: {
                lat: '37.3159',
                lng: '81.1496'
            }
        },
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org',
        company: {
            name: 'Romaguera-Crona',
            catchPhrase: 'Multi-layered client-server neural-net',
            bs: 'harness real-time e-markets'
        }
    },
    // Add more users as needed...
];

describe('UserList', () => {
    beforeAll(() => {
        (userService.getUsers as jest.Mock).mockResolvedValue({ data: users });
    });

    it('displays users when component is rendered', async () => {
        const queryClient = new QueryClient()
        render(
            <QueryClientProvider client={queryClient}>
                <UserList />
            </QueryClientProvider>
        );

        await waitFor(() => {
            const userNameElements = screen.queryAllByText(/Karl Cheung/i);
            expect(userNameElements.length).toBeGreaterThan(0);
        }, { timeout: 4000 });

    });
});
