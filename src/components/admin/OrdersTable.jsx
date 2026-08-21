import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  CheckCircle2, 
  TrendingUp, 
  UserCheck
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatPrice } from '../../utils/currencyHelper';

export function OrdersTable() {
  const { 
    isOrdersLogOpen, 
    setIsOrdersLogOpen, 
    orders, 
    markOrderAsPaid,
    isAdmin,
    currentUser,
    currency,
    totalStoreSalesUSD,
    totalPaidOrdersCount,
    getAdminSales
  } = useStore();

  const [orderFilter, setOrderFilter] = useState('all');

  if (!isOrdersLogOpen) return null;

  const currentAdminId = currentUser?.adminId || currentUser?.id;
  const myStats = getAdminSales(currentAdminId);

  const filteredOrders = orders.filter((o) => {
    if (orderFilter === 'my') {
      return o.adminId === currentAdminId;
    }
    if (orderFilter === 'pending') {
      return o.status !== 'Paid / Completed';
    }
    if (orderFilter === 'paid') {
      return o.status === 'Paid / Completed';
    }
    return true;
  });

  return (
    <div className="glass-modal-backdrop" onClick={() => setIsOrdersLogOpen(false)}>
      <div 
        className="glass-modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '960px' }}
      >
        
        {/* Header */}
        <div 
          style={{ 
            padding: '1rem 1.5rem', 
            borderBottom: '1px solid var(--glass-border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            background: 'var(--glass-modal)',
            backdropFilter: 'blur(20px)',
            zIndex: 20
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div 
              style={{
                width: '30px',
                height: '30px',
                borderRadius: 'var(--radius-xs)',
                background: 'var(--accent-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff'
              }}
            >
              <ShoppingBag size={16} color="#ffffff" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Orders & Sales Dashboard</h2>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                {isAdmin ? `Admin Portal: ${currentUser?.name}` : 'Marketplace Orders'}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsOrdersLogOpen(false)}
            className="glass-panel"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-primary)'
            }}
          >
            <X size={16} color="currentColor" />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Sales Metric Cards */}
          {isAdmin && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
              
              {/* My Personal Admin Sales */}
              <div 
                className="glass-panel"
                style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--accent-primary)',
                  background: 'var(--accent-gradient-soft)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                    My Verified Sales
                  </span>
                  <UserCheck size={14} color="currentColor" />
                </div>
                <div style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--accent-primary)', fontFamily: 'var(--font-heading)' }}>
                  {formatPrice(myStats.salesUSD, currency)}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  {myStats.paidCount} paid out of {myStats.totalCount} assigned orders
                </div>
              </div>

              {/* Total Global Store Sales */}
              <div 
                className="glass-panel"
                style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--glass-border-hover)',
                  background: 'var(--glass-bg-hover)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                    Total Store Sales
                  </span>
                  <TrendingUp size={14} color="currentColor" />
                </div>
                <div style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                  {formatPrice(totalStoreSalesUSD, currency)}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  {totalPaidOrdersCount} total completed sales store-wide
                </div>
              </div>

            </div>
          )}

          {/* Filter Tabs */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setOrderFilter('all')}
              className={`glass-btn ${orderFilter === 'all' ? 'glass-btn-primary' : 'glass-btn-secondary'}`}
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
            >
              All Orders ({orders.length})
            </button>

            {isAdmin && (
              <button
                onClick={() => setOrderFilter('my')}
                className={`glass-btn ${orderFilter === 'my' ? 'glass-btn-primary' : 'glass-btn-secondary'}`}
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
              >
                Assigned to Me ({orders.filter(o => o.adminId === currentAdminId).length})
              </button>
            )}

            <button
              onClick={() => setOrderFilter('pending')}
              className={`glass-btn ${orderFilter === 'pending' ? 'glass-btn-primary' : 'glass-btn-secondary'}`}
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
            >
              Pending ({orders.filter(o => o.status !== 'Paid / Completed').length})
            </button>

            <button
              onClick={() => setOrderFilter('paid')}
              className={`glass-btn ${orderFilter === 'paid' ? 'glass-btn-primary' : 'glass-btn-secondary'}`}
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
            >
              Completed Sales ({orders.filter(o => o.status === 'Paid / Completed').length})
            </button>
          </div>

          {/* Table Container */}
          <div style={{ overflowX: 'auto' }}>
            {filteredOrders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                No orders match the selected filter.
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--glass-border-subtle)', textAlign: 'left', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '0.6rem 0.5rem' }}>Ticket ID</th>
                    <th style={{ padding: '0.6rem 0.5rem' }}>Item</th>
                    <th style={{ padding: '0.6rem 0.5rem' }}>Price ({currency})</th>
                    <th style={{ padding: '0.6rem 0.5rem' }}>Buyer</th>
                    <th style={{ padding: '0.6rem 0.5rem' }}>Assigned Admin</th>
                    <th style={{ padding: '0.6rem 0.5rem' }}>Status</th>
                    {isAdmin && <th style={{ padding: '0.6rem 0.5rem', textAlign: 'right' }}>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((ord) => {
                    const isPaid = ord.status === 'Paid / Completed';
                    return (
                      <tr 
                        key={ord.id}
                        style={{ borderBottom: '1px solid var(--glass-border-subtle)' }}
                      >
                        <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600, color: 'var(--accent-primary)' }}>
                          #{ord.id}
                        </td>

                        <td style={{ padding: '0.75rem 0.5rem' }}>
                          <div style={{ fontWeight: 500, maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {ord.productTitle}
                          </div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                            {new Date(ord.createdAt).toLocaleDateString()}
                          </div>
                        </td>

                        <td style={{ padding: '0.75rem 0.5rem', fontWeight: 700 }}>
                          {formatPrice(ord.price, currency)}
                        </td>

                        <td style={{ padding: '0.75rem 0.5rem' }}>
                          <div style={{ fontWeight: 500 }}>{ord.customerName}</div>
                          {ord.playerInfo && (
                            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>ID: {ord.playerInfo}</div>
                          )}
                        </td>

                        <td style={{ padding: '0.75rem 0.5rem' }}>
                          <div style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{ord.adminName}</div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{ord.adminPhone}</div>
                        </td>

                        <td style={{ padding: '0.75rem 0.5rem' }}>
                          <span className="glass-badge" style={{ fontSize: '0.68rem' }}>
                            {ord.status}
                          </span>
                        </td>

                        {isAdmin && (
                          <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>
                            {!isPaid ? (
                              <button
                                onClick={() => markOrderAsPaid(ord.id)}
                                className="glass-btn glass-btn-primary"
                                style={{
                                  padding: '0.3rem 0.65rem',
                                  fontSize: '0.72rem'
                                }}
                              >
                                <CheckCircle2 size={12} color="#fff" />
                                Mark Paid
                              </button>
                            ) : (
                              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                                Recorded in Sales
                              </span>
                            )}
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
