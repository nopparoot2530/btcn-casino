import styles from '../../styles/Login.module.scss';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import React from 'react';
import client from '../../utils/axiosConfig';
import { useRouter } from 'next/router'


export default function Login() {

    const [loginRequested, setLoginRequested] = React.useState(false);
    const [isFailed, setIsFailed] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const router = useRouter();

    const tpyeUsername = (event) => {
        setUsername(event.target.value);
    }

    const typePassword = (event) => {
        setPassword(event.target.value);
    }

    const login = () => {
        setLoginRequested(true);
        client.post('/auth/login', { name: username, password: password })
            .then(res => {
                sessionStorage.setItem('_at', res.data.token);
                router.push('/admin');

            })
            .catch(() => setIsFailed(true))
            .finally(() => setLoginRequested(false));
    }

    return (
        <div className={styles.container}>
            <div className={styles.loginCardBody}>
                <TextField
                    label="username"
                    variant="outlined"
                    error={isFailed}
                    onChange={tpyeUsername}
                    value={username}
                    onFocus={() => setIsFailed(false)}
                    disabled={loginRequested}
                />
                <TextField
                    label="password"
                    type="password"
                    variant="outlined"
                    error={isFailed}
                    onChange={typePassword}
                    value={password}
                    onFocus={() => setIsFailed(false)}
                    disabled={loginRequested}
                />
                <Button variant="contained" onClick={() => login()} disabled={loginRequested}>Login</Button>
                <div className={styles.errorMessage}>
                    {isFailed && 'username or password is incorrect'}
                </div>
            </div>
        </div>
    )
}