const Faq = [
  {
    id: 1,
    question: "How can I add plants to my account?",
    answer: (
      <div style={{ fontSize: "16px", lineHeight: "1.4" }}>
        To add plants to your account, follow these steps:
        <br />
        <br />
        <ul style={{ listStyleType: "disc", marginLeft: "20px" }}>
          <li>Click on the Add Plants option.</li>
          <li>Then, select the Link Plant button.</li>
          <li>Enter the unique ID found on the plant pot.</li>
          <li>We will send a confirmation code to your email.</li>
          <li>
            Enter the code, and the plant will be successfully added to your
            account.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 2,
    question: "How can I reset my password?",
    answer: (
      <div style={{ fontSize: "16px", lineHeight: "1.4" }}>
        To reset your password, please follow these steps:
        <br />
        <br />
        <ol style={{ listStyleType: "decimal", marginLeft: "20px" }}>
          <li>Go to the login page of our website or app.</li>
          <li>Click on the 'Forgot Password?' or 'Reset Password' link.</li>
          <li>Enter your email address associated with your account.</li>
          <li>
            You will receive an email with instructions on how to reset your
            password.
          </li>
          <li>
            Follow the instructions in the email to create a new password for
            your account.
          </li>
        </ol>
      </div>
    ),
  },
];

export default Faq;
