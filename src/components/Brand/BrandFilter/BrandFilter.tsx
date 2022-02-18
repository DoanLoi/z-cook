import React from 'react';
import { Form, Row, Col, Input, Select, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { t } from 'helpers/i18n';
import { IBrandFilters } from 'interfaces';

const { Option } = Select;

interface BrandFilterProps {
  filters: IBrandFilters;
  setFilters: (filters: IBrandFilters) => void;
}

const BrandFilter: React.FC<BrandFilterProps> = props => {
  const { filters, setFilters } = props;
  const [form] = Form.useForm();

  const onFinish = (values: IBrandFilters) => {
    const { query, isActive } = values;
    const newFilters = {
      page: 1,
      pageSize: filters.pageSize,
      ...(query && { query }),
      ...(isActive !== undefined && { isActive }),
    };
    setFilters(newFilters);
  };

  return (
    <Form data-testid="form-filter" form={form} onFinish={onFinish}>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name="query" className="mb-0">
            <Input
              data-testid="query"
              autoFocus
              allowClear
              placeholder={t('EnterName')}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="isActive" className="mb-0">
            <Select
              data-testid="isActive"
              placeholder={t('SelectStatus')}
              allowClear
            >
              <Option value={1}>{t('Active')}</Option>
              <Option value={0}>{t('Inactive')}</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
            {t('Search')}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default BrandFilter;
