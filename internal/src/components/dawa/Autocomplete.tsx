import React, { FC, ReactElement, useState } from 'react';
import { CaseEntry } from '../../SPS';

interface AutocompleteProps {
    entry: CaseEntry;
    setEntry: (entry: CaseEntry) => void;
}

interface Suggestion {
    tekst: string;
    adresse: {
        id: string;
    };
}

const search = async (q: string) => {
    const url = `https://api.dataforsyningen.dk/adresser/autocomplete?kommunekode=0360&srid=25832&per_side=5&q=${q}`;
    const req = await fetch(url);
    const result = await req.json();
    return result;
};

const Autocomplete: FC<AutocompleteProps> = (props: AutocompleteProps) => {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const onSearchTextChanged = async (e) => {
        try {
            let newEntry = { ...props.entry };
        newEntry.address = e.target.value;
        props.setEntry(newEntry);
        const searchResult = await search(e.target.value);
        setSuggestions(searchResult);
        
    } catch (error) {
        console.log('Noget gik galt!');
    }
        
    };

    const dropdownClassname = suggestions.length > 0 ? 'dropdown is-active' : 'dropdown';
    const onSelectSuggestion = (suggestion) => {
        try {
            let newEntry = { ...props.entry };
        newEntry.address = suggestion.tekst;
        props.setEntry(newEntry);
        setSuggestions([]);
        } catch (error) {
            console.log('Noget gik galt!');
        }
    };
    const suggestionContent: ReactElement[] = [];
    for (const suggestion of suggestions) {
        suggestionContent.push(
            <a
                href="#"
                className="dropdown-item"
                key={suggestion.adresse.id}
                onClick={() => onSelectSuggestion(suggestion)}
            >
                {suggestion.tekst}
            </a>
        );
    }
    const clearInput = () => {
        try {
            let newEntry = { ...props.entry };
        newEntry.address = '';
        props.setEntry(newEntry);
        setSuggestions([]);
    } catch (error) {
        console.log('Noget gik galt!');
    }
    };
    return (
        <>
        
            <div className="control has-icons-right">
                <input 
                    value={props.entry.address} 
                    className="input" 
                    onChange={onSearchTextChanged}
                />
            
                <span className="icon is-small is-right">
                    <button
                        type="button"
                        id="al"
                        aria-label="ClearInputField"
                        className="delete is-small"
                        onClick={clearInput}
                    ></button>
                </span>
                
            </div>
            <div className={dropdownClassname}>
                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                    <div className="dropdown-content">{suggestionContent}</div>
                </div>
            </div>
        </>
    );
};

export default Autocomplete;
