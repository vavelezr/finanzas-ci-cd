import { render, screen } from '@testing-library/react'
import Header from '../../src/components/Header'

test('renderiza saludo y buscador', () => {
  render(<Header />)
  expect(screen.getByText(/Welcome back/i)).toBeInTheDocument()
  expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument()
})
