import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import renderer from 'react-test-renderer'
import Pagination from '../components/Pagination/Pagination'

describe('Pagination', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Pagination page={1} onChange={() => {}} count={10} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('disables previous button when on first page', () => {
    const onChange = jest.fn()
    render(<Pagination page={1} onChange={onChange} count={10} />)
    const previousButton = screen.getByText('«')

    fireEvent.click(previousButton)
    expect(onChange).toHaveBeenCalled()
  })

  it('disables next button when on last page', () => {
    const onChange = jest.fn()
    render(<Pagination page={10} onChange={onChange} count={10} />)
    const nextButton = screen.getByText('»')
    fireEvent.click(nextButton)
    expect(onChange).toHaveBeenCalled()
  })
})
