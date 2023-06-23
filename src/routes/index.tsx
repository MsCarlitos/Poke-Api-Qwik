import { $, component$, useSignal } from '@builder.io/qwik';
import { type DocumentHead, useNavigate } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';

export default component$(() => {

  const pokemonId = useSignal<number>(1); // Uso para primitivos booleans, strings, numbers, etc...
  const showBackImage = useSignal<boolean>(false);
  const isVisible = useSignal<boolean>(true);

  const nav = useNavigate()

  const changePokemonId = $( (value:number) => {
    if(( pokemonId.value+ value) <= 0 ) return;
    pokemonId.value += value;
  })

  const goToPokemons = $(() => {
    nav(`/pokemon/${ pokemonId.value }`);
  })

  return (
    <>
      <span class="text-2xl">Buscador Simple</span>
      <span class="text-9xl">{ pokemonId }</span>

      <div onClick$={ () => goToPokemons() }>
          <PokemonImage
            id={pokemonId.value}
            size={ 250 }
            backImage={showBackImage.value}
            isVisible={ isVisible.value }
          />
        </div>

      <div class="mt-2">
        <button onClick$={ () => changePokemonId(-1) } class="btn btn-primary mr-2">Anterior</button>
        <button onClick$={ () => changePokemonId(+1) } class="btn btn-primary mr-2">Siguiente</button>
        <button onClick$={ () => showBackImage.value = !showBackImage.value } class="btn btn-primary mr-2">voltear</button>
        <button onClick$={ () => isVisible.value = !isVisible.value } class="btn btn-primary">¿Quien es ese Pokemon?</button>
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
