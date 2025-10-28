import {CreateModel} from '../../entity/create-model';

/**
 * A wrapper for creating a course. This can be passed into the course service.
 */
export class CourseCreateModel implements CreateModel {

    public constructor(
        private readonly _name: string,
        private readonly _subject: number,
        private readonly _teacher: bigint,
        private readonly _students: bigint[] = [],
        private readonly _classroom: number | null,
    ) {}

    public get toPacket(): any {
        return {
            name: this._name,
            subject: this._subject,
            teacher: Number(this._teacher),
            students: this._students.map((userId: bigint): number => Number(userId)),
            classroom: this._classroom
        };
    }
}
