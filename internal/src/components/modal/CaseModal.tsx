import React from 'react';
import { CaseEntry } from '../../SPS';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { da } from 'date-fns/locale';
import Autocomplete from '../dawa/Autocomplete';
import SelectInput from '../select/SelectInput';
import RadioInput from '../radio/RadioInput';

interface CaseModalProps {
    isActive: boolean;
    onSave: () => void;
    setIsCaseModalActive: (isOn: boolean) => void;
    formInfo?: () => void;
    entry: CaseEntry;
    setEntry: (entry: CaseEntry) => void;
    resetForm: () => void;
    kommunenr: string;
}

const CaseModal = (props: CaseModalProps) => {
    const handleAreaChange = (event) => {
        try {
            let newEntry = { ...props.entry };
            newEntry.area = parseFloat(event.target.value.replace(/,/g, '.'));
            props.setEntry(newEntry);
        } catch (error) {
            console.log('Noget gik galt - Kun tal er tilladt');
        }
    };
    const handleNoteChange = (event) => {
        try {
            let newEntry = { ...props.entry };
            newEntry.note = event.target.value;
            props.setEntry(newEntry);
        } catch (error) {
            console.log('Noget gik galt!');
        }
    };
    const handleCaseDateChange = (event) => {
        try {
            let newEntry = { ...props.entry };
            newEntry.caseDate = event;
            props.setEntry(newEntry);
        } catch (error) {
            console.log('Noget gik galt!');
        }
    };
    const handleSagsIdChange = (event) => {
        try {
            let newEntry = { ...props.entry };
            newEntry.sagsId = parseInt(event.target.value);
            props.setEntry(newEntry);
        } catch (error) {
            console.log('Noget gik galt!');
        }
    };
    const handleCompletedChange = (event) => {
        try {
            let newEntry = { ...props.entry };
            newEntry.completed = event.target.checked;
            props.setEntry(newEntry);
        } catch (error) {
            console.log('Noget gik galt!');
        }
    };

    const closeModal = () => {
        props.resetForm();
        props.setIsCaseModalActive(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onSave();
        closeModal();
    };

    return (
        <>
            <div className={'modal' + (props.isActive ? ' is-active' : '')}>
                <div className="modal-background"></div>
                {/* <div className="modal-background" onClick={closeModal}></div> */}
                <div className="modal-content">
                    <div className="box">
                        <h1 className="title">Title</h1> {/* Brug evt. setIsCaseModalActive til at sætte Titlen */}
                        {props && (
                            <form onSubmit={handleSubmit}>
                                <div className="field is-horizontal">
                                    <div className="field-label is-normal">
                                        <label className="label">Areal</label>
                                    </div>
                                    <div className="field-body">
                                        <div className="field">
                                            <p className="control">
                                                <input
                                                    className="input"
                                                    type="text"
                                                    placeholder="Areal"
                                                    onChange={handleAreaChange}
                                                    name="area"
                                                    defaultValue={props.entry.area}
                                                />
                                            </p>
                                            <p className="help">Brug punktum til ciffertal</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="field is-horizontal">
                                    <div className="field-label is-normal">
                                        <label className="label">Adresse</label>
                                    </div>
                                    <div className="field-body">
                                        <div className="field">
                                            <Autocomplete
                                                entry={props.entry}
                                                setEntry={props.setEntry}
                                                kommunenr={props.kommunenr}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="field is-horizontal">
                                    <div className="field-label is-normal">
                                        <label className="label">Status</label>
                                    </div>
                                    <div className="field-body">
                                        <div className="field">
                                            <div className="control">
                                                <SelectInput entry={props.entry} setEntry={props.setEntry} />
                                            </div>
                                            <p className="help">Hjælpetekst til select input</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="field is-horizontal">
                                    <div className="field-label">
                                        <label className="label">Sagsbeh.</label>
                                    </div>
                                    <div className="field-body">
                                        <div className="field">
                                            <div className="control">
                                                <RadioInput entry={props.entry} setEntry={props.setEntry} />
                                            </div>
                                            <p className="help">Hjælpetekst til radio input</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="field is-horizontal">
                                    <div className="field-label is-normal">
                                        <label className="label">Dato</label>
                                    </div>
                                    <div className="field-body">
                                        <div className="field">
                                            <DatePicker
                                                todayButton="Dags dato"
                                                selected={props.entry.caseDate}
                                                onChange={handleCaseDateChange} // setTaskDate bliver sat uden tid
                                                locale={da}
                                                className="input"
                                                dateFormat="dd-MM-yyyy"
                                                name="date"
                                                value={props.entry.caseDate}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="field is-horizontal">
                                    <div className="field-label is-normal">
                                        <label className="label">SagsId</label>
                                    </div>
                                    <div className="field-body">
                                        <div className="field">
                                            <div className="control">
                                                <input
                                                    className="input"
                                                    type="text"
                                                    placeholder="SBSYS ID"
                                                    onChange={handleSagsIdChange}
                                                    name="sagsId"
                                                    defaultValue={props.entry.sagsId}
                                                />
                                            </div>
                                            <p className="help is-danger">Dette felt skal udfyldes</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="field is-horizontal">
                                    <div className="field-label is-normal">
                                        <label className="label">Note</label>
                                    </div>
                                    <div className="field-body">
                                        <div className="field">
                                            <div className="control">
                                                <textarea
                                                    className="textarea"
                                                    placeholder="Explain how we can help you"
                                                    // rows={2}
                                                    onChange={handleNoteChange}
                                                    name="note"
                                                    value={props.entry.note}
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="field is-horizontal">
                                    <div className="field-label">
                                        <label className="label">Afsluttet</label>
                                    </div>
                                    <div className="field-body">
                                        <div className="field">
                                            <div className="control">
                                                <label className="checkbox">
                                                    <input
                                                        type="checkbox"
                                                        onChange={handleCompletedChange}
                                                        defaultChecked={props.entry.completed}
                                                        // checked
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="field is-grouped">
                                    <div className="control">
                                        <button className="button is-link">Save</button>
                                    </div>
                                    <div className="control">
                                        <button className="button" type="button" onClick={props.resetForm}>
                                            Reset
                                        </button>
                                    </div>
                                    {/* <div className="control">
                                        <button className="button is-info" type="button" onClick={props.formInfo}>
                                            Info
                                        </button>
                                    </div> */}
                                </div>
                            </form>
                        )}
                    </div>
                </div>
                <button className="modal-close is-large" aria-label="close" onClick={closeModal}></button>
            </div>
        </>
    );
};
export default CaseModal;
