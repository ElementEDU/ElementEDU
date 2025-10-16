import {CreateModel} from '../../../entity/create-model';

export class PrivilegeCreateModel implements CreateModel {

    public constructor(private readonly _id: string) {}

    get toPacket(): any {
        return { id: this._id }
    }
}
