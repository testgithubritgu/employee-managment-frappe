const REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");

export function isFragment(object) {
  return Boolean(object && object.type === REACT_FRAGMENT_TYPE);
}
