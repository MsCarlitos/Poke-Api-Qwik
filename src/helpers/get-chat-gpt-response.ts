import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: import.meta.env.PUBLIC_OPEN_IA_KEY,
});
const openai = new OpenAIApi(configuration);

export const getFunFactAboutPokemon = async ( pokemonName: string):Promise<string> => {
    delete configuration.baseOptions.headers['User-Agent']
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Escribe datos interesantes del pokemon ${ pokemonName }`,
        temperature: 0.29,
        max_tokens: 50,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });

    return response.data.choices[0].text || `No tengo nada sobre el pokemon con nombre ${ pokemonName }, lo siento...`;
}