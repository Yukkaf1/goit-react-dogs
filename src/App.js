import { Component } from 'react';
import { GlobalStyle } from './components/GlobalStyle';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import { fetchBreeds, fetchDogByBreed } from 'api';
import { Dog } from './components/Dog';
import { BreedSelect } from 'components/BreedSelect';

axios.defaults.baseURL = 'https://api.thedogapi.com/v1';
axios.defaults.headers.common['x-api-key'] = process.env.REACT_APP_API_KEY;

export default class App extends Component {
  state = {
    breeds: [],
    dog: null,
    error: null,
    isLoading: false,
  };

  selectBreed = async breedId => {
    try {
      this.setState({ isLoading: true });
      const dog = await fetchDogByBreed(breedId);
      this.setState({ dog });
    } catch (error) {
      this.setState({ error: 'Ошибка загрузки Попробуй еще раз!' });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  buildSelectOptions = () => {
    return this.state.breeds.map(breed => ({
      value: breed.id,
      label: breed.name,
    }));
  };

  render() {
    const { breeds, dog, error, isLoading } = this.state;
    const options = this.buildSelectOptions();
    return (
      <div>
        <BreedSelect breeds={breeds} onSelect={this.selectBreed} />
        {error && <div> {error} </div>}
        {isLoading && <ClipLoader color="#36d7b7" />}
        {dog && !isLoading && <Dog dog={dog} />}
        <GlobalStyle />
      </div>
    );
  }
}
