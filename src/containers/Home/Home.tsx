import React, { useState } from 'react';
import { Tabs } from 'antd';
import SplashScreen from 'containers/SplashScreen';
import WelcomeScreen from 'containers/WelcomeScreen';
import {
  SettingOutlined,
  HomeOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import './Home.scss';
import SettingTab from 'containers/SettingTab';
import MenuTab from 'containers/MenuTab';
import MenuHistory from 'containers/MenuHistory';
import LikeDish from 'containers/LikeDish/LikeDish';
import Ingredient from 'containers/Ingredient';

export enum ISTEP {
  SPLASH,
  WELCOME,
  SETTING_TAB,
  LIKE_DISH,
  MENU_TAB,
  INGREDIENT,
  MENU_HISTORY,
}

const { TabPane } = Tabs;

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [ingredients, setIngredient] = useState<any[]>([]);
  const onNextScreen = () => {
    if (
      step === ISTEP.SPLASH &&
      localStorage.getItem('like') &&
      localStorage.getItem('dislike')
    ) {
      setStep(ISTEP.MENU_TAB);
    } else {
      setStep(step + 1);
    }
  };
  const onBackScreen = () => {
    setStep(step - 1);
  };

  const onChangeTab = (value: number) => {
    setStep(value);
  };

  const [step, setStep] = useState<number>(0);
  return (
    <Tabs
      onChange={key => {
        setStep(parseInt(key));
      }}
      className="ant-tabs-bottom"
      style={{ fontSize: 18, color: '#fff', height: '100vh' }}
      activeKey={step.toString()}
      destroyInactiveTabPane
      tabBarStyle={{
        display: 'none',
        position: 'fixed',
        bottom: 0,
        width: '100%',
        backgroundColor: '#F8F9FA',
        boxShadow: '0 0.5rem 1rem 0 rgb(44 51 73 / 60%)',
        paddingBottom: 'env(safe-area-inset-bottom)',
        transition: 'bottom 0.4s',
        zIndex: 1060,
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
      <TabPane key={ISTEP.LIKE_DISH}>
        <LikeDish onNextScreen={onNextScreen} onBackScreen={onBackScreen} />
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
        <MenuTab
          onNextScreen={onNextScreen}
          onBackScreen={onBackScreen}
          onChangeTab={onChangeTab}
          setIngredient={setIngredient}
        />
      </TabPane>
      <TabPane
        key={ISTEP.INGREDIENT}
        tab={
          <div style={{ textAlign: 'center' }}>
            <CalendarOutlined style={{ fontSize: 24 }} />
            <div>Lịch sử menu</div>
          </div>
        }
      >
        <Ingredient
          onBackScreen={onBackScreen}
          onChangeTab={onChangeTab}
          ingredients={ingredients}
        />
      </TabPane>
      <TabPane
        key={ISTEP.MENU_HISTORY}
        tab={
          <div style={{ textAlign: 'center' }}>
            <CalendarOutlined style={{ fontSize: 24 }} />
            <div>Lịch sử menu</div>
          </div>
        }
      >
        <MenuHistory onBackScreen={onBackScreen} onChangeTab={onChangeTab} />
      </TabPane>
    </Tabs>
  );
};

export default Home;
