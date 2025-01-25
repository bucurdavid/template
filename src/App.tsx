import React, { useState, useEffect } from "react";
import "./App.css";

const App: React.FC = () => {
  const [days, setDays] = useState<string>("--");
  const [hours, setHours] = useState<string>("--");
  const [minutes, setMinutes] = useState<string>("--");
  const [seconds, setSeconds] = useState<string>("--");
  const [contact, setContact] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [result, setResult] = useState<string>("");

  // Countdown logic for February 1, 2025
  useEffect(() => {
    const targetDate = new Date("February 1, 2025 00:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const timeLeft = targetDate - now;

      if (timeLeft > 0) {
        const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
          .toString()
          .padStart(2, "0");
        const hoursLeft = Math.floor(
          (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        )
          .toString()
          .padStart(2, "0");
        const minutesLeft = Math.floor(
          (timeLeft % (1000 * 60 * 60)) / (1000 * 60)
        )
          .toString()
          .padStart(2, "0");
        const secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000)
          .toString()
          .padStart(2, "0");

        setDays(daysLeft);
        setHours(hoursLeft);
        setMinutes(minutesLeft);
        setSeconds(secondsLeft);
      } else {
        clearInterval(timer);
        setDays("00");
        setHours("00");
        setMinutes("00");
        setSeconds("00");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hasSubmitted = localStorage.getItem("hasSubmitted");
    if (hasSubmitted) {
      setIsSubmitted(true);
    }
  }, []);

  // Handle form submission
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (localStorage.getItem("hasSubmitted")) {
      setResult("You've already registered!");
      return;
    }

    setIsLoading(true);
    setResult("Sending....");

    const formData = new FormData(event.target as HTMLFormElement);
    formData.append("access_key", import.meta.env.VITE_ACCESS_KEY);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully");
        setIsSubmitted(true);
        setContact("");
        localStorage.setItem("hasSubmitted", "true");
        (event.target as HTMLFormElement).reset();
      } else {
        setResult(data.message);
        console.error("Error:", data);
      }
    } catch (error) {
      setResult("An error occurred. Please try again.");
      console.error("Submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="crt-screen">
      <div className="terminal">
        <div className="ascii-art">
          {`          
          ███╗   ███╗███████╗███╗   ███╗███████╗████████╗██╗██████╗ 
          ████╗ ████║██╔════╝████╗ ████║██╔════╝╚══██╔══╝██║██╔══██╗
          ██╔████╔██║█████╗  ██╔████╔██║█████╗     ██║   ██║██████╔╝
          ██║╚██╔╝██║██╔══╝  ██║╚██╔╝██║██╔══╝     ██║   ██║██╔═══╝ 
          ██║ ╚═╝ ██║███████╗██║ ╚═╝ ██║███████╗   ██║   ██║██║     
          ╚═╝     ╚═╝╚══════╝╕╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝╚═╝     
          `}
        </div>

        <div className="glitch-text" data-text="LAUNCH INITIALIZATION">
          LAUNCH INITIALIZATION
        </div>

        <div className="countdown">
          <span className="blink">{days}</span>:
          <span className="blink">{hours}</span>:
          <span className="blink">{minutes}</span>:
          <span className="blink">{seconds}</span>
        </div>

        {/* How It Works Section */}
        <div className="how-it-works">
          <div className="matrix-text">
            &gt; HOW IT WORKS:
            <br />
            &gt; - LAUNCH YOUR MEME: Anyone can launch a meme coin with 1B
            supply.
            <br />
            &gt; - TIP TO SUPPORT: Users tip SOL to buy tokens at a fixed price.
            <br />
            &gt; - 1HR COUNTDOWN: Meme has 1 hour to raise funds.
            <br />
            &gt; - SUCCESS? Raydium LP is created with 300M tokens + raised SOL.
            <br />
            &gt; - FAIL? All SOL is refunded instantly.
            <br />
            &gt; - NO RUG PULLS: Transparent, on-chain mechanics.
            <br />
          </div>
        </div>

        <div className="matrix-text">
          &gt; MEMETIP PROTOCOL LOADED...
          <br />
          &gt; TOKEN SUPPLY: 1B [700M SALE / 300M LP]
          <br />
          &gt; FLOOR PRICE: 0.0000003 SOL
          <br />
          &gt; FAILSAFE: 1HR REFUND WINDOW
          <br />
          &gt; RAYDIUM LP
          <br />
          &gt; ANTI-RUG PULL MECHANISM: [ACTIVE]
          <br />
        </div>

        {/* Alpha Registration Section */}
        <div className="alpha-section">
          <div className="matrix-text">
            &gt; ALPHA OG ACCESS: [REGISTRY OPEN]
            <br />
            &gt; STATUS: ACCEPTING EARLY TIPPERS
            <br />
          </div>

          {!isSubmitted ? (
            <form onSubmit={onSubmit} className="email-form">
              <input
                type="hidden"
                name="access_key"
                value={import.meta.env.VITE_ACCESS_KEY}
              />
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                style={{ display: "none" }}
              />
              <div className="input-line">
                <span className="prompt">&gt;</span>
                <input
                  type="text"
                  name="contact"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="ENTER EMAIL OR TELEGRAM HANDLE"
                  required
                  className="email-input"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className="submit-button"
                  disabled={isLoading}
                >
                  {isLoading ? "SUBMITTING..." : "ACCESS[>]"}
                </button>
              </div>
            </form>
          ) : (
            <div className="success-message">
              &gt; ACCESS GRANTED. WE'LL CONTACT YOU SOON.
            </div>
          )}
          <span className="result-message">{result}</span>
        </div>

        <div className="input-line">
          <span className="prompt">&gt;</span>
          <span className="cursor">█</span>
        </div>
      </div>
    </div>
  );
};

export default App;
