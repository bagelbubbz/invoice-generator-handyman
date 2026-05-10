'use client';

import type { InvoiceData } from '@/lib/types';

interface Props {
  data: InvoiceData;
}

const MIN_ROWS = 12;

const B = '1px solid #000';

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}

export default function InvoiceDoc({ data }: Props) {
  const { businessInfo, header, lineItems, gst, docType } = data;
  const docLabel = docType === 'quotation' ? 'Quotation' : 'Invoice';

  const subtotal = lineItems.reduce((s, i) => s + (parseFloat(i.amount) || 0), 0);
  const gstAmount = gst.enabled ? subtotal * (gst.pct / 100) : 0;
  const total = subtotal + gstAmount;

  const rows = [...lineItems];
  while (rows.length < MIN_ROWS) {
    rows.push({ id: `pad-${rows.length}`, description: '', qty: '', amount: '' });
  }

  return (
    <div
      style={{
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '10pt',
        color: '#000',
        backgroundColor: '#fff',
        width: '100%',
      }}
    >
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          border: B,
          tableLayout: 'fixed',
        }}
      >
        <colgroup>
          {/* S/N 5% | Description 55% | Qty 14% | Amount 26% */}
          <col style={{ width: '5%' }} />
          <col style={{ width: '55%' }} />
          <col style={{ width: '14%' }} />
          <col style={{ width: '26%' }} />
        </colgroup>
        <tbody>

          {/* ── LOGO + COMPANY NAME ── */}
          <tr>
            <td
              colSpan={4}
              style={{
                border: B,
                padding: '10px 12px 8px',
                textAlign: 'center',
              }}
            >
              {businessInfo.logo && (
                <img
                  src={businessInfo.logo}
                  alt="Logo"
                  style={{
                    maxHeight: '110px',
                    maxWidth: '380px',
                    display: 'block',
                    margin: '0 auto 4px',
                    objectFit: 'contain',
                  }}
                />
              )}
              {!businessInfo.logo && (
                <>
                  {businessInfo.chineseName && (
                    <div style={{ fontStyle: 'italic', fontSize: '12pt', marginBottom: '2px' }}>
                      {businessInfo.chineseName}
                    </div>
                  )}
                  <div style={{ fontWeight: 'bold', fontSize: '12pt', letterSpacing: '0.5px' }}>
                    {businessInfo.companyName}
                  </div>
                </>
              )}
            </td>
          </tr>

          {/* ── CLIENT INFO (left) | INVOICE BOX (right) ── */}
          <tr>
            <td
              colSpan={2}
              style={{
                border: B,
                verticalAlign: 'top',
                padding: '8px 10px',
              }}
            >
              <div style={{ marginBottom: '4px', fontSize: '10pt' }}>
                <strong>Attention To :</strong>&nbsp;&nbsp;{header.attentionTo}
              </div>
              <div style={{ marginBottom: '4px', fontSize: '10pt' }}>
                <strong>Contact No :</strong>&nbsp;&nbsp;{header.contactNo}
              </div>
              <div style={{ marginBottom: '4px', fontSize: '10pt' }}>
                <strong>Job Site :</strong>&nbsp;&nbsp;{header.jobSite}
              </div>
            </td>
            <td
              colSpan={2}
              style={{
                border: B,
                verticalAlign: 'top',
                padding: '8px 10px',
              }}
            >
              <div style={{ border: B, padding: '6px 10px' }}>
                <div
                  style={{
                    fontWeight: 'bold',
                    fontSize: '11pt',
                    paddingBottom: '4px',
                    marginBottom: '4px',
                    borderBottom: '1px solid #888',
                  }}
                >
                  {docLabel}
                </div>
                <div style={{ marginBottom: '3px', fontSize: '9.5pt' }}>
                  <strong>Our Ref :</strong>&nbsp;{header.refNo}
                </div>
                <div style={{ fontSize: '9.5pt' }}>
                  <strong>Date :</strong>&nbsp;{formatDate(header.date)}
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
                  border: B,
                  padding: '5px 10px',
                  fontSize: '8.5pt',
                  lineHeight: '1.4',
                }}
              >
                {header.preamble}
              </td>
            </tr>
          )}

          {/* ── TABLE HEADER ── */}
          <tr>
            {[
              { label: 'S/N', align: 'center' as const },
              { label: 'Description', align: 'left' as const },
              { label: 'Qty', align: 'center' as const },
              { label: 'Amount (SGD $)', align: 'right' as const },
            ].map(({ label, align }) => (
              <td
                key={label}
                style={{
                  border: B,
                  padding: '4px 8px',
                  fontWeight: 'bold',
                  fontSize: '10pt',
                  textAlign: align,
                  backgroundColor: '#eeeeee',
                }}
              >
                {label}
              </td>
            ))}
          </tr>

          {/* ── LINE ITEMS ── */}
          {rows.map((row, i) => (
            <tr key={row.id}>
              <td
                style={{
                  border: B,
                  padding: '3px 6px',
                  fontSize: '9.5pt',
                  textAlign: 'center',
                  height: '20px',
                }}
              >
                {row.description ? i + 1 : ''}
              </td>
              <td
                style={{
                  border: B,
                  padding: '3px 8px',
                  fontSize: '9.5pt',
                  wordBreak: 'break-word',
                }}
              >
                {row.description}
              </td>
              <td
                style={{
                  border: B,
                  padding: '3px 6px',
                  fontSize: '9.5pt',
                  textAlign: 'center',
                }}
              >
                {row.qty}
              </td>
              <td
                style={{
                  border: B,
                  padding: '3px 8px',
                  fontSize: '9.5pt',
                  textAlign: 'right',
                }}
              >
                {row.amount ? `$${parseFloat(row.amount).toFixed(2)}` : ''}
              </td>
            </tr>
          ))}

          {/* ── TOTALS ROW ── */}
          <tr>
            <td
              colSpan={3}
              style={{
                border: B,
                padding: '6px 10px',
                fontSize: '9.5pt',
              }}
            />
            <td
              style={{
                border: B,
                padding: '6px 10px',
                fontSize: '9.5pt',
                verticalAlign: 'top',
              }}
            >
              {gst.enabled && (
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '3px' }}>
                  <tbody>
                    <tr>
                      <td style={{ fontSize: '9pt' }}>Subtotal</td>
                      <td style={{ fontSize: '9pt', textAlign: 'right' }}>${subtotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: '9pt' }}>GST ({gst.pct}%)</td>
                      <td style={{ fontSize: '9pt', textAlign: 'right' }}>${gstAmount.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              )}
              <table style={{ width: '100%', borderCollapse: 'collapse', borderTop: gst.enabled ? '1px solid #000' : 'none' }}>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: 'bold', fontSize: '10pt', paddingTop: gst.enabled ? '3px' : '0' }}>
                      Total
                    </td>
                    <td style={{ fontWeight: 'bold', fontSize: '10pt', textAlign: 'right', paddingTop: gst.enabled ? '3px' : '0' }}>
                      ${total.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          {/* ── SIGNATURE ROW ── */}
          <tr>
            <td
              colSpan={2}
              style={{
                border: B,
                padding: '8px 10px',
                verticalAlign: 'top',
                fontSize: '9.5pt',
              }}
            >
              <div style={{ marginBottom: '4px' }}>Issued By :</div>
              <div style={{ fontWeight: 'bold', marginBottom: '6px' }}>
                {businessInfo.companyName}
              </div>
              {businessInfo.signature ? (
                <img
                  src={businessInfo.signature}
                  alt="Signature"
                  style={{
                    maxHeight: '48px',
                    maxWidth: '160px',
                    display: 'block',
                    marginBottom: '2px',
                  }}
                />
              ) : (
                <div style={{ height: '36px' }} />
              )}
              <div style={{ borderTop: '1px solid #000', width: '170px', marginTop: '2px' }} />
            </td>
            <td
              colSpan={2}
              style={{
                border: B,
                padding: '8px 10px',
                verticalAlign: 'top',
                fontSize: '9.5pt',
              }}
            >
              <div style={{ marginBottom: '4px' }}>Agreed / Accepted by :</div>
              <div style={{ marginBottom: '6px' }}>Name / Signature</div>
              <div style={{ height: '36px' }} />
              <div style={{ borderTop: '1px solid #000', width: '170px', marginTop: '2px' }} />
            </td>
          </tr>

        </tbody>
      </table>
    </div>
  );
}
