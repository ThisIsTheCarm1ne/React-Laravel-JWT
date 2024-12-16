import {
    useState
} from "react";

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault();
        setError('');

        // Simple password validation: At least one digit, upper & lower case
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            setError('Password must include at least 8 characters, a digit, and both uppercase & lowercase letters.');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Registration successful!');
            } else {
                setError(data.error || 'Registration failed.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    }

    return (
        <form onSubmit={handleRegister}>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <h2>Register a user</h2>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
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
            <button type="submit">Register</button>
        </form>
    )
}