import {noAuthInstance, user} from "../index";

export const signup = (userData) => {
    return noAuthInstance.post("/users/signup", userData);
}

export const mailSend = (email) => {
    return noAuthInstance.post("/users/signup/email", {
        email: email
    });
}

export const codeCheck = (email, code) => {
    return noAuthInstance.patch("/users/signup/email", {
        email: email,
        code: code
    });
}

export const login = (userData) => {
    return noAuthInstance.post("/users/login", userData);
}

export const getProfile = (userId) => {
    return user.get("/profile", {params: {userId: userId}});
}

export const editProfile = (userId, username, file) => {
    const formData = new FormData();

    //json 타입으로 데이터를 넘기기 위한 작업
    const json = JSON.stringify({username});
    const blob = new Blob([json], {type: "application/json;charset=utf-8"});
    formData.append("req", blob);

    // 파일 추가
    if (file) {
        formData.append('image', file, file.name);
    }

    return user.patch(`/profile?userId=${userId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}
export const editPassword = (userData) => {
    return user.patch("/password", userData);
}

export const logout = () => {
    return user.get("/logout");
}

export const userSearch = (keyword) => {
    return user.get("/search", {
        headers: {
            'Keyword': keyword
        }
    })
}
