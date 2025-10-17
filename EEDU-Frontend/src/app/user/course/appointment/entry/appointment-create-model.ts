import {CreateModel} from '../../../../entity/create-model';

export class AppointmentCreateModel implements CreateModel {

    public constructor(
        private readonly _start: Date,
        private readonly _duration: number,
        private readonly _room: string | null,
        private readonly _description?: string,
    ) {}

    public get start(): Date {
        return this._start;
    }

    public get duration(): number {
        return this._duration;
    }

    public get room(): string | null {
        return this._room;
    }

    public get description(): string | undefined {
        return this._description;
    }

    public get toPacket(): any {
        return { start: this.start.getTime(), duration: this.duration, description: this.description };
    }
}
