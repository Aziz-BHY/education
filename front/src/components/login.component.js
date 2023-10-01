import React from "react";
import { useCookies } from "react-cookie";
import { useState } from "react";
import axios from "axios";
export default function Login() {
  const [cookies, setCookie] = useCookies(["education"]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (cookies.education) {
    window.location.href = "/";
  }

  const login = async () => {
    const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth`, {
      email,
      password,
    });
    if (res.data.message == "success") {
      setCookie("education", res.data.data, { path: "/" });
      window.location.href = "/";
    }
  };
  return (
    <div
      className="page-wrapper"
      id="main-wrapper"
      data-layout="vertical"
      data-navbarbg="skin6"
      data-sidebartype="full"
      data-sidebar-position="fixed"
      data-header-position="fixed"
    >
      <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
        <div className="d-flex align-items-center justify-content-center w-100">
          <div className="row justify-content-center w-100">
            <div className="col-md-8 col-lg-6 col-xxl-3">
              <div className="card mb-0">
                <div className="card-body">
                  <a
                    href="./index.html"
                    className="text-nowrap logo-img text-center d-block py-3 w-100"
                  >
                    <h2>Einstein Academy</h2>
                  </a>
                  <form>
                    <div className="mb-3">
                      <label for="exampleInputEmail1" className="form-label">
                        E-mail
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label for="exampleInputPassword1" className="form-label">
                        Mot de passe
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <a
                      className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2"
                      onClick={login}
                    >
                      Se connecter
                    </a>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
