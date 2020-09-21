import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import { setActiveAlgorithm } from '../actions/algorithm'

import '../css/Algorithm.css'

import AdvancedMergeSort from './AdvancedMergeSort'

const Algorithm = ({ match: { params: { slug } }, history, activeAlgorithm, setActiveAlgorithm })=> {
  useEffect(() => {
    setActiveAlgorithm(slug)
  }, [setActiveAlgorithm, slug])

  return (
    <div className="algorithm-wrapper">
      <span className="frame"></span>
      <span className="frame"></span>
      <span className="frame"></span>
      <span className="frame"></span>
      <span className="frame"></span>
      <span className="frame"></span>
      <span className="frame"></span>
      <span className="frame"></span>
      <div onClick={() => history.goBack()} className="close-button"><span></span><span></span></div>
      <div className="algorithm-inner-wrapper">
        { activeAlgorithm === 'advanced-merge-sort' && <AdvancedMergeSort /> }
      </div>
    </div>
  )
}

Algorithm.propTypes = {
  setActiveAlgorithm: PropTypes.func.isRequired,
  algorithms: PropTypes.object.isRequired,
  activeAlgorithm: PropTypes.string,
}

const mapStateToProps = state => ({
  algorithms: state.algorithm.algorithms,
  activeAlgorithm: state.algorithm.activeAlgorithm
})

export default connect(mapStateToProps, { setActiveAlgorithm })(Algorithm)
