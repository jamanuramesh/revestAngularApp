import {Product} from '../models/product.model'
export interface Order {
    id: number;
    products: Product[];
    total: number;
}