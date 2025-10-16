import {GenericModel} from '../../../entity/generic-model';
import {Model} from '../../../entity/model';

export interface GenericSubject extends GenericModel { id: string; }

export class SubjectModel implements Model<string>
{
    private constructor(public readonly id: string) {}

    public static fromObject(data: GenericSubject)
    {
        return new SubjectModel(data.id);
    }
}
