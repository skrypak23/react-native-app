import ICustomer from "../models/Customer";
import IProduct from "../models/Product";
import IInvoice from "../models/Invoice";
import IInvoiceItem from "../models/InvoiceItem";

export type CustomerEntity = {
    byId: { [key: string]: ICustomer };
    allIds: ReadonlyArray<string>;
};
export type ProductEntity = {
    byId: { [key: string]: IProduct };
    allIds: ReadonlyArray<string>;
};
export type InvoiceEntity = {
    byId: { [key: string]: IInvoice };
    allIds: ReadonlyArray<string>;
};
export type InvoiceItemEntity = {
    byId: { [key: string]: IInvoiceItem };
    allIds: ReadonlyArray<string>;
};

