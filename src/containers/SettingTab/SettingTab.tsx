import React, { useState } from 'react';
import { Button, Row, Col, Select, Form } from 'antd';
import './SettingTab.scss';

enum IStepWelcome {
  WELCOME1,
  WELCOME2,
  RANDOM_MENU,
  EDIT_MENU,
}

const SettingTab: React.FC<{
  onNextScreen: () => void;
  onBackScreen: () => void;
}> = ({ onNextScreen, onBackScreen }) => {
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
          height: '70vh',
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

          <>
            <div style={{ marginTop: 48, fontSize: 20, fontWeight: 'bold' }}>
              Thông tin cần chú ý
            </div>
            <Form>
              <Row className="mt-base" align="middle">
                <Col span={4}>
                  <div
                    style={{ display: 'inline-block' }}
                    className="d-flex justify-content-center align-items-center ol-number"
                  >
                    1
                  </div>
                </Col>
                <Col span={20}>
                  Bạn và gia đình có dị ứng/ không ăn được nguyên liệu nào?
                </Col>
              </Row>
              <Form.Item name="favoriteIngredients">
                <Select mode="multiple" className="mt-base w-100">
                  {['Cà chua', 'Nước chè', 'Cà phê'].map(item => (
                    <Select.Option value={item}>{item}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Row className="mt-base" align="middle">
                <Col span={4}>
                  <div
                    style={{ display: 'inline-block' }}
                    className="d-flex justify-content-center align-items-center ol-number"
                  >
                    2
                  </div>
                </Col>
                <Col span={20}>
                  Bạn và gia đình thích món ăn chế biến từ nguyên liệu gì?
                </Col>
              </Row>
              <Form.Item name="allergyIngredients">
                <Select mode="multiple" className="mt-base w-100">
                  {['Cà chua', 'Nước chè', 'Cà phê'].map(item => (
                    <Select.Option value={item}>{item}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>
          </>
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
          onClick={onNextScreen}
          className="button-cook"
        >
          Tiếp theo
        </Button>
      </div>
    </div>
  );
};

export default SettingTab;
