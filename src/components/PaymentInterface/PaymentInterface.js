export const initializePayment = (amount, email, reference, setModalContent, setIsModalOpen) => {
  const Paystack = window.PaystackPop;

  const handler = Paystack.setup({
    key: "pk_test_cc2438a831ee7ddc890b4e4d6d782c8b5a4d1538", // Replace with your Paystack public key
    email: email,
    amount: amount * 100, // Convert to kobo
    reference: reference,
    callback: (response) => {
      // On payment success, update modal state
      setModalContent({
        title: "Payment Successful",
        message: `Transaction ID: ${response.reference}`,
      });
      setIsModalOpen(true);
    },
    onClose: () => {
      alert("Payment process was canceled.");
    },
  });

  handler.openIframe();
};
