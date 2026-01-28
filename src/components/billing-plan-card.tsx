'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

type Plan = {
  id: string;
  name: string;
  downloads: number;
  priceIdr: number;
};

declare global {
  interface Window {
    snap?: {
      pay: (token: string) => void;
    };
  }
}

export function BillingPlanCard({ plan }: { plan: Plan }) {
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/billing/create-transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId: plan.id })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? 'Failed to create transaction');
      }

      if (!window.snap) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script');
          script.src = data.snapJsUrl;
          script.setAttribute('data-client-key', data.clientKey);
          script.onload = () => resolve();
          script.onerror = () => reject();
          document.body.appendChild(script);
        });
      }

      window.snap?.pay(data.snapToken);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <h2 className="text-lg font-semibold text-slate-900">{plan.name}</h2>
      <p className="mt-2 text-2xl font-semibold text-brand-600">Rp{plan.priceIdr.toLocaleString('id-ID')}</p>
      <p className="mt-2 text-sm text-slate-600">{plan.downloads} downloads</p>
      <Button className="mt-4 w-full" onClick={handlePay} disabled={loading}>
        {loading ? 'Memproses...' : 'Bayar dengan Midtrans'}
      </Button>
    </Card>
  );
}
