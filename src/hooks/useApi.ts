import { useQuery } from '@tanstack/react-query';
import { Character } from '../types';



const fetchCharacters = async ( query: string ): Promise<{ results: Character[]; }> =>
{
    const response = await fetch( `https://rickandmortyapi.com/api/character/?name=${ query }` );
    if ( !response.ok ) {
        throw new Error( 'Network response was not ok' );
    }
    return response.json();
};

export const useRickAndMortyAPI = ( query: string ) =>
{
    return useQuery( {
        queryKey: [ 'characters', query ],
        queryFn: () => fetchCharacters( query ),
        enabled: !!query,
    } );
};
