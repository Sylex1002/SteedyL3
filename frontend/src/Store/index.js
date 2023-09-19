import { configureStore } from "@reduxjs/toolkit";
import highlightAdminSlice from "../Reducers/Admin/AdminHighlightSlice";
import authStoreAdmin from "../Reducers/Admin/AdminAuthSlice";
import userStoreAdmin from "../Reducers/Admin/AdminUserSlice";
import proStoreAdmin from "../Reducers/Admin/AdminProSlice";
// client
import ReduceProfesssionnel from "../Reducers/ReduceProfesssionnel";
import ReducerNotification from "../Reducers/ReducerNotification";
import ReducerConversation from "../Reducers/ReducerMessage";
import ReducerHighlight from "../Reducers/ReducerHighlight";
import ReducerEtudiants from "../Reducers/ReducerEtudiants";
import ReducerCommunity from "../Reducers/ReducerCommunity";
import ReduceSerieFocus from "../Reducers/ReduceSerieFocus";
import ReducerCategory from "../Reducers/ReducerCategory";
import ReducerFocus from "../Reducers/ReducerFocus";
import ReducerUser from "../Reducers/ReducerUser";

const store = configureStore({
  reducer: {
    // ==ADMIN STORE==
    authAdmin: authStoreAdmin,
    userAdmin: userStoreAdmin,
    proAdmin: proStoreAdmin,
    highlightAdmin: highlightAdminSlice,
    // ====CLIENT STORE===
    user: ReducerUser,
    focus: ReducerFocus,
    etudiant: ReducerEtudiants,
    prof: ReduceProfesssionnel,
    highlight: ReducerHighlight,
    notificate: ReducerNotification,
    message: ReducerConversation,
    community: ReducerCommunity,
    category: ReducerCategory,
     // ===== SERIE FOCUS =====
     serieFocus: ReduceSerieFocus,
  },
});

export default store;
