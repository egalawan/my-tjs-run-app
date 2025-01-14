import Head from "next/head";
// React-y Things
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
// External Components
import { NavBar, TJNavBar, Footer } from "../components/headersfooter";
import { SignInUpContainer } from "./login";
// Bootstrap
import dynamic from "next/dynamic";
const Container = dynamic(() => import("react-bootstrap/Container"), {
  ssr: false,
});
const Row = dynamic(() => import("react-bootstrap/Row"), { ssr: false });
const Col = dynamic(() => import("react-bootstrap/Col"), { ssr: false });
const Button = dynamic(() => import("react-bootstrap/Button"), { ssr: false });

// Styling and Icons
import styles from "../styles/Home.module.css";
import Fade from "react-reveal/fade";

// AccountDetails Component
function AccountDetails(props) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    user: {},
    loggedIn: false,
  });

  const updateNameNumber = (event) => {};

  const deleteAccount = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    fetch(`/api/user/${user.user_id}/delete`, {
      method: "POST",
      body: data,
    }).then((response) => {
      console.log(response);
      if (response.status !== 200) {
        alert("Delete Account Failed. Password incorrect.");
        return;
      }
      response.json().then((data) => {
        alert(`${data[0].message}!`);
        router.push("/");
      });
    });
  };

  const user = props.user;
  console.log("This is my user:", user);

  return (
    <Col className="col-12 col-md-6 p-4 bg-light border-right border-bottom rounded-left">
      <h2>Your Information (UNDER CONSTRUCTION, SORRY)</h2>

      <form onSubmit={updateNameNumber}>
        <Row className="my-4">
          <Col className="col-12 mt-2">
            <label htmlFor="fname">First Name:</label>
          </Col>
          <Col className="col-12">
            <input
              type="text"
              name="fname"
              id="fname"
              placeholder={user.fname}
              minLength="2"
              maxLength="40"
              autoFocus
            />
          </Col>
          <Col className="col-12 mt-2">
            <label htmlFor="lname">Last Name:</label>
          </Col>
          <Col className="col-12">
            <input
              type="text"
              name="lname"
              id="lname"
              placeholder={user.lname}
              minLength="2"
              maxLength="40"
              className="w-100"
            />
          </Col>
          <Col className="col-12 mt-2">
            <label htmlFor="phonein">Phone Number:</label>
          </Col>
          <Col className="col-12">
            <input
              type="tel"
              name="phonein"
              id="phonein"
              placeholder={user.phone}
              maxLength="10"
            />
          </Col>
          <Col className="col-12 my-2">
            <Button type="submit" disable>Update</Button>
          </Col>
        </Row>
      </form>

      <h3>Delete Your Account</h3>
      <p>
        <i>This action cannot be undone.</i>
      </p>
      <form onSubmit={deleteAccount}>
        <Row className="my-4">
          <Col className="col-12 mt-1">
            <label htmlFor="deletepassword">Password:</label>
          </Col>
          <Col className="col-12">
            <input
              type="password"
              name="deletepassword"
              id="deletepassword"
              placeholder="Your password"
            />
          </Col>
          <Col className="col-12 my-2">
            <Button type="submit" disable>Delete My Account</Button>
          </Col>
        </Row>
      </form>
    </Col>
  );
}

// UpdateAccount Component
function UpdateAccount(props) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    user: {},
    loggedIn: false,
  });

  const updatePassword = (event) => {};

  const user = props.user;

  return (
    <>
      <Col className="col-12 col-md-6 p-4 bg-light border-bottom">
        <h2>Change Password</h2>
        <form onSubmit={updatePassword}>
          <Row className="my-4">
            <Col className="col-12 mt-2">
              <label htmlFor="currentpassword">Current Password:</label>
            </Col>
            <Col className="col-12">
              <input
                type="password"
                name="currentpassword"
                id="currentpassword"
                placeholder="Your password"
              />
            </Col>
            <Col className="col-12 mt-2">
              <label htmlFor="newpassword">New Password:</label>
            </Col>
            <Col className="col-12">
              <input
                type="password"
                name="newpassword"
                id="newpassword"
                placeholder="New password"
              />
            </Col>
            <Col className="col-12 mt-2">
              <label htmlFor="confirmpassword">Confirm Password:</label>
            </Col>
            <Col className="col-12">
              <input
                type="password"
                name="confirmpassword"
                id="confirmpassword"
                placeholder="Confirm password"
              />
            </Col>
            <Col className="col-12 mt-2">
              <Button type="submit" disable>Update</Button>
            </Col>
          </Row>
        </form>
      </Col>
    </>
  );
}

// Container Holding SignIn Component and SignUp Component
function Account() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  if (user === null) {
    return (
      <div id="page-container">
        <NavBar />
        <TJNavBar />
        <Fade right>
          <SignInUpContainer />
        </Fade>
        <Footer />
      </div>
    );
  }

  return (
    <section className={styles["rachel-tile"]}>
      <Fade>
        <Container className="my-5 py-5 px-5 h-75 w-75">
          <Row className="w-100 h-75 pt-5 px-5 m-5 rounded">
            <AccountDetails user={user} />
            <UpdateAccount user={user} />
            <Col className="col-12 bg-light border-top rounded-bottom">
              <p>
                <i>
                  Your information is stored in a database and will never be
                  shared with third parties.
                </i>
              </p>
            </Col>
          </Row>
        </Container>
      </Fade>
    </section>
  );
}

export default function Home(props) {
  return (
    <div id="page-container">
      <NavBar />
      <TJNavBar />
      <Account />
      <Footer />
    </div>
  );
}
