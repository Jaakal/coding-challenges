import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import { setActiveAlgorithm } from '../actions/algorithm'

import '../css/Algorithm.css'

import AdvancedMergeSort from './AdvancedMergeSort'
import LRUCache from './LRUCache'
import NumberOfBinaryTreeTopologies from './NumberOfBinaryTreeTopologies'
import SmallestSubstringContaining from './SmallestSubstringContaining'
import RightSmallerThan from './RightSmallerThan'
import LongestIncreasingSubsequence from './LongestIncreasingSubsequence'

const Algorithm = ({ match: { params: { slug } }, history, activeAlgorithm, setActiveAlgorithm })=> {
  useEffect(() => {
    setActiveAlgorithm(slug)
    return () => setActiveAlgorithm(null)
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
        { activeAlgorithm === 'lru-cache' && <LRUCache /> }
        { activeAlgorithm === 'number-of-binary-tree-topologies' && <NumberOfBinaryTreeTopologies /> }
        { activeAlgorithm === 'smallest-substring-containing' && <SmallestSubstringContaining /> }
        { activeAlgorithm === 'right-smaller-than' && <RightSmallerThan /> }
        { activeAlgorithm === 'longest-increasing-subsequence' && <LongestIncreasingSubsequence /> }
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
