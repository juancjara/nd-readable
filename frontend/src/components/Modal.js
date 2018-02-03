import React, { Component } from 'react'
import ReactModal from 'react-modal'

class Modal extends Component {
  state = { isOpen: false }

  openModal = () => this.setState({ isOpen: true })
  closeModal = () => this.setState({ isOpen: false })

  render() {
    const { children } = this.props
    const { isOpen } = this.state

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={this.closeModal}
        ariaHideApp={false}
      >
        {children({ openModal: this.openModal, closeModal: this.closeModal })}
      </Modal>
    )
  }
}

export default Modal
