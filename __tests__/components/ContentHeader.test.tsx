import ContentHeader from '@/components/ContentHeader'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

it('should have a title', () => {
  render(<ContentHeader goBackUrl='/' title="Title" />)

  const heading = screen.getByRole('heading')

  expect(heading).toBeInTheDocument()
  expect(heading).toHaveTextContent('Title')
})

it('should have a go back button', () => {
  render(<ContentHeader goBackUrl='/' title="Title" />)

  const button = screen.getByRole('link')

  expect(button).toBeInTheDocument()
  expect(button).toHaveAttribute('href', '/')
})
