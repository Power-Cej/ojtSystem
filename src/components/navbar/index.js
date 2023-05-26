import classNames from "nq-component/dist/classNames";
import React from "react";
import {useLocation} from "react-router-dom";
import { Layout } from "nq-component";


const defaultProps = {
    icon: 'bi bi-list',
    logo: '/assets/images/nq-logo.png',
}

function NavBar({className, onToggle, icon, logo, children, title, titleClick, exportClick, importClick, onClickAccess, addFieldClick, deleteFieldClick, addClassClick, editClassClick, deleteClassClick, }) {
    const classes = classNames(className, "navbar navbar-expand-lg navbar-light bg-white");
    const {collapsed, setCollapse} = React.useContext(Layout.Context);
    const location = useLocation();
    // listen to the changes of URL
    React.useEffect(() => {
        setCollapse(false);
    }, [location, setCollapse])

    function click() {
        if (onToggle) {
            onToggle();
        } else {
            setCollapse(!collapsed);
        }
    }

    return (
        <nav className={classes}>
            <div className="container-fluid">
                <button
                    onClick={click}
                    type="button"
                    className="btn btn-sm btn-link fs-4 ps-0 text-dark"
                >
                    <i className={icon}></i>
                </button>
                <a href="# " onClick={titleClick} className="navbar-brand me-auto">
                </a>
                {logo && (
                    <img className="w-auto me-2" height="60" src={logo} alt="logo"/>
                )}
                <a href="# " onClick={titleClick} className="navbar-brand me-auto">
                </a>
                <button
                    onClick={click}
                    type="button"
                    className="btn btn-sm btn-link fs-4 ps-0 text-dark d-none"
                >
                    <i className={"bi bi-person-circle"}></i>
                </button>
                <div className="dropdown dropstart d-inline-block">
                            
                            <i role="button"  data-bs-toggle="dropdown" className="bi bi-three-dots-vertical"></i>
                                
                           
                            <div className="dropdown-menu  fs-xs">
        
                                {
                                
                                        <>

                                    
                                            <button
                                                // onClick={this.onCLickAccess.bind(this)}
                                                onClick={exportClick}
                                                className="dropdown-item py-3">
                                                <i className='bi bi-arrow-up pe-2'/>Export Data
                                            </button>
                                            <button
                                                // onClick={this.onCLickAccess.bind(this)}
                                                onClick={importClick}
                                                className="dropdown-item py-3">
                                                <i className='bi bi-arrow-down pe-2'/>Import Data
                                            </button>
                                            <div class="dropdown-divider"></div>
                                            <button
                                                // onClick={this.onCLickAccess.bind(this)}
                                                onClick={onClickAccess}
                                                className="dropdown-item py-3">
                                                <i className='bi  bi-ui-checks mr-5 pe-2'/>
                                                Access
                                            </button>
                                            <button
                                                // onClick={this.addFieldClick.bind(this)}
                                                onClick={addFieldClick}
                                                className="dropdown-item py-3">
                                                  <i className='bi bi-plus-circle-fill pe-2'/>Add a field
                                            </button>
                                            <button
                                                // onClick={this.deleteFieldClick.bind(this)}
                                                onClick={deleteFieldClick}
                                                className="dropdown-item py-3">
                                                <i className='bi bi-trash-fill pe-2'/> Delete a field
                                            </button>
                                            <div class="dropdown-divider"></div>
                                            <button
                                                // onClick={this.addClassClick.bind(this)}
                                                onClick={addClassClick}
                                                className="dropdown-item py-3">
                                                <i className='bi bi-file-earmark-plus-fill pe-2'/>Add a collection
                                            </button>
                                            <button
                                                // onClick={this.editClassClick.bind(this, schema)}
                                                onClick={editClassClick}
                                                className="dropdown-item py-3">
                                                <i className='bi bi-pen-fill pe-2'/>Edit this collection
                                            </button>
                                            <button
                                                // onClick={this.deleteClassClick.bind(this)}
                                                onClick={deleteClassClick}
                                                className="dropdown-item py-3">
                                                <i className='bi bi-file-earmark-x-fill pe-2'/>Delete this collection
                                            </button>
                                        </>
                            
                                }
                            </div>
                        </div>
                     
            </div>
        </nav>
    );
    return (
        <nav className={classes}>
            <div className="container-fluid">
                <button
                    onClick={click}
                    type="button"
                    className="btn btn-sm btn-link fs-4 ps-0 text-dark">
                    <i className={icon}></i>
                </button>
                <a href="# " onClick={titleClick} className="navbar-brand me-auto">
                    {
                        logo && <img className="w-auto me-2" height="38" src={logo} alt="logo"/>
                    }
                    {
                        title && title
                    }
                </a>
                {
                    children
                }
            </div>
        </nav>
    )
}

NavBar.defaultProps = defaultProps;
export default NavBar;
