import { unionWith, eqBy, reverse, prop, reject, propEq, find } from 'ramda';
import { ID } from '../typing/records';

interface IWithID {
  _id: ID;
}

export function union<T extends IWithID>(payload: Array<T>, entities: ReadonlyArray<T>) {
  return unionWith<T>(eqBy(prop('_id')), reverse(payload), entities);
}

export function deleteData<T extends IWithID>(payload: T, entities: ReadonlyArray<T>) {
  return reject<T>(propEq('_id', payload._id), entities);
}

export const findData = <T>(data: ReadonlyArray<T>, id: ID) =>
  find(propEq('_id', id))(data);
