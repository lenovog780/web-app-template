const auth = {
    STORAGE_KEY: "USER_AUTH",

    getToken: () => {
        var getUserAuthObj = auth.getUserAuthObj();
        return getUserAuthObj != null ? getUserAuthObj.token : null;;
    },

    getUserAuthObj: () => {
        var userAuthObj = window.localStorage.getItem(auth.STORAGE_KEY);
        return userAuthObj != null ? JSON.parse(userAuthObj) : null;
    },

    setUserAuthObj: (userAuthObj) => {
        if (userAuthObj != null) {
            window.localStorage.setItem(auth.STORAGE_KEY, JSON.stringify(userAuthObj));
        }
    },

    removeUserAuthObj: () => {
        window.localStorage.removeItem(auth.STORAGE_KEY);
    }
};

export default auth;