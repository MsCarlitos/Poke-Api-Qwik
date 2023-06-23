import { $, component$, useContext, useOnDocument, useTask$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';

import { PokemonListContext, type PokemonListState } from '~/context';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { getSmallPokemons } from '~/helpers/get-small-pokemon';

export default component$(() => {
  const pokemonListGame = useContext<PokemonListState>(PokemonListContext)

  useTask$( async({ track }) => {
    track(()=> pokemonListGame.currentPage );
    pokemonListGame.isLoading = true;
    const pokemons = await getSmallPokemons( pokemonListGame.currentPage * 10, 30 )
    pokemonListGame.pokemons = [...pokemonListGame.pokemons, ...pokemons];
    pokemonListGame.isLoading = false;
  })

  useOnDocument('scroll', $(() => {
    const maxScroll = document.body.scrollHeight;
    const currentScroll = window.scrollY + window.innerHeight;
    if( ( ( currentScroll + 200 ) >= maxScroll ) && ( !pokemonListGame.isLoading ) ) {
      pokemonListGame.isLoading = true;
      pokemonListGame.currentPage++;
    }
  }))

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Página actual: { pokemonListGame.currentPage }</span>
        <span>Está cargando página: </span>
      </div>

      <div class="mt-10">
        <button onClick$={ () => pokemonListGame.currentPage-- }
          class="btn btn-primary mr-2">
          Anteriores
        </button>

        <button onClick$={ () => pokemonListGame.currentPage++ }
          class="btn btn-primary mr-2">
          Siguientes
        </button>
      </div>

      <div class="grid sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-7 mt-5">
        {
          pokemonListGame.pokemons.map(({ id, name }) => (
            <div key={name} class="m-5 flex flex-col justify-center items-center">
              <PokemonImage id={id} size={ 250 } />
              <span class="capitalize">{name}</span>
            </div>
          ))
        }
      </div>
    </>
  )
});

export const head: DocumentHead = {
  title: 'List Client',
};