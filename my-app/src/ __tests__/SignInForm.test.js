import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInForm } from '../components/SignIn';

describe('SignInForm', () => {
  it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
    const onSubmit = jest.fn();
    const { getByPlaceholderText, getByText } = render(<SignInForm onSubmit={onSubmit} />);

    fireEvent.changeText(getByPlaceholderText('Username'), 'testuser');
    fireEvent.changeText(getByPlaceholderText('Password'), 'testpassword');
    fireEvent.press(getByText('Sign in'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenCalledWith({
        username: 'testuser',
        password: 'testpassword',
      });
    });
  });
});
