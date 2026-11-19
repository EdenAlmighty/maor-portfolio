// Missing content shows as a red TODO marker locally and on previews. The production
// build (PUBLIC_HIDE_TODOS=true in the deploy job) leaves it out, so the live site never
// shows a placeholder. `npm run check:todos` lists what is still missing either way.
export const showTodos = import.meta.env.PUBLIC_HIDE_TODOS !== 'true';
