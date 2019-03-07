import { unionWith, eqBy, reverse, prop, reject, propEq } from 'ramda';

interface IWithID {
  _id: number;
}

export function union<T extends IWithID>(payload: Array<T>, entities: ReadonlyArray<T>) {
  return unionWith<T>(eqBy(prop('_id')), reverse(payload), entities);
}

export function deleteData<T extends IWithID>(payload: T, entities: ReadonlyArray<T>) {
  return reject<T>(propEq('_id', payload._id), entities);
}
