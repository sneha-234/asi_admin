import LoginLeftPanel from "../components/LoginLeftPanel";
import LoginForm from "../components/LoginForm";
import "./Login.css";

export default function Login() {
  return (
    <div className="min-h-screen flex">
      <LoginLeftPanel />
      <LoginForm />
    </div>
  );
  
}