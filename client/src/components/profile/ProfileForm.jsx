import React from 'react';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';

const ProfileForm = props => {
  return (
    <div>
      {
        props.user.profilePhoto ?
          <div className="publicProfile container">
            <div className="bottom_margin" />
            <div className="row">
              <div className="col s9 m10 l10 my_bold">
                {`${props.user.firstName}${` `}${props.user.lastName}`}
              </div>
              {
                props.currentUser.email === props.user.email &&
                <div className="col s3 m2 l2 edit">
                  <Link to="/profile">
                    <div>
                      <i className="left material-icons">edit</i>
                      <span className="edit">Edit</span>
                    </div>
                  </Link>
                </div>
              }
            </div>
            <div className="bottom_margin" />
            <div className="row">
              <div className="col s12 m5 l4">
                <div className="card">
                  <div className="card-image">
                    <img className="materialboxed" alt="" width="650" src={props.currentImg || props.user.profilePhoto} />
                  </div>
                </div>
              </div>
              <div className="col s12 m7 l8">
                <div className="slider">
                  <div className="carousel">
                    {
                      props.user.photos.map(url =>
                        <a
                          className="carousel-item"
                          href={url}
                          key={url}
                        >
                          <img alt="" src={url} />
                        </a>
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="my_bold">
                About
            </div>
              <p>
                {props.user.about}
              </p>
            </div>
            <div className="row">
              <div className="my_bold">
                Personal Details
            </div>
              <div className="row">
                <p className="col s6 m4 l3">
                  Age
              </p>
                <p className="col s6 m4 l3">
                  {props.user.age}
                </p>
              </div>
              <div className="row">
                <p className="col s6 m4 l3">
                  Country
              </p>
                <p className="col s6 m4 l3">
                  {props.user.country}
                </p>
              </div>
              <div className="row">
                <p className="col s6 m4 l3">
                  State
              </p>
                <p className="col s6 m4 l3">
                  {props.user.state}
                </p>
              </div>
              <div className="row">
                <p className="col s6 m4 l3">
                  City
              </p>
                <p className="col s6 m4 l3">
                  {props.user.city}
                </p>
              </div>
              <div className="row">
                <p className="col s6 m4 l3">
                  Phone No
              </p>
                <p className="col s6 m4 l3">
                  {props.user.phone_no}
                </p>
              </div>
              <div className="row">
                <p className="col s6 m4 l3">
                  Best time to reach me
              </p>
                <p className="col s6 m4 l3">
                  {props.user.best_time}
                </p>
              </div>
              <div className="row">
                <p className="col s6 m4 l3">
                  Occupation
              </p>
                <p className="col s6 m4 l3">
                  {props.user.occupation}
                </p>
              </div>
              <div className="row">
                <p className="col s6 m4 l3">
                  Education
              </p>
                <p className="col s6 m4 l3">
                  {props.user.education}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="my_bold">
                Rates
            </div>
              {props.user.here_to === 'here_for_fun' &&
                <p>
                  I'm just here to have fun
              </p>
              }
              {props.user.here_to === 'here_to_hire' &&
                <p>
                  I'm here to hire
              </p>
              }
              {props.user.here_to === 'professional' &&
                <div>
                  <div className="row">
                    <p className="col s6 m4 l3">
                      2 hours
                    </p>
                    <p className="col s6 m4 l3">
                      #13,000
                    </p>
                  </div>
                  <div className="row">
                    <p className="col s6 m4 l3">
                      8 hours
                    </p>
                    <p className="col s6 m4 l3">
                      #25,000
                    </p>
                  </div>
                  <div className="row">
                    <p className="col s6 m4 l3">
                      Weekend
                    </p>
                    <p className="col s6 m4 l3">
                      #250,000
                    </p>
                  </div>
                  <div className="row">
                    <p className="col s6 m4 l3">
                      Tour
                    </p>
                    <p className="col s6 m4 l3">
                      #1,000,000
                    </p>
                  </div>
                </div>
              }
            </div>
            <div className="row">
              <div className="my_bold">
                Instagram
            </div>
              <div className="bottom_margin" />
              <div className="col s12 m7 l8">
                <div className="slider">
                  <div className="carousel">
                    {
                      props.user.photos.map(url =>
                        <a
                          className="carousel-item"
                          href={url}
                          key={url}
                        >
                          <img alt="" src={url} />
                        </a>
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
            {
              props.currentUser.email !== props.user.email &&
              <ul className="collapsible">
                <li>
                  <div className="collapsible-header"><i className="material-icons">contact_mail</i>Contract Mayowa</div>
                  <div className="collapsible-body">
                    <div className="row">
                      <div className="my_bold col s4 m4 l4">
                        Date
                      </div>
                      <div className="col s12 m8 l8">
                        <DatePicker
                          selected={props.date}
                          onChange={(e) => props.handleChange(e, 'date')}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="my_bold col s4 m4 l4">
                        Venue
                      </div>
                      <div className="col s12 m8 l8">
                        <input
                          id="entry"
                          value={props.venue}
                          name="venue"
                          onChange={props.onChange}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="bottom_margin" />
                      <div className="col s12 m12 l12">
                        <div className="my_bold">Date Description</div>
                      </div>
                      <div className="bottom_margin" />
                      <div className="row">
                        <div className="col s12 m8 l8">
                          <textarea
                            placeholder="Interest me..."
                            id="textarea1"
                            name="description"
                            value={props.description}
                            onChange={props.onChange}
                            className="materialize-textarea"
                            data-length="120"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="bottom_margin" />
                    <div className="row ">
                      <button
                        className="col s12 m8 l8 waves-effect waves-light btn edit-button"
                        onClick={props.requestDate}
                      >
                        Send Request
                      </button>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="collapsible-header text-center">
                    <i className="material-icons">rate_review</i>
                    {`Reviews for ${props.user.firstName}`}
                  </div>
                  <div className="collapsible-body">
                    <div className="row">
                      <div className="">
                        <textarea
                          placeholder="Add review..."
                          id="textarea1"
                          name="review"
                          value={props.review}
                          onChange={props.onChange}
                          className="materialize-textarea"
                          data-length="120"
                        />
                      </div>
                      <div className="row ">
                        <button
                          className="submitReview waves-effect waves-light btn"
                          onClick={props.createReview}
                        >
                          Submit
                      </button>
                      </div>
                    </div>
                    <div className="">
                      {props.user.reviews.map((review) => {
                        const currentId = `${review.reviewer}`;
                        return (
                          <div className="review" key={review._id}>
                            <Link to={`/publicProfile/${currentId}`}>
                              <div className="reviewer">
                                {`By: ${review.reviewersName}`}
                              </div>
                            </Link>
                            <div className="">
                              <div className="card-content black-text">
                                <p>{review.review}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      )}
                    </div>
                  </div>
                </li>
              </ul>
            }
            <div className="bottom_margin" />
          </div> :
          <h5 className="emptyProfile center">Please update your profile
          <Link to="/profile">&nbsp;here</Link>
          </h5>
      }
    </div>
  )
}

export default ProfileForm;