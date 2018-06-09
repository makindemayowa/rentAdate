/* eslint-env jquery */
/*global M*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom'
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import toastr from 'toastr';
import SubNav from '../common/SubNav';
import { getOneEventRequest,
  postReviewRequest,
  postInterestedRequest
} from '../../actions/events';

class Events extends Component {
  constructor(props) {
    super(props)
    this.state = {
      event: {
        created_by: {},
        reviews: [],
        review: '',
        interested: false
      },
    };
    this.eventId = '';
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.createReview = this.createReview.bind(this);
    this.showInterest = this.showInterest.bind(this);
  }

  componentDidMount() {
    const collapsible = document.querySelectorAll('.collapsible');
    M.Collapsible.init(collapsible);
    this.eventId = this.props.match.params.id
    this.props.getOneEventRequest(this.eventId).then((res) => {
      this.setState({
        event: this.props.event
      })
    }).catch((err) => {
      this.setState({
        error: err.response.data
      });
    })
  }
  componentWillReceiveProps(nextProps) {
    const event = nextProps.event;
    this.setState({
      event,
    });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      error: ''
    });
  }

  createReview() {
    const review = this.state.review
    this.props.postReviewRequest(this.eventId, review).then((res) => {
      this.props.getOneEventRequest(this.eventId).then(() => {
        const collapsible = document.querySelectorAll('.collapsible');
        M.Collapsible.init(collapsible);
      });
      this.setState({
        review: ''
      });
    });
  }

  showInterest() {
    this.setState({
      interested: !this.state.interested
    }, () => {
      if(this.state.interested) {
        this.props.postInterestedRequest(this.eventId).then((res) => {
          this.setState({
            success: true
          })
          toastr.success('interest registered')
        }).catch((err) => {
          toastr.error(err.response.data.message)
        })
      }
    }
  );
  }

  onSubmit(e) {
    this.props.getOneEventRequest().then((res) => {
      this.setState({
        success: true
      })
    }).catch((err) => {
      this.setState({
        error: err.response.data
      });
    })
  }

  render() {
    const { event } = this.state
    return (
      <div>
        <SubNav />
        <div className="create_event">
          <div className="container">
            <div className="container">
              <div className="container">
                <div className="bottom_margin" />
                <div>
                  <span className="showinterest">
                    Interested?
                  </span>
                  <a href="#" onClick={this.showInterest}>
                    <i className="far fa-thumbs-up interested"></i>
                  </a>
                  {/* <a href="#">
                    <i className="far fa-thumbs-down interested"></i>
                  </a> */}
                </div>
                <div className="bottom_margin" />
                <div className="newEventContainer">
                  <div className="bottom_margin" />
                  <div className="right created_by red-text">
                    <Link className="red-text" to={`/publicProfile/${event.created_by._id}`}>
                      By:&nbsp;&nbsp;&nbsp;{event.created_by.email}
                    </Link>
                    <div className="bottom_margin" />
                  </div>
                  <div className="container push-right">
                    <div className="bottom_margin" />
                    <div className="bottom_padding" />
                    <div className="row">
                      <div className=" col s6 m4 l4">
                        Title
                        </div>
                      <div className="col s6 m4 l3 push-up">
                        <input
                          placeholder="title"
                          name="title"
                          type="text"
                          className=""
                          value={event.title}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col s6 m4 l4">
                        Date
                      </div>
                      <div className="col s6 m4 l4 push-up">
                        <DatePicker
                          selected={this.state.date}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className=" col s6 m4 l4">
                        Time
                        </div>
                      <div className="col s6 m4 l4 push-up">
                        <DatePicker
                          selected={this.state.date}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          dateFormat="LT"
                          timeCaption="Time"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className=" col s6 m4 l4">
                        Location (Event place name)
                        </div>
                      <div className="col s6 m4 l3 push-up">
                        <input
                          placeholder="location"
                          name="location"
                          type="text"
                          className=""
                          value={event.location}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className=" col s6 m4 l4">
                        State
                        </div>
                      <div className="col s6 m4 l3 push-up">
                        <input
                          placeholder="state"
                          name="state"
                          type="text"
                          className=""
                          required
                          value={event.state}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className=" col s6 m4 l4">
                        City
                        </div>
                      <div className="col s6 m4 l3 push-up">
                        <input
                          placeholder="city"
                          name="city"
                          type="text"
                          className=""
                          required
                          value={event.city}
                        />
                      </div>
                    </div>
                    <div className="row reduce-margin">
                      <div className="col s12 m12 l12">
                        Details
                        </div>
                      <div className="col s12">
                        <textarea
                          placeholder="Describe this event in brief..."
                          id="textarea1"
                          className="materialize-textarea"
                          data-length="120"
                          name="details"
                          maxLength="120"
                          required
                          value={event.details}
                        />
                      </div>
                    </div>
                    <div className="row reduce-margin">
                      <div className="col s12 m12 l12">
                        Preference
                        </div>
                      <div className="col s12">
                        <textarea
                          placeholder="Who would you rather go out with..."
                          id="textarea2"
                          className="materialize-textarea"
                          name="preference"
                          data-length="120"
                          maxLength="120"
                          required
                          value={event.preference}
                        />
                      </div>
                    </div>
                    <div className="row reduce-margin">
                      <div className="col s12 m12 l12">
                        Extra
                      </div>
                      <div className="col s12">
                        <textarea
                          placeholder="Any other thing we should know..."
                          id="textarea3"
                          className="materialize-textarea"
                          name="extra"
                          data-length="120"
                          maxLength="120"
                          required
                          value={event.extra}
                        />
                      </div>
                    </div>
                    <div className="bottom_margin" />
                  </div>


                  <ul className="collapsible">
                    <li>
                      <div className="collapsible-header text-center">
                        <i className="material-icons">message</i>
                        {`Reviews for ${event.created_by.email}`}</div>
                      <div className="collapsible-body">
                        <div className="row">
                          <div className="">
                            <textarea
                              placeholder="Add review..."
                              id="textarea1"
                              name="review"
                              value={this.state.review}
                              onChange={this.onChange}
                              className="materialize-textarea"
                              data-length="120"
                            />
                          </div>
                          <div className="row ">
                            <button
                              className="submitReview waves-effect waves-light btn"
                              onClick={this.createReview}
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                        <div className="">
                          {event.reviews.map((review) => (
                            <div className="review" key={review._id}>
                              <div className="reviewer">
                                {`By: ${review.reviewer}`}
                              </div>
                              <div className="">
                                <div className="card-content black-text">
                                  <p>{review.review}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom_margin" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  event: state.event.event,
});

export default connect(mapStateToProps,
  { getOneEventRequest, postReviewRequest, postInterestedRequest })(Events);