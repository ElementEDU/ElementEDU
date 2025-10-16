import {GenericModel} from '../../../entity/generic-model';
import {Model} from '../../../entity/model';

export interface GenericRoom extends GenericModel { id: string; }

export class RoomModel implements Model<string>
{
    private constructor(public readonly id: string) {}

    public static fromObject(data: GenericRoom)
    {
        return new RoomModel(data.id);
    }
}
