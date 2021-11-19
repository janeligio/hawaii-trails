import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { getFeaturePath } from '../../routes/routes';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { getTrafficChipData, getDifficultyChipColor } from '../../util/util';
import { Button } from '@mui/material';
import { POST_CHECKIN_ROUTE } from '../../routes/routes';
import './Feature.sass';

export default function Feature() {
    const [feature, setFeature] = useState(null);

    const { getAccessTokenSilently, user } = useAuth0();

    const { featureId } = useParams();

    async function onCheckIn(user, featureId) {
        const { name, picture, email, nickname } = user;
        try {
            const token = await getAccessTokenSilently();

            const response = await fetch(POST_CHECKIN_ROUTE, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: user,
                    featureId: featureId,
                }),
            });

            const responseData = await response.json();
            console.log(responseData);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        async function fetchData() {
            const api = getFeaturePath(featureId);
            const response = await fetch(api);
            const data = await response.json();
            setFeature(data);
        }
        fetchData();
    }, [featureId]);

    let name,
        traffic,
        island,
        district,
        features,
        amenities,
        hazards,
        climate,
        elevationGain,
        difficulty,
        startPoint,
        endPoint;
    if (feature) {
        name = feature.name;
        traffic = feature.traffic;
        island = feature.island;
        district = feature.district;
        features = feature.features;
        amenities = feature.amenities;
        hazards = feature.hazards;
        climate = feature.climate;
        elevationGain = feature.elevationGain;
        difficulty = feature.difficulty;
        startPoint = feature.startPoint;
        endPoint = feature.endPoint;
    }

    const [trafficLabel, trafficColor, trafficTextColor] =
        getTrafficChipData(traffic);
    const [difficultyColor, difficultyTextColor] =
        getDifficultyChipColor(difficulty);

    function Section({ title, body }) {
        return (
            <Paper className="section">
                <h3>{title}</h3>
                <p>{body}</p>
            </Paper>
        );
    }
    return (
        <main id="feature">
            <h1>{name || 'Feature Name Unavailable'}</h1>
            <div>
                {traffic && (
                    <Chip
                        label={trafficLabel}
                        style={{
                            background: trafficColor,
                            color: trafficTextColor,
                        }}
                    />
                )}
                {difficulty && difficulty !== 'N/A' && (
                    <Chip
                        label={difficulty}
                        style={{
                            background: difficultyColor,
                            color: difficultyTextColor,
                        }}
                    />
                )}
                {island && (
                    <Chip
                        label={island}
                        style={{ background: '#00bcd4', color: 'white' }}
                    />
                )}
            </div>
            <div className="feature-actions">
                <Button
                    variant="contained"
                    onClick={async () => {
                        await onCheckIn(user, featureId);
                    }}
                >
                    Check In
                </Button>
            </div>
            <div className="feature-info">
                <Section title="District" body={district || 'Unknown'} />
                <Section title="Start Point" body={startPoint || 'Unknown'} />
                <Section title="End Point" body={endPoint || 'Unknown'} />
                <Section
                    title="Elevation Gain"
                    body={elevationGain || 'Unknown'}
                />
                <Section
                    title="Features"
                    body={features?.join(', ') || 'Unknown'}
                />
                <Section
                    title="Amenities"
                    body={amenities?.join(', ') || 'Unknown'}
                />
                <Section
                    title="Climate"
                    body={climate?.join(', ') || 'Unknown'}
                />
                <Section
                    title="Hazards"
                    body={hazards?.join(', ') || 'Unknown'}
                />
            </div>
        </main>
    );
}
