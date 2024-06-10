import React, { useState, useEffect } from 'react';

interface CaseModalProps {
    isActive: boolean;
    onSave: (favoriteIds: number[]) => void;
    setIsCaseModalActive: (isOn: boolean) => void;
    formInfo?: () => void;
}

const CaseModal = (props: CaseModalProps) => {
    console.log('CaseModalProps: ', props);

    const onCloseCases = () => {
        props.setIsCaseModalActive(false);
    };
    return (
        <>
            <div className={'modal' + (props.isActive ? ' is-active' : '')}>
                <div className="modal-background" onClick={onCloseCases}></div>
                <div className="modal-content">{/* Any other Bulma elements you want  */}</div>
                <button className="modal-close is-large" aria-label="close"></button>
            </div>
        </>
    );
};
export default CaseModal;
