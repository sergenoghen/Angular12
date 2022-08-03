export interface Customer {
    CustomerID : number,
    CustomerName : string,
    ContactName: string,
    Address: string,
    City: string,
    PostalCode: string,
    Country: string,
}

export interface EmptyCustomer extends Customer{
    dataState: string,
}