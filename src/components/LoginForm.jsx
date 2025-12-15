import { useState } from "react";
import useAuthStore from "../stores/authStore";
import { authenticateUser } from "../utils/storage";

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login } = useAuthStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        const user = authenticateUser(username, password);
        if (user) {
            login(user);
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-card">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {error && <p className="error-text">{error}</p>}
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;