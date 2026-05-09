'use client';

import type { InvoiceData } from '@/lib/types';

interface Props {
  data: InvoiceData;
}

const MIN_ROWS = 12;

const border = '1px solid #000';

const th: React.CSSProperties = {
  border,
  padding: '5px 8px',
  fontWeight: 'bold',
  fontSize: '11px',
  backgroundColor: '#f5f5f5',
};

const td: React.CSSProperties = {
  border,
  padding: '5px 8px',
  fontSize: '11px',
  height: '22px',
};

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}

export default function InvoiceDoc({ data }: Props) {
  const { businessInfo, header, lineItems, gst } = data;

  const subtotal = lineItems.reduce((s, i) => s + (parseFloat(i.amount) || 0), 0);
  const gstAmount = gst.enabled ? subtotal * (gst.pct / 100) : 0;
  const total = subtotal + gstAmount;

  // Pad to minimum rows
  const rows = [...lineItems];
  while (rows.length < MIN_ROWS) {
    rows.push({ id: `pad-${rows.length}`, description: '', qty: '', amount: '' });
  }

  return (
    <div
      style={{
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '11px',
        color: '#000',
        backgroundColor: '#fff',
        width: '100%',
      }}
    >
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          border,
          tableLayout: 'fixed',
        }}
      >
        <colgroup>
          {/* S/N: 6% | Description: 52% | Qty: 16% | Amount: 26% */}
          <col style={{ width: '6%' }} />
          <col style={{ width: '52%' }} />
          <col style={{ width: '16%' }} />
          <col style={{ width: '26%' }} />
        </colgroup>
        <tbody>
          {/* ── HEADER: logo + company name ── */}
          <tr>
            <td
              colSpan={4}
              style={{
                ...td,
                textAlign: 'center',
                padding: '16px 12px',
                borderBottom: border,
              }}
            >
              {businessInfo.logo && (
                <img
                  src={businessInfo.logo}
                  alt="Company Logo"
                  style={{
                    maxHeight: '80px',
                    maxWidth: '280px',
                    display: 'block',
                    margin: '0 auto 6px',
                    objectFit: 'contain',
                  }}
                />
              )}
              {businessInfo.chineseName && (
                <div
                  style={{
                    fontStyle: 'italic',
                    fontSize: '13px',
                    marginBottom: '2px',
                  }}
                >
                  {businessInfo.chineseName}
                </div>
              )}
              <div style={{ fontWeight: 'bold', fontSize: '13px', letterSpacing: '0.5px' }}>
                {businessInfo.companyName}
              </div>
            </td>
          </tr>

          {/* ── CLIENT INFO (left) + INVOICE BOX (right) ── */}
          <tr>
            <td
              colSpan={2}
              style={{
                ...td,
                verticalAlign: 'top',
                padding: '12px',
                borderRight: border,
                borderBottom: border,
              }}
            >
              <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <tbody>
                  <tr>
                    <td style={{ fontSize: '11px', paddingBottom: '6px', whiteSpace: 'nowrap', paddingRight: '8px' }}>
                      <strong>Attention To :</strong>
                    </td>
                    <td style={{ fontSize: '11px', paddingBottom: '6px' }}>{header.attentionTo}</td>
                  </tr>
                  <tr>
                    <td style={{ fontSize: '11px', paddingBottom: '6px', whiteSpace: 'nowrap', paddingRight: '8px' }}>
                      <strong>Contact No :</strong>
                    </td>
                    <td style={{ fontSize: '11px', paddingBottom: '6px' }}>{header.contactNo}</td>
                  </tr>
                  {header.re && (
                    <tr>
                      <td style={{ fontSize: '11px', paddingTop: '4px', whiteSpace: 'nowrap', paddingRight: '8px' }}>
                        <strong>Re :</strong>
                      </td>
                      <td style={{ fontSize: '11px', paddingTop: '4px' }}>{header.re}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </td>
            <td
              colSpan={2}
              style={{
                ...td,
                verticalAlign: 'top',
                padding: '12px',
                borderBottom: border,
              }}
            >
              <div
                style={{
                  border,
                  padding: '10px 12px',
                  minHeight: '70px',
                }}
              >
                <div
                  style={{
                    fontWeight: 'bold',
                    fontSize: '13px',
                    marginBottom: '8px',
                    borderBottom: '1px solid #ccc',
                    paddingBottom: '4px',
                  }}
                >
                  Invoice
                </div>
                <div style={{ marginBottom: '4px' }}>
                  <strong>Our Ref :</strong> {header.refNo}
                </div>
                <div>
                  <strong>Date :</strong> {formatDate(header.date)}
                </div>
              </div>
            </td>
          </tr>

          {/* ── PREAMBLE ── */}
          {header.preamble && (
            <tr>
              <td
                colSpan={4}
                style={{
                  ...td,
                  padding: '8px 12px',
                  fontSize: '10px',
                  lineHeight: '1.5',
                  borderBottom: border,
                }}
              >
                {header.preamble}
              </td>
            </tr>
          )}

          {/* ── TABLE HEADER ── */}
          <tr>
            <td style={{ ...th, textAlign: 'center' }}>S/N</td>
            <td style={th}>Description</td>
            <td style={{ ...th, textAlign: 'center' }}>Qty</td>
            <td style={{ ...th, textAlign: 'right' }}>Amount (SGD $)</td>
          </tr>

          {/* ── LINE ITEMS ── */}
          {rows.map((row, i) => (
            <tr key={row.id}>
              <td style={{ ...td, textAlign: 'center', color: row.description ? '#000' : '#ccc' }}>
                {row.description ? i + 1 : ''}
              </td>
              <td style={td}>{row.description}</td>
              <td style={{ ...td, textAlign: 'center' }}>{row.qty}</td>
              <td style={{ ...td, textAlign: 'right' }}>
                {row.amount ? `$${parseFloat(row.amount).toFixed(2)}` : ''}
              </td>
            </tr>
          ))}

          {/* ── FOOTER: job site + totals ── */}
          <tr>
            <td
              colSpan={3}
              style={{
                ...td,
                verticalAlign: 'top',
                borderRight: border,
                padding: '10px 12px',
              }}
            >
              <strong>Job Site :</strong> {header.jobSite}
            </td>
            <td
              style={{
                ...td,
                textAlign: 'right',
                verticalAlign: 'top',
                padding: '10px 12px',
              }}
            >
              {gst.enabled && (
                <>
                  <div style={{ marginBottom: '3px' }}>
                    Subtotal: ${subtotal.toFixed(2)}
                  </div>
                  <div style={{ marginBottom: '3px' }}>
                    GST ({gst.pct}%): ${gstAmount.toFixed(2)}
                  </div>
                </>
              )}
              <div style={{ fontWeight: 'bold', fontSize: '12px', borderTop: gst.enabled ? '1px solid #ccc' : 'none', paddingTop: gst.enabled ? '4px' : '0' }}>
                Total: ${total.toFixed(2)}
              </div>
            </td>
          </tr>

          {/* ── SIGNATURE ROW ── */}
          <tr>
            <td
              colSpan={2}
              style={{
                ...td,
                verticalAlign: 'top',
                padding: '12px',
                borderRight: border,
              }}
            >
              <div style={{ fontSize: '11px', marginBottom: '6px' }}>Issued By :</div>
              <div style={{ fontWeight: 'bold', fontSize: '11px', marginBottom: '8px' }}>
                {businessInfo.companyName}
              </div>
              {businessInfo.signature ? (
                <img
                  src={businessInfo.signature}
                  alt="Signature"
                  style={{ maxHeight: '50px', maxWidth: '150px', display: 'block', marginBottom: '4px' }}
                />
              ) : (
                <div style={{ marginTop: '32px' }} />
              )}
              <div style={{ borderTop: '1px solid #000', width: '160px', marginTop: '4px' }} />
            </td>
            <td
              colSpan={2}
              style={{
                ...td,
                verticalAlign: 'top',
                padding: '12px',
              }}
            >
              <div style={{ fontSize: '11px', marginBottom: '6px' }}>Agreed / Accepted by :</div>
              <div style={{ fontSize: '11px', marginBottom: '4px' }}>Name / Signature</div>
              <div style={{ marginTop: '36px' }} />
              <div style={{ borderTop: '1px solid #000', width: '160px' }} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
