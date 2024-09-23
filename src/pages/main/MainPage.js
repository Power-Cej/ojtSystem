import React from "react";
import MainPagePresenter from "./MainPagePresenter";
import { Menu } from "nq-component";
import { getAllSchemasUseCase } from "../../usecases/schema/usecases";
import { getCurrentUserUseCase, signOutUseCase } from "../../usecases/user";
import { Routes, Route } from "react-router-dom";
import { OffCanvas } from "nq-component";
import CollectionListPage from "../collection-list/CollectionListPage";
import CollectionFormPage from "../collection-form/CollectionFormPage";
import BasePage from "../../base/BasePage";
import NotFoundPage from "../notfound";
import { Layout, Progress, LogoHolder } from "nq-component";
import MigrationPage from "../migration/MigrationPage";
import AccountPage from "../account/AccountPage";
import RoleFormPage from "../role-form/RoleFormPage";
import withRouter from "../../withRouter";
import DashboardPage from "../dashboard/DashboardPage";
import HooksPage from "../web-hook/HooksPage";
import FunctionPage from "../web-hook/FunctionPage";
import SchemaPage from "../schema/SchemaPage";

class MainPage extends BasePage {
  constructor(props) {
    super(props);
    this.presenter = new MainPagePresenter(
      this,
      getCurrentUserUseCase(),
      signOutUseCase(),
      getAllSchemasUseCase()
    );
  }

  componentDidMount() {
    this.presenter.componentDidMount();
  }

  onClickSignOut() {
    this.presenter.onClickSignOut();
  }

  onClickMenu(e, item) {
    e.preventDefault();
    this.navigateTo(item.route);
  }

  render() {
    const user = this.getCurrentUser();
    const schemas = this.getSchemas();
    const roles = this.getCurrentRoles();
    if (user === undefined || schemas === undefined) {
      return <Progress />;
    }
    const settings = [
      {
        name: "Edit Account",
        route: "/account",
        icon: "bi bi-person-check",
      },
      {
        "name": "Schema",
        "route": "/schema",
        "icon": "bi bi-filetype-json"
      }
      // {
      //     name: "Notification",
      //     route: "/notification",
      //     icon: "bi bi-bell"
      // },

    ];

    const hook = [
      {
        name: "Hooks",
        route: "/hooks",
        icon: "bi bi-person-check",
      },
      {
        name: "Function",
        route: "/function",
        icon: "bi bi-person-check",
      },
    ];

    const setting = {
      name: "Settings",
      icon: "bi bi-sliders",
      route: settings,
    };

    const hooksMenu = {
      name: "WebHook",
      icon: "bi bi-sliders",
      route: hook,
    };

    const menus = [
      ...schemas
        .sort(
          (a, b) =>
            (a.index || Number.POSITIVE_INFINITY) -
            (b.index || Number.POSITIVE_INFINITY)
        )
        .map((s) => ({
          name: s.label || s.collection || s.name,
          icon: s.icon,
          route: s.route || "/collection/" + s.collection || s.name,
        })),
      hooksMenu,
      setting,
    ];
    return (
      <Layout>
        <Layout.Context.Consumer>
          {(value) => (
            <OffCanvas onSetShow={value.setCollapse} show={value.collapsed}>
              <div className="offcanvas-body">
                <nav className="navbar-dark">
                  <div className="text-center">
                    <LogoHolder
                      className="bg-white"
                      textClassName="text-dark"
                      logo={user.picture}
                      name={user.username}
                    />
                    <p className="text-white mt-3">
                      {user.name || user.username}
                    </p>
                  </div>
                  <hr className="dropdown-divider bg-light" />
                  <Menu
                    onClickItem={this.onClickMenu.bind(this)}
                    menus={menus}
                  />
                </nav>
              </div>
              <div className="m-3">
                <button
                  className="nav-link text-white btn btn-link"
                  onClick={this.onClickSignOut.bind(this)}
                >
                  <i className="bi bi-power"></i>
                  <span className="ms-2 fw-bold small">Log out</span>
                </button>
              </div>
            </OffCanvas>
          )}
        </Layout.Context.Consumer>
        <main className="vh-100 d-flex flex-column">
          <Routes>
            <Route exact path={"/"} element={<DashboardPage />} />
            <Route
              exact
              path={"/collection/:name"}
              element={<CollectionListPage />}
            />
            <Route path={"/roles/form"} element={<RoleFormPage />} />
            <Route
              path={"/roles/form/:id"}
              element={<RoleFormPage />}
            />
            <Route
              path={"/collection/:name/form/"}
              element={<CollectionFormPage />}
            />
            <Route
              path={"/collection/:name/form/:id"}
              element={<CollectionFormPage />}
            />
            <Route path={"/migration"} element={<MigrationPage />} />
            <Route path={"/schema"} element={<SchemaPage />} />
            <Route path={"/account"} element={<AccountPage />} />
            <Route path={"/hooks"} element={<HooksPage />} />
            <Route path={"/function"} element={<FunctionPage />} />
            <Route element={<NotFoundPage />} />
          </Routes>
        </main>
      </Layout>
    );
  }
}

export default withRouter(MainPage);
