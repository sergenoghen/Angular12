export interface Category{
    CategoryID: number,
    CategoryName: string,
    Description: string,
}

export class CategoryModel {
    constructor(
    ){  }
    CategoryID: number = -1;
    CategoryName: string='';
    Description: string='';
}