import { component$, useSignal, useTask$ } from "@builder.io/qwik";

interface Props {
    id: number;
    size: number;
    backImage?: boolean;
    isVisible?: boolean;
}

export const PokemonImage = component$(( { id, size, backImage = false, isVisible=false }:Props ) => {
    const imageLoaded = useSignal<boolean>(false);
    const urlFrontImage = useSignal<string>("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/");
    const urlBackImage = useSignal<string>("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/");

    useTask$( ({ track }) => {
        track( () => id )
        imageLoaded.value = false;
    })
    return (
        <div class="flex items-center justify-center" style={{ width: `${size}px`, height:`${size}px` }}>
            { !imageLoaded.value && <span>Cargando...</span> }
            <img src={`${ backImage ? urlBackImage.value : urlFrontImage.value }${ id }.png`}
                alt='pokemon sprites'
                style={{ width: `${size}px` }}
                onLoad$={ () => imageLoaded.value = true}
                class={{
                    "hidden": !imageLoaded.value,
                    "brightness-0" : isVisible,
                    "transition-all": true
                }}
            />
        </div>
    )
})