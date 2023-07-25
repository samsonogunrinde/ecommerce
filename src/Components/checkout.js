import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import styled  from "styled-components";


const Checkout = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    shippingAddress1: "",
    touched: {
      name: false,
      email: false,
      shippingAddress1: false

    }
  });
    const navigate = useNavigate();
    
    const errors ={
      name: form.name.length === 0,
      email: form.email.length === 0,
      shippingAddress1: form.shippingAddress1.length === 0
    };
    const disabled =  Object.keys(errors).some((x) => errors[x]);

    const handleChange = (ev) => {
      const {name, value} = ev.target;

      setForm((prevState) => {
        return{
          ...prevState,
          [name]: value
        };
      });
    }

    const handleSubmit = ev => {
      if (disabled) {
        ev.preventDefault();
        return;
      }
      navigate('/orderConfirmation');
    };

const handleBlur = (ev) => {
  const {name} = ev.target;

  setForm((prevState) => {
    return{
      ...prevState,
      touched: {...form.touched, [name]: true }
    };
  });
}

const showError = field => errors[field] ? form.touched[field]: false;


    return (
      <form onSubmit={handleSubmit}>
        <CheckoutContainer>
        {/* Row 1 */}
        <CheckoutTitle>Shopping Checkout</CheckoutTitle>

         {/* Row 4 */}
         <CheckoutHeader>
            <h4>Your Details</h4>
            </CheckoutHeader>
             {/* Row 5 */}
             <CheckoutHeaderLine />

              {/* Row 6 */}
              <CheckoutTable>
                <CheckoutFormLabel>Name *</CheckoutFormLabel>
                <CheckoutFormInput
                 type="text"
                  name="name"
                   onChange={handleChange}
                    placeholder="Enter name"
                    invalid={showError("name")}
                    onBlur={handleBlur}
                    />
                <CheckoutFormLabel>Email *</CheckoutFormLabel>
                <CheckoutFormInput
                 type="text" 
                 name="email" 
                 onChange={handleChange} 
                 placeholder="Enter email" 
                 invalid={showError("email")}
                 onBlur={handleBlur}
                 />
                </CheckoutTable>
                 {/* Row 7 */}
                <CheckoutHeader>
                    <h4>Address Details</h4>
                </CheckoutHeader>
                 {/* Row 8 */}
                 <CheckoutHeaderLine />
                  {/* Row 9 */}
                  <CheckoutTable>
                    <CheckoutFormLabel>Copy to shipping</CheckoutFormLabel>
                    <CheckoutFormCheckbox type="checkbox" />
                    <CheckoutFormLabel>Billing Address</CheckoutFormLabel>
                    <CheckoutAddress>
                        <input type="text" name="billingAddress1" />
                        <input type="text" name="billingAddress2" />
                        <input type="text" name="billingCity" />
                    </CheckoutAddress>
                    <CheckoutFormLabel>Shipping Address *</CheckoutFormLabel>
                    <CheckoutAddress>
                        <CheckoutFormInput 
                        type="text" 
                        name="shippingAddress1"  
                        onChange={handleChange} 
                        placeholder="Enter first line"
                        invalid={showError("shippingAddress1")}
                        onBlur={handleBlur}
                        />
                        <input type="text" name="shippingAddress2" />
                        <input type="text" name="shippingCity" />
                    </CheckoutAddress>
                  </CheckoutTable>

                  <CancelButton onClick={() => navigate("/basket")}>
                    Cancel
                  </CancelButton>
                  <CheckoutButton disabled={disabled}>
                    Confirm Order
                  </CheckoutButton>
                  </CheckoutContainer>
              </form>
    
    )
}

export default Checkout;

const CheckoutContainer = styled.div`
display: grid;
padding: 20px;
grid-template-rows: 0.25fr 1fr 0.25fr 0.25fr 0.25fr 0.5fr;
grid-template-columns: 0.1fr 1fr 0.1fr;
`;
const CheckoutTable = styled.div`
grid-column: 1 / span 3;
display: grid;
grid-template-rows: 0.25fr  0.25fr 0.25fr 0.25fr;
grid-template-columns: 0.1fr 0.4fr 0.1fr 0.4fr;
column-gap: 20px;
padding-left: 10px;
`;
const CheckoutHeader = styled.div`
grid-column: 1 / span 3;
padding-top: 20px;
`;
const CheckoutHeaderLine = styled.hr`
grid-column: 1 / span 3;
margin-bottom: 20px;
border: 1px solid gray;
`;
const CheckoutTitle = styled.h2`
grid-column: 1 / span 2;
padding-bottom: 20px;
`;
const CheckoutAddress = styled.div`
display: grid;
grid-template-rows: 0.25fr 0.25fr 0.25fr 0.25fr;
grid-template-columns: 1fr;
grid-row-gap: 10px;
`;
const CheckoutFormLabel = styled.label`
justify-self: end;
`;

const CheckoutFormInput = styled.input`
${(props) => props.invalid &&
`
border-width: 3px;
border-color: red;
`
};
border-style: solid;
`;

const CheckoutFormCheckbox = styled.input`
grid-column: 2 / span 3;
justify-self: start;
margin-bottom: 20px;
`;


const CheckoutButton = styled.button`
border-radius: 8px;
height: 40px;
grid-column: 3;
`;
const CancelButton = styled.button`
border-radius: 8px;
height: 40px;
grid-column: 1;
`;