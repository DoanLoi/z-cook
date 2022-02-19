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
  Typography,
} from 'antd';
import {
  ArrowLeftOutlined,
  ReloadOutlined,
  PlusCircleOutlined,
  ClockCircleOutlined,
  SettingOutlined,
  SnippetsOutlined,
} from '@ant-design/icons';
import { IDish, IGetMenuParams } from 'interfaces';
import './MenuTab.scss';
import daily from 'assets/images/daily.jpg';
import drink from 'assets/images/drink.jpg';
import closeIcon from 'assets/images/close-icon.png';
import { ISTEP } from 'containers/Home/Home';
import moment from 'moment';
import { foodHooks } from 'hooks';

const { Paragraph } = Typography;

enum IStepWelcome {
  RANDOM_MENU,
  EDIT_MENU,
}

enum IType {
  MAIN_DISH,
  SOUP,
  DESSERT,
}
enum ICategory {
  DAILY,
  DRINK,
}

const menuDefault: IDish[] = [
  {
    id: '1',
    image: 'https://thammythucuc.vn/wp-content/uploads/2018/06/1.jpg',
    name: 'Khoai tây',
    category: 1,
    ingredients: [
      {
        src: '4 quả mướp đắng dài (8 quả nhỏ)',
        description: null,
        quantitative: 4,
        unit: 'quả',
        name: 'mướp đắng dài (8 quả nhỏ)',
      },
      {
        src: '450 g thịt heo bằm (1lb)',
        description: null,
        quantitative: 450,
        unit: 'gram',
        name: 'thịt heo bằm (1lb)',
      },
      {
        src: '2 củ hành tây tím nhỏ',
        description: null,
        quantitative: 2,
        unit: 'củ',
        name: 'hành tây tím nhỏ',
      },
      {
        src: '100 g hành lá',
        description: null,
        quantitative: 100,
        unit: 'gram',
        name: 'hành lá',
      },
      {
        src: '1 muỗng cà phê đường',
        description: null,
        quantitative: 1,
        unit: 'muỗng cà phê',
        name: 'đường',
      },
      {
        src: '1 muỗng cà phê tiêu',
        description: null,
        quantitative: 1,
        unit: 'muỗng cà phê',
        name: 'tiêu',
      },
      {
        src: '4 muỗng canh nước mắm',
        description: null,
        quantitative: 4,
        unit: 'muỗng súp',
        name: 'nước mắm',
      },
      {
        src: '1.5 l nước lọc+5 muỗng canh nước mắm+1 muỗng canh đường',
        description: null,
        quantitative: 1.5,
        unit: 'lít',
        name: 'nước lọc+5 muỗng canh nước mắm+1 muỗng canh đường',
      },
    ],
  },
  {
    id: '2',
    image:
      'https://hinh365.com/wp-content/uploads/2020/06/nhung-hinh-anh-dep-doc-dao-duoc-chon-loc-ve-chu-de-cu-ca-rot-ngay-19.jpg',
    name: 'Cà rốt',
    category: 1,
  },
  {
    id: '3',
    image:
      'https://photo-cms-baonghean.zadn.vn/w607/Uploaded/2022/tuqzxgazsnzm/2018_11_08/143638-1.jpg',
    name: 'Thịt lợn',
    category: 2,
  },
  {
    id: '4',
    image:
      'https://hinh365.com/wp-content/uploads/2020/06/nhung-hinh-anh-dep-doc-dao-duoc-chon-loc-ve-chu-de-cu-ca-rot-ngay-19.jpg',
    name: 'Cà rốt',
    category: 0,
  },
  {
    id: '5',
    image:
      'https://photo-cms-baonghean.zadn.vn/w607/Uploaded/2022/tuqzxgazsnzm/2018_11_08/143638-1.jpg',
    name: 'Thịt lợn',
    category: 1,
  },
];

