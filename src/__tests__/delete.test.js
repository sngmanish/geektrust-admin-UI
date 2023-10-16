import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import renderer from 'react-test-renderer'
import DeleteButton from '../components/DeleteButton/DeleteButton'

describe('DeleteButton', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<DeleteButton anyBoxChecked={false} handleBatchDelete={() => {}} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('enables button when any box is checked', () => {
    const handleBatchDelete = jest.fn()
    render(<DeleteButton anyBoxChecked={true} handleBatchDelete={handleBatchDelete} />)
    const button = screen.getByText('Delete Selected')
    expect(button).not.toBeDisabled()
    fireEvent.click(button)
    expect(handleBatchDelete).toHaveBeenCalled()
  })

  it('changes style when any box is checked', () => {
    render(<DeleteButton anyBoxChecked={true} handleBatchDelete={() => {}} />)
    const button = screen.getByText('Delete Selected')
    expect(button).toHaveStyle(`
  border: 2px outset buttonface;
  background-color: #e74c3c;
  color: #fff;
`)
  })
})
