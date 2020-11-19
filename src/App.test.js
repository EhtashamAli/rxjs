import { render, screen } from '@testing-library/react';
import App from './App';
import store from './store'
import { Provider } from 'react-redux';

test('renders dashboard heading', () => {
  render(<Provider store={store}><App /></Provider>);
  const linkElement = screen.getByText(/Dashboard/i);
  expect(linkElement).toBeInTheDocument();
});
