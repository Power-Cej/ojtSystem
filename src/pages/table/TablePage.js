import React,{useState}from 'react';
import BasePage from "../../base/BasePage";
import TablePagePresenter from './TablePagePresenter';
import {Table, dialog, Button} from "nq-component";
import AddField from "./components/AddField";
import {addSchemaUseCase, updateSchemaUseCase, deleteSchemaUseCase} from '../../usecases/schema/usecases';
import {
    deleteObjectUseCase,
    findObjectUseCase,
    updateObjectUseCase,
    upsertUseCase
} from '../../usecases/object';
import {exportCSVUseCase} from '../../usecases/csv/usecases';
import Search from "./components/Search";
import AddCLass from "./components/AddClass";
import DeleteClass from "./components/DeleteClass";
import DeleteField from "./components/DeleteField";
import { Progress, InfiniteScroll} from "nq-component";
import Access from "./components/Access";
import access from "../../access";
import withRouter from "../../withRouter";
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import "./css/test.css";
import NavBar from '../../components/navbar';

class TablePage extends BasePage {
    constructor(props) {
        super(props);
          
        this.state = {
            isToggleActive: false,
          };

          this.state = {
            navbarHovered: false
          };

        this.presenter = new TablePagePresenter(
            this,
            findObjectUseCase(),
            updateObjectUseCase(),
            deleteObjectUseCase(),
            addSchemaUseCase(),
            updateSchemaUseCase(),
            exportCSVUseCase(),
            deleteSchemaUseCase(),
            upsertUseCase(),
        );
        this.state = {
            objects: [],
            selected: [],
            progress: true,
            count: 0,
        };
        this.parent = React.createRef();
    }
    handleToggleClick = () => {
        this.setState((prevState) => ({
          isToggleActive: !prevState.isToggleActive,
        }));
      };
      handleNavbarHover = () => {
        this.setState({ navbarHovered: true });
      };
    
      handleNavbarLeave = () => {
        this.setState({ navbarHovered: false });
      };    

    componentDidMount() {
        this.presenter.componentDidMount();
    }

    /*when class change*/
    componentDidUpdate(prevProps, prevState) {
        this.presenter.componentDidUpdate(prevProps, prevState);
    }

    getCollectionName() {
        return this.props.params.name;
    }

    addClassSubmit(schema, e) {
        e.preventDefault();
        this.presenter.addClassSubmit(schema);
    }

    editClassClick(schema) {
        function onSubmit(schema, e) {
            e.preventDefault();
            this.presenter.editClassSubmit(schema);
        }

        dialog.fire({
            title: 'Edit a class',
            html: <AddCLass
                schema={schema}
                onSubmit={onSubmit.bind(this, schema)}
                onCancel={() => dialog.close()}/>,
            footer: false
        });
    }

    deleteClassSubmit(schema, e) {
        e.preventDefault();
        this.presenter.deleteClassSubmit(schema.collection);
    }

    deleteFieldSubmit(field, e) {
        e.preventDefault();
        dialog.close();
        this.presenter.deleteFieldSubmit(field.name);
    }

    addFieldClick() {
        const field = {};
        const schemas = this.getSchemas();

        function onSubmit(field, e) {
            e.preventDefault();
            this.presenter.addFieldSubmit(field);
        }

        dialog.fire({
            title: 'Add a new field',
            html: <AddField
                field={field}
                collections={schemas.map(s => s.collection)}
                onSubmit={onSubmit.bind(this, field)}
                onCancel={() => dialog.close()}/>,
            footer: false,
        });
    }

    

    closeDialog() {
        dialog.close();
    }

    addClassClick() {
        const schema = {};
        dialog.fire({
            title: 'Add a new collection',
            html: <AddCLass
                schema={schema}
                onSubmit={this.addClassSubmit.bind(this, schema)}
                onCancel={() => dialog.close()}/>,
            footer: false
        });
    }

    onCLickAccess() {
        const schema = {};

        function submit(acl, e) {
            e.preventDefault();
            this.presenter.accessSubmit(acl);
        }

        const acl = access(this.state.selected);
        dialog.fire({
            title: 'Add a new collection',
            html: <Access
                access={acl}
                schema={schema}
                onSubmit={submit.bind(this, acl)}
                onCancel={() => dialog.close()}/>,
            footer: false
        });
    }

