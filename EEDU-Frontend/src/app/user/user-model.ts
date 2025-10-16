import {Model} from '../entity/model';

export class UserModel implements Model<string> {

    private  constructor(
        private readonly _id: string,
    ) {}

    public get id(): string {
        return this._id;
    }

}
