import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';

export const usePokemonId = routeLoader$<number>( ({ params, redirect }) => {
    const id = Number(params.id);
    if( isNaN(id) ) redirect(301, '/');
    if( id <= 0 ) redirect(301, '/');
    if( id <= 0 ) redirect(301, '/');
    if( id >= 1010 ) redirect(301, '/');
    return id;
})

export default component$(() => {
    const pokemonId = usePokemonId();
    return <PokemonImage id={ pokemonId.value } size={ 250 } isVisible />
});