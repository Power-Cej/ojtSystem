import React from 'react';
import CollectionListPresenter from './CollectionListPresenter';
import {Table, dialog, Button} from "nq-component";
import AddField from "./components/AddField";
import {addSchemaUseCase, updateSchemaUseCase, deleteSchemaUseCase} from '../../usecases/schema/usecases';
import {
    deleteObjectUseCase,
    findObjectUseCase,
    upsertUseCase
} from '../../usecases/object';
import {exportCSVUseCase} from '../../usecases/csv/usecases';
import FormCollection from "./components/FormCollection";
import DeleteCollection from "./components/DeleteCollection";
import DeleteField from "./components/DeleteField";
import {Progress, InfiniteScroll} from "nq-component";
import FormAccess from "./components/FormAccess";
import mergeACl from "../../mergeACl";
import withRouter from "../../withRouter";
import Search from "../../components/Search";
import {NavBar} from 'nq-component';
import BaseListPage from "../../base/BaseListPage";

class CollectionListPage extends BaseListPage {
    constructor(props) {
        super(props);
        this.presenter = new CollectionListPresenter(
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
            html: <FormCollection
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
            html: <FormCollection
                schema={schema}
                onSubmit={this.addCollectionSubmit.bind(this, schema)}
                onCancel={() => dialog.close()}/>,
            footer: false
        });
    }

    onCLickAccess() {
        function submit(acl) {
            this.presenter.accessSubmit(acl);
        }

        const acl = mergeACl(this.state.selected);
        dialog.fire({
            html: <FormAccess
                currentUser={this.getCurrentUser()}
                acl={acl}
                onSubmit={submit.bind(this)}
                onCancel={() => dialog.close()}/>,
            footer: false
        });
    }

    onClickDeleteField() {
        const field = {};
        const schema = this.getSchema(this.getCollectionName());
        dialog.fire({
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
            html: <DeleteCollection
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
                                    onClick={this.onClickEditCollection.bind(this, schema)}
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
                    <InfiniteScroll
                        className="h-100"
                        loadMore={this.loadMore.bind(this)}
                        hasMore={(!progress && count > objects.length)}>
                        <div className="p-3 p-lg-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <h1 className="fw-bold mt-3 text-capitalize">{this.getCollectionName()}</h1>
                                {
                                    selected.length > 0 ? (
                                            <div>
                                                <span
                                                    className="ms-2">Selected: </span>
                                                <span className="fs-sm text-nowrap">{selected.length}</span>
                                                <span
                                                    className="ms-1">of </span>
                                                <span className="fs-sm text-nowrap">{count}</span>
                                            </div>
                                        ) :
                                        (
                                            <div>
                                                <span
                                                    className="ms-2">Total: </span>
                                                <span className="fs-sm text-nowrap">{objects.length}</span>
                                                <span
                                                    className="ms-1">of </span>
                                                <span className="fs-sm text-nowrap">{count}</span>
                                            </div>
                                        )
                                }

                            </div>
                            <Search
                                className="mt-3"
                                onSubmit={this.searchSubmit.bind(this)}
                                fields={schema.fields}/>


                            <Table
                                className="mt-3"
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
                        </div>
                    </InfiniteScroll>
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

export default withRouter(CollectionListPage);