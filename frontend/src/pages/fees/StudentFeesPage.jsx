import { useEffect, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  IndianRupee,
  Receipt,
} from "lucide-react";

import { getMyFee } from "../../services/feeService";

function formatCurrency(amount) {
  return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
}

function formatDate(date) {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function StatusBadge({ status }) {
  const config = {
    pending: {
      label: "Pending",
      className: "bg-red-100 text-red-700",
    },
    partial: {
      label: "Partially Paid",
      className: "bg-yellow-100 text-yellow-700",
    },
    paid: {
      label: "Paid",
      className: "bg-green-100 text-green-700",
    },
  };

  const current = config[status] || {
    label: status || "Unknown",
    className: "bg-slate-100 text-slate-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${current.className}`}
    >
      {current.label}
    </span>
  );
}

function StudentFeesPage() {
  const [feeData, setFeeData] = useState({
    fee: null,
    payments: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadFees = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMyFee();

      setFeeData({
        fee: data?.fee || null,
        payments: data?.payments || [],
      });
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load your fee details.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;

    const fetchFees = async () => {
      try {
        const data = await getMyFee();

        if (ignore) return;

        setFeeData({
          fee: data?.fee || null,
          payments: data?.payments || [],
        });
      } catch (err) {
        if (ignore) return;

        setError(
          err.response?.data?.message || "Failed to load your fee details.",
        );
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchFees();

    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-slate-500">Loading fee details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <h2 className="font-semibold text-red-800">Unable to load fees</h2>
        <p className="mt-1 text-sm text-red-600">{error}</p>

        <button
          type="button"
          onClick={loadFees}
          className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!feeData.fee) {
    return (
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">My Fees</h1>
          <p className="mt-1 text-sm text-slate-500">
            View your hostel fee details and payment history.
          </p>
        </div>

        <div className="rounded-xl border bg-white p-10 text-center shadow-sm">
          <Receipt size={42} className="mx-auto text-slate-400" />

          <h2 className="mt-4 text-lg font-semibold text-slate-800">
            No fee assigned yet
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Your hostel has not assigned a fee record yet.
          </p>
        </div>
      </div>
    );
  }

  const { fee, payments } = feeData;

  const pendingAmount = Math.max(
    Number(fee.totalAmount || 0) - Number(fee.paidAmount || 0),
    0,
  );

  const summaryCards = [
    {
      label: "Total Fee",
      value: formatCurrency(fee.totalAmount),
      icon: IndianRupee,
      className: "bg-blue-100 text-blue-600",
    },
    {
      label: "Paid",
      value: formatCurrency(fee.paidAmount),
      icon: CheckCircle2,
      className: "bg-green-100 text-green-600",
    },
    {
      label: "Pending",
      value: formatCurrency(pendingAmount),
      icon: Clock3,
      className: "bg-orange-100 text-orange-600",
    },
    {
      label: "Due Date",
      value: formatDate(fee.dueDate),
      icon: CalendarDays,
      className: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Fees</h1>
        <p className="mt-1 text-sm text-slate-500">
          View your hostel fee details and payment history.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map(card => {
          const Icon = card.icon;

          return (
            <div
              key={card.label}
              className="rounded-xl border bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{card.label}</p>

                  <p className="mt-2 text-xl font-bold text-slate-900">
                    {card.value}
                  </p>
                </div>

                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-lg ${card.className}`}
                >
                  <Icon size={21} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border bg-white p-6 shadow-sm lg:col-span-1">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Fee Status</h2>

            <StatusBadge status={fee.status} />
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-4">
              <span className="text-sm text-slate-500">Total Fee</span>
              <span className="font-semibold text-slate-900">
                {formatCurrency(fee.totalAmount)}
              </span>
            </div>

            <div className="flex items-center justify-between border-b pb-4">
              <span className="text-sm text-slate-500">Amount Paid</span>
              <span className="font-semibold text-green-600">
                {formatCurrency(fee.paidAmount)}
              </span>
            </div>

            <div className="flex items-center justify-between border-b pb-4">
              <span className="text-sm text-slate-500">Remaining</span>
              <span className="font-semibold text-orange-600">
                {formatCurrency(pendingAmount)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Due Date</span>
              <span className="font-semibold text-slate-900">
                {formatDate(fee.dueDate)}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Payment History
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Payments recorded by your hostel.
              </p>
            </div>

            <CreditCard size={22} className="text-slate-400" />
          </div>

          {payments.length === 0 ? (
            <div className="py-12 text-center">
              <Receipt size={36} className="mx-auto text-slate-300" />

              <p className="mt-3 text-sm text-slate-500">
                No payments have been recorded yet.
              </p>
            </div>
          ) : (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[520px] text-left">
                <thead>
                  <tr className="border-b text-sm text-slate-500">
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Recorded By</th>
                    <th className="pb-3 font-medium">Note</th>
                  </tr>
                </thead>

                <tbody>
                  {payments.map(payment => (
                    <tr key={payment._id} className="border-b last:border-0">
                      <td className="py-4 text-sm text-slate-700">
                        {formatDate(payment.paymentDate)}
                      </td>

                      <td className="py-4 text-sm font-semibold text-green-600">
                        {formatCurrency(payment.amount)}
                      </td>

                      <td className="py-4 text-sm text-slate-700">
                        {payment.recordedBy?.name || "—"}
                      </td>

                      <td className="max-w-[180px] py-4 text-sm text-slate-500">
                        {payment.note || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentFeesPage;
