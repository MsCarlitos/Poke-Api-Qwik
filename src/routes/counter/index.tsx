import { $, component$, useSignal } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';
import { useCounter } from '~/hooks/use-counter';

export default component$(() => {
    const { counter, decrease, increase } = useCounter(15);
    return (
        <>
            <span class="text-2xl">Counter</span>
            <span class="text-7xl">{ counter.value }</span>
            <div class="mt-2">
                <button class="btn btn-primary mr-2" onClick$={ decrease }>-1</button>
                <button class="btn btn-primary mr-2" onClick$={ increase }>+1</button>
            </div>
        </>
    )
});

export const head: DocumentHead = {
    title: 'Counter Hook',
};