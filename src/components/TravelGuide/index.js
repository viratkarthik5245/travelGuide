import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

class TravelGuide extends Component {
  state = {travelList: [], inProgress: true}

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    const Url = 'https://apis.ccbp.in/tg/packages'
    const response = await fetch(Url)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.packages.map(each => ({
        id: each.id,
        name: each.name,
        description: each.description,
        imageUrl: each.image_url,
      }))
      this.setState({travelList: updatedData, inProgress: false})
    }
  }

  renderLoaderView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  render() {
    const {travelList, inProgress} = this.state
    return (
      <div className="app-container">
        <h1 className="heading">Travel Guide</h1>
        {inProgress ? (
          this.renderLoaderView()
        ) : (
          <ul className="travel-ul-list-card">
            {travelList.map(each => (
              <li className="travel-item" key={each.id}>
                <img className="image" src={each.imageUrl} alt={each.name} />
                <h1 className="name">{each.name}</h1>
                <p className="description">{each.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}
export default TravelGuide
