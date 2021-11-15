export function getTrafficChipData(traffic) {
    let label, color, textColor;

    if (traffic < 20) {
        label = 'Not Busy';
        color = '#00FF00';
        textColor = '#000000';
    } else if (traffic < 40) {
        label = 'Slightly Busy';
        color = '#7FFF00';
        textColor = '#000000';
    } else if (traffic < 60) {
        label = 'Fairly Busy';
        color = '#FFFF00';
        textColor = '#000000';
    } else if (traffic < 80) {
        label = 'Busy';
        color = '#FF7F00';
        textColor = '#000000';
    } else if (traffic <= 100) {
        label = 'Very Busy';
        color = '#FF0000';
        textColor = '#FFFFFF';
    }

    return [label, color, textColor];
}

export function getDifficultyChipColor(difficulty) {
    let color;
    let textColor;

    switch (difficulty) {
        case 'Easy':
            color = '#00FF00';
            textColor = 'black';
            break;
        case 'Moderate':
            color = '#FFFF00';
            textColor = 'black';
            break;
        case 'Difficult':
            color = '#FF0000';
            textColor = 'white';
            break;
        case 'N/A':
            break;
        default:
            break;
    }

    return [color, textColor];
}
