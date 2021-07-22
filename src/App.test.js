import { render, screen } from '@testing-library/react';
import App from './App';

import { setupServer } from 'msw/node';
import { rest } from 'msw';
import data from './data.json';

export const server = setupServer(
  rest.get('https://jsonplaceholder.typicode.com/comments', (req, res, ctx) => {
    return res(ctx.json(data));
  })
);

// Establish API mocking before all tests.
beforeAll(() => {
  server.listen({ onUnhandledRequest: 'warn' });
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());

test('comments must be loaded from api', async () => {
  render(<App />);

  expect(await screen.findByText(/Resultats ok/i)).toBeInTheDocument();
});
