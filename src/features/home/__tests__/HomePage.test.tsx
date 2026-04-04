import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '@/shared/test/utils'
import { HomePage } from '@/features/home/pages/HomePage'
import { useCounterStore } from '@/features/counter/stores/counterStore'

describe('HomePage', () => {
  beforeEach(() => {
    useCounterStore.setState({ count: 0 })
  })

  it('renders the heading', () => {
    renderWithProviders(<HomePage />)
    expect(
      screen.getByRole('heading', { name: 'React Template' }),
    ).toBeInTheDocument()
  })

  it('increments the counter when +1 is clicked', async () => {
    renderWithProviders(<HomePage />)

    await userEvent.click(screen.getByRole('button', { name: '+1' }))
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('resets the counter when Reset is clicked', async () => {
    useCounterStore.setState({ count: 5 })
    renderWithProviders(<HomePage />)

    await userEvent.click(screen.getByRole('button', { name: 'Reset' }))
    expect(screen.getByText('0')).toBeInTheDocument()
  })
})