    deleteFieldClick() {
        const field = {};
        const schema = this.getSchema(this.getCollectionName());
        dialog.fire({
            title: 'Delete a field?',
            html: <DeleteField
                fields={Object.keys(schema.fields)}
                object={field}
                onSubmit={this.deleteFieldSubmit.bind(this, field)}
                onCancel={() => dialog.close()}/>,
            footer: false
        });
    }

    deleteClassClick() {
        const schema = this.getSchema(this.getCollectionName());
        dialog.fire({
            title: 'Delete this collection?',
            html: <DeleteClass
                object={schema}
                onSubmit={this.deleteClassSubmit.bind(this, schema)}
                onCancel={() => dialog.close()}/>,
            footer: false
        });
    }

    setObjects(objects) {
        this.setState({objects});
    }

    getSelected() {
        return this.state.selected;
    }

    setSelected(selected) {
        this.setState({selected});
    }

    showProgress() {
        this.setState({progress: true});
    }

    hideProgress() {
        this.setState({progress: false});
    }

    onClickItem(index, field) {
        this.presenter.onClickItem(index, field);
    }

    navigateToForm(collection, id = '') {
        this.navigateTo("/collection/" + collection + "/form/" + id);
    }

    searchSubmit(query) {
        this.presenter.searchSubmit(query);
    }

    loadMore() {
        this.presenter.loadMore();
    }

    setCount(count) {
        this.setState({count});
    }

    onSelect(index) {
        this.presenter.onSelect(index);
    }

    onSelectAll(checked) {
        this.presenter.onSelectAll(checked);
    }

    importClick() {
        this.presenter.importClick();
    }

    exportClick() {
        this.presenter.exportClick();
    }

    addClick() {
        this.presenter.addClick();
    }

    deleteSelected() {
        this.presenter.deleteSelected();
    }
    

