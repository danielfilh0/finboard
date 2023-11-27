/* eslint-disable no-undef */

import { FiltersModal } from '@/app/(routes)/(dashboard)/_components/sidebar'
import { render } from "@testing-library/react"

describe('Filters Modal', () => {
  it('should render correctly', () => {
    render(<FiltersModal />)
    console.log('oi')
  })
})
