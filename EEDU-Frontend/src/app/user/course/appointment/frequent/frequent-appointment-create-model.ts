import {CreateModel} from '../../../../entity/create-model';

export class FrequentAppointmentCreateModel implements CreateModel{

    public constructor(
        private readonly _start: Date,
        private readonly _until: Date,
        private room: number,
        private readonly _duration: number,
        private readonly _frequency: number
    ) {}

    public get start(): Date {
        return this._start;
    }

    public get until(): Date {
        return this._until;
    }

    public get duration(): number {
        return this._duration;
    }

    public get frequency(): number {
        return this._frequency;
    }

    public get toPacket(): any {
        return {
            start: this.start.getTime(),
            until: this.until.getTime(),
            room: this.room,
            duration: this.duration,
            frequency: this.frequency
        };
    }
}
