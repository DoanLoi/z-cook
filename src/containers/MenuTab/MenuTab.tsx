import React, { Fragment, useEffect, useState } from 'react';
import {
  Button,
  Input,
  Tabs,
  Row,
  Col,
  Image,
  Radio,
  Space,
  Modal,
  Spin,
} from 'antd';
import {
  ArrowRightOutlined,
  ReloadOutlined,
  PlusCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import './MenuTab.scss';

enum IStepWelcome {
  RANDOM_MENU,
  EDIT_MENU,
}

interface IDish {
  name: string;
  image: string;
  id: number;
  type: number;
}

enum IType {
  MAIN_DISH,
  SOUP,
  DESSERT,
}

const menuDefault = [
  {
    id: 1,
    name: 'Thịt gà',
    image: 'https://thammythucuc.vn/wp-content/uploads/2018/06/1.jpg',
    type: 0,
  },
  {
    id: 2,
    name: 'Thịt gà',
    image: 'https://thammythucuc.vn/wp-content/uploads/2018/06/1.jpg',
    type: 0,
  },
  {
    id: 3,
    name: 'Thịt gà',
    image: 'https://thammythucuc.vn/wp-content/uploads/2018/06/1.jpg',
    type: 0,
  },
  {
    id: 4,
    name: 'Canh rau luộc',
    image: 'https://thammythucuc.vn/wp-content/uploads/2018/06/1.jpg',
    type: 1,
  },

  {
    id: 5,
    name: 'Canh rau luộc',
    image: 'https://thammythucuc.vn/wp-content/uploads/2018/06/1.jpg',
    type: 2,
  },
];

const WelcomeScreen: React.FC<{
  onNextScreen: () => void;
  onBackScreen: () => void;
}> = ({ onNextScreen, onBackScreen }) => {
  const [stepWelcome, setStepWelcome] = useState<number>(0);
  const [menu, setMenu] = useState<IDish[]>(menuDefault);
  const [typeAdd, setTypeAdd] = useState<IType>();

  const onNextWelcomeScreen = () => {
    setStepWelcome(stepWelcome + 1);
  };

  const onBackWelcomeScreen = () => {
    setStepWelcome(stepWelcome - 1);
  };

  const onDeleteDish = (id: number) => {
    const tmpMenu = menu.filter(dish => dish.id !== id);
    setMenu(tmpMenu);
  };

  const onAddDishToMenu = (dishs: IDish[]) => {
    setMenu([...menu, ...dishs]);
  };
  return (
    <div
      className="welcome"
      style={{
        height: '100vh',
        width: '100%',
        background: '#3FC979',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          height: '88vh',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'scroll',
          scrollbarWidth: 'none',
        }}
      >
        <div className="p-base mt-base">
          <div style={{ color: '#fff', fontSize: 35, fontWeight: 'bold' }}>
            Z-Cook
          </div>
          <span>Hôm nay ăn gì?</span>

          <Tabs
            style={{ color: '#fff', fontSize: 18 }}
            activeKey={stepWelcome.toString()}
            tabBarStyle={{ display: 'none' }}
          >
            <Tabs.TabPane key={IStepWelcome.RANDOM_MENU}>
              <RandomeMenu onNextWelcomeScreen={onNextWelcomeScreen} />
            </Tabs.TabPane>
            <Tabs.TabPane key={IStepWelcome.EDIT_MENU}>
              <EditMenu
                onNextWelcomeScreen={onNextWelcomeScreen}
                menu={menu}
                onDeleteDish={onDeleteDish}
                setTypeAdd={setTypeAdd}
                onAddDishToMenu={onAddDishToMenu}
              />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {stepWelcome !== IStepWelcome.RANDOM_MENU && (
          <Button
            style={{ position: 'relative' }}
            onClick={onNextWelcomeScreen}
            className="button-cook"
          >
            {stepWelcome !== IStepWelcome.EDIT_MENU
              ? 'Tiếp'
              : 'Lưu lịch sử bữa ăn'}
            <ArrowRightOutlined
              style={{ position: 'absolute', right: 15, top: 15 }}
            />
          </Button>
        )}
      </div>
    </div>
  );
};

const RandomeMenu: React.FC<{ onNextWelcomeScreen: () => void }> = ({
  onNextWelcomeScreen,
}) => {
  return (
    <div
      className="d-flex"
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        height: 'calc(88vh - 180px)',
      }}
    >
      <Radio.Group className="mb-base">
        <Space direction="vertical">
          <Radio value={2}>Mâm cơm hàng ngày</Radio>
          <Radio value={3}>Món nhậu</Radio>
        </Space>
      </Radio.Group>
      <Button
        style={{ position: 'relative' }}
        className="button-cook"
        onClick={onNextWelcomeScreen}
      >
        TẠO MENU NGAY
      </Button>
    </div>
  );
};

