import {CreateModel} from '../../../entity/create-model';

/**
 * This is a wrapper for creating a privilege entity.
 */
export class PrivilegeCreateModel implements CreateModel {

    public constructor(private readonly _id: string) {}

    public get toPacket(): any {
        return { id: this._id }
    }
}
