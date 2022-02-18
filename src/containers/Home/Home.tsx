import React, { useState } from 'react';
import { Tabs } from 'antd';
import SplashScreen from 'containers/SplashScreen';
import WelcomeScreen from 'containers/WelcomeScreen';
import { SettingOutlined, HomeOutlined } from '@ant-design/icons';
import './Home.scss';
import SettingTab from 'containers/SettingTab';
import MenuTab from 'containers/MenuTab';

enum ISTEP {
  SPLASH,
  WELCOME,
  SETTING_TAB,
  MENU_TAB,
}

const { TabPane } = Tabs;

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const onNextScreen = () => {
    setStep(step + 1);
    console.log(step);
  };
  const onBackScreen = () => {
    setStep(step - 1);
  };
  const [step, setStep] = useState<number>(0);
  return (
    <Tabs
      onChange={key => {
        setStep(parseInt(key));
      }}
      style={{ fontSize: 18, color: '#fff' }}
      activeKey={step.toString()}
      tabBarStyle={{
        display: [ISTEP.SPLASH, ISTEP.WELCOME].includes(step)
          ? 'none'
          : 'block',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: -16,
        zIndex: 2,
        background: '#fff',
        border: '3px solid #c0c3c4',
      }}
    >
      <TabPane key={ISTEP.SPLASH}>
        <SplashScreen onNextScreen={onNextScreen} />
      </TabPane>
      <TabPane key={ISTEP.WELCOME}>
        <WelcomeScreen
          onNextScreen={onNextScreen}
          onBackScreen={onBackScreen}
        />
      </TabPane>
      <TabPane
        tab={
          <div style={{ textAlign: 'center' }}>
            <SettingOutlined style={{ fontSize: 24 }} />
            <div>Cài đặt</div>
          </div>
        }
        key={ISTEP.SETTING_TAB}
      >
        <SettingTab onNextScreen={onNextScreen} onBackScreen={onBackScreen} />
      </TabPane>
      <TabPane
        tab={
          <div style={{ textAlign: 'center' }}>
            <HomeOutlined style={{ fontSize: 24 }} />
            <div>Tạo mâm cơm</div>
          </div>
        }
        key={ISTEP.MENU_TAB}
      >
        <MenuTab onNextScreen={onNextScreen} onBackScreen={onBackScreen} />
      </TabPane>
    </Tabs>
  );
};

export default Home;
