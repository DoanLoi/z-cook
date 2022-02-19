import { requestServices } from 'services';
import { IGetMealParams, IGetMenuParams } from 'interfaces';

const { API } = requestServices;

const getIngredients = () => {
  return API.get('/api/ingredient');
};

const getMeal = (params: IGetMealParams) => {
  return API.get('/api/meal', { params });
};

const getMenuRandom = (params: IGetMenuParams): any => {
  return API.post('/api/meal/random', params);
};

const getDetailMeal = (id: string): any => {
  return API.get(`/api/meal/detail/${id}`);
};

export default {
  getIngredients,
  getMeal,
  getMenuRandom,
  getDetailMeal,
};
