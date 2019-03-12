export type ID = string;
export type RecordAction = {
  onEdit: (id: ID) => void;
  onDelete: (id: ID) => void;
};
