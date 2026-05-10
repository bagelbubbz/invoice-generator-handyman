export interface BusinessInfo {
  companyName: string;
  chineseName: string;
  logo: string;
  signature: string;
}

export interface InvoiceHeader {
  refNo: string;
  date: string;
  attentionTo: string;
  contactNo: string;
  jobSite: string;
  preamble: string;
}

export interface LineItem {
  id: string;
  description: string;
  qty: string;
  amount: string;
}

export interface GSTSettings {
  enabled: boolean;
  pct: number;
}

export interface InvoiceData {
  businessInfo: BusinessInfo;
  header: InvoiceHeader;
  lineItems: LineItem[];
  gst: GSTSettings;
}

export interface SavedInvoice {
  id: string;
  savedAt: string;
  refNo: string;
  attentionTo: string;
  jobSite: string;
  total: number;
  data: InvoiceData;
}
