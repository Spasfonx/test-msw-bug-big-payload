import { render, screen, waitFor, act } from '@testing-library/react';
import App from './App';

import { setupServer } from 'msw/node';
import { rest } from 'msw';

import data from './data';

jest.setTimeout(10000);

export const server = setupServer(
  rest.get('https://jsonplaceholder.typicode.com/comments', (req, res, ctx) => {
    console.log('mocked response', data);
    return res(ctx.status(200), ctx.json(data));
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
  await render(<App />);

  function sleep(ms) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), ms);
    });
  }

  await sleep(3000);

  expect(await screen.findByText(/Resultats ok/i)).toBeInTheDocument();
});
