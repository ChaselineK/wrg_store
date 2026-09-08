import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Dedicated Page Views
import { HomePage } from './components/pages/HomePage';
import { AccountsPage } from './components/pages/AccountsPage';
import { CurrenciesPage } from './components/pages/CurrenciesPage';
import { ProductDetailPage } from './components/pages/ProductDetailPage';
import { CartPage } from './components/pages/CartPage';
import { CheckoutPage } from './components/pages/CheckoutPage';
import { VendorsPage } from './components/pages/VendorsPage';
import { LoginPage } from './components/pages/LoginPage';
import { AdminDashboardPage } from './components/pages/AdminDashboardPage';
import { TermsPage } from './components/pages/TermsPage';
import { PrivacyPage } from './components/pages/PrivacyPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { Error404Page } from './components/pages/Error404Page';
import { Error500Page } from './components/pages/Error500Page';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { Analytics } from '@vercel/analytics/react';

function StoreMain() {
  const { 
    currentPage, 
    navigateTo, 
    isAdmin, 
    isSuperAdmin, 
    currentUser, 
    logout 
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');

  // Select page view based on active route
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage key="home" />;
      case 'accounts':
        return <AccountsPage key="accounts" />;
      case 'currency':
        return <CurrenciesPage key="currency" />;
      case 'product-detail':
        return <ProductDetailPage key="product-detail" />;
      case 'cart':
        return <CartPage key="cart" />;
      case 'checkout':
        return <CheckoutPage key="checkout" />;
      case 'vendors':
        return <VendorsPage key="vendors" />;
      case 'terms':
        return <TermsPage key="terms" />;
      case 'privacy':
        return <PrivacyPage key="privacy" />;
      case 'profile':
        return <ProfilePage key="profile" />;
      case 'login':
        return <LoginPage key="login" />;
      case 'admin':
        return <AdminDashboardPage key="admin" />;
      case '404':
        return <Error404Page key="404" />;
      case '500':
        return <Error500Page key="500" />;
      default:
        return <HomePage key="default-home" />;
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-main)' }}>
      
      {/* Navigation Header - Hidden on Login Page */}
      {currentPage !== 'login' && (
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      )}

      {/* Main Page Content - Instant Snappy Navigation */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {renderCurrentPage()}
      </main>

      {/* Footer - Hidden on Login Page */}
      {currentPage !== 'login' && <Footer />}

      {/* Mobile Disappearing Bottom Navigation */}
      <MobileBottomNav />

    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <StoreMain />
      <Analytics />
    </StoreProvider>
  );
}
