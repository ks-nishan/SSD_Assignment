
import { useState} from "react";
import StripeCheckout from "react-stripe-checkout";
import Map from "./m_delivary";
import img from "../assets/m_img9.jpg";


function Pay() {
  const [ amount, setAmount ] = useState(0);

  const handleToken = (token) => {
    fetch("/payment/donate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, amount }),
    })
    .then(res => res.json())
    .then(_ => {
      window.alert("Transaction Successful.");
    }).catch(_ => window.alert("Transaction Successful."))
  }

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
  };
  
  return (
    <div>
      
<div class="container">
  <div class="row ">
    <div class="col-sm-8 ">
    <Map/>
    </div>
   
    <div class="col-sm-4">
    

    <div className="container " style={{ padding: "50px" }} >
    
    <img src={img} width="500px" height="850px"></img>

    <StripeCheckout 
          stripeKey={process.env.REACT_APP_STRIPE_KEY || ""}
          token={handleToken}
          name=""
          panelLabel={`Pay`}
          currency="USD"
          amount={amount * 100}
      >
       <center>
                  <button
                    class="btn btn-primary"
                    type="submit"
                    variant="contained"
                    style={{width:"100px"}}
                    
                  >
                    Pay Now <i class="fa fa-credit-card"></i>
                  </button>
                </center>
      </StripeCheckout>
    
      
</div>
    </div>
  </div>
  </div>
    
   
   
</div>
  );
}

export default Pay;