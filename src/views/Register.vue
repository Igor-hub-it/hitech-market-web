<template>
<form class="reg-window">
    <div class="reg-window__content">
        <span class="reg-window__title">Регистрация</span>
        <div class="fields">
            <div class="fields__email field">
                <input id="email" type="text">
                <label for="email">Email</label>
            </div>
            <div class="fields__password field">
                <input id="password" type="password" class="validate" >
                <label for="password">Пароль</label>
            </div>
            <div class="fields__name field">
                <input id="name" type="text" class="validate">
                <label for="name">Имя</label>
            </div>
        </div>
    </div>
    <div class="submit-btn">
        <div>
        <button class="submit-btn__log-on" type="submit">
            Зарегистрироваться
        </button>
        </div>
        <p class="submit-btn__link-log-in">
            Уже есть аккаунт?
            <a href="/login">Войти!</a>
        </p>
    </div>
</form>
</template>

<style lang="scss" scoped>
    .reg-window {
        display: block;
        width: 400px;
        margin: 0 auto;
        background-color: rgb(249, 253, 255);
        padding: 30px;
        border-radius: 5px;
    }
</style>