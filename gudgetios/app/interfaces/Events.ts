
export interface Event {
    id: number;
    uniqueId: string;
    name: string;
    description: string;
    startdate: Date;
    enddate: Date;
    time: Date;
    completed: boolean;
}