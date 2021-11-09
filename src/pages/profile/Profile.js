import { useAuth0 } from '@auth0/auth0-react';

export default function Profile() {
    const {
        user: { name, picture, email, nickname },
    } = useAuth0();

    return (
        <main id="profile">
            <h1>Profile</h1>
            <img src={picture} alt={name} />
            <h2>Name: {name}</h2>
            <p>Email: {email}</p>
            <p>Nickname: {nickname}</p>
        </main>
    );
}
