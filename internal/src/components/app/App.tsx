import React, { FC, useRef, useState, useEffect } from 'react';
import './app.scss';
import NavBar from '../navbar/NavBar';
import SPS, { CaseEntry, SpsUser } from '../../SPS';
import ContentEditable from '../table/ContentEditable';

const App: FC = () => {
    const [user, setUser] = useState<SpsUser>(null);
    const [logo, setLogo] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [isCaseModalActive, setIsCaseModalActive] = useState<boolean>(false);
    const [isNewCaseActive, setIsNewCaseActive] = useState<boolean>(false);
    const [caseData, setCaseData] = useState<CaseEntry[]>([]);
    const [editEntry, setEditEntry] = useState<number>(null); // indeholder id

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
            setLogo(siteUrl + logoUrl);
            const uninhabitableList = await sps.current.getUninhabitableData();
            setCaseData(uninhabitableList);
        };
        getDataFromSps();
    }, []);


    const onSave = async () => {
        console.log('onSave')
        // const entry: TimeEntry = {
        //     userId: user.shortid,
        //     taskDate,
        //     taskTime,
        //     taskId,
        //     taskStart,
        //     taskEnd,
        //     note,
        //     allDay,
        // };
        // eksistensen af editEntry afgør om det er en update eller insert
        if (editEntry) {
            console.log('update')
            // entry.id = editEntry;
            // await sps.current.updateTimeRegistration(entry);
            // setEditEntry(null);
        } else {
            console.log('insert')
            // await sps.current.insertTimeRegistration(entry);
        }
        // refresh();
    };

    const resetForm = () => {
      console.log('resetFrom')
        setEditEntry(null);
        // setTaskTime(30);
        // setTaskId(1);
        // setTaskEnd(new Date(taskDate.setHours(0, 30, 0, 0)));
        // setTaskStart(new Date(taskDate.setHours(0, 0, 0, 0)));
        // setNote('');
        // setAllDay(true);
        setError(null);
    };
    return (
        <>
            {user && <NavBar setIsCaseModalActive={setIsCaseModalActive} logo={logo} user={user} />}
            <section className="section">
                <ContentEditable
                    tableContent={caseData}
                    onSave={onSave}
                    setEditEntry={setEditEntry}
                    resetForm={function (): void {
                        throw new Error('Function not implemented.');
                    }}
                    setIsNewCaseActive={setIsNewCaseActive}
                    error={error}
                    setError={setError}
                />
            </section>
        </>
    );
};

export default App;
