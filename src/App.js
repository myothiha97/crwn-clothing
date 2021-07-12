import "./App.css";
import React, { Component } from "react";
import HomePage from "./pages/homepage/homepage.component";
import { Route, Switch } from "react-router-dom";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

class App extends Component {
  state = {
    currentUser: null,
  };

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (user) => {
      // this.setState({ currentUser: user });
      if (user) {
        const userRef = createUserProfileDocument(user);
        (await userRef).onSnapshot((snapShot) => {
          this.setState(
            {
              currentUser: snapShot.id,
              ...snapShot.data(),
            },
            () => {
              console.log(this.state);
            }
          );
        });

        // await userRef.onSnapshot((snapShot) => {
        //   this.setState({
        //     currentUser: {
        //       id: snapShot.id,
        //       ...snapShot.data(),
        //     },
        //   });
        // });
      } else {
        this.setState({ currentUser: null });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser}></Header>
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route exact path="/shop" component={ShopPage}></Route>
          <Route exact path="/signin" component={SignInAndSignUpPage}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;

// function App() {
//   return (
//     <div>
//       <Header></Header>
//       <Switch>
//         <Route exact path="/" component={HomePage}></Route>
//         <Route exact path="/shop" component={ShopPage}></Route>
//         <Route exact path="/signin" component={SignInAndSignUpPage}></Route>
//       </Switch>
//     </div>
//   );
// }

// export default App;
