import { Component } from 'react';
import { GlobalStyle } from './components/GlobalStyle';
import axios from 'axios';

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
  };

  selectBreed = async breedId => {
    try {
      const dog = await fetchDogByBreed(breedId);
      this.setState({ dog });
    } catch (error) {
      this.setState({ error: 'Ошибка загрузки Попробуй еще раз!' });
    }
  };

  buildSelectOptions = () => {
    return this.state.breeds.map(breed => ({
      value: breed.id,
      label: breed.name,
    }));
  };

  render() {
    const { breeds, dog, error } = this.state;
    const options = this.buildSelectOptions();
    return (
      <div>
        <BreedSelect breeds={breeds} onSelect={this.selectBreed} />
        {error && <div> {error} </div>}
        {dog && <Dog dog={dog} />}
        <GlobalStyle />
      </div>
    );
  }
}
