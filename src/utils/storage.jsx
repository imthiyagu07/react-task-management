export function initializeUsers() {
    const usersExists = localStorage.getItem('users');
    if (!usersExists) {
        const users = [
            {id: 'admin', username: 'admin', password: 'admin123', role: 'admin'},
            {id: 'u1', username: 'user1', password: 'user123', role: 'user'},
            {id: 'u2', username: 'user2', password: 'user123', role: 'user'}
        ];
        localStorage.setItem('users', JSON.stringify(users));
    }
};

export const authenticateUser = (username, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username && u.password === password)
    return user || null;
}

export const getUsers = () => {
    return JSON.parse(localStorage.getItem('users') || '[]');
}