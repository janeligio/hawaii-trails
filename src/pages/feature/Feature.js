import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFeaturePath } from '../../routes/routes';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { getTrafficChipData, getDifficultyChipColor } from '../../util/util';
import './Feature.sass';
import { Button } from '@mui/material';

export default function Feature() {
    const [feature, setFeature] = useState(null);

    const { featureId } = useParams();

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
                {difficulty && (
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
                <Button variant="contained">Check In</Button>
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
