interface IInvoice {
  _id: string;
  customer_id: string;
  discount: number;
  total: number;
}

export default IInvoice;
