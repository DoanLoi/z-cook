import React, { Fragment, useEffect, useState } from 'react';
import {
  Button,
  Input,
  Tabs,
  Row,
  Col,
  Image,
  Select,
  Form,
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
import './WelcomeScreen.scss';
import background from 'assets/images/background.png';

enum IStepWelcome {
  WELCOME1,
  WELCOME2,
  RANDOM_MENU,
  EDIT_MENU,
}

const WelcomeScreen: React.FC<{
  onNextScreen: () => void;
  onBackScreen: () => void;
}> = ({ onNextScreen, onBackScreen }) => {
  const [stepWelcome, setStepWelcome] = useState<number>(0);
  const onNextWelcomeScreen = () => {
    setStepWelcome(stepWelcome + 1);
  };

  const onBackWelcomeScreen = () => {
    if (stepWelcome === IStepWelcome.WELCOME1) {
      onBackScreen();
    } else setStepWelcome(stepWelcome - 1);
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

          <div
            style={{
              width: '100%',
              height: 'calc(88vh - 280px)',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <img
              src={background}
              style={{ borderRadius: 20, height: 150, width: 150 }}
            />
            <div>Chào đầu bếp!</div>
            <div className="text-center">
              Hãy cùng chúng tôi ghi chú một vài thông tin về khẩu vị của bạn
              nhé.
            </div>
          </div>
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
            onClick={onNextScreen}
            className="button-cook"
          >
            Tiếp theo
          </Button>
        )}
      </div>
    </div>
  );
};

export default WelcomeScreen;
