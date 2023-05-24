import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TechEraDetails extends Component {
  state = {courseDetailsList: [], apiStatus: apiStatusConstant.initial}

  componentDidMount() {
    this.getCourseDetailsList()
  }

  getCourseDetailsList = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    console.log(response.ok)
    if (response.ok) {
      const data = await response.json()
      const fetchedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }

      this.setState({
        courseDetailsList: fetchedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  onClickRetry = () => {
    this.getCourseDetailsList()
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-logo"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-desc">
        we cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#4656a1" height={50} width={50} />
    </div>
  )

  renderCourserSuccessView = () => {
    const {courseDetailsList} = this.state
    const {imageUrl, name, description} = courseDetailsList

    return (
      <div className="course-details-bg-container">
        <div className="course-details-container">
          <img src={imageUrl} alt={name} className="course-image" />
          <div className="text-container">
            <h1 className="course-name">{name}</h1>
            <p className="course-desc">{description}</p>
          </div>
        </div>
      </div>
    )
  }

  renderCoursesApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.inProgress:
        return this.renderLoaderView()
      case apiStatusConstant.success:
        return this.renderCourserSuccessView()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="courses-container">{this.renderCoursesApiStatus()}</div>
    )
  }
}

export default TechEraDetails
