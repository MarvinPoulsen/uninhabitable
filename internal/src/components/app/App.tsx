import React, { FC, useRef, useState, useEffect } from 'react';
import './app.scss';
import NavBar from '../navbar/NavBar';
import SPS, { CaseEntry, SpsUser } from '../../SPS';

const App: FC = () => {
    const [user, setUser] = useState<SpsUser>(null);
    const [logo, setLogo] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [isCaseModalActive, setIsCaseModalActive] = useState<boolean>(false);
    const [cases, setCases] = useState<CaseEntry[]>([]);

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
            setCases(uninhabitableList);
        };
        getDataFromSps();
    }, []);

    return (
        <>
            {user && 
                <NavBar 
                    setIsCaseModalActive={setIsCaseModalActive} 
                    logo={logo} 
                    user={user} 
                />
            }
            <section className="section">
                <table className="table is-bordered">
                    <tbody>
                        <tr>
                            <th className="is-link">Link th cell</th>
                            <td>Two</td>
                            <td className="is-link">Link td cell</td>
                            <td>Four</td>
                            <td>Five</td>
                        </tr>
                        <tr className="is-link">
                            <th>Link row</th>
                            <td>Two</td>
                            <td>Three</td>
                            <td>Four</td>
                            <td>Five</td>
                        </tr>

                        <tr>
                            <th className="is-primary">Primary th cell</th>
                            <td>Two</td>
                            <td className="is-primary">Primary td cell</td>
                            <td>Four</td>
                            <td>Five</td>
                        </tr>
                        <tr className="is-primary">
                            <th>Primary row</th>
                            <td>Two</td>
                            <td>Three</td>
                            <td>Four</td>
                            <td>Five</td>
                        </tr>

                        <tr>
                            <th className="is-info">Info th cell</th>
                            <td>Two</td>
                            <td className="is-info">Info td cell</td>
                            <td>Four</td>
                            <td>Five</td>
                        </tr>
                        <tr className="is-info">
                            <th>Info row</th>
                            <td>Two</td>
                            <td>Three</td>
                            <td>Four</td>
                            <td>Five</td>
                        </tr>

                        <tr>
                            <th className="is-success">Success th cell</th>
                            <td>Two</td>
                            <td className="is-success">Success td cell</td>
                            <td>Four</td>
                            <td>Five</td>
                        </tr>
                        <tr className="is-success">
                            <th>Success row</th>
                            <td>Two</td>
                            <td>Three</td>
                            <td>Four</td>
                            <td>Five</td>
                        </tr>

                        <tr>
                            <th className="is-warning">Warning th cell</th>
                            <td>Two</td>
                            <td className="is-warning">Warning td cell</td>
                            <td>Four</td>
                            <td>Five</td>
                        </tr>
                        <tr className="is-warning">
                            <th>Warning row</th>
                            <td>Two</td>
                            <td>Three</td>
                            <td>Four</td>
                            <td>Five</td>
                        </tr>

                        <tr>
                            <th className="is-danger">Danger th cell</th>
                            <td>Two</td>
                            <td className="is-danger">Danger td cell</td>
                            <td>Four</td>
                            <td>Five</td>
                        </tr>
                        <tr className="is-danger">
                            <th>Danger row</th>
                            <td>Two</td>
                            <td>Three</td>
                            <td>Four</td>
                            <td>Five</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </>
    );
};

export default App;
