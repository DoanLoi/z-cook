import { requestServices } from 'services';
import { IBrandFilters, IGetBrandResponse } from 'interfaces';

const { catalogClient } = requestServices;

const getBrands = (params: IBrandFilters): Promise<IGetBrandResponse> => {
  return catalogClient.get('/brands', {
    params,
  });
};

export default {
  getBrands,
};
