import {Model} from '../entity/model';

export interface GenericUser {
    id: string;
}

/**
 * Represents the user
 */
export class UserModel implements Model<string> {

    private constructor(
        private readonly _id: string,
    ) {}

    public get id(): string {
        return this._id;
    }

    public static fromObject(obj: GenericUser): UserModel
    {
        return new UserModel(obj.id); // TODO add missing attributes
    }

}
