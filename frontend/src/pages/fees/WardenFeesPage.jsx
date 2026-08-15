import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  IndianRupee,
  Pencil,
  Receipt,
  Search,
  X,
} from "lucide-react";

import {
  getFees,
  setStudentFee,
  setFeeForAllStudents,
  recordPayment,
  getPaymentHistory,
} from "../../services/feeService";

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
      label: "Partial",
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

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function WardenFeesPage() {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [showAllFeeModal, setShowAllFeeModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const [selectedFee, setSelectedFee] = useState(null);

  const [allFeeForm, setAllFeeForm] = useState({
    totalAmount: "",
    dueDate: "",
  });

  const [editForm, setEditForm] = useState({
    totalAmount: "",
    dueDate: "",
  });

  const [paymentForm, setPaymentForm] = useState({
    amount: "",
    paymentDate: new Date().toISOString().split("T")[0],
    note: "",
  });

  const [paymentHistory, setPaymentHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const [toast, setToast] = useState(null);

  const loadFees = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getFees();

      setFees(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load fee records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;

    const fetchFees = async () => {
      try {
        const data = await getFees();

        if (!ignore) {
          setFees(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (!ignore) {
          setError(
            err.response?.data?.message || "Failed to load fee records.",
          );
        }
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

  const showSuccess = message => {
    setSuccess(message);

    setTimeout(() => {
      setSuccess("");
    }, 3000);
  };

  const showToast = (message, type = "error") => {
    setToast({
      message,
      type,
    });

    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const closeAllFeeModal = () => {
    if (submitting) return;

    setShowAllFeeModal(false);

    setAllFeeForm({
      totalAmount: "",
      dueDate: "",
    });
  };

  const closeEditModal = () => {
    if (submitting) return;

    setShowEditModal(false);
    setSelectedFee(null);

    setEditForm({
      totalAmount: "",
      dueDate: "",
    });
  };

  const closePaymentModal = () => {
    if (submitting) return;

    setShowPaymentModal(false);
    setSelectedFee(null);

    setPaymentForm({
      amount: "",
      paymentDate: new Date().toISOString().split("T")[0],
      note: "",
    });
  };

  const openEditModal = fee => {
    setSelectedFee(fee);

    setEditForm({
      totalAmount: fee.totalAmount ?? "",
      dueDate: fee.dueDate
        ? new Date(fee.dueDate).toISOString().split("T")[0]
        : "",
    });

    setError("");
    setShowEditModal(true);
  };

  const openPaymentModal = fee => {
    setSelectedFee(fee);

    setPaymentForm({
      amount: "",
      paymentDate: new Date().toISOString().split("T")[0],
      note: "",
    });

    setError("");
    setShowPaymentModal(true);
  };

  const openHistoryModal = async fee => {
    setSelectedFee(fee);
    setPaymentHistory([]);
    setHistoryLoading(true);
    setError("");
    setShowHistoryModal(true);

    try {
      const data = await getPaymentHistory(fee._id);

      setPaymentHistory(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load payment history.",
      );
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleSetFeeForAll = async event => {
    event.preventDefault();

    try {
      setSubmitting(true);
      setError("");

      if (allFeeForm.totalAmount === "" || !allFeeForm.dueDate) {
        setError("Fee amount and due date are required.");
        return;
      }

      const response = await setFeeForAllStudents(allFeeForm);

      const result = response?.data;

      closeAllFeeModal();

      await loadFees();

      showSuccess(
        `Fee applied successfully. Created: ${
          result?.created || 0
        }, Updated: ${result?.updated || 0}, Skipped: ${result?.skipped || 0}.`,
      );
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to apply fee to all students.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditFee = async event => {
    event.preventDefault();

    if (!selectedFee) return;

    try {
      setSubmitting(true);
      setError("");

      if (editForm.totalAmount === "" || !editForm.dueDate) {
        setError("Fee amount and due date are required.");
        return;
      }

      await setStudentFee(selectedFee.student._id, editForm);

      closeEditModal();

      await loadFees();

      showSuccess("Student fee updated successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update student fee.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRecordPayment = async event => {
    event.preventDefault();

    if (!selectedFee) return;

    try {
      setSubmitting(true);
      setError("");

      if (paymentForm.amount === "" || Number(paymentForm.amount) <= 0) {
        setError("Payment amount must be greater than zero.");
        return;
      }

      await recordPayment(selectedFee._id, paymentForm);

      closePaymentModal();

      await loadFees();

      showSuccess("Payment recorded successfully.");
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to record payment.";

      setShowPaymentModal(false);
      setSelectedFee(null);

      showToast(message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredFees = fees.filter(fee => {
    const student = fee.student || {};

    const searchText = search.toLowerCase();

    const matchesSearch =
      !search ||
      student.name?.toLowerCase().includes(searchText) ||
      student.enrollmentNumber?.toLowerCase().includes(searchText);

    const matchesStatus = !statusFilter || fee.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalStudents = fees.length;

  const paidCount = fees.filter(fee => fee.status === "paid").length;

  const partialCount = fees.filter(fee => fee.status === "partial").length;

  const pendingCount = fees.filter(fee => fee.status === "pending").length;

  const totalCollected = fees.reduce(
    (sum, fee) => sum + Number(fee.paidAmount || 0),
    0,
  );

  const totalPending = fees.reduce(
    (sum, fee) =>
      sum +
      Math.max(Number(fee.totalAmount || 0) - Number(fee.paidAmount || 0), 0),
    0,
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Fees</h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage hostel fees and student payments.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setError("");
            setShowAllFeeModal(true);
          }}
          className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Set Fee for All Students
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          <CheckCircle2 size={18} />
          {success}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Students</p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {totalStudents}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Paid</p>

          <p className="mt-2 text-2xl font-bold text-green-600">{paidCount}</p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Partial</p>

          <p className="mt-2 text-2xl font-bold text-yellow-600">
            {partialCount}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Pending</p>

          <p className="mt-2 text-2xl font-bold text-red-600">{pendingCount}</p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Collected</p>

          <p className="mt-2 text-2xl font-bold text-blue-600">
            {formatCurrency(totalCollected)}
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
              <IndianRupee size={20} />
            </div>

            <div>
              <p className="text-sm text-slate-500">Total Collected</p>

              <p className="text-lg font-semibold text-slate-900">
                {formatCurrency(totalCollected)}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
              <Clock3 size={20} />
            </div>

            <div>
              <p className="text-sm text-slate-500">Total Pending</p>

              <p className="text-lg font-semibold text-slate-900">
                {formatCurrency(totalPending)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b p-4 sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={event => setSearch(event.target.value)}
              placeholder="Search student or enrollment number..."
              className="w-full rounded-lg border py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <select
            value={statusFilter}
            onChange={event => setStatusFilter(event.target.value)}
            className="rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-blue-500"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="partial">Partial</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        {loading ? (
          <div className="p-10 text-center text-sm text-slate-500">
            Loading fee records...
          </div>
        ) : filteredFees.length === 0 ? (
          <div className="p-10 text-center">
            <Receipt size={40} className="mx-auto text-slate-300" />

            <p className="mt-3 text-sm text-slate-500">No fee records found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left">
              <thead>
                <tr className="border-b bg-slate-50 text-sm text-slate-500">
                  <th className="px-4 py-3 font-medium">Student</th>

                  <th className="px-4 py-3 font-medium">Enrollment</th>

                  <th className="px-4 py-3 font-medium">Total</th>

                  <th className="px-4 py-3 font-medium">Paid</th>

                  <th className="px-4 py-3 font-medium">Pending</th>

                  <th className="px-4 py-3 font-medium">Due Date</th>

                  <th className="px-4 py-3 font-medium">Status</th>

                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredFees.map(fee => {
                  const pendingAmount = Math.max(
                    Number(fee.totalAmount || 0) - Number(fee.paidAmount || 0),
                    0,
                  );

                  return (
                    <tr
                      key={fee._id}
                      className="border-b last:border-0 hover:bg-slate-50"
                    >
                      <td className="px-4 py-4">
                        <div className="font-medium text-slate-900">
                          {fee.student?.name || "—"}
                        </div>

                        <div className="text-xs text-slate-500">
                          {fee.student?.email || ""}
                        </div>
                      </td>

                      <td className="px-4 py-4 text-sm text-slate-700">
                        {fee.student?.enrollmentNumber || "—"}
                      </td>

                      <td className="px-4 py-4 text-sm font-semibold text-slate-900">
                        {formatCurrency(fee.totalAmount)}
                      </td>

                      <td className="px-4 py-4 text-sm font-semibold text-green-600">
                        {formatCurrency(fee.paidAmount)}
                      </td>

                      <td className="px-4 py-4 text-sm font-semibold text-orange-600">
                        {formatCurrency(pendingAmount)}
                      </td>

                      <td className="px-4 py-4 text-sm text-slate-700">
                        {formatDate(fee.dueDate)}
                      </td>

                      <td className="px-4 py-4">
                        <StatusBadge status={fee.status} />
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => openEditModal(fee)}
                            title="Edit fee"
                            className="rounded-lg border p-2 text-slate-600 transition hover:bg-slate-100 hover:text-blue-600"
                          >
                            <Pencil size={17} />
                          </button>

                          <button
                            type="button"
                            onClick={() => openPaymentModal(fee)}
                            disabled={pendingAmount <= 0}
                            title="Record payment"
                            className="rounded-lg border p-2 text-slate-600 transition hover:bg-slate-100 hover:text-green-600 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <IndianRupee size={17} />
                          </button>

                          <button
                            type="button"
                            onClick={() => openHistoryModal(fee)}
                            title="Payment history"
                            className="rounded-lg border p-2 text-slate-600 transition hover:bg-slate-100 hover:text-purple-600"
                          >
                            <Receipt size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showAllFeeModal && (
        <Modal
          title="Set Fee for All Active Students"
          onClose={closeAllFeeModal}
        >
          <form onSubmit={handleSetFeeForAll} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Total Fee
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={allFeeForm.totalAmount}
                onChange={event =>
                  setAllFeeForm({
                    ...allFeeForm,
                    totalAmount: event.target.value,
                  })
                }
                placeholder="Enter total fee"
                className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Due Date
              </label>

              <input
                type="date"
                value={allFeeForm.dueDate}
                onChange={event =>
                  setAllFeeForm({
                    ...allFeeForm,
                    dueDate: event.target.value,
                  })
                }
                className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={closeAllFeeModal}
                className="rounded-lg border px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {submitting ? "Saving..." : "Apply Fee"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {showEditModal && selectedFee && (
        <Modal
          title={`Edit Fee — ${selectedFee.student?.name || "Student"}`}
          onClose={closeEditModal}
        >
          <form onSubmit={handleEditFee} className="space-y-5">
            <div className="rounded-lg bg-slate-50 p-4 text-sm">
              <p className="text-slate-500">Already Paid</p>

              <p className="mt-1 font-semibold text-green-600">
                {formatCurrency(selectedFee.paidAmount)}
              </p>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Total Fee
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={editForm.totalAmount}
                onChange={event =>
                  setEditForm({
                    ...editForm,
                    totalAmount: event.target.value,
                  })
                }
                className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Due Date
              </label>

              <input
                type="date"
                value={editForm.dueDate}
                onChange={event =>
                  setEditForm({
                    ...editForm,
                    dueDate: event.target.value,
                  })
                }
                className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <p className="text-xs text-slate-500">
              The total fee cannot be reduced below the amount already paid.
            </p>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={closeEditModal}
                className="rounded-lg border px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {submitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {showPaymentModal && selectedFee && (
        <Modal
          title={`Record Payment — ${selectedFee.student?.name || "Student"}`}
          onClose={closePaymentModal}
        >
          <form onSubmit={handleRecordPayment} className="space-y-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Total Fee</p>

                <p className="mt-1 font-semibold text-slate-900">
                  {formatCurrency(selectedFee.totalAmount)}
                </p>
              </div>

              <div className="rounded-lg bg-orange-50 p-4">
                <p className="text-xs text-orange-600">Remaining</p>

                <p className="mt-1 font-semibold text-orange-700">
                  {formatCurrency(
                    Number(selectedFee.totalAmount || 0) -
                      Number(selectedFee.paidAmount || 0),
                  )}
                </p>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Payment Amount
              </label>

              <input
                type="number"
                min="1"
                step="0.01"
                value={paymentForm.amount}
                onChange={event =>
                  setPaymentForm({
                    ...paymentForm,
                    amount: event.target.value,
                  })
                }
                placeholder="Enter payment amount"
                className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Payment Date
              </label>

              <input
                type="date"
                value={paymentForm.paymentDate}
                onChange={event =>
                  setPaymentForm({
                    ...paymentForm,
                    paymentDate: event.target.value,
                  })
                }
                className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Note
              </label>

              <textarea
                rows="3"
                value={paymentForm.note}
                onChange={event =>
                  setPaymentForm({
                    ...paymentForm,
                    note: event.target.value,
                  })
                }
                placeholder="Optional payment note"
                className="w-full resize-none rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={closePaymentModal}
                className="rounded-lg border px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
              >
                {submitting ? "Recording..." : "Record Payment"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {showHistoryModal && selectedFee && (
        <Modal
          title={`Payment History — ${selectedFee.student?.name || "Student"}`}
          onClose={() => {
            if (!historyLoading) {
              setShowHistoryModal(false);
              setSelectedFee(null);
            }
          }}
        >
          {historyLoading ? (
            <div className="py-10 text-center text-sm text-slate-500">
              Loading payment history...
            </div>
          ) : paymentHistory.length === 0 ? (
            <div className="py-10 text-center">
              <Receipt size={40} className="mx-auto text-slate-300" />

              <p className="mt-3 text-sm text-slate-500">
                No payments recorded yet.
              </p>
            </div>
          ) : (
            <div className="max-h-[420px] overflow-y-auto">
              <div className="space-y-3">
                {paymentHistory.map(payment => (
                  <div key={payment._id} className="rounded-lg border p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-green-600">
                          {formatCurrency(payment.amount)}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {formatDate(payment.paymentDate)}
                        </p>
                      </div>

                      <span className="text-xs text-slate-500">
                        {payment.recordedBy?.name || "—"}
                      </span>
                    </div>

                    {payment.note && (
                      <p className="mt-3 border-t pt-3 text-sm text-slate-600">
                        {payment.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </Modal>
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 z-[100] w-[calc(100%-3rem)] max-w-sm rounded-xl border border-red-200 bg-white p-4 shadow-xl">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
              <X size={17} strokeWidth={2.5} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-red-800">
                Action Failed
              </p>

              <p className="mt-1 text-sm leading-5 text-slate-600">
                {toast.message}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setToast(null)}
              className="shrink-0 rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              aria-label="Close notification"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default WardenFeesPage;
