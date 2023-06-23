import { $, component$, useContext } from '@builder.io/qwik';
import { type DocumentHead, useNavigate } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { PokemonGameContext } from '~/context';

export default component$(() => {
  const pokemonGame = useContext(PokemonGameContext);

  const nav = useNavigate()

  const changePokemonId = $( (value:number) => {
    if(( pokemonGame.pokemonId+ value) <= 0 ) return;
    pokemonGame.pokemonId += value;
  })

  const goToPokemons = $(() => {
    nav(`/pokemon/${ pokemonGame.pokemonId }`);
  })

  return (
    <>
      <span class="text-2xl">Buscador Simple</span>
      <span class="text-9xl">{ pokemonGame.pokemonId }</span>

      <div onClick$={ () => goToPokemons() }>
          <PokemonImage
            id={pokemonGame.pokemonId}
            size={ 250 }
            backImage={pokemonGame.showBackImage}
            isVisible={ pokemonGame.isPokemonVisible }
          />
        </div>

      <div class="mt-2">
        <button onClick$={ () => changePokemonId(-1) } class="btn btn-primary mr-2">Anterior</button>
        <button onClick$={ () => changePokemonId(+1) } class="btn btn-primary mr-2">Siguiente</button>
        <button onClick$={ () => pokemonGame.showBackImage = !pokemonGame.showBackImage } class="btn btn-primary mr-2">voltear</button>
        <button onClick$={ () => pokemonGame.isPokemonVisible = !pokemonGame.isPokemonVisible } class="btn btn-primary">¿Quien es ese Pokemon?</button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'PokeQwik',
  meta: [
    {
      name: 'Esta es mi primera aplicacion con Qwik',
      content: 'Qwik site description',
    },
  ],
};
