import React, { useState } from 'react';
import { SpsUser } from '../../SPS';
import Icon from '@mdi/react';
import { mdiAccount } from '@mdi/js';

enum Tab {
    Basic,
    Complex,
    Statistics,
    Projects,
    Tasks,
    Users,
}

interface NavBarProps {
    user: SpsUser;
    setIsCaseModalActive: (isOn: boolean) => void;
    logo: string;
    // setNote: (newNote) => void;
    // setTaskId: (newTaskId) => void;
    resetForm: () => void;
    formInfo?: () => void;
}
const NavBar = (props: NavBarProps) => {
    const userName = props.user.name;
    const [isActiveTab, setActiveTab] = useState<Tab>(null);

    const handleNewCase = () => {
        props.resetForm();
        props.setIsCaseModalActive(true);
    };

    return (
        <>
            <nav className="navbar is-primary">
                <div className="navbar-brand">
                    <a className="navbar-item noHover">
                        <img src={props.logo} alt="Lolland Kommune" width="112" height="28" />
                    </a>
                </div>

                <div id="navbarKondem" className="navbar-menu">
                    <div className="navbar-start">
                        {props.user.hasPermission('ep_lk_uninhabitable_editor') && (<a className="navbar-item" onClick={handleNewCase}>
                            Opret Kondemnering
                        </a>)}
                        <div className="navbar-item has-dropdown is-hoverable" key={isActiveTab}>
                            {/* <div className="navbar-item has-dropdown is-active"> */}
                            <a className="navbar-link" href="https://bulma.io/documentation/overview/start/">
                                {' '}
                                Docs{' '}
                            </a>
                            <div className="navbar-dropdown is-boxed">
                                <a className="navbar-item" href="https://bulma.io/documentation/overview/start/">
                                    {' '}
                                    Overview{' '}
                                </a>
                                <a className="navbar-item" href="https://bulma.io/documentation/overview/modifiers/">
                                    {' '}
                                    Modifiers{' '}
                                </a>
                                <hr className="navbar-divider" />
                                <a className="navbar-item" href="https://bulma.io/documentation/columns/basics/">
                                    {' '}
                                    Columns{' '}
                                </a>
                                <a className="navbar-item is-selected" href="https://bulma.io/documentation/layout/container/">
                                    {' '}
                                    Layout{' '}
                                </a>
                                <a className="navbar-item" href="https://bulma.io/documentation/form/general/">
                                    {' '}
                                    Form{' '}
                                </a>
                                <a className="navbar-item" href="https://bulma.io/documentation/elements/box/">
                                    {' '}
                                    Elements{' '}
                                </a>
                                <a className="navbar-item" href="https://bulma.io/documentation/components/breadcrumb/">
                                    {' '}
                                    Components{' '}
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="navbar-end">
                        {/* <a className="navbar-item" onClick={props.formInfo}>
                            Test
                        </a> */}
                        <div className="navbar-item">
                            <span id="user-name" className="navbar-item noHover">
                                {userName}
                            </span>
                            <span className="icon is-large">
                                <Icon path={mdiAccount} size={1.2} />
                            </span>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default NavBar;
