export const loadPaystackScript = () => {
  return new Promise((resolve) => {
    if (document.getElementById("paystack-script")) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.id = "paystack-script";
    script.src = "https://js.paystack.co/v1/inline.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};
