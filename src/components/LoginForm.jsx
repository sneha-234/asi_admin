import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginForm() {

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const navigate =
    useNavigate();

  const handleLogin =
    async (e) => {

      e.preventDefault();

      setError("");

      try {

        setLoading(true);

        const res =
          await axios.post(
            "https://asi-admin-4.onrender.com/api/auth/login",
            {
              username,
              password
            }
          );

        localStorage.setItem(
          "token",
          res.data.token
        );

        localStorage.setItem(
          "username",
          res.data.username
        );

        navigate(
          "/dashboard"
        );

      } catch (err) {

        setError(

          err.response?.data
            ?.message ||

          "Login Failed"

        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="right">

      <div className="login-box">

        <div className="login-eyebrow">
          ADMIN ACCESS
        </div>

        <div className="login-title">
          SIGN IN
        </div>

        <div className="login-desc">
          Enter your credentials
        </div>

        {error && (

          <div
            style={{
              background:
                "#fee2e2",
              color:
                "#b91c1c",
              padding:
                "12px",
              borderRadius:
                "8px",
              marginBottom:
                "15px"
            }}
          >
            {error}
          </div>

        )}

        <form
          onSubmit={
            handleLogin
          }
        >

          <div className="field">

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e)=>
                setUsername(
                  e.target.value
                )
              }
              required
            />

          </div>

          <div className="field">

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e)=>
                setPassword(
                  e.target.value
                )
              }
              required
            />

          </div>

          <button
            type="submit"
            className="btn-login"
            disabled={loading}
          >

            {loading
              ? "Please Wait..."
              : "LOGIN"}

          </button>

        </form>

      </div>

    </div>

  );

}