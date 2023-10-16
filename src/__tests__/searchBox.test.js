import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import renderer from 'react-test-renderer'
import SearchBox from '../components/SearchBox/SearchBox'

describe('SearchBox', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<SearchBox searchText="" setSearchText={() => {}} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('updates search text on input change', () => {
    const setSearchText = jest.fn()
    render(<SearchBox searchText="" setSearchText={setSearchText} />)
    const input = screen.getByTestId('search-box-input')
    fireEvent.change(input, { target: { value: 'test' } })
    expect(setSearchText).toHaveBeenCalledWith('test')
  })
})
