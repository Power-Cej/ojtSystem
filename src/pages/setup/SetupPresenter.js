class SetupPresenter {

    constructor(view, findObjectUseCase, saveObjectUseCase, updateObjectUseCase, deleteObjectUseCase) {
        this.view = view;
        this.findObjectUseCase = findObjectUseCase;
        this.saveObjectUseCase = saveObjectUseCase;
        this.updateObjectUseCase = updateObjectUseCase;
        this.deleteObjectUseCase = deleteObjectUseCase;
    }

    async findRoles() {
        const query = {
            keys: ['name']
        }
        const roles = await this.findObjectUseCase.execute('roles', query);
        return roles.reduce((acc, role) => {
            if (role.name !== role.id) {
                acc.push(role);
            }
            return acc;
        }, []);
    }


    async updateUserRoles() {
        const query = {
            where: {roles: {"$exists": true}},
            keys: ['roles'],
            includes: ['roles']
        }
        try {
            const users = await this.findObjectUseCase.execute('users', query);
            for (const user of users) {
                const hasChanged = user.roles.some(role => role.name !== role.id);
                if (hasChanged) {
                    const object = {id: user.id};
                    object.roles = user.roles.map(role => ({id: role.name}));
                    await this.updateObjectUseCase.execute('users', user);
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    async createNewRoles(roles) {
        this.view.setTotal(roles.length);
        for (let i = 0; i < roles.length; i++) {
            const role = roles[i];
            try {
                const newRole = {id: role.name, name: role.name};
                await this.saveObjectUseCase.execute('roles', newRole);
                await this.deleteObjectUseCase.execute('roles', role.id);
                this.view.setCount(i + 1);
            } catch (e) {
                console.log(e)
            }
        }
    }

    async onClickUpdateRoles() {
        this.view.showLoading();
        const roles = await this.findRoles();
        if(roles.length>0){
            await this.updateUserRoles();
        }
        await this.createNewRoles(roles);
        this.view.hideLoading();
    }
}

export default SetupPresenter;