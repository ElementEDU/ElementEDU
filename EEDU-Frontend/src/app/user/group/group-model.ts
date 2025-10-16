import {Model} from '../../entity/model';
import {PrivilegeModel} from './privilege/privilege-model';

export interface GenericGroup {
    id: string;
    privileges: PrivilegeModel[];
}

export class GroupModel implements Model<string>
{
    private  constructor(
        public readonly id: string,
        private readonly _privileges: PrivilegeModel[]
    ) {}

    public get privileges(): PrivilegeModel[] {
        return this._privileges;
    }

    public hasPrivilege(privilege: string): boolean {
        return this.privileges.some((privilegeModel: PrivilegeModel): boolean => privilegeModel.id === privilege);
    }

    public static fromObject(object: GenericGroup): GroupModel {
        return new GroupModel(object.id, object.privileges);
    }
}
