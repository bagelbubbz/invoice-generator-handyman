'use client';

import { useState, useEffect, useRef } from 'react';
import QuickAddPanel from './QuickAddPanel';
import InvoiceDoc from './InvoiceDoc';
import type { BusinessInfo, InvoiceHeader, LineItem, GSTSettings } from '@/lib/types';
import type { PresetJob } from '@/lib/presets';

const genId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

function generateRefNo(): string {
  const d = new Date();
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `SK${dd}/${mm}/${yyyy}`;
}

const today = new Date().toISOString().split('T')[0];

const DEFAULT_PREAMBLE =
  'Please find below our invoice for works carried out at the above-mentioned premises. All works are inclusive of labour and materials unless otherwise stated.';

const DEFAULT_BUSINESS: BusinessInfo = {
  companyName: 'WEEWAY TECHNICAL MAINTENANCE SERVICE',
  chineseName: '伟业技能',
  logo: '',
  signature: '',
};

export default function InvoiceApp() {
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>(DEFAULT_BUSINESS);
  const [header, setHeader] = useState<InvoiceHeader>({
    refNo: generateRefNo(),
    date: today,
    attentionTo: '',
    contactNo: '',
    jobSite: '',
    re: '',
    preamble: DEFAULT_PREAMBLE,
  });
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: genId(), description: '', qty: '1 Lot', amount: '' },
  ]);
  const [gst, setGst] = useState<GSTSettings>({ enabled: false, pct: 9 });
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');
  const [mounted, setMounted] = useState(false);

  const logoInputRef = useRef<HTMLInputElement>(null);
  const sigInputRef = useRef<HTMLInputElement>(null);

  // Load persisted business info
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem('ww_business');
      if (saved) setBusinessInfo(JSON.parse(saved));
    } catch {}
  }, []);

  // Persist business info
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem('ww_business', JSON.stringify(businessInfo));
    } catch {}
  }, [businessInfo, mounted]);

  // Image upload
  const handleImageUpload =
    (field: 'logo' | 'signature') =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        setBusinessInfo((prev) => ({
          ...prev,
          [field]: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    };

  const clearImage = (field: 'logo' | 'signature') => {
    setBusinessInfo((prev) => ({ ...prev, [field]: '' }));
    if (field === 'logo' && logoInputRef.current) logoInputRef.current.value = '';
    if (field === 'signature' && sigInputRef.current) sigInputRef.current.value = '';
  };

  // Line item helpers
  const addLineItem = (preset?: PresetJob) => {
    setLineItems((prev) => [
      ...prev,
      {
        id: genId(),
        description: preset?.description ?? '',
        qty: preset?.qty ?? '1 Lot',
        amount: preset ? String(preset.price) : '',
      },
    ]);
  };

  const updateLineItem = (
    id: string,
    field: keyof Omit<LineItem, 'id'>,
    value: string
  ) => {
    setLineItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const removeLineItem = (id: string) => {
    setLineItems((prev) => (prev.length > 1 ? prev.filter((i) => i.id !== id) : prev));
  };

  // Totals
  const subtotal = lineItems.reduce((s, i) => s + (parseFloat(i.amount) || 0), 0);
  const gstAmount = gst.enabled ? subtotal * (gst.pct / 100) : 0;
  const total = subtotal + gstAmount;

  const invoiceData = { businessInfo, header, lineItems, gst };

  const handlePrint = () => window.print();

  const inputCls =
    'mt-1 w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent';

  const labelCls = 'block text-xs font-medium text-gray-600';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Top bar ── */}
      <header className="no-print bg-blue-700 text-white px-4 py-3 flex items-center justify-between shadow-md sticky top-0 z-10">
        <div>
          <h1 className="font-bold text-base leading-tight">Invoice Generator</h1>
          <p className="text-blue-200 text-xs">Weeway Technical Maintenance</p>
        </div>
        <button
          onClick={handlePrint}
          className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-50 active:bg-blue-100 transition-colors flex items-center gap-1.5"
        >
          <span>🖨</span> Print / Save PDF
        </button>
      </header>

      {/* ── Mobile tab bar ── */}
      <div className="no-print md:hidden flex border-b border-gray-200 bg-white sticky top-[56px] z-10">
        <button
          onClick={() => setActiveTab('form')}
          className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
            activeTab === 'form'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          ✏️ Form
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
            activeTab === 'preview'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          👁 Preview
        </button>
      </div>

      {/* ── Main content ── */}
      <div className="md:flex md:h-[calc(100vh-56px)]">
        {/* ════ LEFT: Form panel ════ */}
        <div
          className={`${
            activeTab === 'preview' ? 'hidden' : 'block'
          } md:block md:w-1/2 lg:w-5/12 overflow-y-auto`}
        >
          <div className="p-4 space-y-6 no-print">
            {/* ── Business Info ── */}
            <section className="bg-white rounded-xl border border-gray-200 p-4">
              <h2 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-700 rounded px-2 py-0.5 text-xs">BUSINESS</span>
                Business Info
              </h2>
              <div className="space-y-3">
                <div>
                  <label className={labelCls}>Company Name</label>
                  <input
                    className={inputCls}
                    value={businessInfo.companyName}
                    onChange={(e) =>
                      setBusinessInfo((prev) => ({ ...prev, companyName: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <label className={labelCls}>Chinese Name</label>
                  <input
                    className={inputCls}
                    value={businessInfo.chineseName}
                    onChange={(e) =>
                      setBusinessInfo((prev) => ({ ...prev, chineseName: e.target.value }))
                    }
                  />
                </div>

                {/* Logo upload */}
                <div>
                  <label className={labelCls}>Company Logo</label>
                  <div className="mt-1 flex items-center gap-3">
                    {businessInfo.logo ? (
                      <div className="flex items-center gap-2">
                        <img
                          src={businessInfo.logo}
                          alt="Logo"
                          className="h-12 w-24 object-contain border border-gray-200 rounded bg-gray-50 p-1"
                        />
                        <button
                          onClick={() => clearImage('logo')}
                          className="text-xs text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer flex items-center gap-2 border border-dashed border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors">
                        <span>📁</span> Upload logo (PNG/JPG)
                        <input
                          ref={logoInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload('logo')}
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Signature upload */}
                <div>
                  <label className={labelCls}>Authorised Signature</label>
                  <div className="mt-1 flex items-center gap-3">
                    {businessInfo.signature ? (
                      <div className="flex items-center gap-2">
                        <img
                          src={businessInfo.signature}
                          alt="Signature"
                          className="h-12 w-24 object-contain border border-gray-200 rounded bg-gray-50 p-1"
                        />
                        <button
                          onClick={() => clearImage('signature')}
                          className="text-xs text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer flex items-center gap-2 border border-dashed border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors">
                        <span>✍️</span> Upload signature (PNG/JPG)
                        <input
                          ref={sigInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload('signature')}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* ── Invoice Details ── */}
            <section className="bg-white rounded-xl border border-gray-200 p-4">
              <h2 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <span className="bg-green-100 text-green-700 rounded px-2 py-0.5 text-xs">INVOICE</span>
                Invoice Details
              </h2>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Reference No.</label>
                    <input
                      className={inputCls}
                      value={header.refNo}
                      onChange={(e) => setHeader((p) => ({ ...p, refNo: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Date</label>
                    <input
                      type="date"
                      className={inputCls}
                      value={header.date}
                      onChange={(e) => setHeader((p) => ({ ...p, date: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Attention To</label>
                  <input
                    className={inputCls}
                    placeholder="Client name"
                    value={header.attentionTo}
                    onChange={(e) => setHeader((p) => ({ ...p, attentionTo: e.target.value }))}
                  />
                </div>
                <div>
                  <label className={labelCls}>Contact No.</label>
                  <input
                    className={inputCls}
                    placeholder="Phone number"
                    value={header.contactNo}
                    onChange={(e) => setHeader((p) => ({ ...p, contactNo: e.target.value }))}
                  />
                </div>
                <div>
                  <label className={labelCls}>Job Site Address</label>
                  <input
                    className={inputCls}
                    placeholder="Full address"
                    value={header.jobSite}
                    onChange={(e) => setHeader((p) => ({ ...p, jobSite: e.target.value }))}
                  />
                </div>
                <div>
                  <label className={labelCls}>Re: (optional)</label>
                  <input
                    className={inputCls}
                    placeholder="Subject heading"
                    value={header.re}
                    onChange={(e) => setHeader((p) => ({ ...p, re: e.target.value }))}
                  />
                </div>
                <div>
                  <label className={labelCls}>Preamble Text</label>
                  <textarea
                    className="mt-1 w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={3}
                    value={header.preamble}
                    onChange={(e) => setHeader((p) => ({ ...p, preamble: e.target.value }))}
                  />
                </div>
              </div>
            </section>

            {/* ── Quick Add ── */}
            <section className="bg-white rounded-xl border border-gray-200 p-4">
              <h2 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <span className="bg-orange-100 text-orange-700 rounded px-2 py-0.5 text-xs">QUICK ADD</span>
                Preset Jobs
              </h2>
              <QuickAddPanel onAdd={addLineItem} />
            </section>

            {/* ── Line Items ── */}
            <section className="bg-white rounded-xl border border-gray-200 p-4">
              <h2 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <span className="bg-purple-100 text-purple-700 rounded px-2 py-0.5 text-xs">ITEMS</span>
                Line Items
              </h2>
              <div className="overflow-x-auto -mx-1">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-xs border-y border-gray-100">
                      <th className="py-2 px-2 text-center w-8 font-medium">#</th>
                      <th className="py-2 px-2 text-left font-medium">Description</th>
                      <th className="py-2 px-1 text-center w-20 font-medium">Qty</th>
                      <th className="py-2 px-2 text-right w-24 font-medium">Amount ($)</th>
                      <th className="py-2 px-1 w-6"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {lineItems.map((item, i) => (
                      <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-2 px-2 text-center text-gray-400 text-xs">{i + 1}</td>
                        <td className="py-2 px-2">
                          <input
                            className="w-full bg-transparent focus:bg-white focus:border focus:border-gray-200 rounded px-1.5 py-1 text-sm focus:outline-none"
                            value={item.description}
                            placeholder="Description"
                            onChange={(e) =>
                              updateLineItem(item.id, 'description', e.target.value)
                            }
                          />
                        </td>
                        <td className="py-2 px-1">
                          <input
                            className="w-full text-center bg-transparent focus:bg-white focus:border focus:border-gray-200 rounded px-1 py-1 text-sm focus:outline-none"
                            value={item.qty}
                            onChange={(e) => updateLineItem(item.id, 'qty', e.target.value)}
                          />
                        </td>
                        <td className="py-2 px-2">
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            className="w-full text-right bg-transparent focus:bg-white focus:border focus:border-gray-200 rounded px-1 py-1 text-sm focus:outline-none"
                            value={item.amount}
                            placeholder="0"
                            onChange={(e) => updateLineItem(item.id, 'amount', e.target.value)}
                          />
                        </td>
                        <td className="py-2 px-1 text-center">
                          <button
                            onClick={() => removeLineItem(item.id)}
                            className="text-gray-300 hover:text-red-400 text-sm leading-none transition-colors"
                            title="Remove row"
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                onClick={() => addLineItem()}
                className="mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
              >
                <span className="text-lg leading-none">+</span> Add Custom Row
              </button>
            </section>

            {/* ── Totals ── */}
            <section className="bg-white rounded-xl border border-gray-200 p-4">
              <h2 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <span className="bg-gray-100 text-gray-600 rounded px-2 py-0.5 text-xs">TOTAL</span>
                Summary
              </h2>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <input
                    type="checkbox"
                    id="gstToggle"
                    checked={gst.enabled}
                    onChange={(e) =>
                      setGst((p) => ({ ...p, enabled: e.target.checked }))
                    }
                    className="rounded"
                  />
                  <label htmlFor="gstToggle" className="cursor-pointer select-none">
                    GST
                  </label>
                  {gst.enabled && (
                    <>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.5"
                        className="w-16 border border-gray-300 rounded px-2 py-0.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={gst.pct}
                        onChange={(e) =>
                          setGst((p) => ({ ...p, pct: parseFloat(e.target.value) || 0 }))
                        }
                      />
                      <span className="text-gray-500">%</span>
                      <span className="ml-auto font-medium">${gstAmount.toFixed(2)}</span>
                    </>
                  )}
                </div>

                <div className="flex justify-between font-semibold text-base border-t border-gray-100 pt-2.5">
                  <span>Total (SGD)</span>
                  <span className="text-blue-700">${total.toFixed(2)}</span>
                </div>
              </div>
            </section>

            {/* ── Print button (bottom) ── */}
            <div className="pb-8">
              <button
                onClick={handlePrint}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-base hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm"
              >
                🖨 Print / Save as PDF
              </button>
            </div>
          </div>
        </div>

        {/* ════ RIGHT: Preview panel ════ */}
        <div
          className={`${
            activeTab === 'form' ? 'hidden' : 'block'
          } md:block md:w-1/2 lg:w-7/12 bg-gray-300 overflow-y-auto`}
        >
          <div className="no-print p-6 min-h-full">
            <p className="text-center text-gray-500 text-xs mb-4 font-medium uppercase tracking-wide">
              Live Preview
            </p>
            <div
              className="bg-white shadow-xl mx-auto rounded-sm"
              style={{ maxWidth: '794px', minHeight: '1123px' }}
            >
              <div className="p-8">
                <InvoiceDoc data={invoiceData} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ════ PRINT-ONLY AREA ════ */}
      <div className="print-only">
        <InvoiceDoc data={invoiceData} />
      </div>
    </div>
  );
}
