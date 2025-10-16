import {CreateModel} from '../../entity/create-model';

export class GroupCreateModel implements CreateModel {

    public constructor(private readonly _id: string, private readonly _privileges: string[]) {}

    public get toPacket(): any {
        return { id: this._id, privileges: this._privileges }
    }
}
