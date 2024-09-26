import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Favorite from '../components/favorite/Favorite';
import '@testing-library/jest-dom/extend-expect';

test('renders "Add to Favorites" when isFavorite is false', () => {
    render(<Favorite characterId="1" isFavorite={false} />);

    expect(screen.getByRole('button')).toHaveTextContent('Add to Favorites');
});

test('renders "Remove from Favorites" when isFavorite is true', () => {
    render(<Favorite characterId="1" isFavorite={true} />);

    expect(screen.getByRole('button')).toHaveTextContent('Remove from Favorites');
});

test('toggles favorite state when button is clicked', () => {
    const { rerender } = render(<Favorite characterId="1" isFavorite={false} />);

    expect(screen.getByRole('button')).toHaveTextContent('Add to Favorites');

    userEvent.click(screen.getByRole('button'));

    rerender(<Favorite characterId="1" isFavorite={true} />);

    expect(screen.getByRole('button')).toHaveTextContent('Remove from Favorites');
});