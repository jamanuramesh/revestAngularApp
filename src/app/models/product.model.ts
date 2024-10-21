export interface Product {
    pid: number;
    name: string;
    description:string;
    price: number;
    quantity: number;
    selectedQuantity?: number;  // Quantity the user selects for the order
}