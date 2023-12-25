export interface Todo {
    uniqueId: string;
    content: string;
    due: Date;
    completed: boolean;
}

export interface UPDATES {
    Active     : number;
    Completed  : number;
    Overdue    : number;
    Total      : number;
}