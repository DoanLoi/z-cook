import { IGetMealParams, IGetMenuParams } from 'interfaces';
import { useEffect, useState } from 'react';
import { foodServices } from 'services';
import { IDish } from 'interfaces';

const useIngredient = () => {
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const getIngredient = async () => {
    try {
      setLoading(true);
      const res = await foodServices.getIngredients();
      setIngredients(res.data.data);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getIngredient();
  }, []);

  return { ingredients, loading };
};

const useMeal = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [meal, setMeal] = useState<any[]>([]);
  const [mealDetail, setMealDetail] = useState<IDish>();
  const [loadingDetail, setLoadingDetail] = useState<boolean>(false);

  const getMeal = async (params: IGetMealParams) => {
    try {
      setLoading(true);
      const res = await foodServices.getMeal(params);
      setMeal(res.data.data.meals);
    } finally {
      setLoading(false);
    }
  };

  const getDetailMeal = async (id: string) => {
    try {
      setLoadingDetail(true);
      const res = await foodServices.getDetailMeal(id);
      setMealDetail(res.data.data.meals);
    } finally {
      setLoadingDetail(false);
    }
  };

  return {
    loading,
    getMeal,
    meal,
    getDetailMeal,
    mealDetail,
    loadingDetail,
  };
};

const useMenu = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [menu, setMenu] = useState<IDish[]>([]);

  const getMenu = async (params: IGetMenuParams) => {
    try {
      setLoading(true);
      const res = await foodServices.getMenuRandom(params);
      setMenu(res.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return {
    getMenu,
    loading,
    menu,
    setMenu,
  };
};

export default { useIngredient, useMeal, useMenu };
