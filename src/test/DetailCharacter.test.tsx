import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import { GET_CHARACTER } from '../pages/detail-character/DetailCharacter';
import { BrowserRouter } from 'react-router-dom';
import DetailCharacter from '../pages/detail-character/DetailCharacter';
import '@testing-library/jest-dom/extend-expect';

const mocks = [
  {
    request: {
      query: GET_CHARACTER,
      variables: { id: '1' },
    },
    result: {
      data: {
        character: {
          id: '1',
          name: 'Rick Sanchez',
          image: 'rick-image.jpg',
          status: 'Alive',
          species: 'Human',
          gender: 'Male',
          isFavorite: false,
        },
      },
    },
  },
];

test('renders character details and allows adding a comment', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <BrowserRouter>
        <DetailCharacter />
      </BrowserRouter>
    </MockedProvider>
  );

  expect(await screen.findByText('Rick Sanchez')).toBeInTheDocument();


  const textarea = screen.getByPlaceholderText('Add a comment...');
  userEvent.type(textarea, 'Great character!');
  userEvent.click(screen.getByText('Add Comment'));

  expect(screen.getByText('Great character!')).toBeInTheDocument();
});
