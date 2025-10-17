import {Model} from '../../../../entity/model';
import {GenericRoom, RoomModel} from '../../room/room-model';
import {CourseModel} from '../../course-model';

export interface GenericFrequentAppointment
{
    id: bigint;
    start: number;
    end: number;
    duration: number;
    frequency: number;
    room: GenericRoom
}

export class FrequentAppointmentModel implements Model<bigint> {

    private constructor(
        public readonly id: bigint,
        private readonly _start: number,
        private readonly _end: number,
        private readonly _duration: number,
        private readonly _frequency: number,
        private readonly _room: RoomModel,
        private readonly _course: () => CourseModel,
    ) {}

    public static fromObject(object: GenericFrequentAppointment, course: () => CourseModel): FrequentAppointmentModel {
        return new FrequentAppointmentModel(
            BigInt(object.id),
            object.start,
            object.end,
            object.duration,
            object.frequency,
            RoomModel.fromObject(object.room),
            course,
        );
    }


}
