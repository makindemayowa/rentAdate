/*eslint-env jquery*/
/*global M*/

import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import SubNav from '../common/SubNav';
import EventsCard from './EventsCard'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import './event.scss';
import { getAllEventRequest, postReviewRequest } from '../../actions/events';

class Events extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: moment(),
      events: [],
      review: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.createReview = this.createReview.bind(this);
  }

  componentDidMount() {
    const select = document.querySelectorAll('select');
    M.FormSelect.init(select);
    const collapsible = document.querySelectorAll('.collapsible');
    M.Collapsible.init(collapsible);
    this.props.getAllEventRequest().then(() => {
      this.setState({
        events: this.props.events
      });
      const collapsible = document.querySelectorAll('.collapsible');
      M.Collapsible.init(collapsible);
    });
  }

  componentWillReceiveProps(nextProps) {
    const events = nextProps.events;
    this.setState({
      events,
    });
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      error: ''
    });
  }

  createReview(id) {
    const review = this.state.review
    this.props.postReviewRequest(id, review).then((res) => {
      this.props.getAllEventRequest().then(() => {
        const collapsible = document.querySelectorAll('.collapsible');
        M.Collapsible.init(collapsible);
      });
      this.setState({
        review: ''
      });
    });
  }

  render() {
    return (
      <div className="events">
        <SubNav currentPage={'events'} />
        <div className="container">
          <div className="row">
            <div className="right createEvent">
              <Link to="/new-event" className="btn-floating btn-large waves-effect waves-light"><i className="material-icons">add</i></Link>
            </div>
          </div>
          <div className="row">
            <div className="col s12 m8 l10">
              <div className="row">
                {
                  this.state.events.map((event) => <EventsCard
                    event={event}
                    id={event._id}
                    key={event._id}
                    onChange={this.onChange}
                    review={this.state.review}
                    createReview={this.createReview}
                  />)
                }
              </div>
            </div>
            <div className="col s12 m4 l2 searchForm">
              <div className="flex">
                <div className="form-fields">
                  <label>Interested in</label>
                  <select className="size1">
                    <option value="1">Female</option>
                    <option value="">Male</option>
                  </select>
                </div>

                <div className="form-fields">
                  <label>Country</label>
                  <select className="size1">
                    <option value="">Nigeria</option>
                    <option value="3">Norway</option>
                    <option value="1">Oman</option>
                    <option value="2">Pakistan</option>
                  </select>
                </div>

                <div className="form-fields">
                  <label>State</label>
                  <select className="size1">
                    <option value="">Lagos</option>
                    <option value="1">Abuja</option>
                    <option value="2">Abeokuta</option>
                  </select>
                </div>

                <div className="form-fields">
                  Date Range
                  <div className="bottom_margin" />
                  <div className="row">
                    <div className="col s12">
                      <div>
                        From
                      </div>
                    </div>
                    <div className="col s10 m9 l8">
                      <div className="dtpcker">
                        <DatePicker
                          selected={this.state.startDate}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s12">
                      To
                    </div>
                    <div className="col s10 m9 l8">
                      <div className="dtpcker">
                        <DatePicker
                          selected={this.state.startDate}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <button className="waves-effect right waves-light btn">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Events.defaultProps = {
  events: [],
};

Events.propTypes = {
  events: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

const mapStateToProps = state => ({
  events: state.event.events,
  pagination: state.event.pagination
});

export default connect(mapStateToProps,
  { getAllEventRequest, postReviewRequest })(Events);
