export interface Todo {
    uniqueId: string;
    content: string;
    due: Date;
    start: Date;
    end: Date;
    completed: boolean;
}

export interface UPDATES {
    Active     : number;
    Completed  : number;
    Overdue    : number;
    Total      : number;
}