export default function buildHelloReducer(initial) {
  const _initial = initial || [];
  return (state = _initial, action) => state;
}