const WelcomeScreen: React.FC<{
  onNextScreen: () => void;
  onBackScreen: () => void;
  onChangeTab: (value: number) => void;
  setIngredient: React.Dispatch<React.SetStateAction<any>>;
}> = ({ onNextScreen, onBackScreen, onChangeTab, setIngredient }) => {
  const [stepWelcome, setStepWelcome] = useState<number>(0);
  const [typeAdd, setTypeAdd] = useState<IType>();
  const [id, setId] = useState<string>();
  const [category, setCategory] = useState<number>(ICategory.DAILY);
  const { menu, loading: loadingMenu, getMenu, setMenu } = foodHooks.useMenu();

  const onNextWelcomeScreen = () => {
    setStepWelcome(stepWelcome + 1);
  };

  const onBackWelcomeScreen = () => {
    if (id) {
      setId(undefined);
    } else {
      setStepWelcome(stepWelcome - 1);
      setMenu([]);
    }
  };

  const onDeleteDish = (id: string) => {
    const tmpMenu = menu.filter(dish => dish.id !== id);
    setMenu(tmpMenu);
  };

  const onAddDishToMenu = (dishs: IDish[]) => {
    setMenu([...menu, ...dishs]);
  };

  const onSaveHistory = () => {
    const history = localStorage.getItem('history');
    let historyJSON = {};
    if (history) {
      historyJSON = JSON.parse(history) as { [key: string]: any };
    }
    const day = moment().format('DD/MM/YYYY') as string;
    const time = moment().format('hh:mm:ss') as string;
    //@ts-ignore
    if (!historyJSON[day]) {
      //@ts-ignore
      historyJSON[day] = {};
    }
    //@ts-ignore
    historyJSON[day][time] = JSON.stringify(menu);
    localStorage.setItem('history', JSON.stringify(historyJSON));

    //get ingredient
    let ingredients = [] as any[];
    menu.forEach(dish => {
      return dish?.ingredients?.forEach(ing => ingredients.push(ing.name));
    });
    const ingredientSet = new Set(ingredients);
    let detailIngredient = {};

    Array.from(ingredientSet).forEach((ingredient: any) => {
      //@ts-ignore
      detailIngredient[ingredient] = {
        name: ingredient,
        unit: '',
        quantity: 0,
      };
    });

    menu.forEach(me => {
      me.ingredients?.forEach(ing => {
        //@ts-ignore
        detailIngredient[ing.name].unit = ing.unit;
        //@ts-ignore
        detailIngredient[ing.name].quantity += ing.quantity;
      });
    });

    setIngredient(detailIngredient);
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
          height: '85%',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'scroll',
          scrollbarWidth: 'none',
        }}
      >
        <div className="mt-base">
          <div className="px-base text-center" style={{ position: 'relative' }}>
            <div
              style={{
                color: '#fff',
                fontSize: 30,
                fontWeight: 'bold',
                lineHeight: 1,
              }}
            >
              Z-Cook
            </div>
            <span>Hôm nay ăn gì?</span>
            {stepWelcome === IStepWelcome.EDIT_MENU && (
              <>
                <ArrowLeftOutlined
                  style={{
                    position: 'absolute',
                    left: 26,
                    top: 10,
                    fontSize: 30,
                    fontWeight: 'bold',
                  }}
                  onClick={onBackWelcomeScreen}
                />
              </>
            )}

            <div
              style={{
                position: 'absolute',
                top: 10,
                right: 15,
                fontSize: 25,
              }}
            >
              <SettingOutlined
                className="mr-half"
                onClick={() => onChangeTab(ISTEP.SETTING_TAB)}
              />
              <SnippetsOutlined
                onClick={() => onChangeTab(ISTEP.MENU_HISTORY)}
              />
            </div>
          </div>

          <Tabs
            style={{ color: '#fff', fontSize: 18 }}
            activeKey={stepWelcome.toString()}
            tabBarStyle={{ display: 'none' }}
            destroyInactiveTabPane
          >
            <Tabs.TabPane key={IStepWelcome.RANDOM_MENU}>
              <RandomeMenu
                setCategory={setCategory}
                category={category}
                onNextWelcomeScreen={onNextWelcomeScreen}
              />
            </Tabs.TabPane>
            <Tabs.TabPane key={IStepWelcome.EDIT_MENU}>
              <EditMenu
                onNextWelcomeScreen={onNextWelcomeScreen}
                menu={menu}
                onDeleteDish={onDeleteDish}
                setTypeAdd={setTypeAdd}
                onAddDishToMenu={onAddDishToMenu}
                id={id}
                setId={setId}
                typeAdd={typeAdd}
                getMenu={getMenu}
                loadingMenu={loadingMenu}
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
        {stepWelcome !== IStepWelcome.RANDOM_MENU ? (
          <>
            {id ? (
              <Button
                style={{ position: 'relative', width: '80%' }}
                onClick={() => setId(undefined)}
                className="button-cook"
              >
                Quay lại
              </Button>
            ) : (
              <Button
                style={{ position: 'relative', width: '80%' }}
                onClick={() => {
                  onNextScreen();
                  onSaveHistory();
                }}
                className="button-cook"
              >
                Lưu &amp; Xem nguyên liệu
              </Button>
            )}
          </>
        ) : (
          <Button
            style={{ position: 'relative', width: '80%' }}
            onClick={onNextWelcomeScreen}
            className="button-cook"
          >
            TẠO MENU
          </Button>
        )}
      </div>
    </div>
  );
};

