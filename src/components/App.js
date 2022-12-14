import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "../components/EditProfilePopup";
import EditAvatarPopup from "../components/EditAvatarPopup";

import * as auth from "../utils/auth";
import done from "../images/done.svg";
import fail from "../images/fail.svg";

import { Route, Switch, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ isOpened: false });
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState("");
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState({
    opened: false,
    success: false,
  });
  const [currentPath, setCurrentPath] = useState("/");
  const history = useHistory();

  useEffect(() => {
    if (loggedIn === true) {
      api
        .getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((e) => console.log(e));
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn === true) {
      api
        .getInitialCards()
        .then((data) => {
          setCards(data);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }
  // ???????????????? ????????????????
  const handleCardDelete = (card) => {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  };

  const handleCardClick = ({ link, name, isOpened }) => {
    setSelectedCard({ link, name, isOpened: !isOpened });
  };
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };
  const handleConfirmPopupClick = () => {
    setIsConfirmPopupOpen(!isConfirmPopupOpen);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ isOpened: false });
    setIsConfirmPopupOpen(false);
    setInfoTooltipOpen({ opened: false, success: false });
  };

  // ???????????????????? ???????????????????? ?? ????????????????????????
  const handleUpdateUser = (userData) => {
    api
      .patchProfileInfo(userData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  // ???????????????????? ??????????????
  const handleUpdateAvatar = (newAvatar) => {
    api
      .newAvatar(newAvatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  // ???????????????????? ????????????????
  const handleAddPlace = (data) => {
    api
      .patchCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };
  const handlePathChange = (newPath) => {
    setCurrentPath(newPath);
  };

  // ???????????????? ????????????
  React.useEffect(() => {
    auth
      .tokenCheck(localStorage.getItem("token"))
      .then((result) => {
        if (result) {
          setUserEmail(result.data.email);
          setLoggedIn(true);
          history.push("/");
          setCurrentPath("/");
        } else {
          throw new Error(
            "???????????? ???????????????? ????????????. ???????????????????? ???????????? ????????????????????????????????"
          );
        }
      })
      .catch((err) => {
        console.log(`???????????? ?????????? ???? ???????????? ${err}`);
        history.push("/sign-in");
      });
  }, []);

  // ???????????????????? ????????????????????
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserEmail("");
    setLoggedIn(false);
    history.push("/sign-in");
    setCurrentPath("/sign-in");
  };

  // ???????????????????? ??????????????????????
  const handleSignupSubmit = (email, password) => {
    auth
      .register(email, password)
      .then((result) => {
        if (result) {
          setUserEmail(result.data.email);
          setInfoTooltipOpen({ opened: true, success: true });
          setLoggedIn(true);
          history.push("/sign-in");
          setCurrentPath("/sign-in");
        } else {
          throw new Error("???? ?????????????? ???????????? ??????????????????????");
        }
      })
      .catch((err) => {
        console.log(`???????????? ??????????????????????: ${err}`);
        setInfoTooltipOpen({ opened: true, success: false });
      });
  };

  // ???????????????????? ??????????????????????
  const handleSigninSubmit = (email, password) => {
    auth
      .authorization(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setUserEmail(email);
          setLoggedIn(true);
          history.push("/");
          setCurrentPath("/");
        } else {
          throw new Error("???? ?????????????? ???????????????? ?????????? ???? ??????????????");
        }
      })
      .catch((err) => {
        console.log(
          alert(`???????????? ??????????????????????: ${err}. ?????????????????? ???????????????????????? ????????????`)
        );
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header
            userEmail={userEmail}
            onLogout={handleLogout}
            path={currentPath}
          />

          <Switch>
            <Route path="/sign-in">
              <Login
                onSignin={handleSigninSubmit}
                onPathChange={handlePathChange}
              />
            </Route>
            <Route path="/sign-up">
              <Register
                onSignup={handleSignupSubmit}
                onPathChange={handlePathChange}
              />
            </Route>
            <ProtectedRoute
              path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              cards={cards}
              onConfirmPopup={handleConfirmPopupClick}
              onCardDelete={handleCardDelete}
              onAddPlace={handleAddPlaceClick}
            />
          </Switch>
          <Footer />
        </div>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        ></AddPlacePopup>
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        ></EditAvatarPopup>
        <PopupWithForm
          name="sure"
          title="???? ???????????????"
          isOpen={isConfirmPopupOpen}
          container="popup__container popup__form"
          onClose={closeAllPopups}
        ></PopupWithForm>

        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
        <InfoTooltip
          isOpen={isInfoTooltipOpen.opened}
          onClose={closeAllPopups}
          statusImage={isInfoTooltipOpen.success ? done : fail}
          title={
            isInfoTooltipOpen.success
              ? "???? ?????????????? ????????????????????????????????????!"
              : "??????-???? ?????????? ???? ??????. ???????????????????? ?????? ??????!"
          }
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
