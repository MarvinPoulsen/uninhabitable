import React, { FC, useRef, useState, useEffect } from 'react';
import './app.scss';
import NavBar from '../navbar/NavBar';
import SPS, { CaseEntry, SpsUser } from '../../SPS';
import ContentEditable from '../table/ContentEditable';
import CaseModal from '../modal/CaseModal';
import DeleteModal from '../modal/DeleteModal';

const App: FC = () => {
    const [user, setUser] = useState<SpsUser>(null);
    const [logo, setLogo] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [caseData, setCaseData] = useState<CaseEntry[]>([]);
    const [kommunenr, setKommunenr] = useState<string>('');

    const [isCaseModalActive, setIsCaseModalActive] = useState<boolean>(false);

    const [onDelete, setOnDelete] = useState<CaseEntry>(null);
    const [entry, setEntry] = useState<CaseEntry>({
        id: undefined,
        area: null,
        address: '',
        userId: null,
        caseStatus: '',
        caseDate: new Date(),
        sagsId: null,
        note: '',
        completed: false,
    });

    const sps = useRef<SPS>(new SPS());
    if (error) {
        console.log(error);
    }
    useEffect(() => {
        const getDataFromSps = async () => {
            await sps.current.initialize();
            const user = sps.current.getUser();
            setUser(user);
            const siteUrl = sps.current.getParameter('cbinfo.site.url');
            const logoUrl = sps.current.getParameter('module.tasm.logo');
            const kommunenr = sps.current.getParameter('config.kommunenr.firecifre');
            setLogo(siteUrl + logoUrl);
            setKommunenr(kommunenr);

            refresh();
        };
        getDataFromSps();
    }, []);

    const refresh = async () => {
        const owntableList = await sps.current.getowntableData();
        setCaseData(owntableList);
    };

    const onSave = async () => {
        // eksistensen af entry.id afgør om det er en update eller insert
        if (entry.id) {
            await sps.current.updateCase(entry);
        } else {
            await sps.current.insertCase(entry);
        }
        refresh();
    };

    const confirmDelete = async () => {
        await sps.current.deleteCase(onDelete.id);
        setOnDelete(null);
        closeModal();
        refresh();
    };
    const closeModal = () => {
        setOnDelete(null);
    };
    const resetForm = () => {
        setEntry({
            id: undefined,
            area: null,
            address: '',
            userId: user.shortid,
            caseStatus: '',
            caseDate: new Date(),
            sagsId: null,
            note: '',
            completed: false,
        });
        setError(null);
    };

    const formInfo = () => {
        console.log('entry: ', entry);
    };

    return (
        <>
            {user && (
                <NavBar
                    setIsCaseModalActive={setIsCaseModalActive}
                    logo={logo}
                    user={user}
                    resetForm={resetForm}
                    formInfo={formInfo}
                />
            )}
            <section className="section">
                <ContentEditable
                    tableContent={caseData}
                    onSave={onSave}
                    resetForm={resetForm}
                    error={error}
                    setError={setError}
                    setIsCaseModalActive={setIsCaseModalActive}
                    formInfo={formInfo}
                    entry={entry}
                    setEntry={setEntry}
                    setOnDelete={setOnDelete}
                    user={user}
                />
            </section>
            <CaseModal
                isActive={isCaseModalActive}
                onSave={onSave}
                setIsCaseModalActive={setIsCaseModalActive}
                formInfo={formInfo}
                entry={entry}
                setEntry={setEntry}
                resetForm={resetForm}
                kommunenr={kommunenr}
            />
            <DeleteModal confirmDelete={confirmDelete} onDelete={onDelete} setOnDelete={setOnDelete} formInfo={formInfo} />
        </>
    );
};

export default App;
