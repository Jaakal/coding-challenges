import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';

import { addAlgorithm } from '../actions/algorithm'

import Algorithm from '../algorithms/Algorithm'

const Algorithms = ({ algorithms, addAlgorithm }) => {
  useEffect(() => {
    addAlgorithm({
      'advanced-merge-sort': 'Advanced Merge Sort', 
      'lru-cache': 'LRU Cache', 
      'number-of-binary-tree-topologies': 'Number Of Binary Tree Topologies', 
      'smallest-substring-containing': 'Smallest Substring Containing', 
      'right-smaller-than': 'Right Smaller Than',
      'longest-increasing-subsequence': 'Longest Increasing Subsequence',
      'square-of-zeroes': 'SquareOfZeroes' 
    })
  }, [addAlgorithm])

  return (
    <div className="algorithms-container">
      <h1>Coding Challenges</h1>
      {Object.keys(algorithms).map(key => (
        <div key={key} className="coding-challenge-link-wrapper">
          <span className="dot"></span>
          <span className="line"></span>
          <Link className="coding-challenge-link" to={`/${key}`}>{algorithms[key]}</Link>
        </div>
      ))}
      <Route path="/:slug" component={Algorithm} />
    </div>
  )
}

Algorithms.propTypes = {
  addAlgorithm: PropTypes.func.isRequired,
  algorithms: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  algorithms: state.algorithm.algorithms
})

export default connect(mapStateToProps, { addAlgorithm })(Algorithms)