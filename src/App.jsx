import React, { useState } from "react";
function chekout(data) {
  var options = {
    key: "rzp_test_l8SB435a25MxdM", // Enter the Key ID generated from the Dashboard
    amount: Number(data.amount), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: data.currency,
    name: "endless",
    description: "Test Transaction",

    order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    handler: async function (response) {
      console.log(response);
      let re = await fetch("https://lastfinal-tx2h.onrender.com/verify", {
        method: "post",
        body: JSON.stringify({ response }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      re = await re.json();
      if (re.status == 210) {
        alert("payment sucessful");
      } else {
        alert("payment unsucessful");
      }
    },
  };
  const rzp = new window.Razorpay(options);
  rzp.open();
}
async function bu(dd) {
  let re = await fetch("https://lastfinal-tx2h.onrender.com/orders", {
    method: "post",
    body: JSON.stringify({ dd }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  re = await re.json();
  chekout(re.order);
  // fu();
}
function App() {
  const [paymentId, setPaymentId] = useState("");
  const [refundAmount, setRefundAmount] = useState("");

  const handleRefund = () => {
    fetch(`https://lastfinal-tx2h.onrender.com/refund/${paymentId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refundAmount }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // handle success case
      })
      .catch((error) => {
        console.error(error);
        // handle error case
      });
  };
  return (
    <div>
      <h1>the product price 20 rupees</h1>
      <button
        className="btn btn-outline-success"
        style={{
          border: " solid gray 0.5px",
          width: "13rem",

          fontSize: "1.3rem",
          fontWeight: "700",

          position: "absolute",
          top: "53rem",
          left: "25rem",
          padding: "1rem",
        }}
        onClick={() => bu(20)}
      >
        Buy Now
      </button>
      <div>
        <label>
          Payment ID:
          <input
            type="text"
            value={paymentId}
            onChange={(e) => setPaymentId(e.target.value)}
          />
        </label>

        <br />
        <label>
          Refund Amount (in rupees):
          <input
            type="number"
            value={refundAmount}
            onChange={(e) => setRefundAmount(e.target.value)}
          />
        </label>
        <br />
        <button onClick={handleRefund}>Initiate Refund</button>
      </div>
    </div>
  );
}

export default App;
