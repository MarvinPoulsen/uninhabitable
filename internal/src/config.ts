const statusOptionsParam = '[uninhabitable.statusOptions]';
const statusOptionsDev = 'Startet;Afventer;Mangler;I gang';
export const statusOptions = statusOptionsParam.includes('[') ? statusOptionsDev.split(';') : statusOptionsParam.split(';');

const radioOptionsParam = '[uninhabitable.radioOptions]';
const radioOptionsDev = 'marpo;mewh;viny';

export const radioOptions = radioOptionsParam.includes('[') ? radioOptionsDev.split(';') : radioOptionsParam.split(';');


export const brand = {
    // radius: '0.0em',

    // Lolland colors Pantone 294
    darkBlue: '#003478',
    darkBlue80: '#335D93',
    darkBlue60: '#6685AE',
    darkBlue40: '#99AEC9',
    darkBlue20: '#CCD6E4',

    // Lolland colors Pantone 369
    green: '#58a618',
    green80: '#70B65F',
    green60: '#91C483',
    green40: '#BCD5A7',
    green20: '#D5E7CF',

    // Lolland colors Pantone 2905
    lightBlue: '#8FC9E6',
    lightBlue80: '#A4D4E4',
    lightBlue60: '#BBDEF0',
    lightBlue40: '#D2E9F3',
    lightBlue20: '#E8F3F8',

    // Lolland colors Pantone 638
    blueGreen: '#009BBB',
    blueGreen80: '#33AFC9',
    blueGreen60: '#66C3D6',
    blueGreen40: '#99D7E4',
    blueGreen20: '#CCEBF1',

    // Lolland colors Pantone 382
    limeGreen: '#BED600',
    limeGreen80: '#CBDE33',
    limeGreen60: '#D8E666',
    limeGreen40: '#E5EF99',
    limeGreen20: '#F2F7CC',

    // Lolland colors Pantone 5825
    umbra: '#827C34',
    umbra80: '#9B965D',
    umbra60: '#B4B085',
    umbra40: '#CDCBAE',
    umbra20: '#E6E5D6',

    // Add a serif family
    familySerif: 'Nunito, Verdana, Georgia, serif',
};
