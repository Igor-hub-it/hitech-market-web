<template>
    <form class="log-window">
        <div class="log-window__content">
            <span class="log-window__title">Авторизация</span>
            <div class="fields">
                <div class=" field">
                    <input id="email" type="text" class="validate">
                    <label for="email">Email</label>
                </div>
                <div class="input-field">
                    <input id="password" type="password" class="validate">
                    <label for="password">Пароль</label>
                </div>
            </div>
        </div>
        <div class="submit-btn">
        <div>
            <button class="submit-btn__log-in" type="submit">Войти</button>
        </div>

        <p class="submit-btn__link-log-on">
            Нет аккаунта?
            <a href="/register">Зарегистрироваться</a>
        </p>
        </div>
    </form>
</template>

<style lang="scss" scoped>
    .log-window {
        display: block;
        width: 400px;
        margin: 0 auto;
        background-color: rgb(249, 253, 255);
        padding: 30px;
        border-radius: 5px;
    }
</style>