import { render, screen } from '@testing-library/react';
import CharactersQuery from '../components/characters-query/CharactersQuery';
import { MockedProvider } from '@apollo/client/testing';
import { GET_CHARACTERS } from '../components/characters-query/CharactersQuery';

const mocks = [
    {
        request: {
            query: GET_CHARACTERS,
        },
        result: {
            data: {
                characters: {
                    results: [
                        { id: '1', name: 'Rick Sanchez', image: 'rick-image.jpg' },
                        { id: '2', name: 'Morty Smith', image: 'morty-image.jpg' },
                    ],
                },
            },
        },
    },
];

test('renders list of characters', async () => {
    render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <CharactersQuery />
        </MockedProvider>
    );

    // Verificar que los personajes se muestran en pantalla
    expect(await screen.findByText('Rick Sanchez')).toBeInTheDocument();
    expect(await screen.findByText('Morty Smith')).toBeInTheDocument();
});
