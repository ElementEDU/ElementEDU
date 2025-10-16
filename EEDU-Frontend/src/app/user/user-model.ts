import {Model} from '../entity/model';

export class UserModel implements Model<string> {

    public constructor(
        private readonly _id: string,

    ) {}

    get id(): string {
        return this._id;
    }

}
