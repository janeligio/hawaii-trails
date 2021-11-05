import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import './AccountForm.sass';

export default function AccountForm({ page, onSubmit }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const buttonTitle = page === 'login' ? 'Log In' : 'Sign Up';
    const redirectTitle =
        page === 'login'
            ? 'Create an account.'
            : 'Already have an account? Log in.';
    const redirectTo = page === 'login' ? '/signup' : '/login';
    return (
        <div className="account-form-container">
            <h3>{buttonTitle}</h3>
            <form className="account-form">
                <TextField
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="standard-basic"
                    type="email"
                    label="Email"
                    variant="standard"
                />
                <TextField
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="standard-basic"
                    type="password"
                    label="Password"
                    variant="standard"
                />
                <div className="actions">
                    <Button size="small" variant="contained" onClick={onSubmit}>
                        {buttonTitle}
                    </Button>
                    <Link to={redirectTo}>{redirectTitle}</Link>
                </div>
            </form>
        </div>
    );
}
