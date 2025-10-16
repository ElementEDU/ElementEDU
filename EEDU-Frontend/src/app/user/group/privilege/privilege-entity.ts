import {Model} from '../../../entity/model';

export class PrivilegeEntity implements Model<string> {

    public constructor(private readonly _id: string) {}

    public get id(): string {
        return this._id;
    }
}
