export interface Category {
    [x: string]: any;
    id?: number;
    name: string;
    transactions?: Transaction[];
}

export interface Transaction {
    [x: string]: any;
    id?: number;
    name: string;
    dateTime: string;
    finance: number;
    categoryId: number;
}
