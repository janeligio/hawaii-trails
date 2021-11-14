import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFeaturePath } from '../../routes/routes';
import './Feature.sass';

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

    return (
        <main id="feature">
            <h1>Feature</h1>
            <h2>{feature?.name}</h2>
        </main>
    );
}
