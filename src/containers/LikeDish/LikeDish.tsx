import React, { useState, useEffect } from 'react';
import { Image, Row, Col, Button, Spin, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { foodHooks } from 'hooks';
import './LikeDish.scss';

const { Paragraph } = Typography;

const LikeDish: React.FC<{
  onNextScreen: () => void;
  onBackScreen: () => void;
}> = ({ onNextScreen, onBackScreen }) => {
  const { loading, meal, getMeal } = foodHooks.useMeal();

  const [dishSelected, setDishSelected] = useState<number[]>([]);

  const onSelectLikeDish = (id: number) => {
    const tmpDishs = dishSelected.filter(cook => cook !== id);
    if (tmpDishs.length === dishSelected.length) {
      setDishSelected([...dishSelected, id]);
    } else setDishSelected(tmpDishs);
  };

  const isActive = (id: number) => {
    return dishSelected.includes(id);
  };

  const onSaveUser = () => {
    localStorage.setItem('like', JSON.stringify(dishSelected));
  };

  useEffect(() => {
    const user = localStorage.getItem('like');
    if (user) {
      const userJSON = JSON.parse(user);
      setDishSelected(userJSON);
    }
    getMeal({});
  }, []);

  return (
    <div
      className="welcome"
      style={{
        height: '100%',
        width: '100%',
        background: '#3FC979',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          height: '90%',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'scroll',
          scrollbarWidth: 'none',
        }}
      >
        <div className="px-base mt-base">
          <div style={{ position: 'relative' }} className="text-center">
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
            <ArrowLeftOutlined
              style={{
                position: 'absolute',
                left: 10,
                top: 10,
                fontSize: 30,
                fontWeight: 'bold',
              }}
              onClick={onBackScreen}
            />
          </div>

          <div style={{ marginTop: 40 }}>
            Bạn và gia đình bạn thích thành phần, món ăn nào nhất(chọn ít nhất
            3)?
          </div>
          {loading ? (
            <Spin
              className="d-flex"
              style={{
                marginTop: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          ) : (
            <Row className="mt-base" gutter={[15, 15]}>
              {meal?.map(cook => (
                <Col span={8}>
                  <div
                    className={`${
                      isActive(cook.id) ? 'active' : ''
                    } text-center cook-item`}
                    onClick={() => onSelectLikeDish(cook.id)}
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
        <Button
          style={{ position: 'relative' }}
          onClick={() => {
            onNextScreen();
            onSaveUser();
          }}
          className="button-cook"
        >
          Tiếp theo
        </Button>
      </div>
    </div>
  );
};

export default LikeDish;
