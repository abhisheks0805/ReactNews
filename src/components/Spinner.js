import React, { Component } from 'react'
import loadinglight from "./loadinglight.gif"

export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
      <img src={loadinglight} alt=""/>
      </div>
    )
  }
}
