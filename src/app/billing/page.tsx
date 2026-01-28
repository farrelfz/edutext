import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { requireSession } from '@/lib/session';
import { BillingPlanCard } from '@/components/billing-plan-card';

export default async function BillingPage() {
  const session = await requireSession();
  if (!session?.user?.email) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  const plans = await prisma.plan.findMany({ where: { isActive: true } });
  const transactions = await prisma.transaction.findMany({
    where: { userId: user?.id },
    include: { plan: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Billing & Quota</h1>
          <p className="text-sm text-slate-500">Quota saat ini: {user?.quotaRemaining ?? 0} downloads</p>
        </div>
        <section className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <BillingPlanCard key={plan.id} plan={plan} />
          ))}
        </section>
        <section>
          <h2 className="text-lg font-semibold text-slate-900">Riwayat Transaksi</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500">
                  <th className="py-2">Order</th>
                  <th>Plan</th>
                  <th>Status</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-t border-slate-200">
                    <td className="py-2">{transaction.midtransOrderId}</td>
                    <td>{transaction.plan.name}</td>
                    <td>{transaction.status}</td>
                    <td>Rp{transaction.amountIdr.toLocaleString('id-ID')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
