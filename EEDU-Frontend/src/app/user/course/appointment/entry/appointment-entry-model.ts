import {Model} from '../../../../entity/model';
import {GenericRoom, RoomModel} from '../../room/room-model';

export interface GenericAppointmentEntry {
    id: number,
    duration: number,
    description: string,
    attachedScheduled: bigint,
    room?: GenericRoom,
    //assignment?: GenericAssignment
}

export class AppointmentEntryModel implements Model<bigint> {

    private constructor(
        public readonly id: bigint,
        private readonly _duration: number,
        private readonly _description: string = "No description has been set",
        private readonly _attachedScheduled: bigint | null,
        private readonly _room: RoomModel | null,
        //public readonly _assignment?: AssignmentModel
    ) {}

    public get course(): bigint {
        // First 16 bits and mask them to get the id
        return (this.id >> 48n) & 0xFFFFn;
    }

    public get description(): string {
        return this._description;
    }

    public get start(): Date {
        return new Date(Number(this.timeStamp));
    }

    public get end(): Date {
        return new Date(Number(this.timeStamp) + this.duration);
    }

    public get room(): RoomModel | null {
        return this._room;
    }

    private get duration(): number {
        return this._duration;
    }

    private get timeStamp(): bigint {
        // The upper 48 bits of the id that store the timestamp in 1/10 seconds.
        return (this.id & 0xFFFFFFFFFFFFn) * 100n;
    }

    public static fromObject(obj: GenericAppointmentEntry): AppointmentEntryModel
    {
        return new AppointmentEntryModel (
            BigInt(obj.id),
            obj.duration,
            obj.description,
            obj.attachedScheduled ? obj.attachedScheduled : null,
            obj.room ? RoomModel.fromObject(obj.room) : null,
        );
    }
}
