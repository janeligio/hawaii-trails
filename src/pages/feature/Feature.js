import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import LoadingButton from '@mui/lab/LoadingButton';
import { getTrafficChipData, getDifficultyChipColor } from '../../util/util';
import {
    getFeaturePath,
    getFeatureStatisticsPath,
    POST_CHECKIN_ROUTE,
} from '../../routes/routes';
import Histogram from '../../components/Histogram/Histogram';
import './Feature.sass';

export default function Feature() {
    const [feature, setFeature] = useState(null);
    const [featureStatistics, setFeatureStatistics] = useState(null);
    const [isCheckingIn, setIsCheckingIn] = useState(false);
    const [isCheckInSuccess, setIsCheckInSuccess] = useState(null);

    const { getAccessTokenSilently, user } = useAuth0();

    const { featureId } = useParams();

    async function onCheckIn(user, featureId) {
        try {
            setIsCheckingIn(true);
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
            console.dir(responseData);
            if (responseData.status === 'success') {
                setIsCheckingIn(false);
                setIsCheckInSuccess(true);
            }
        } catch (error) {
            setIsCheckingIn(false);
            setIsCheckInSuccess(false);

            console.error(error);
        }
    }

    useEffect(() => {
        async function fetchData() {
            const api = getFeaturePath(featureId);
            const response = await fetch(api);
            const data = await response.json();
            console.log(data);
            setFeature(data);
        }
        fetchData();
    }, [featureId]);

    useEffect(() => {
        async function fetchFeatureStatistics() {
            const api = getFeatureStatisticsPath(featureId);
            const response = await fetch(api);
            const data = await response.json();
            console.log(data);
            setFeatureStatistics(data);
        }
        fetchFeatureStatistics();
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
        if (!body || body === 'Unknown') {
            return null;
        }

        return (
            <Paper className="section">
                <h3>{title}</h3>
                <p>{body}</p>
            </Paper>
        );
    }
    return (
        <main id="feature">
            <h1 className="feature-name">
                {name || 'Feature Name Unavailable'}{' '}
                {user && (
                    <MyLoadingButton
                        isLoading={isCheckingIn}
                        handleClick={async () => {
                            await onCheckIn(user, featureId);
                        }}
                        checkInSuccess={isCheckInSuccess}
                    />
                )}
            </h1>
            <div className="feature-chips">
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
            <div className="feature-info">
                <Section title="District" body={district || 'Unknown'} />
                <Section title="Start Point" body={startPoint || 'Unknown'} />
                <Section title="End Point" body={endPoint || 'Unknown'} />
                <Section title="Elevation Gain" body={elevationGain} />
                <Section title="Features" body={features?.join(', ')} />
                <Section title="Amenities" body={amenities?.join(', ')} />
                <Section title="Climate" body={climate?.join(', ')} />
                <Section title="Hazards" body={hazards?.join(', ')} />
            </div>
            <div className="feature-graphs">
                <Paper elevatin={2}>
                    <Histogram data={featureStatistics} />
                </Paper>
            </div>
        </main>
    );
}

function MyLoadingButton({ isLoading, handleClick, checkInSuccess }) {
    let color = 'primary';
    let text = 'Check In';
    let isDisabled = false;
    if (checkInSuccess !== null) {
        if (checkInSuccess) {
            color = 'success';
            text = 'Checked In';
            isDisabled = true;
        } else {
            color = 'error';
            text = 'Error';
        }
    }

    const disabledClass = isDisabled ? 'disabled' : '';

    return (
        <LoadingButton
            className={`check-in-button ${disabledClass}`}
            color={color}
            onClick={handleClick}
            loading={isLoading}
            loadingPosition="start"
            variant="contained"
        >
            {text}
        </LoadingButton>
    );
}
