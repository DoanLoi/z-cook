export interface IBrand {
  id: number;
  code: string;
  name: string;
  isActive: boolean;
  docRequest: boolean;
  approvedStatus: boolean;
  path: string | null;
  internalCode: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string | null;
  updatedBy: string | null;
}

export interface IBrandFilters {
  page?: number;
  pageSize?: number;
  query?: string;
  isActive?: boolean;
}

export interface IGetBrandResponse {
  data: {
    result: {
      currentPage: number;
      pageSize: number;
      totalRecords: number;
      brands: IBrand[];
    };
  };
}

export interface IDish {
  name: string;
  image: string;
  id: string;
  category?: number | null;
  time?: string;
  people?: string;
  steps?: { name: string }[];
  ingredients?: {
    name: string;
    unit: string;
    quantity: number;
    src: string;
    description: string | null;
  }[];
}

export interface IGetMealParams {
  category?: number;
  name?: string;
}

export interface IGetMenuParams {
  history?: string[][];
  current_menu?: string[];
  loved?: string[];
  allergic?: string[];
}
