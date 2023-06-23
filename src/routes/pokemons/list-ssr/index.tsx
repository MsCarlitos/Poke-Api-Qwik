import { $, component$, useComputed$, useSignal, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { type DocumentHead, Link, routeLoader$, useLocation } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { Modal } from '~/components/shared';
import { getFunFactAboutPokemon } from '~/helpers/get-chat-gpt-response';
import { getSmallPokemons } from '~/helpers/get-small-pokemon';
import type { SmallPokemon } from '~/interfaces';

export const usePokemonList = routeLoader$<SmallPokemon[]>(async ({ query, redirect, pathname }) => {
  const offset = Number(query.get('offset') || '0');
  if (isNaN(offset)) redirect(301, pathname);
  if (offset < 0) redirect(301, pathname)
  return await getSmallPokemons(offset);
});

export default component$(() => {

  const pokemons = usePokemonList();
  const location = useLocation();
  const modalVisible = useSignal(false);
  const modalPokemon = useStore({
    id: "",
    name: ""
  });
  const chatGptPokemonFact = useSignal("");

  const currentOffset = useComputed$<number>(() => {
    const offsetString = new URLSearchParams(location.url.search);
    return Number(offsetString.get('offset') || 0);
  })

  const showModal = $((id: string, name: string) => {
    modalPokemon.id = id;
    modalPokemon.name = name;
    modalVisible.value = true;
  });

  const closeModal = $(() => {
    modalVisible.value = false;
  });

  useVisibleTask$(({ track }) => {
    track(() => modalPokemon.name);
    chatGptPokemonFact.value = "";
    if (modalPokemon.name.length > 0) {
      getFunFactAboutPokemon(modalPokemon.name).then(resp => chatGptPokemonFact.value = resp)
    }
  })

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Offset: {currentOffset}</span>
        <span>Está cargando página: {location.isNavigating ? 'Si' : 'No'} </span>
      </div>

      <div class="mt-10">
        <Link href={`/pokemons/list-ssr/?offset=${currentOffset.value - 10}`}
          class="btn btn-primary mr-2">
          Anteriores
        </Link>

        <Link href={`/pokemons/list-ssr/?offset=${currentOffset.value + 10}`}
          class="btn btn-primary mr-2">
          Siguientes
        </Link>
      </div>

      <div class="grid grid-cols-6 mt-5">
        {
          pokemons.value.map(({ id, name }) => (
            <div key={name} onClick$={() => showModal(id, name)} class="m-5 flex flex-col justify-center items-center">
              <PokemonImage id={id} size={250} />
              <span class="capitalize">{name}</span>
            </div>
          ))
        }
      </div>
      <Modal showModal={modalVisible.value} closeFn={closeModal} persistent >
        <div q:slot='title'>
          {modalPokemon.name}
        </div>
        <div class="flex flex-col justify-center items-center" q:slot='content'>
          <PokemonImage id={modalPokemon.id} size={250} />
          <span>
            {
              chatGptPokemonFact.value === ''
                ? 'Preguntandole a ChatGPT...'
                : chatGptPokemonFact
            }
          </span>
        </div>
      </Modal>
    </>
  )
});

export const head: DocumentHead = {
  title: 'List SSR',
};