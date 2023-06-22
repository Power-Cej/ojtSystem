import React from 'react';
import MainPagePresenter from './MainPagePresenter';
import {Menu} from "nq-component";
import {getAllSchemasUseCase} from '../../usecases/schema/usecases';
import {getCurrentUserUseCase, signOutUseCase} from '../../usecases/user';
import {Routes, Route} from 'react-router-dom';
import {OffCanvas} from 'nq-component';
import TablePage from "../collection-list/CollectionListPage";
import FormPage from "../collection-form/CollectionFormPage";
import BasePage from "../../base/BasePage";
import NotFoundPage from "../notfound";
import {Layout, Progress} from "nq-component";
import getProfile from "../../getProfile";
import MigrationPage from "../migration/MigrationPage";
import AccountPage from "../account/AccountPage";
import RolePage from "../role/RolePage";
import canRead from "../../canRead";
import withRouter from "../../withRouter";


class MainPage extends BasePage {
    constructor(props) {
        super(props);
        this.presenter = new MainPagePresenter(this, getCurrentUserUseCase(), signOutUseCase(), getAllSchemasUseCase());
    }

    componentDidMount() {
        this.presenter.componentDidMount();
    }

    onClickSignOut() {
        this.presenter.onClickSignOut();
    }

    onClickMenu(e, item) {
        e.preventDefault();
        this.navigateTo('/collection/' + item.name);
    }

    render() {
        const user = this.getCurrentUser();
        const schemas = this.getSchemas();
        const roles = this.getCurrentRoles();
        if (user === undefined || schemas === undefined) {
            return (
                <Progress/>
            )
        }
        return (
            <Layout>
                <Layout.Context.Consumer>
                    {
                        (value =>
                                <OffCanvas
                                    onSetShow={value.setCollapse}
                                    show={value.collapsed}>
                                    <div className="offcanvas-body">
                                        <nav className="navbar-dark">
                                            <div className="text-center">
                                                <img className="img-fluid rounded-circle img-thumbnail p-0 m-2"
                                                     src={getProfile(user)} width="80" height="80" alt="profile"/>
                                                <p className="text-white">{user.name || user.username}</p>
                                            </div>
                                            <hr className="dropdown-divider bg-light"/>
                                            <Menu
                                                onClickItem={this.onClickMenu.bind(this)}
                                                menus={schemas
                                                    .filter(s => canRead(roles, s.permissions) || user.isMaster)
                                                    .map(s => ({
                                                        name: s.collection || s.name
                                                    }))}/>
                                        </nav>
                                    </div>
                                    <div className="m-3">
                                        <button
                                            className="nav-link text-white btn btn-link"
                                            onClick={this.onClickSignOut.bind(this)}>
                                            <i className="bi bi-power"></i>
                                            <span className="ms-2 fw-bold small">Log out</span>
                                        </button>
                                    </div>
                                </OffCanvas>
                        )
                    }
                </Layout.Context.Consumer>
                <main className="vh-100 d-flex flex-column">
                    <Routes>
                        <Route exact path={'/collection/:name'} element={<TablePage/>}/>
                        <Route path={'/collection/:name/form/'} element={<FormPage/>}/>
                        <Route path={'/collection/roles/form'} element={<RolePage/>}/>
                        <Route path={'/collection/roles/form/:id'} element={<RolePage/>}/>
                        <Route path={'/collection/:name/form/:id'} element={<FormPage/>}/>
                        <Route path={'/migration'} element={<MigrationPage/>}/>
                        <Route path={'/account'} element={<AccountPage/>}/>
                        <Route element={<NotFoundPage/>}/>
                    </Routes>
                </main>
            </Layout>
        )
    }
}

export default withRouter(MainPage);