const EditMenu: React.FC<{
  onNextWelcomeScreen: () => void;
  menu: IDish[];
  onDeleteDish: (id: number) => void;
  setTypeAdd: React.Dispatch<React.SetStateAction<IType | undefined>>;
  onAddDishToMenu: (dishs: IDish[]) => void;
}> = ({
  onNextWelcomeScreen,
  menu,
  onDeleteDish,
  setTypeAdd,
  onAddDishToMenu,
}) => {
  const [visibleAdd, setVisibleAdd] = useState<boolean>(false);
  const [id, setId] = useState<number>();

  const openModalAddDish = (type: IType) => {
    setVisibleAdd(true);
    setTypeAdd(type);
  };
  const closeModalAddDish = () => {
    setVisibleAdd(false);
    setTypeAdd(undefined);
  };

  const getDishByType = (type: number) => {
    return menu.filter(dish => dish.type === type);
  };
  const cooks: IDish[] = [
    {
      id: 1,
      image: 'https://thammythucuc.vn/wp-content/uploads/2018/06/1.jpg',
      name: 'Khoai tây',
      type: 1,
    },
    {
      id: 1,
      image:
        'https://hinh365.com/wp-content/uploads/2020/06/nhung-hinh-anh-dep-doc-dao-duoc-chon-loc-ve-chu-de-cu-ca-rot-ngay-19.jpg',
      name: 'Cà rốt',
      type: 1,
    },
    {
      id: 1,
      image:
        'https://photo-cms-baonghean.zadn.vn/w607/Uploaded/2022/tuqzxgazsnzm/2018_11_08/143638-1.jpg',
      name: 'Thịt lợn',
      type: 2,
    },
    {
      id: 1,
      image:
        'https://hinh365.com/wp-content/uploads/2020/06/nhung-hinh-anh-dep-doc-dao-duoc-chon-loc-ve-chu-de-cu-ca-rot-ngay-19.jpg',
      name: 'Cà rốt',
      type: 0,
    },
    {
      id: 1,
      image:
        'https://photo-cms-baonghean.zadn.vn/w607/Uploaded/2022/tuqzxgazsnzm/2018_11_08/143638-1.jpg',
      name: 'Thịt lợn',
      type: 1,
    },
  ];
  return (
    <>
      {!id ? (
        <>
          <Row className="mt-base" justify="center" align="middle">
            <Col span={14}>
              <div style={{ fontWeight: 'bold', fontSize: 20 }}>
                Mâm cơm gia đình!
              </div>
            </Col>
            <Col className="text-center" span={10}>
              <Button className="button-change">
                <ReloadOutlined />
                Đổi menu
              </Button>
            </Col>
          </Row>
          <div style={{ marginTop: 30 }}>
            <span className="mr-base" style={{ fontSize: 20 }}>
              Món mặn
            </span>
            <span
              className="mr-base"
              onClick={() => openModalAddDish(IType.MAIN_DISH)}
            >
              <PlusCircleOutlined className="mx-half" />
            </span>
            <div
              className="p-base mt-half"
              style={{ background: '#fff', borderRadius: 10 }}
            >
              <Row gutter={[10, 10]}>
                {getDishByType(IType.MAIN_DISH).map(cook => (
                  <Col span={8}>
                    <div className="text-center cook-item">
                      <img
                        onClick={() => onDeleteDish(cook.id)}
                        style={{
                          height: 20,
                          width: 20,
                          position: 'absolute',
                          top: -6,
                          right: 2,
                        }}
                        src="https://cdn2.iconfinder.com/data/icons/classic-development-circle/512/harmful-512.png"
                      />
                      <div onClick={() => setId(cook.id)}>
                        <Image
                          preview={false}
                          className="mt-base"
                          width={70}
                          height={70}
                          style={{ borderRadius: 1000 }}
                          src={cook.image}
                        />
                        <div
                          className="mt-base mb-half"
                          style={{
                            color: '#4f4f4d',
                            fontSize: 14,
                            fontWeight: 'bold',
                          }}
                        >
                          {cook.name}
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
          <div style={{ marginTop: 40 }}>
            <span className="mr-base" style={{ fontSize: 20 }}>
              Canh/rau
            </span>
            <span
              className="mr-base"
              onClick={() => openModalAddDish(IType.SOUP)}
            >
              <PlusCircleOutlined className="mx-half" />
            </span>
            <div
              className="p-base mt-half"
              style={{ background: '#fff', borderRadius: 10 }}
            >
              <Row gutter={[10, 10]}>
                {getDishByType(IType.SOUP).map(cook => (
                  <Col span={8}>
                    <div className="text-center cook-item">
                      <img
                        onClick={() => onDeleteDish(cook.id)}
                        style={{
                          height: 20,
                          width: 20,
                          position: 'absolute',
                          top: -6,
                          right: 2,
                        }}
                        src="https://cdn2.iconfinder.com/data/icons/classic-development-circle/512/harmful-512.png"
                      />
                      <div onClick={() => setId(cook.id)}>
                        <Image
                          preview={false}
                          className="mt-base"
                          width={70}
                          height={70}
                          style={{ borderRadius: 1000 }}
                          src={cook.image}
                        />
                        <div
                          className="mt-base mb-half"
                          style={{
                            color: '#4f4f4d',
                            fontSize: 14,
                            fontWeight: 'bold',
                          }}
                        >
                          {cook.name}
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </div>

          <div style={{ marginTop: 40 }}>
            <span className="mr-base" style={{ fontSize: 20 }}>
              Tráng miệng
            </span>
            <span
              className="mr-half"
              onClick={() => openModalAddDish(IType.DESSERT)}
            >
              <PlusCircleOutlined className="mx-half" />
            </span>
            <div
              className="p-base mt-half"
              style={{ background: '#fff', borderRadius: 10 }}
            >
              <Row gutter={[10, 10]}>
                {getDishByType(IType.DESSERT).map(cook => (
                  <Col span={8}>
                    <div className="text-center cook-item">
                      <img
                        onClick={() => onDeleteDish(cook.id)}
                        style={{
                          height: 20,
                          width: 20,
                          position: 'absolute',
                          top: -6,
                          right: 2,
                        }}
                        src="https://cdn2.iconfinder.com/data/icons/classic-development-circle/512/harmful-512.png"
                      />
                      <div onClick={() => setId(cook.id)}>
                        <Image
                          preview={false}
                          className="mt-base"
                          width={70}
                          height={70}
                          style={{ borderRadius: 1000 }}
                          src={cook.image}
                        />
                        <div
                          className="mt-base mb-half"
                          style={{
                            color: '#4f4f4d',
                            fontSize: 14,
                            fontWeight: 'bold',
                          }}
                        >
                          {cook.name}
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
          <Modal
            footer={null}
            title={<span style={{ fontSize: 20 }}>Thêm món</span>}
            visible={visibleAdd}
            onCancel={closeModalAddDish}
          >
            <span style={{ fontWeight: 'bold' }}>
              Tìm theo nguyên liệu hoặc món ăn
            </span>
            <Input className="mt-half" placeholder="Tìm kiếm ..." />
            <span style={{ color: 'red' }}>
              Nhấn vào món ăn mà bạn muốn thêm vào thực đơn
            </span>
            <Row style={{ marginTop: 24 }} gutter={[10, 10]}>
              {cooks.map(cook => (
                <Col span={8}>
                  <div
                    className="text-center cook-item"
                    onClick={() => onAddDishToMenu([cook])}
                  >
                    <Image
                      preview={false}
                      className="mt-base"
                      width={70}
                      height={70}
                      style={{ borderRadius: 1000 }}
                      src={cook.image}
                    />
                    <div
                      className="mt-base mb-half"
                      style={{
                        color: '#4f4f4d',
                        fontSize: 14,
                        fontWeight: 'bold',
                      }}
                    >
                      {cook.name}
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Modal>
        </>
      ) : (
        <DetailDish id={id} />
      )}
    </>
  );
};

const DetailDish: React.FC<{ id: number }> = ({ id }) => {
  const [detailCook, setDetailCook] = useState<any>();
  const detailCookDefault = {
    image:
      'https://hinh365.com/wp-content/uploads/2020/06/nhung-hinh-anh-dep-doc-dao-duoc-chon-loc-ve-chu-de-cu-ca-rot-ngay-19.jpg',
    name: 'Thịt lợn',
    ingredients: [
      {
        name: 'Thịt gà',
        unit: 'gam',
        number: 200,
      },
      {
        name: 'Gạo',
        unit: 'game',
        number: 100,
      },
      { name: 'Hành củ, hành lá, rau muống, ngùi tàu' },
    ],
  };
  useEffect(() => {
    setDetailCook(detailCookDefault);
  }, [id]);

  return (
    <>
      {!detailCook ? (
        <Spin />
      ) : (
        <div style={{ marginTop: 30, fontSize: 14 }}>
          <div
            className="p-half text-center"
            style={{ border: '1px solid #fff', fontSize: 18 }}
          >
            Món chính/{detailCook.name}
          </div>
          <Row gutter={[10, 0]} className="mt-base">
            <Col span={10}>
              <Image
                style={{ borderRadius: 10 }}
                src={detailCook.image}
              ></Image>
            </Col>
            <Col span={14}>
              <div>
                <span>500Kcal</span>
                <span style={{ marginLeft: 24 }}>
                  <ClockCircleOutlined className="mr-half" /> 30 phút
                </span>
                <div
                  className="mt-base mb-base"
                  style={{ fontSize: 18, fontWeight: 'bold' }}
                >
                  NGUYÊN LIỆU
                </div>
                {detailCook.ingredients.map((ingredient: any) => (
                  <div>
                    - {ingredient.number} {ingredient.unit} {ingredient.name}
                  </div>
                ))}
              </div>
            </Col>
          </Row>
          <div className="mt-base" style={{ fontSize: 18, fontWeight: 'bold' }}>
            CÔNG THỨC
          </div>
          <div>
            1. Sơ chế vịt Để khử mùi hôi của vịt, bạn dùng muối và một vài lát
            chanh chà xát lên khắp thân vịt. Sau đó, rửa sạch lại với nước nhiều
            lần, để ráo rồi chặt thành khúc vừa ăn.2. Sơ chế vịt Để khử mùi hôi
            của vịt, bạn dùng muối và một vài lát chanh chà xát lên khắp thân
            vịt. Sau đó, rửa sạch lại với nước nhiều lần, để ráo rồi chặt thành
            khúc vừa ăn. 3. Sơ chế vịt Để khử mùi hôi của vịt, bạn dùng muối và
            một vài lát chanh chà xát lên khắp thân vịt. Sau đó, rửa sạch lại
            với nước nhiều lần, để ráo rồi chặt thành khúc vừa ăn
          </div>
        </div>
      )}
    </>
  );
};

export default WelcomeScreen;
