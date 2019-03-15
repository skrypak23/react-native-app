import {
  unionWith,
  eqBy,
  reverse,
  prop,
  merge,
  propEq,
  find,
  omit,
  without
} from 'ramda';
import { ID } from '../typing/records';

type IWithID = {
  _id: ID;
};

type Data<T> = {
  byId: { [key: string]: T };
  allIds: ReadonlyArray<string>;
};

export function union<T extends IWithID>(payload: T[], entities: T[]) {
  return unionWith<T>(eqBy(prop('_id')), reverse(payload), entities);
}

export const findData = <T>(data: ReadonlyArray<T>, id: ID) =>
  find(propEq('_id', id))(data);

export const deleteFromObject = (id: string, data: object) => omit([id], data);
export const deleteFromArray = <T>(id: T, arr: ReadonlyArray<T>) => without([id], arr);

export const deleteEntity = <T>(id: string, entities: Data<T>) => {
  const byId = deleteFromObject(id, entities.byId);
  const allIds = deleteFromArray<string>(id, entities.allIds);
  return { byId, allIds };
};

export const mapIds = <T extends IWithID>(data: T[]): string[] => data.map(prop('_id'));
export const mapToObject = <T extends IWithID>(data: T[]) =>
  data.reduce((acc, curr) => ({ ...acc, [curr._id]: curr }), {});

export const mapEntity = <T extends IWithID>(
  entities: Data<T>,
  payload: T[]
): Data<T> => {
  const { byId } = entities;
  const mergedObjects = merge(byId, mapToObject<T>(payload));
  const set = new Set([...entities.allIds, ...mapIds<T>(payload)]);
  return { byId: mergedObjects, allIds: [...set] };
};
