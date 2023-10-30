import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDisplay: React.FC = () => {
    const [users, setUsers] = useState<{ name: string; email: string }[]>([]);

    const fetchUserData = async () => {
        try {
            const response = await axios.get('https://randomuser.me/api');
            const data = response.data;
            const userData = data.results.map((user: any) => ({
                name: `${user.name.title} ${user.name.first} ${user.name.last}`,
                email: user.email,
            }));
            setUsers(userData);
            localStorage.setItem('users', JSON.stringify(userData));
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const refreshUsers = () => {
        setUsers([]);
        fetchUserData();
    };

    useEffect(() => {
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
            setUsers(JSON.parse(storedUsers));
        } else {
            fetchUserData();
        }
    }, []);

    return (
        <div>
            {users.length > 0 ? (
                <>
                    {users.map((user, index) => (
                        <div key={index}>
                            <div>
                                <strong>Name:</strong> {user.name}
                            </div>
                            <div>
                                <strong>Email:</strong> {user.email}
                            </div>
                        </div>
                    ))}
                    <button onClick={refreshUsers}>Refresh</button>
                </>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default UserDisplay;
