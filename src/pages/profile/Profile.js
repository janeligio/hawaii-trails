import { useAuth0 } from '@auth0/auth0-react';
import { Paper } from '@mui/material';
import './Profile.sass';
export default function Profile() {
    const {
        user: { name, picture, email, nickname },
    } = useAuth0();

    const checkIns = [
        {
            id: 1,
            name: 'Diamond Head',
            date: '2020-05-01',
        },
        {
            id: 2,
            name: 'Koko Head',
            date: '2020-05-01',
        },
    ];
    return (
        <main id="profile">
            <div className="user">
                <img className="image" src={picture} alt={name} />
                <div className="info">
                    <p>{nickname}</p>
                    <p>{email}</p>
                </div>
            </div>
            <div className="check-in">
                <h1>Recent check-ins</h1>
                <div className="check-in-container">
                    {checkIns.map((checkIn) => (
                        <Paper key={checkIn.id} className="check-in-item">
                            <p>{checkIn.date}</p>
                            <p>{checkIn.name}</p>
                        </Paper>
                    ))}
                </div>
            </div>
        </main>
    );
}
