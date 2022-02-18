import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { PlusOutlined } from '@ant-design/icons';
import { t } from 'helpers/i18n';
import { brandHooks } from 'hooks';
import { IBrand } from 'interfaces';
import AppContainer from 'containers/AppLayout/AppContainer';
import ContentBlock from 'components/shared/ContentBlock';
import BrandFilter from 'components/Brand/BrandFilter/BrandFilter';

const { useBrandData } = brandHooks;

const BrandList: React.FC = () => {
  const {
    brands,
    filters,
    setFilters,
    fetching,
    pagination,
    handleTableChange,
  } = useBrandData({ page: 1, pageSize: 10 });

  const columns: ColumnsType<IBrand> = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 70,
    },
    {
      title: t('Name'),
      dataIndex: 'name',
    },
    {
      title: t('Code'),
      dataIndex: 'code',
    },
    {
      title: t('Status'),
      dataIndex: 'isActive',
      render: (isActive: IBrand['isActive']) =>
        isActive ? t('Active') : t('Inactive'),
    },
  ];

  const extra = () => {
    return (
      <Link to="/brands/create">
        <Button type="primary" icon={<PlusOutlined />}>
          {t('BrandCreate')}
        </Button>
      </Link>
    );
  };

  return (
    <AppContainer title={t('Brands')}>
      <ContentBlock className="mb-base">
        <BrandFilter filters={filters} setFilters={setFilters} />
      </ContentBlock>
      <ContentBlock
        title={
          <span className="text-h3">
            {t('TotalRecords')}: {pagination.total || 0}
          </span>
        }
        extra={extra()}
      >
        <Table
          bordered
          rowKey="id"
          columns={columns}
          loading={fetching}
          dataSource={brands}
          pagination={pagination}
          onChange={handleTableChange}
        />
      </ContentBlock>
    </AppContainer>
  );
};

export default BrandList;
