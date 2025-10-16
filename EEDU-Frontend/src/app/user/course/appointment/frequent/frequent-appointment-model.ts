import {Model} from '../../../../entity/model';
import {RoomModel} from '../../room/room-model';

export class FrequentAppointmentModel implements Model<bigint> {

    private constructor(
        public readonly id: bigint,
        private readonly _start: number,
        private readonly _end: number,
        private readonly _duration: number,
        private readonly _frequency: number,
        private readonly _room: RoomModel,
        //private readonly _course: () => CourseModel,
    ) {}

}
