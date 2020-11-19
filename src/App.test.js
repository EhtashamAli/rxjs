import { render, screen } from '@testing-library/react';
import App from './App';
import store from './store'
import { Provider } from 'react-redux';

test('renders dashboard heading', () => {
  render(<Provider store={store}><App /></Provider>);
  const linkElement = screen.getByText(/Dashboard/i);
  expect(linkElement).toBeInTheDocument();
});


test('renders temperature monitor', () => {
  render(<Provider store={store}><App /></Provider>);
  const linkElement = screen.getByText(/Temperature/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders air pressure monitor', () => {
  render(<Provider store={store}><App /></Provider>);
  const linkElement = screen.getByText(/Air Pressure/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders humidity monitor', () => {
  render(<Provider store={store}><App /></Provider>);
  const linkElement = screen.getByText(/Humidity/i);
  expect(linkElement).toBeInTheDocument();
});
