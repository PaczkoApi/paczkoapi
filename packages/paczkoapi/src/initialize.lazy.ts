/**
 * Inicjuje web komponenty.
 */
export async function initialize() {
    const { initialize } = await import('./initialize.js');
    return initialize();
}
