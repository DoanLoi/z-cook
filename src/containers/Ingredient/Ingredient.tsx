import React from 'react';
import { Row, Col } from 'antd';
import {
  SettingOutlined,
  SnippetsOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { stringHelpers } from 'helpers';

import { ISTEP } from 'containers/Home/Home';

const Ingredient: React.FC<{
  onBackScreen: () => void;
  onChangeTab: (value: number) => void;
  ingredients: { [key: string]: any };
}> = ({ onBackScreen, onChangeTab, ingredients }) => {
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
            <div
              style={{
                position: 'absolute',
                top: 10,
                right: -1,
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

          <div style={{ marginTop: 40, marginBottom: 20 }}>
            <span style={{ fontWeight: 'bold', fontSize: 20 }}>
              Danh sách nguyên liệu
            </span>

            {Object.keys(ingredients).map(key => {
              if (ingredients[key].name)
                return (
                  <div style={{ marginTop: 10, color: '#000' }}>
                    <Row
                      className="p-half"
                      style={{
                        background: '#fff',
                        borderRadius: 10,
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}
                    >
                      <Col span={12}>
                        {stringHelpers.jsUcfirst(ingredients[key].name.trim())}
                      </Col>
                      <Col span={12} style={{ textAlign: 'end' }}>
                        {ingredients[key].quantity.toString().length < 5
                          ? ingredients[key].quantity
                          : '1/3'}{' '}
                        {ingredients[key].unit}
                      </Col>
                    </Row>
                  </div>
                );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ingredient;
