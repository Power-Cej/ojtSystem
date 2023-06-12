import React from 'react';
import TablePagePresenter from './TablePagePresenter';
import {Table, dialog, Button} from "nq-component";
import AddField from "./components/AddField";
import {addSchemaUseCase, updateSchemaUseCase, deleteSchemaUseCase} from '../../usecases/schema/usecases';
import {
    deleteObjectUseCase,
    findObjectUseCase,
    upsertUseCase
} from '../../usecases/object';
import {exportCSVUseCase} from '../../usecases/csv/usecases';
import Search from "./components/Search";
import AddCLass from "./components/AddCollection";
import DeleteClass from "./components/DeleteCollection";
import DeleteField from "./components/DeleteField";
import {Progress, InfiniteScroll} from "nq-component";
import Access from "./components/Access";
import access from "../../access";
import withRouter from "../../withRouter";
import {NavBar} from 'nq-component';
import BaseTablePage from "../../base/BaseTablePage";

class TablePage extends BaseTablePage {
    constructor(props) {
        super(props);
        this.presenter = new TablePagePresenter(
            this,
            findObjectUseCase(),
            deleteObjectUseCase(),
            upsertUseCase(),
            exportCSVUseCase(),
            addSchemaUseCase(),
            updateSchemaUseCase(),
            deleteSchemaUseCase(),
        );
        this.state = {
            objects: [],
            selected: [],
            progress: true,
            count: 0,
        };
        this.parent = React.createRef();
    }

    /*when class change*/
    componentDidUpdate(prevProps, prevState) {
        this.presenter.componentDidUpdate(prevProps, prevState);
    }

    closeDialog() {
        dialog.close();
    }

    addCollectionSubmit(schema, e) {
        e.preventDefault();
        this.presenter.addCollectionSubmit(schema);
    }

    deleteCollectionSubmit(schema, e) {
        e.preventDefault();
        this.presenter.deleteCollectionSubmit(schema.collection);
    }

    deleteFieldSubmit(field, e) {
        e.preventDefault();
        dialog.close();
        this.presenter.deleteFieldSubmit(field.name);
    }

    onClickEditCollection(schema) {
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

    onClickAddField() {
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

    onClickAddCollection() {
        const schema = {};
        dialog.fire({
            title: 'Add a new collection',
            html: <AddCLass
                schema={schema}
                onSubmit={this.addCollectionSubmit.bind(this, schema)}
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

    onClickDeleteField() {
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

    onClickDeleteCollection() {
        const schema = this.getSchema(this.getCollectionName());
        dialog.fire({
            title: 'Delete this collection?',
            html: <DeleteClass
                object={schema}
                onSubmit={this.deleteCollectionSubmit.bind(this, schema)}
                onCancel={() => dialog.close()}/>,
            footer: false
        });
    }

    onClickItem(index, field) {
        this.presenter.onClickItem(index, field);
    }


    onClickImport() {
        this.presenter.onClickImport();
    }

    onClickExport() {
        this.presenter.onClickExport();
    }


    render() {
        const schema = this.getSchema(this.getCollectionName());
        const {objects, selected, count, progress} = this.state;
        if (!schema) return <Progress/>;
        return (
            <>
                <NavBar
                    className="shadow-sm"
                    title="DASHBOARD"
                    action={() => (
                        <div className="dropdown dropstart d-inline-block">
                            <i role="button" data-bs-toggle="dropdown" className="bi bi-three-dots-vertical"></i>
                            <div className="dropdown-menu fs-xs">
                                <button
                                    onClick={this.onClickImport.bind(this)}
                                    className="dropdown-item py-3">
                                    <i className='bi bi-arrow-down-square pe-2'/>Import Data
                                </button>
                                <button
                                    onClick={this.onClickExport.bind(this)}
                                    disabled={selected.length < 1}
                                    className="dropdown-item py-3">
                                    <i className='bi bi-arrow-up-square pe-2'/>Export Data
                                </button>
                                <button
                                    onClick={this.onCLickAccess.bind(this)}
                                    disabled={selected.length < 1}
                                    className="dropdown-item py-3">
                                    <i className='bi  bi-ui-checks mr-5 pe-2'/>
                                    Access
                                </button>
                                <button
                                    onClick={this.onClickDeleteSelected.bind(this)}
                                    disabled={selected.length < 1}
                                    className="dropdown-item py-3">
                                    <i className='bi bi-trash pe-2'/> Delete selected
                                </button>
                                <div className="dropdown-divider"></div>
                                <button
                                    onClick={this.onClickAddField.bind(this)}
                                    className="dropdown-item py-3">
                                    <i className='bi bi-journal-plus pe-2'/>Add a field
                                </button>
                                <button
                                    onClick={this.onClickDeleteField.bind(this)}
                                    className="dropdown-item py-3">
                                    <i className='bi bi-journal-x pe-2'/> Delete a field
                                </button>
                                <button
                                    onClick={this.onClickEditCollection.bind(this)}
                                    className="dropdown-item py-3">
                                    <i className='bi bi-pencil-square pe-2'/>Edit this collection
                                </button>
                                <button
                                    onClick={this.onClickDeleteCollection.bind(this)}
                                    className="dropdown-item py-3">
                                    <i className='bi bi-folder-x pe-2'/>Delete this collection
                                </button>
                                <button
                                    onClick={this.onClickAddCollection.bind(this)}
                                    className="dropdown-item py-3">
                                    <i className='bi bi-folder-plus pe-2'/>Add a collection
                                </button>
                            </div>
                        </div>
                    )}/>
                <div className="overflow-auto">
                    <div className="container px-lg-4 py-lg-3">
                        <h1 className="fw-bold mt-3 text-capitalize">{this.getCollectionName()}</h1>
                        <Search
                            onSubmit={this.searchSubmit.bind(this)}
                            fields={schema.fields}/>
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
                </div>
                <div className="position-fixed bottom-0 end-0 m-4">
                    <Button
                        className="shadow-lg bg-primary"
                        onClick={this.onClickAdd.bind(this)}
                        style={{width: '50px', height: '50px', borderRadius: '25px'}}>
                        <i className="bi bi-plus-lg"/>
                    </Button>
                </div>
            </>
        );
    }
}

export default withRouter(TablePage);