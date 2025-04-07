import { Link } from 'react-router-dom';

function ForgotPasswordLink() {
  return (
    <div className="forgot-password-link">
      <Link to="/forgot-password">Forgot password?</Link>
    </div>
  );
}

export default ForgotPasswordLink;