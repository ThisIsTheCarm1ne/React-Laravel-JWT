import {
    useState
} from "react";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [token, setToken] = useState('');

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setError('');

        try {
            console.log('Sending request', email, password);
            const response = await fetch('http://127.0.0.1:8000/api/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password}),
            });

            const data = await response.json();
            console.log(email, password, data);
            if (response.ok) {
                console.log(data.token);
                setToken(data.token);
                alert('Login successful!');
            } else {
                console.log(error);
                setError(data.error || 'Login failed.');
            }
        } catch (err) {
            console.log(error);
            setError('An error occurred. Please try again.');
        }
    }
    return (
        <>
            {token.length === 0 ? (
                <>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <h2>Login</h2>
                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <br/>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <br/>
                        <button type="submit">Login</button>
                    </form>
                </>
            ) : (
                <div>
                    <h3>Logged In!</h3>
                    <p>Token: {token}</p>
                </div>
            )}
        </>
    )
}