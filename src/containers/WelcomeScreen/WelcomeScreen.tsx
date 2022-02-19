import React, { useState } from 'react';
import { Button } from 'antd';
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
        height: '100%',
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
        <div className="px-base mt-base ">
          <div className="text-center">
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
            <span>Hôm nay ăn gì?</span>{' '}
          </div>

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
              style={{ borderRadius: 20, height: 200, width: 200 }}
            />
            <div>Z-cook chào bạn!</div>
            <div className="text-center">
              Cho chúng tôi biết một vài thông tin nhé.
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
