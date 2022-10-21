import * as axios from "axios";

/*
* Одно из основных правил DAL уровня:
* При разработке приложения, как только появляется какой-то намек на то что появляется работа с API
* (например, серверные разработчики что-то сделали или например появилась документация)
* то сразу же первым делом создаём какой-то минимальный объект,
* отдельный модуль api который и будет заниматься всеми этими делами (с запросами на сервер).
* Потому что это нужно обязательно инкапсулировать, чтобы этим responsibility, этой логикой занимался кто-то другой.
* Кстати, объект сервиса API можно сделать не только простым объектом с методами, а можно писать здесь ООП. */

/*
* Т.к. у нас в response приходит слишком много деталей (это можно увидеть при помощи debugger),
* но нашей Компоненте не нужно все их знать, нашей Компоненте нужны непосредственно данные (data)
* поэтому выполним return не того что вернул get(), а того что вернул then() - он вернул промис,
* в котором сидит не весь response а только data из response
* т.о. мы обрезаем доп экстра инфу о http-запросе, заголовках и т.д. */

/*
* Также хорошей практикой будет обращаться не к глобальному axios,
* а создать некоторый instance, настроить этот instance и обращаться к нему.
* В axios есть вспомогательная функция axios.create() которая создаёт отдельный экземпляр axios
* Для чего это нужно?
* Например, у нас несколько api к разным серверам (например у нас есть разные версии),
* и мы хотим уметь легко подменять эти объекты, чтобы каждая часть работала с определённой сущностью axios.
* Каждый instance в себе держит какие-то настройки по работе с конкретной api. */

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "11a6c194-cab8-4726-81c1-f9115370431e"
    }
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                //debugger;
                return response.data;
            });
    },
    follow(userId) {
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`)
    },
    getProfile(userId) {
        return instance.get(`profile/${userId}`)
        //return instance.get(`profile/` + userId)
    },
}

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    }
}