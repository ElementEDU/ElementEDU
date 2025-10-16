import {GenericModel} from '../../../entity/generic-model';
import {GenericReducedUser, ReducedUserModel} from '../../reduced-user-model';
import {Model} from '../../../entity/model';

export interface GenericClassRoom extends GenericModel {
    id: string; tutor: GenericReducedUser; students: GenericReducedUser[];
}

export class ClassRoomModel implements Model<string> {

    private constructor(
        public readonly id: string,
        private readonly _tutor: ReducedUserModel,
        private readonly _students: ReducedUserModel[]
    ) {}

    public get students(): ReducedUserModel[] {
        return this._students;
    }

    public get tutor(): ReducedUserModel {
        return this._tutor;
    }

    public static fromObject(obj: GenericClassRoom): ClassRoomModel {
        return new ClassRoomModel(obj.id, ReducedUserModel.fromObject(obj.tutor), obj.students.map(
            (item: GenericReducedUser): ReducedUserModel => ReducedUserModel.fromObject(item)
        ));
    }
}
