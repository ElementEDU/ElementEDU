import {CreateModel} from '../../../entity/create-model';

export class ClassRoomCreateModel implements CreateModel {

    public constructor(
        private readonly _id: string,
        private readonly _tutor: bigint,
        private readonly _students: bigint[],
        private readonly _courses: bigint[],
    ) {}

    public get id(): string {
        return this._id;
    }

    public get tutor(): bigint | undefined {
        return this._tutor;
    }

    public get students(): bigint[] {
        return this._students;
    }

    public get courses(): bigint[] {
        return this._courses;
    }

    public get toPacket(): any {
        return {
            id: this.id,
            tutor: Number(this.tutor),
            students: this.students.map((id: bigint): number => Number(id)),
            courses: this.courses.map((id: bigint): number => Number(id)),
        }
    }
}
