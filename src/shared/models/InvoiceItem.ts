interface IInvoiceItem {
  _id: string;
  invoice_id: string;
  product_id: string;
  quantity: number;
}

export default IInvoiceItem;
