import { Component } from 'react';
import { GlobalStyle } from './components/GlobalStyle';
import axios from 'axios';
import Select from 'react-select';
axios.defaults.baseURL = 'https://api.thedogapi.com/v1';
axios.defaults.headers.common['x-api-key'] = process.env.REACT_APP_API_KEY;

export default class App extends Component {
  state = {
    breeds: [],
    dog: null,
  };

  async componentDidMount() {
    try {
      const response = await axios.get('/breeds');
      this.setState({ breeds: response.data });
    } catch (error) {}
  }

  selectBreed = async option => {
    console.log(option);
    try {
      const response = await axios.get('/images/search', {
        params: { breed_id: option.value },
      });
      this.setState({ dog: response.data[0] });
    } catch (error) {}
  };

  buildSelectOptions = () => {
    return this.state.breeds.map(breed => ({
      value: breed.id,
      label: breed.name,
    }));
  };

  render() {
    const options = this.buildSelectOptions();
    return (
      <div>
        <Select options={options} onChange={this.selectBreed} />
        {this.state.dog && (
          <img src={this.state.dog.url} width="480" alt="dog" />
        )}
        <GlobalStyle />
      </div>
    );
  }
}
