import React from 'react';
import { render } from '@testing-library/react';
import BrandCreate from './BrandCreate';

it('Renders correctly', () => {
  const { container } = render(<BrandCreate />);
  expect(container.firstChild).toMatchSnapshot();
});
