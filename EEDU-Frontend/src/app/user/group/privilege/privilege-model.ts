import {Model} from '../../../entity/model';
import {GenericModel} from '../../../entity/generic-model';

export interface GenericPrivilege extends GenericModel { id: string; }

export class PrivilegeModel implements Model<string> {

    private constructor(public readonly id: string) {}

    public static fromObject(obj: GenericPrivilege): PrivilegeModel {
        return new PrivilegeModel(obj.id);
    }
}
