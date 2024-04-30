import { RenderOptions, render } from '@testing-library/react';
import { ReactNode } from 'react';
import TestProvider from './TestProvider';

const renderWithCotnext = <T extends RenderOptions>(
  ui: ReactNode,
  options?: T
) => render(ui, { wrapper: TestProvider, ...(options as RenderOptions) });

export * from '@testing-library/react';

export { renderWithCotnext as render };
