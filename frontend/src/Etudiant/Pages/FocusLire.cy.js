import React from 'react'
import FocusLire from './FocusLire'

describe('<FocusLire />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<FocusLire />)
  })
})