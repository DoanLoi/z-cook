import { IBrandFilters, IGetBrandResponse } from 'interfaces';

const getBrands = (params: IBrandFilters): Promise<IGetBrandResponse> => {
  return Promise.resolve({
    data: {
      code: 'SUCCESS',
      message: '',
      result: {
        pageSize: 2,
        currentPage: 1,
        totalRecords: 2,
        brands: [
          {
            path:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT-cEwYp_XMi0B-GzS5X0XodeuH4usOCWe8fTI0Q3HRm-ChSvqE&usqp=CAU',
            createdAt: '2020-02-12T11:14:21',
            isActive: true,
            docRequest: true,
            createdBy: null,
            name: 'ASUS',
            updatedAt: '2020-02-12T11:14:21',
            updatedBy: null,
            id: 1,
            internalCode: 'TH003359',
            code: 'asus',
            approvedStatus: true,
          },
          {
            path: null,
            createdAt: '2020-02-10T11:50:32',
            isActive: true,
            docRequest: false,
            createdBy: null,
            name: 'DELL',
            updatedAt: '2020-02-10T11:50:32',
            updatedBy: null,
            id: 2,
            internalCode: 'TH003358',
            code: 'dell',
            approvedStatus: true,
          },
        ],
      },
    },
  });
};

export default {
  getBrands,
};
