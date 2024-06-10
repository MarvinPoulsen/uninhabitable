import React from 'react';

interface DeleteModalProps {
    confirmDelete: () => void;
    isDeletingId: (caseIds: number[]) => void;
    setIsDeletingId: (isOn: boolean) => void;
    formInfo?: () => void;
}

const DeleteModal = (props: DeleteModalProps) => {
    console.log('DeleteModalProps: ', props);


    const closeModal = () => {
        props.setIsDeletingId(null);
    };
    return (
        <>
            <div className={'modal' + (props.isDeletingId ? ' is-active' : '')}>
                <div className="modal-background" onClick={closeModal}></div>
                <div className="modal-content">
                    <div className="box">
                        {/* {isDeletingId && (
                            <p>
                                Vil du slette de registrede tid? <br />
                                {getTaskDescription(isDeletingId)}
                            </p>
                        )} */}
                        <button className="button is-danger" onClick={props.confirmDelete}>
                            Slet
                        </button>
                        <button className="button" onClick={closeModal}>
                            Annuler
                        </button>
                    </div>
                </div>
                <button className="modal-close is-large" aria-label="close" onClick={closeModal}></button>
            </div>
        </>
    );
};
export default DeleteModal;
