import React from 'react';
import { Button } from 'antd';
import background from 'assets/images/background.png';

const SplashScreen: React.FC<{ onNextScreen: () => void }> = ({
  onNextScreen,
}) => {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        background: '#3FC979',
        justifyContent: 'center',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          height: '85%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div style={{ width: '100%' }}>
          <img
            src={background}
            style={{ borderRadius: 20, height: 200, width: 200 }}
          />
        </div>

        <div style={{ color: '#fff', fontSize: 35, fontWeight: 'bold' }}>
          Z-Cook
        </div>
        <span>Hôm nay ăn gì?</span>
      </div>
      <div
        style={{
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Button className="button-cook" onClick={onNextScreen}>
          Tạo mâm cơm
        </Button>
      </div>
    </div>
  );
};

export default SplashScreen;
