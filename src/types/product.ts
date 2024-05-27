export interface Category {
  id: string;
  name: string;
}

export interface Prices {
  amount: string;
  currency: string;
  symbol: string;
}

export interface Gallery {
  id: string;
  imageUrl: string;
}

export interface AttributeItem {
  id: string;
  value: string;
  displayValue: string;
}

export interface Attributes {
  id: string;
  name: string;
  items: AttributeItem[];
  type: string;
}
export interface Product {
  id: string;
  name: string;
  inStock: boolean;
  gallery: Gallery[];
  prices: Prices[];
  brand: string;
  category: Category;
  attributes: Attributes[];
  description: string;
}
