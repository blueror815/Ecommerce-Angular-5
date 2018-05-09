/**
 * Product type declaration.
 */
export interface Product {
  id: string;
  title: string;
  price: number;
  imageUrls: string[];
  description: string;
  categoryId: number;
}
