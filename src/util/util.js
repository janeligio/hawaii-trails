export function getTrafficChipData(traffic) {
    let label, color, textColor, className;

    if (traffic < 20) {
        label = 'Not Busy';
        color = '#00FF00';
        textColor = '#000000';
        className = 'traffic-chip-not-busy';
    } else if (traffic < 40) {
        label = 'Slightly Busy';
        color = '#7FFF00';
        textColor = '#000000';
        className = 'traffic-chip-slightly-busy';
    } else if (traffic < 60) {
        label = 'Fairly Busy';
        color = '#FFFF00';
        textColor = '#000000';
        className = 'traffic-chip-fairly-busy';
    } else if (traffic < 80) {
        label = 'Busy';
        color = '#FF7F00';
        textColor = '#000000';
        className = 'traffic-chip-busy';
    } else if (traffic <= 100) {
        label = 'Very Busy';
        color = '#FF0000';
        textColor = '#FFFFFF';
        className = 'traffic-chip-very-busy';
    }

    return [label, color, textColor, className];
}

export function getDifficultyChipColor(difficulty) {
    let color, textColor, className;

    switch (difficulty) {
        case 'Easy':
            color = '#00FF00';
            textColor = 'black';
            className = 'difficulty-chip-easy';
            break;
        case 'Moderate':
            color = '#FFFF00';
            textColor = 'black';
            className = 'difficulty-chip-moderate';
            break;
        case 'Difficult':
            color = '#FF0000';
            textColor = 'white';
            className = 'difficulty-chip-difficult';
            break;
        case 'N/A':
            break;
        default:
            break;
    }

    return [color, textColor, className];
}
