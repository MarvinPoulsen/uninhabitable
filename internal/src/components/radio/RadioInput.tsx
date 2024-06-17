import React, { ReactElement } from 'react';
import { radioOptions } from '../../config';
import { CaseEntry } from '../../SPS';

interface radioInputProps {
    entry: CaseEntry;
    setEntry: (entry: CaseEntry) => void;
}
const radioInput = (props: radioInputProps) => {
    const handleUserIdChange = (event) => {
        try {
            let newEntry = { ...props.entry };
            newEntry.userId = event.target.value;
            props.setEntry(newEntry);
        } catch (error) {
            console.log('Noget gik galt!');
        }
    };

    const radioButtons: ReactElement[] = [];
    for (const option of radioOptions) {
        radioButtons.push(
            <label className="radio">
                <input
                    type="radio"
                    name="member"
                    value={option}
                    checked={props.entry.userId === option}
                    onChange={handleUserIdChange}
                />
                <span className="m-0">{option}</span>
            </label>
        );
    }

    return <>{radioButtons}</>;
};
export default radioInput;
