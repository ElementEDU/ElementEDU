import {Model} from '../entity/model';
import {AccountType} from './account-type';

export interface GenericReducedUser {
    id: bigint;
    firstName: string;
    lastName: string;
    accountType: string;
}

/**
 * Represents a more minimalistic version of the user.
 * It can be used to portray a user account without loading its
 * data or sharing it.
 */
export class ReducedUserModel implements Model<bigint> {

    private constructor(
        private readonly _id: bigint,
        private readonly _firstName: string,
        private readonly _lastName: string,
        private readonly _accountType: AccountType
    ) {}

    public get id(): bigint {
        return this._id;
    }

    public get name(): string {
        return `${this.lastName}, ${this.firstName}`;
    }

    public get firstName(): string {
        return this._firstName;
    }

    public get lastName(): string {
        return this._lastName;
    }

    public get accountType(): AccountType {
        return this._accountType;
    }

    public static fromObject(obj: GenericReducedUser): ReducedUserModel {
        return new ReducedUserModel(
            obj.id,
            obj.firstName,
            obj.lastName,
            AccountType[obj.accountType as keyof typeof AccountType]
        );
    }
}