const RandomeMenu: React.FC<{
  onNextWelcomeScreen: () => void;
  category: ICategory;
  setCategory: React.Dispatch<React.SetStateAction<ICategory>>;
}> = ({ onNextWelcomeScreen, category, setCategory }) => {
  return (
    <div
      className="d-flex p-base"
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        height: 'calc(88vh - 180px)',
      }}
    >
      <Radio.Group
        className="mb-base"
        value={category}
        onChange={value => setCategory(value.target.value)}
      >
        <Space direction="vertical">
          <Radio value={ICategory.DAILY}>
            <Image
              className="ml-half"
              preview={false}
              style={{ width: 50, height: 50, borderRadius: 100 }}
              src={daily}
            />
            <span className="ml-half">Mâm cơm hàng ngày</span>
          </Radio>
          <Radio value={ICategory.DRINK}>
            <Image
              preview={false}
              className="ml-half"
              style={{ width: 50, height: 50, borderRadius: 100 }}
              src={drink}
            />
            <span className="ml-half">Món nhậu</span>
          </Radio>
        </Space>
      </Radio.Group>
    </div>
  );
};

const EditMenu: React.FC<{
  onNextWelcomeScreen: () => void;
  menu: IDish[];
  onDeleteDish: (id: string) => void;
  setTypeAdd: React.Dispatch<React.SetStateAction<IType | undefined>>;
  onAddDishToMenu: (dishs: IDish[]) => void;
  id: string | undefined;
  setId: React.Dispatch<React.SetStateAction<string | undefined>>;
  typeAdd: number | undefined;
  getMenu: (prams: IGetMenuParams) => void;
  loadingMenu: boolean;
}> = ({
  onNextWelcomeScreen,
  menu,
  getMenu,
  onDeleteDish,
  setTypeAdd,
  onAddDishToMenu,
  id,
  setId,
  typeAdd,
  loadingMenu,
}) => {
  const [visibleAdd, setVisibleAdd] = useState<boolean>(false);

  const { loading, meal, getMeal } = foodHooks.useMeal();
  const [selectedDish, setSelectedDish] = useState<any[]>([]);

  useEffect(() => {
    const allergyIngredients = localStorage.getItem('dislike') || '[]';
    const allergyIngredientsJSON = JSON.parse(allergyIngredients);
    const likeDeal = localStorage.getItem('like') || '[]';
    const likeDealJSON = JSON.parse(likeDeal);
    const currentMenu = menu.map(m => m.id);
    const history = localStorage.getItem('history') || '{}';
    let historyJSON = JSON.parse(history);
    let historyID = Object.keys(historyJSON).map(key => {
      return Object.keys(historyJSON[key]).map(keyChild => {
        return JSON.parse(historyJSON[key][keyChild]).map(
          (item: any) => item.id
        );
      });
    });

    getMenu({
      allergic: allergyIngredientsJSON.allergyIngredients,
      loved: likeDealJSON,
      current_menu: currentMenu,
      history: historyID.length ? historyID[0] : [],
    });
  }, []);

  const openModalAddDish = (type: IType) => {
    setVisibleAdd(true);
    setTypeAdd(type);
  };
  const closeModalAddDish = () => {
    setVisibleAdd(false);
    setTypeAdd(undefined);
  };

  const getDishByType = (type: number) => {
    return menu.filter(dish => dish.category === type);
  };

  const onSelectLikeDish = (cook: any) => {
    const tmpDishs = selectedDish.filter(c => c.id !== cook.id);
    if (tmpDishs.length === selectedDish.length) {
      setSelectedDish([...selectedDish, cook]);
    } else setSelectedDish(tmpDishs);
  };

  const isActive = (id: string) => {
    return selectedDish.findIndex(cook => cook.id === id) > -1;
  };

  useEffect(() => {
    if (typeAdd !== undefined) getMeal({ category: typeAdd });
  }, [typeAdd]);

  return (
    <>
      {!id ? (
        loadingMenu ? (
          <Spin
            className="d-flex"
            style={{
              marginTop: 100,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        ) : (
          <div className="p-base">
            <Row className="mt-half" justify="center" align="middle">
              <Col className="text-center" span={24}>
                <Button className="button-change">
                  <ReloadOutlined />
                  Đổi menu
                </Button>
              </Col>
            </Row>
            <div style={{ marginTop: 20 }}>
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
                className="mt-half"
                style={{ borderRadius: 10, paddingRight: 5 }}
              >
                <Row gutter={[10, 10]}>
                  {getDishByType(IType.MAIN_DISH).map(cook => (
                    <Col span={8}>
                      <div className="text-center cook-item">
                        <div
                          className="text-center"
                          style={{
                            fontSize: 12,
                            color: '#000',
                            borderBottom: '1px solid #787877',
                            fontWeight: 'bold',
                          }}
                        >
                          <ClockCircleOutlined className="mr-half" /> 30m
                        </div>
                        <img
                          onClick={() => onDeleteDish(cook.id)}
                          style={{
                            height: 20,
                            width: 20,
                            position: 'absolute',
                            top: -6,
                            right: 2,
                          }}
                          src={closeIcon}
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
                            <Paragraph
                              ellipsis={{ rows: 1, expandable: false }}
                            >
                              {cook.name}
                            </Paragraph>
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
                className="mt-half"
                style={{ borderRadius: 10, paddingRight: 5 }}
              >
                <Row gutter={[10, 10]}>
                  {getDishByType(IType.SOUP).map(cook => (
                    <Col span={8}>
                      <div className="text-center cook-item">
                        <div
                          className="text-center"
                          style={{
                            fontSize: 12,
                            color: '#000',
                            borderBottom: '1px solid #787877',
                            fontWeight: 'bold',
                          }}
                        >
                          <ClockCircleOutlined className="mr-half" /> 30m
                        </div>
                        <img
                          onClick={() => onDeleteDish(cook.id)}
                          style={{
                            height: 20,
                            width: 20,
                            position: 'absolute',
                            top: -6,
                            right: 2,
                          }}
                          src={closeIcon}
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
                            <Paragraph
                              ellipsis={{ rows: 1, expandable: false }}
                            >
                              {cook.name}
                            </Paragraph>
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
                className="mt-half"
                style={{ borderRadius: 10, paddingRight: 5 }}
              >
                <Row gutter={[10, 10]}>
                  {getDishByType(IType.DESSERT).map(cook => (
                    <Col span={8}>
                      <div className="text-center cook-item">
                        <div
                          className="text-center"
                          style={{
                            fontSize: 12,
                            color: '#000',
                            borderBottom: '1px solid #787877',
                            fontWeight: 'bold',
                          }}
                        >
                          <ClockCircleOutlined className="mr-half" /> 30m
                        </div>
                        <img
                          onClick={() => onDeleteDish(cook.id)}
                          style={{
                            height: 20,
                            width: 20,
                            position: 'absolute',
                            top: -6,
                            right: 2,
                          }}
                          src={closeIcon}
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
                            <Paragraph
                              ellipsis={{ rows: 1, expandable: false }}
                            >
                              {cook.name}
                            </Paragraph>
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
                Tìm theo món ăn theo tên
              </span>
              <Input
                onChange={value =>
                  getMeal({ category: typeAdd, name: value.target.value })
                }
                className="mt-half"
                placeholder="Tìm kiếm ..."
              />
              <span style={{ color: 'red' }}>
                Nhấn vào món ăn mà bạn muốn thêm vào thực đơn
              </span>
              {loading ? (
                <Spin
                  className="d-flex"
                  style={{
                    marginTop: 40,
                    marginBottom: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                />
              ) : (
                <Row
                  style={{ maxHeight: '50vh', overflow: 'scroll' }}
                  gutter={[10, 10]}
                >
                  {meal.map(cook => (
                    <Col span={8}>
                      <div
                        className={`${
                          isActive(cook.id) ? 'active' : ''
                        } text-center cook-item`}
                        onClick={() => {
                          onSelectLikeDish(cook);
                        }}
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
                          <Paragraph ellipsis={{ rows: 1, expandable: false }}>
                            {cook.name}
                          </Paragraph>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              )}

              <div
                className="mt-base"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Button
                  style={{ position: 'relative', width: '80%' }}
                  onClick={() => {
                    onAddDishToMenu(selectedDish);
                    setSelectedDish([]);
                    closeModalAddDish();
                  }}
                  className="button-cook"
                >
                  Thêm
                </Button>
              </div>
            </Modal>
          </div>
        )
      ) : (
        <DetailDish id={id} />
      )}
    </>
  );
};

const DetailDish: React.FC<{ id: string }> = ({ id }) => {
  const { mealDetail, getDetailMeal, loadingDetail } = foodHooks.useMeal();
  useEffect(() => {
    if (id) getDetailMeal(id);
  }, [id]);

  return (
    <>
      {loadingDetail && !mealDetail ? (
        <Spin />
      ) : (
        <div style={{ marginTop: 30, fontSize: 14 }}>
          <Row gutter={[10, 10]} className="mt-base">
            <Col span={24}>
              <Image src={mealDetail?.image}></Image>
            </Col>
            <Col className="p-base" span={24}>
              <div
                style={{
                  fontSize: 25,
                  fontWeight: 'bold',
                  borderBottom: '1px solid #fff',
                }}
              >
                {mealDetail?.name}
              </div>
            </Col>
            <Col className="p-base" span={24}>
              <div>
                <span>500Kcal</span>
                <span style={{ marginLeft: 24 }}>
                  <ClockCircleOutlined className="mr-half" /> 30 phút
                </span>
                <div
                  className="mt-base mb-base"
                  style={{ fontSize: 18, fontWeight: 'bold' }}
                >
                  NGUYÊN LIỆU (dành cho 4-5 người)
                </div>
                {mealDetail?.ingredients?.map((ingredient: any) => (
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
