// Explicit, reversible production mode while the database is paused.
export const stateless = () => process.env.STEMCARE_STORAGE_MODE === 'stateless';
