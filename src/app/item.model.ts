export class Item {
    title: string;
    note: string;
    isCompleted: boolean;
    date: Date;
    constructor(
        title:string, 
        note:string, 
        isCompleted:boolean, 
        date:Date, 
    )
    {
        this.title = title;
        this.note = note;
        this.isCompleted = isCompleted;
        this.date = date;
    }
}