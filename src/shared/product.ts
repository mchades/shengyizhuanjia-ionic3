export class Product {
  id: number;
  name: string;
  categoryId: number;
  categoryName: string;
  category: any;
  barcode: string;
  images: string[]=[];
  price: number;
  purchasePrice:number;
  standard:string;
  supplierName:string;
  supplierPhone:string;
  stock:number;
  note:string;
}
