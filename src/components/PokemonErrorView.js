import errorImage from '../img/052.png';

export default function PokemonErrorView({ message }) {
  return (
    <div role="alert">
      <img src={errorImage} width="240" alt="view" />
      <p>{message}</p>
    </div>
  );
}
