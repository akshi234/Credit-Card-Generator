import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // for error msg
  const [CardHolderError, setCardHolderError] = useState("");
  const [cardNumberError, setCardNumberError] = useState("");
  const [ExpiryDateError, setExpiryDateError] = useState("");
  const [CardCvcError, setCardCvcError] = useState("");

  const [displayedCvc, setDisplayCvc] = useState("");
  const [showActualValues, setShowActualValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let hasErrors = false;

    //  cardholder
    if (!name.trim()) {
      setCardHolderError("Cardholder name is required.");
      hasErrors = true;
    } else {
      setCardHolderError("");
    }

    // cardnumber

    if (cardNumber.length !== 19) {
      setCardNumberError(
        "Invalid card number. Please enter a 16-digit card number."
      );
      hasErrors = true;
    } else {
      setCardNumberError("");
    }

    // expirydate
    const currentYear = new Date().getFullYear() % 100; // Get the last 2 digits of the current year
    const inputMonth = parseInt(month, 10);
    const inputYear = parseInt(year, 10);
    if (
      isNaN(inputMonth) ||
      isNaN(inputYear) ||
      inputMonth < 1 ||
      inputMonth > 12 ||
      inputYear < currentYear ||
      inputYear > currentYear + 20
    ) {
      setExpiryDateError("Invalid expiry date.");
      hasErrors = true;
    } else {
      setExpiryDateError("");
    }

    // cardCvc

    if (cvc.length !== 3) {
      setCardCvcError("CVC must be 3-digit");
      hasErrors = true;
    } else {
      setCardCvcError("");

      setDisplayCvc(cvc);
    }
    if (!hasErrors) {
      toast.success("Card Updated Successfully !!!");
      setShowActualValue(true);
    } else {
      toast.error("Enter Correct Input!!", { theme: "colored" });
    }

    setIsSubmitted(true);
  };

  return (
    <>
      <section className="background">
        <div className="main">
          <div>
            <div className="frontpage-card">
              <div className="blur">
                <div className="orange"></div>
                <div className="purple"></div>
                <div className="purple2"></div>
                <div className="aqua"></div>
                <div className="pink"></div>
                <div className="pinkk"></div>
              </div>

              <div className="circle"></div>
              <div className="circle-1"></div>

              {isSubmitted &&
                !CardHolderError &&
                !cardNumberError &&
                !ExpiryDateError &&
                !CardCvcError && (
                  <>
                    <h2 className="front">{cardNumber}</h2>

                    <ul className="content">
                      <li className="name">{name}</li>
                      <li className="digit">{month}</li>
                      <li className="slash">/</li>
                      <li className="digit1">{year}</li>
                    </ul>
                  </>
                )}

              {(!showActualValues || !isSubmitted) && (
                <>
                  <h2 className="front">0000 0000 0000 0000</h2>
                  <ul className="content">
                    <li className="name">Jane Applessed</li>
                    <li className="digit">00</li>
                    <li className="slash">/</li>
                    <li className="digit1">00</li>
                  </ul>
                </>
              )}
            </div>

            <div className="backpage-card">
              <div className="upr"></div>
              <div className="uprr"></div>
              <input type="number" id="back" placeholder="CVC" />
              {(!showActualValues || isSubmitted) &&
                !CardHolderError &&
                !cardNumberError &&
                !ExpiryDateError &&
                !CardCvcError && (
                  <input
                    type="number"
                    id="back"
                    placeholder="CVC"
                    value={displayedCvc}
                  />
                )}

              <div className="lines">
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
                <div className="line4"></div>
                <div className="line5"></div>
                <div className="line6"></div>
                <div className="line7"></div>
                <div className="line8"></div>
                <div className="line9"></div>
                <div className="line10"></div>
                <div className="line11"></div>
                <div className="line12"></div>
              </div>
            </div>
          </div>

          <div className="form">
            <form className="container" onSubmit={handleSubmit}>
              {/*-----------  forcardholder -----------*/}
              <div>
                <label htmlFor="cardholder-name">Cardholder Name</label>
                <input
                  type="text"
                  name="cardholder-name"
                  id="cardholder-name"
                  placeholder="e.g. Jane Applessed"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {CardHolderError && (
                  <p className="error-cardmessage">{CardHolderError}</p>
                )}
              </div>

              {/*----------  for card-no------------ */}
              <div>
                <label htmlFor="card-no">Card Number</label>
                <input
                  type="text"
                  name="card-no"
                  id="card-no"
                  placeholder="e.g. 1234 5678 9012 3456"
                  maxLength={19}
                  value={cardNumber
                    .replace(/\s/g, "")
                    .replace(/(\d{4})/g, "$1 ")
                    .trim()}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
                {cardNumberError && (
                  <p className="error-cardmessage">{cardNumberError}</p>
                )}
              </div>
              {/* ----------for expiry-date--------- */}

              <div className="expiry-cvc-container">
                <div className="child1">
                  <div className="datee">
                    <label htmlFor="expiry-date">Exp. Date(MM/YY)</label>
                    <input
                      name="month"
                      id="expiry-month"
                      placeholder="MM"
                      maxLength={2}
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                    />

                    <input
                      name="year"
                      id="expiry-year"
                      placeholder="YY"
                      maxLength={4}
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                    />

                    {ExpiryDateError && (
                      <p className="error-cardmessage">{ExpiryDateError}</p>
                    )}
                  </div>
                </div>

                {/* -----------for cvc---------- */}
                <div className="child2">
                  <label htmlFor="cvc">CVC</label>
                  <input
                    type="number"
                    name="cvc"
                    id="cvc"
                    placeholder="e.g. 123"
                    maxLength={3}
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                  />
                  {CardCvcError && (
                    <p className="error-cardmessage">{CardCvcError}</p>
                  )}
                </div>
              </div>

              {/* ---------for submitbuttom---------- */}

              <button type="submit"> Confirm</button>
              {/* <ToastContainer /> */}
            </form>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
}
