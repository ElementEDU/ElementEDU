import {CreateModel} from '../../../entity/create-model';

export class SubjectCreateModel implements CreateModel {

    public constructor(private readonly _id: string) {}

    public get toPacket(): any {
        return { id: this._id }
    }
}
