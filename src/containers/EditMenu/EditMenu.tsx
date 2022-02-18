import React from 'react';
import {
  ArrowLeftOutlined,
  SearchOutlined,
  HomeOutlined,
  HeartOutlined,
  FilterOutlined,
  ShoppingCartOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Row, Col, Image, Button } from 'antd';
import './EditMenu.scss';

const EditMenu: React.FC<{
  onNextScreen: () => void;
  onBackScreen: () => void;
}> = ({ onNextScreen, onBackScreen }) => {
  const cooks = [
    {
      image: 'https://thammythucuc.vn/wp-content/uploads/2018/06/1.jpg',
      name: 'Khoai tây',
    },
    {
      image:
        'https://hinh365.com/wp-content/uploads/2020/06/nhung-hinh-anh-dep-doc-dao-duoc-chon-loc-ve-chu-de-cu-ca-rot-ngay-19.jpg',
      name: 'Cà rốt',
    },
    {
      image:
        'https://photo-cms-baonghean.zadn.vn/w607/Uploaded/2022/tuqzxgazsnzm/2018_11_08/143638-1.jpg',
      name: 'Thịt lợn',
    },
    {
      image: 'https://thammythucuc.vn/wp-content/uploads/2018/06/1.jpg',
      name: 'Khoai tây',
    },
  ];
  return (
    <div
      className="p-base"
      style={{
        height: '100vh',
        background: '#f2f5f5',
        color: '#000',
      }}
    >
      <div style={{ height: '88vh', overflowY: 'scroll' }}>
        <div style={{ position: 'relative', height: 50 }} className="mt-base">
          <ArrowLeftOutlined
            style={{ position: 'absolute', left: 0, fontSize: 24 }}
            onClick={onBackScreen}
          />
          <SearchOutlined
            style={{
              position: 'absolute',
              right: 0,
              fontSize: 24,
            }}
          />
        </div>
        <div style={{ fontSize: 30, fontWeight: 600 }}>Work Place</div>
        <div>Chọn món ăn đưa vào menu</div>
        <Row gutter={[30, 20]} style={{ marginTop: 32 }}>
          <Col span={6}>
            <div className="filter-item active">
              <HomeOutlined className="icon active-icon" />
            </div>
          </Col>
          <Col span={6}>
            <div className="filter-item">
              <HeartOutlined className="icon" />
            </div>
          </Col>
          <Col span={6}>
            <div className="filter-item">
              <FilterOutlined className="icon" />
            </div>
          </Col>
          <Col span={6}>
            <div className="filter-item">
              <ShoppingCartOutlined className="icon" />
            </div>
          </Col>
        </Row>
        <Row className="mt-base" gutter={[20, 20]}>
          {cooks.map(item => (
            <Col span={12}>
              <CookItem cook={item} />
            </Col>
          ))}
        </Row>
      </div>
      <div
        style={{
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button style={{ position: 'relative' }} className="button-summary">
          <span style={{ position: 'absolute', left: 15, top: 10 }}>
            Tổng số
          </span>
          <span style={{ position: 'absolute', right: 15, top: 10 }}>
            3 món ăn
          </span>
        </Button>
      </div>
    </div>
  );
};

const CookItem: React.FC<{ cook: any }> = ({ cook }) => {
  return (
    <div className="cook-item">
      <div style={{ height: 20, position: 'relative' }}>
        <span style={{ position: 'absolute', right: 5 }}>
          <Image
            width={18}
            height={20}
            src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/512/heart-icon.png"
          />
        </span>
      </div>
      <Image
        preview={false}
        width={100}
        height={100}
        style={{ borderRadius: 1000 }}
        src={cook.image}
      />
      <Row>
        <Col span={18}> {cook.name} </Col>
        <Col span={6}>
          <PlusCircleOutlined className="active-icon" />
        </Col>

        <span className="ml-base"></span>
      </Row>
    </div>
  );
};
export default EditMenu;
