import { RNG } from 'near-sdk-as';

/**
 * Generates a new id and returns it.
 * @param prefix string
 * @param data string array of current stored ids to compare against
 */
 export function generateId(prefix: string, data: string[]): string {
    const id = new RNG<u32>(3, u32.MAX_VALUE);
    const result = prefix + id.next().toString();
    if(data.includes(result)) {
        generateId(prefix, data);
    }
    return result;
}
