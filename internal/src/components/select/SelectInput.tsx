import React from 'react';
import Select, { Theme } from 'react-select';
import { statusOptions, brand } from '../../config';
import { CaseEntry } from '../../SPS';


// Definerer en interface for props til selectInput komponenten
interface selectInputProps {
    entry: CaseEntry; // En CaseEntry instans
    setEntry: (entry: CaseEntry) => void; // En funktion til at opdatere CaseEntry instansen
}

const selectInput = (props: selectInputProps) => {

    // Konverterer statusOptions til et format, der kan bruges af react-select
    const options: { value: string; label: string }[] = statusOptions.map((s) => ({
        value: s.toLowerCase().replace(/ /g, '_'), // Konverterer status til en værdi, der kan bruges som nøgle
        label: s, // Bruger status som label
    }));

    // Håndterer ændringer i caseStatus
    const handleCaseStatusChange = (event) => {
        try {
            let newEntry = { ...props.entry }; // Kopierer den nuværende entry
            newEntry.caseStatus = event===null ? event : event.value; // Opdaterer caseStatus med den nye værdi
            props.setEntry(newEntry); // Opdaterer entry med den nye entry
        } catch (error) {
            console.log('Noget gik galt!'); // Logger en fejl, hvis noget går galt
        }
    };

    // Definerer et custom tema til react-select
    const customTheme = (theme: Theme) => {
        const borderRadius = 'radius' in brand ? brand.radius as unknown as number : '0.375rem' as unknown as number; // Ændrer kantens radius for alle komponenter i temaet
        return {
            ...theme, // Kopierer alle eksisterende temaegenskaber
            borderRadius,
            colors: {
                ...theme.colors, // Kopierer alle eksisterende farveegenskaber
                // primary75: 'rgba(255, 0, 0, 1)', // Ændrer farven for primary25 egenskaben
                primary50: 'rgba(214, 217, 224, 1)', // Ændrer farven for primary25 egenskaben
                primary25: 'rgba(240, 241, 244, 1)', // Ændrer farven for primary25 egenskaben
                primary: brand.umbra, // Ændrer farven for primary egenskaben
            },
        };
    };

    // Definerer custom styles til react-select - Use React Select styles prop to override the styles.
    const customStyles = {
        // Styrer containerens stil
        control: (baseStyles, state) => ({
            ...baseStyles,
            // Ændrer borderfarven baseret på om elementet er fokuseret eller valgt - take the base styles, spread them , and, finally, override the desired styles with our custom styles
            borderColor: state.isFocused
                ? 'rgb(131, 125, 52)'
                : state.isSelected
                ? 'rgb(131, 125, 52)'
                : 'rgba(214, 217, 224, 1)',
            // borderWidth: '2px', // Ændre denne værdi for at justere border width
            // Ændrer skyggen baseret på om elementet er fokuseret
            boxShadow: state.isFocused ? 'rgba(131, 125, 52, 0.25) 0px 0px 0px 3px' : 'none',
            '&:hover': {
                // Ændrer borderfarven når musen er over elementet, baseret på om det er fokuseret eller valgt
                borderColor: state.isFocused
                    ? 'rgb(131, 125, 52)'
                    : state.isSelected
                    ? 'rgb(131, 125, 52)'
                    : 'rgb(185, 190, 202)',
            },
        }),
    };

    // Returnerer en Select komponent med de definerede options, tema og styles
    return (
        <>
            <Select
            
                theme={customTheme}
                styles={customStyles}
                name="status"
                options={options}
                isClearable={true}
                isSearchable={true}
                onChange={handleCaseStatusChange}
                placeholder="Vælg status..."
                value={options[options.findIndex((o) => o.value === props.entry.caseStatus)]}
            />
        </>
    );
};

export default selectInput; // Eksporterer selectInput komponenten
