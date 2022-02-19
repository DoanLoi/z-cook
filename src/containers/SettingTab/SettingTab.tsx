import React, { useEffect, useRef } from 'react';
import { Button, Row, Col, Select, Form } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import './SettingTab.scss';
import { foodHooks } from 'hooks';
import { stringHelpers } from 'helpers';

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
  const ref = useRef(null);
  const [form] = Form.useForm();
  const { ingredients, loading } = foodHooks.useIngredient();

  const onSaveUser = (values: any) => {
    localStorage.setItem('dislike', JSON.stringify(values));
  };

  useEffect(() => {
    const user = localStorage.getItem('dislike');
    if (user) {
      const userJSON = JSON.parse(user) as {
        allergyIngredients: string;
      };
      form.setFieldsValue({
        allergyIngredients: userJSON?.allergyIngredients,
      });
    }
  }, []);

  return (
    <div
      ref={ref}
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
        <div className="px-base mt-base">
          <div className="text-center" style={{ position: 'relative' }}>
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
            <Form form={form} onFinish={onSaveUser}>
              <div>
                Bạn và gia đình có dị ứng/ không ăn được nguyên liệu nào?
              </div>
              <Form.Item name="allergyIngredients">
                <Select
                  loading={loading}
                  mode="multiple"
                  className="mt-base w-100"
                >
                  {ingredients.map(item => (
                    <Select.Option value={item.name}>
                      {stringHelpers.jsUcfirst(item.name)}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>
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
        <Button
          style={{ position: 'relative' }}
          onClick={() => {
            onNextScreen();
            form.submit();
          }}
          className="button-cook"
        >
          Tiếp theo
        </Button>
      </div>
    </div>
  );
};

export default SettingTab;
