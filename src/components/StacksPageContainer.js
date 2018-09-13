import React from 'react'
import PropTypes from 'prop-types'
import data from '../data'
import StacksPage from './StacksPage'

class StacksPageContainer extends React.Component {
  constructor () {
    super()
    this.state = {
      stacks: [],
      isLoading: true
    }
  }

  componentDidMount () {
    this.loadStacks()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.currentUser !== this.props.currentUser) {
      this.loadStacks()
    }
  }

  loadStacks () {
    const { currentUser } = this.props
    if (currentUser && currentUser.token) {
      data.setUserToken(currentUser.token)
      data.getStacks().then(stacks => this.setState({
        stacks,
        isLoading: false
      }))
    }
  }

  render () {
    return (
      <StacksPage stacks={this.state.stacks} isLoading={this.state.isLoading} />
    )
  }
}

StacksPageContainer.propTypes = {
  currentUser: PropTypes.shape({
    username: PropTypes.string,
    token: PropTypes.string
  })
}

export default StacksPageContainer
