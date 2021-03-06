import React, { useEffect, useRef, useState } from 'react';
import { Button, Row, Col, Collapse, Form, Card, Image, Empty } from 'antd';
import { SettingOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import './MenuHistory.scss';
import moment from 'moment';
import { ISTEP } from 'containers/Home/Home';

enum IStepWelcome {
  WELCOME1,
  WELCOME2,
  RANDOM_MENU,
  EDIT_MENU,
}

const MenuHistory: React.FC<{
  onBackScreen: () => void;
  onChangeTab: (value: number) => void;
}> = ({ onBackScreen, onChangeTab }) => {
  const [historyMenu, setHistoryMenu] = useState<{
    [key: string]: { [key: string]: any };
  }>();

  // const onClickDetailDish = id => {};
  useEffect(() => {
    const historyMenu = localStorage.getItem('history');
    if (historyMenu) {
      const historyJSON = JSON.parse(historyMenu);
      setHistoryMenu(historyJSON);
    }
  }, []);

  const history = () => {
    if (historyMenu)
      return Object.keys(historyMenu)
        .map(key => {
          return (
            <Card className="mt-base" title={` ${key}`}>
              <Collapse>
                {Object.keys(historyMenu[key])
                  .map(keyChild => {
                    return (
                      <Collapse.Panel
                        header={`Thời gian: ${keyChild}`}
                        key={keyChild}
                      >
                        <Row>
                          {JSON.parse(historyMenu[key][keyChild]).map(
                            (item: any) => {
                              return (
                                <Col span={24}>
                                  <Row
                                    // onClick={}
                                    className="mt-half"
                                    style={{
                                      background: '#fff',
                                      borderRadius: 10,
                                      padding: 5,
                                    }}
                                    align="middle"
                                    justify="center"
                                  >
                                    <Col
                                      className="d-flex"
                                      style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                      }}
                                      span={6}
                                    >
                                      <Image
                                        height={40}
                                        width={40}
                                        style={{ borderRadius: 100 }}
                                        src={item.image}
                                      />
                                    </Col>
                                    <Col
                                      span={18}
                                      style={{ fontWeight: 'bold' }}
                                    >
                                      {item.name}
                                    </Col>
                                  </Row>
                                </Col>
                              );
                            }
                          )}
                        </Row>
                      </Collapse.Panel>
                    );
                  })
                  .reverse()}
              </Collapse>
            </Card>
          );
        })
        .reverse();
  };

  return (
    <div
      className="menu-history"
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
          height: '100%',
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
            <SettingOutlined
              style={{
                position: 'absolute',
                right: 10,
                top: 20,
                fontSize: 25,
                fontWeight: 'bold',
              }}
              onClick={() => onChangeTab(ISTEP.SETTING_TAB)}
            />
          </div>

          <div style={{ marginTop: 24 }}>
            <span style={{ fontWeight: 'bold', fontSize: 25 }}>LỊCH SỬ</span>

            {historyMenu ? (
              history()
            ) : (
              <Empty className="mt-base" description="Không có lịch sử" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuHistory;
