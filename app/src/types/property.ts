export type TransactionType = "sale" | "rent";

export type PropertyType =
  | "apartment"
  | "villa"
  | "commercial"
  | "land"
  | "office"
  | "studio"
  | "duplex";

export type PropertyStatus = "draft" | "active" | "archived" | "sold" | "rented";

export type PropertyCondition = "new" | "renovated" | "to_renovate";

export type Amenity =
  | "parking"
  | "elevator"
  | "balcony"
  | "terrace"
  | "cellar"
  | "air_conditioning"
  | "security";

export type ListingImage = {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
  sortOrder: number;
  isCover: boolean;
};

export type Property = {
  id: string;
  slug: string;
  title: string;
  transactionType: TransactionType;
  propertyType: PropertyType;
  status: PropertyStatus;
  priceDzd: number;
  negotiable: boolean;
  wilaya: string;
  commune: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  areaM2: number;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  floor?: string;
  totalFloors?: number;
  yearBuilt?: number;
  condition: PropertyCondition;
  description: string;
  amenities: Amenity[];
  images: ListingImage[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};
