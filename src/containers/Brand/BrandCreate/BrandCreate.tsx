import React from 'react';
import { t } from 'helpers/i18n';
import AppContainer from 'containers/AppLayout/AppContainer';
import ContentBlock from 'components/shared/ContentBlock';

const BrandCreate: React.FC = () => {
  return (
    <AppContainer title={t('BrandCreate')}>
      <ContentBlock>{t('BrandCreate')}</ContentBlock>
    </AppContainer>
  );
};

export default BrandCreate;
