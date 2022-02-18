import { useState, useEffect } from 'react';
import { PaginationProps } from 'antd';
import { IBrandFilters, IBrand } from 'interfaces';
import { brandServices } from 'services';

const useBrandData = (defaultFilters: IBrandFilters) => {
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [fetching, setFetching] = useState(false);
  const [pagination, setPagination] = useState<PaginationProps>({
    showSizeChanger: true,
  });

  const getBrands = async (params: IBrandFilters) => {
    try {
      setFetching(true);
      const res = await brandServices.getBrands(params);
      if (res.data) {
        const { result } = res.data;
        const { currentPage, pageSize, totalRecords } = result;
        const newBrands = result.brands;
        setBrands(newBrands);
        setPagination({
          ...pagination,
          current: currentPage,
          pageSize,
          total: totalRecords,
        });
      }
    } finally {
      setFetching(false);
    }
  };

  const handleTableChange = (pager: PaginationProps) => {
    const { current, pageSize } = pager;
    const newQueryParams = {
      ...filters,
      page: current,
      pageSize,
    };
    setFilters(newQueryParams);
  };

  useEffect(() => {
    getBrands(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return {
    brands,
    filters,
    setFilters,
    fetching,
    pagination,
    handleTableChange,
  };
};

export default {
  useBrandData,
};
