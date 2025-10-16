import {Model} from '../../../entity/model';
import {GenericModel} from '../../../entity/generic-model';

export interface GenericPrivilege extends GenericModel { id: string; }

export class PrivilegeModel implements Model<string> {

    public constructor(private readonly _id: string) {}

    public get id(): string {
        return this._id;
    }

    public static fromObject(obj: GenericPrivilege): PrivilegeModel {
        return new PrivilegeModel(obj.id);
    }
}
