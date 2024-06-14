import React from 'react';
import { CaseEntry } from '../../SPS';
import { format } from 'date-fns';

interface DeleteModalProps {
    confirmDelete: () => void;
    onDelete: CaseEntry;
    setOnDelete: (entry: CaseEntry) => void;
    formInfo?: () => void;
}

const DeleteModal = (props: DeleteModalProps) => {

    const closeModal = () => {
        props.setOnDelete(null);
    };
    return (
        <>
            <div className={'modal' + (props.onDelete ? ' is-active' : '')}>
                <div className="modal-background" onClick={closeModal}></div>
                <div className="modal-content">
                    <div className="card">
                        <header className="card-header">
                            <p className="card-header-title">Vil du gennemføre sletningen?</p>
                        </header>
                        <div className="card-content">
                            <div className="content">
                                    {props?.onDelete?.address && (
                                        <p>
                                            Adresse: {props.onDelete.address}
                                        </p>
                                    )}
                                    {props?.onDelete?.caseDate && (
                                        <p>
                                            Dato: {format(props.onDelete.caseDate, 'dd-MM-yyyy')}
                                        </p>
                                    )}
                                    {props?.onDelete?.area && (
                                        <p>
                                            Areal: {props.onDelete.area}
                                        </p>
                                    )}
                                    {props?.onDelete?.caseStatus && (
                                        <p>
                                            Status: {props.onDelete.caseStatus}
                                        </p>
                                    )}
                                    {props?.onDelete?.sagsId && (
                                        <p>
                                            SBSYS ID: {props.onDelete.sagsId}
                                        </p>
                                    )}
                                    {props?.onDelete?.userId && (
                                        <p>
                                            Bruger: {props.onDelete.userId}
                                        </p>
                                    )}
                                    {props?.onDelete?.completed && (
                                        <p>
                                            Afsluttet: {props.onDelete.completed}
                                        </p>
                                    )}
                                    {props?.onDelete?.id && (
                                        <p>
                                            ID: {props.onDelete.id}
                                        </p>
                                    )}
                                    {props?.onDelete?.note && (
                                        <p>
                                            Note: {props.onDelete.note}
                                        </p>
                                    )}
                            </div>
                        </div>
                        <footer className="card-footer">
                            <a href="#" className="card-footer-item" onClick={props.confirmDelete}>
                                Delete
                            </a>
                            <a href="#" className="card-footer-item" onClick={closeModal}>
                                Cancel
                            </a>
                        </footer>
                    </div>
                </div>
                <button className="modal-close is-large" aria-label="close" onClick={closeModal}></button>
            </div>
        </>
    );
};
export default DeleteModal;
