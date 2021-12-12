<template>
    <form @submit.prevent="submitHandler" class="window">
        <div class="window__content">
            <span class="window__title">Авторизация</span>
            <div class="field">
                <div class="field__email">
                    <v-input v-model="email" :name="'email'">Email</v-input>
                </div>
                <div class="field__password">
                    <v-input v-model="password" :name="'password'" :type="'password'">Пароль</v-input>
                </div>
            </div>
        </div>
        <div class="submit">
        <div>
            <button class="submit__login" type="submit">ВХОД</button>
        </div>

        <p class="submit__logon">
            Нет аккаунта?
            <router-link :to="{ name: 'register' }">Зарегистрироваться</router-link>
        </p>
        </div>
    </form>
</template>

<script>
import vInput from '@/components/vInput.vue'
export default {
    components: {
        vInput,
    },

    data() {
        return {
            email: '',
            password: '',
        }
    },

    methods: {
        submitHandler() {
            console.log(this, this.email, this.password)
        }
    },
}
</script>

<style lang="scss" scoped>
    .window {
        display: block;
        width: 400px;
        margin: 0 auto;
        background-color: rgb(249, 253, 255);
        padding: 30px;
        border-radius: 5px;

        &__title {
            display: flex;
            justify-content: center;
            margin: 0 0 15px 0;
        }

        .field {
            &__email, &__password {
                display: flex;
                justify-content: space-between;
                margin-top: 20px;
                align-items: center;
            }

            &__validate {
                border: 1px solid rgb(71, 71, 71);
                border-radius: 5px;
                height: 35px;
                width: 270px;
            }

            &__validate:focus {
                border: 2px solid #1140b9;
            }
        }

        .submit {
            &__login {
                width: 100%;
                height: 40px;
                margin: 20px 0;
                background-color: #1140b9;
                border-radius: 10px;
                color: white;
            }

            &__login:hover {
                box-shadow: 0px 0px 20px 0.1px rgba(0, 0, 0, 0.2) inset;
            }

            &__logon {
                display: flex;
                justify-content: space-between;
            }
        }

    }
</style>