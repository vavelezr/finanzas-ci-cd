import { render, screen } from '@testing-library/react';
import DonutChart from '../../src/components/DonutChart';

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

test('si no hay datos muestra "No data"', () => {
  render(<DonutChart data={[]} />);
  expect(screen.getByText(/No data/i)).toBeInTheDocument();
});

test('con datos, no debe mostrar "No data"', () => {
  const data = [{ name: 'VTI', value: 40 }, { name: 'ICLN', value: 60 }];
  render(<DonutChart data={data} />);
  expect(screen.queryByText(/No data/i)).toBeNull();
});
