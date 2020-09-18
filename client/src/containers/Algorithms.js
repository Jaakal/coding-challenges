import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';

import { addAlgorithm } from '../actions/algorithm'

import Algorithm from '../Algorithms/Algorithm'

const Algorithms = ({ algorithms, addAlgorithm }) => {
  useEffect(() => {
    addAlgorithm({ 'advanced-merge-sort': 'Advanced Merge Sort' })
  }, [addAlgorithm])

  return (
    <div className="algorithms-container">
      <h1>Algorithms & Data Structures</h1>
      {Object.keys(algorithms).map(key => (
        <Link key={key} to={`/${key}`}>{algorithms[key]}</Link>
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