import React from 'react';
import MainPagePresenter from './MainPagePresenter';
import Menu from '../../components/Menu';
import {getAllSchemasUseCase} from '../../domain/schema/usecases';
import {getCurrentUserUseCase, signOutUseCase} from '../../domain/user';
import withContext from '../../withContext';
import {Routes, Route} from 'react-router-dom';
import OffCanvas from '../../components/OffCanvas';
import TablePage from "../table/TablePage";
import FormPage from "../form/FormPage";
import BasePage from "../../base/BasePage";
import NotFoundPage from "../notfound";
import Layout from "../../components/Layout";
import Progress from "../../components/Progress";
import getProfile from "../../getProfile";
import {findObjectUseCase} from "../../domain/object";
import MigrationPage from "../migration/MigrationPage";
import AccountPage from "../account/AccountPage";
import RolePage from "../role/RolePage";
import UserFormPage from "../user/UserFormPage";
import {getRolesByUserUseCase} from "../../domain/role";
import canRead from "../../canRead";


class MainPage extends BasePage {
    constructor(props) {
        super(props);
        this.presenter = new MainPagePresenter(this, getCurrentUserUseCase(), getRolesByUserUseCase(), signOutUseCase(), getAllSchemasUseCase());
    }

    componentDidMount() {
        this.presenter.componentDidMount();
    }

    signOutClick() {
        this.presenter.signOutClick();
    }

    render() {
        const user = this.getCurrentUser();
        const schemas = this.getSchemas();
        const roles = this.getRoles();
        if (user === undefined || schemas === undefined) {
            return (
                <Progress/>
            )
        }
        return (
            <Layout>
                <OffCanvas
                    signOutClick={this.signOutClick.bind(this)}>
                    <nav className="navbar-dark">
                        <div className="text-center">
                            <img className="img-fluid rounded-circle img-thumbnail p-0 m-2"
                                 src={getProfile(user)} width="80" height="80" alt="profile"/>
                            <p className="text-white">{user.name || user.username}</p>
                        </div>
                        <hr className="dropdown-divider bg-light"/>
                        <Menu
                            menus={schemas.filter(s => canRead(roles, s.permissions))}/>
                    </nav>
                </OffCanvas>
                <main className="vh-100 d-flex flex-column">
                    <Routes>
                        <Route exact path={'/class/:name'} element={<TablePage/>}/>
                        <Route path={'/class/:name/form/'} element={<FormPage/>}/>
                        <Route path={'/class/roles/form'} element={<RolePage/>}/>
                        <Route path={'/class/roles/form/:id'} element={<RolePage/>}/>
                        <Route path={'/class/users/form'} element={<UserFormPage/>}/>
                        <Route path={'/class/users/form/:id'} element={<UserFormPage/>}/>
                        <Route path={'/class/:name/form/:id'} element={<FormPage/>}/>
                        <Route path={'/migration'} element={<MigrationPage/>}/>
                        <Route path={'/account'} element={<AccountPage/>}/>
                        <Route element={<NotFoundPage/>}/>
                    </Routes>
                </main>
            </Layout>
        )
    }
}

export default withContext(MainPage);
