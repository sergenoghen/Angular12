import { Employee } from "./employee";

export interface Order  {
    OrderID : number,
    CustomerID : number,
    EmployeeID : number,
    OrderDate : string,
    ShipperID : number,
    Employee : Employee,

}