    render() {
        const { isToggleActive } = this.state;
        const navbarClassName = isToggleActive ? 'navbar-white' : '';
        
        const navbarStyle = {
            backgroundColor: this.state.navbarHovered ? 'black' : 'light',
            color: this.state.navbarHovered ? 'white' : 'black'
          };

        const schema = this.getSchema(this.getCollectionName());
        const {objects, selected, count, progress} = this.state;
        const user = this.getCurrentUser();
        if (!schema) return <Progress/>;
        return (
            <>
                <NavBar 
                    exportClick={() => this.exportClick()}
                    importClick={() => this.importClick()}
                    onClickAccess={() => this.onCLickAccess()}
                    addFieldClick={() => this.addFieldClick()}
                    deleteFieldClick={() => this.deleteFieldClick()}
                    addClassClick={() => this.addClassClick()}
                    editClassClick={() => this.editClassClick(schema)}
                    deleteClassClick={() => this.deleteClassClick()}
                    className="shadow-sm test1"/>

                <div className="container px-lg-4 py-lg-3 overflow-auto">
                    <Search
                        onSubmit={this.searchSubmit.bind(this)}
                        fields={schema.fields}/>

                    {/* <div className="d-flex justify-content-end mt-3">
                        <button
                            onClick={this.addClick.bind(this)}
                            type="button"
                            className="btn btn-dark btn-sm shadow-none">
                            <i className="bi bi-plus-circle"></i>
                            <span className="fs-xs ms-1">ADD</span>
                        </button>
                        <button
                            onClick={this.exportClick.bind(this)}
                            type="button"
                            className="btn btn-dark btn-sm shadow-none ms-1">
                            <i className="bi bi-box-arrow-up"></i>
                            <span className="fs-xs ms-1">EXPORT</span>
                        </button>
                        <button
                            onClick={this.importClick.bind(this)}
                            type="button" className="btn btn-dark btn-sm shadow-none ms-1">
                            <i className="bi bi-box-arrow-in-down"></i>
                            <span className="fs-xs ms-1">IMPORT</span>
                        </button>

                        <div className="dropdown d-inline-block">
                            <button
                                type="button"
                                className="btn btn-dark btn-sm shadow-none ms-1"
                                data-bs-toggle="dropdown">
                                <i className="bi bi-three-dots-vertical"></i>
                                <span className="fs-xs ms-1">ACTIONS</span>
                            </button>
                            <div className="dropdown-menu dropdown-menu-right fs-xs">
                                <button
                                    onClick={this.deleteSelected.bind(this)}
                                    className="dropdown-item">
                                    Delete selected rows
                                </button>
                                {
                                    user.isMaster && (
                                        <>

                                            <div className="dropdown-divider"></div>
                                            <button
                                                onClick={this.onCLickAccess.bind(this)}
                                                className="dropdown-item">
                                                Access
                                            </button>
                                            <button
                                                onClick={this.addFieldClick.bind(this)}
                                                className="dropdown-item">
                                                Add a field
                                            </button>
                                            <button
                                                onClick={this.deleteFieldClick.bind(this)}
                                                className="dropdown-item">
                                                Delete a field
                                            </button>
                                            <button
                                                onClick={this.addClassClick.bind(this)}
                                                className="dropdown-item">
                                                Add a collection
                                            </button>
                                            <button
                                                onClick={this.editClassClick.bind(this, schema)}
                                                className="dropdown-item">
                                                Edit this collection
                                            </button>
                                            <button
                                                onClick={this.deleteClassClick.bind(this)}
                                                className="dropdown-item">
                                                Delete this collection
                                            </button>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>        */}
                    <InfiniteScroll
                        className="h-100 mt-3"
                        loadMore={this.loadMore.bind(this)}
                        hasMore={(!progress && count > objects.length)}>
                        <Table
                            hasSelect
                            setRef={this.parent}
                            excludeFields={['createdAt', 'updatedAt', 'acl']}
                            selected={selected}
                            onSelect={this.onSelect.bind(this)}
                            onSelectAll={this.onSelectAll.bind(this)}
                            progress={progress}
                            onClickItem={this.onClickItem.bind(this)}
                            fields={schema.fields}
                            objects={objects}/>
                    </InfiniteScroll>
                </div>
             
                {/* <Navbar bg='light' expand="lg" 
                 className={`fs-6 ${navbarClassName} `}
                style={navbarStyle}
                onMouseEnter={this.handleNavbarHover}
                onMouseLeave={this.handleNavbarLeave}>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" 
                        onClick={this.handleToggleClick}>
                        <i className="bi bi-three-dots-vertical" ></i>
                    </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto d-flex flex-wrap">
                        <Nav.Link>
                        <button
                            className="dropdown-item"
                            onClick={this.addClick.bind(this)}
                                    >
                            <span className='bi bi-file-earmark-plus'>Add</span>
                        </button>
                        </Nav.Link>
                        <Nav.Link>
                        <button
                                                onClick={this.onCLickAccess.bind(this)}
                                                className="dropdown-item">
                                                <span className='bi bi-check2-circle'>Access</span>
                                            </button>
                        </Nav.Link>
                        <Nav.Link  onClick={this.addFieldClick.bind(this)}>
                            <button
                            
                            className="dropdown-item"
                            >
                           <span className='bi bi-plus-circle'> Add a field </span>
                            </button>
                            
                        </Nav.Link>   
                        <Nav.Link>
                        <button
                                                onClick={this.deleteFieldClick.bind(this)}
                                                className="dropdown-item">
                                               <span className='bi bi-x-circle'> Delete a field</span>
                                            </button>
                        </Nav.Link>
                        <Nav.Link>
                        <button
                                                onClick={this.addClassClick.bind(this)}
                                                className="dropdown-item">
                                                <span className='bi bi-plus-lg'>Add a collection</span>
                                            </button>
                        </Nav.Link>

                        <Nav.Link>
                        <button
                                                onClick={this.editClassClick.bind(this, schema)}
                                                className="dropdown-item">
                                                <span className='bi bi-pen-fill'>Edit this collection</span>
                                            </button>
                        </Nav.Link>
                        <Nav.Link>
                        <button
                                                onClick={this.deleteClassClick.bind(this)}
                                                type="button"
                                                className="dropdown-item">
                                                <span className='bi bi-trash'>Delete this collection</span>
                                            </button>
                        </Nav.Link>
                        <Nav.Link>
                        <button
                                               onClick={this.exportClick.bind(this)}
                                                className="dropdown-item">
                                                <span className='bi bi-box-arrow-up'>Export</span>
                                            </button>
                        </Nav.Link>
                        <Nav.Link>
                        <button
                                               onClick={this.importClick.bind(this)}
                                                className="dropdown-item">
                                                <span className='bi bi-box-arrow-down'>Import</span>
                                            </button>
                        </Nav.Link>  
                    </Nav>
                </Navbar.Collapse>
                </Navbar> */}
                                
                <div className="position-fixed bottom-0 end-0 m-4">
                    <Button
                        className="shadow-lg bg-primary"
                        onClick={this.addClick.bind(this)}
                        style={{width: '50px', height: '50px', borderRadius: '25px'}}>
                        <i className="bi bi-plus-lg"/>
                    </Button>
                </div>      
    
            </>
        );

        
    }
}

export default withRouter(TablePage);