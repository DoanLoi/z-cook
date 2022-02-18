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
