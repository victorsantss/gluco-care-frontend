import MenuCard from '@/components/MenuCard'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import addIcon from '@/assets/add_icon.png'

it('should have a card title', () => {
  render(<MenuCard title="Test" icon={addIcon} url='' />)

  const text = screen.getByText('Test')

  expect(text).toBeInTheDocument()
})

it('should have a card icon', () => {
  render(<MenuCard title="Test" icon={addIcon} url='' />)

  const image = screen.getByRole('img')

  expect(image).toBeInTheDocument()
  expect(image).toHaveAttribute('alt', 'Test')
})
