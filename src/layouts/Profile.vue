<template>
  <main class="profile">
    <router-link :to="switchLink" class="profile__settings"
      ><span>{{ switchTitle }}</span
      ><picture><img src="/images/settings.svg" /></picture
    ></router-link>
    <div class="user">
      <input
        @change="updateFileHandler"
        type="file"
        id="profile-cover"
        accept="image/*"
        hidden
      />
      <div class="user__container">
        <div class="user__logo">
          <img :src="userLogo" @error="imageErrorHandler" alt="" />
          <label for="profile-cover" class="user__logo-upload"
            ><img src="/images/upload.svg" alt="Загрузить"
          /></label>
        </div>
        <form-button
          v-if="file"
          @click.stop="updateCoverImageHandler"
          :type="'button'"
          >Сохранить</form-button
        >
        <h1 class="user__title">{{ user?.name }}</h1>
        <p class="user__email">{{ user?.email }}</p>
        <p class="user__phone">{{ user?.phone }}</p>
        <button @click.stop="logoutHandler" class="user__logout">Выйти</button>
        <div v-if="user?.isActivated === false" class="user__notification">
          <button
            @click.stop="confirmHandler"
            type="button"
            class="user__confirm"
            :class="{ success: confirmSended }"
          >
            <img :src="notification[confirmSended].icon" alt="" />
            {{ notification[confirmSended].message }}
          </button>
          <p class="user__confirm-hint">
            {{ !confirmSended ? 'Нажмите, чтобы подтвердить' : '' }}
          </p>
        </div>
      </div>
    </div>
    <router-view />
  </main>
</template>

<script>
import FormButton from '@/components/FormButton.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    FormButton,
  },

  inject: ['axiosNotify', 'logout'],

  setup() {
    return {
      notification: {
        false: {
          icon: '/images/danger.svg',
          message: 'Вы не подтвердили почту',
        },
        true: {
          icon: '/images/success.svg',
          message: 'Письмо выслано вам на почту',
        },
      },
    }
  },

  data() {
    return {
      confirmSended: false,
      userArts: null,
      file: null,
      displayImage: null,
    }
  },

  computed: {
    ...mapGetters(['user', 'token']),

    notificationIcon() {
      return '/images/danger.svg'
    },

    profileId() {
      return this.$route.params.id
    },

    userLogo() {
      return (
        this.displayImage ||
        this.user?.cover_image?.download_url ||
        '/images/profile.svg'
      )
    },

    isSettings() {
      return this.$route?.name === 'profile-edit'
    },

    switchTitle() {
      if (this.isSettings) {
        return 'Вернуться в профиль'
      }

      return 'Настройки профиля'
    },

    switchLink() {
      if (this.isSettings) {
        return { name: 'profile' }
      }

      return { name: 'profile-edit' }
    },
  },

  methods: {
    async confirmHandler() {
      const response = await this.$axios
        .post('/user/resend-confirm')
        .then(() => true)
        .catch((err) => err.response.data.detail)

      if (response === true) return

      this.axiosNotify(response)
    },

    async updateCoverImageHandler() {
      const data = new FormData()
      data.append('file', this.file)

      const response = await this.$axios
        .post('/photo/profile_cover', data)
        .then(() => true)
        .catch((err) => err.response.data.detail)

      const success = this.axiosNotify(response, 'Аватар обновлен!')
      if (success) this.file = null
    },

    updateFileHandler(e) {
      this.file = e.target.files[0]

      const fileReader = new FileReader()
      fileReader.readAsDataURL(this.file)
      const parser = (e) => {
        if (!this.isEdit) {
          this.defaultImage = e.target.result
        }
        this.displayImage = e.target.result
        fileReader.removeEventListener('load', parser)
      }
      fileReader.addEventListener('load', parser)
    },

    imageErrorHandler(e) {
      if (e.target.src !== '/images/profile.svg')
        e.target.src = '/images/profile.svg'
    },

    redirectHandler() {
      if (this.user == null) this.$router.push({ name: 'glance' })
    },

    logoutHandler() {
      this.logout()
    },
  },

  watch: {
    user() {
      this.redirectHandler()
    },
  },
}
</script>

<style lang="scss" scoped>
.profile {
  padding: 32px;
  position: relative;

  &__settings {
    padding: 20px 32px;
    position: absolute;
    right: 60px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    grid-gap: 0 16px;
    font-size: 20px;
    font-weight: 400;
    color: var(--font-primary);
    background-color: var(--gray);
    transition: 0.25s;
    cursor: pointer;

    img {
      transition: 0.25s;
    }

    &:hover,
    &:focus {
      background-color: var(--separator);

      img {
        transform: rotate(135deg);
      }
    }
  }
}
@media screen and (max-width: 1000px) {
  .profile {
    &__settings {
      position: relative;
      display: inline-flex;
      left: 100%;
      transform: translateX(-100%);
      margin-bottom: 32px;
    }
  }
}

.user {
  margin-bottom: 32px;
  display: flex;
  justify-content: center;
  font-family: 'Muller';
  text-align: center;

  &__logo {
    position: relative;
    width: Min(338px, calc(100vw - 64px));
    aspect-ratio: 1 / 1;
    border-radius: 100%;
    background-color: var(--gray);
    overflow: hidden;

    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &-upload {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      font-size: 4em;
      color: #fff;
      border-radius: 100%;
      background-color: rgba(#000, 0.3);
      text-shadow: 1px 2px 3px rgba(#000, 0.16);
      transition: 0.2s ease-in-out;
      cursor: pointer;
      opacity: 0;

      &:not(.mobile):hover {
        opacity: 1;
      }
      &.mobile {
        position: static;
        color: var(--font-primary);
        opacity: 1;
      }

      img {
        transform: scale(0.5);
      }
    }
  }

  &__title {
    margin: 16px 0 0;
    font-size: 28px;
    font-weight: 700;
  }

  &__email {
    margin: 12px 0 14px;
    font-size: 24px;
    font-weight: 300;
  }

  &__phone {
    font-size: 19px;
    font-weight: 300;
    color: var(--font-dark);
  }

  &__logout {
    margin: 24px 0;
    padding: 0.5em 2em;
    font-size: 20px;
    font-family: 'Muller';
    font-weight: 500;
    background-color: rgb(255, 54, 35);
    border-radius: 1em;
    color: #fff;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.16);
  }

  &__confirm {
    margin: 16px 0 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    grid-gap: 0 10px;
    width: Min(338px, calc(100vw - 64px));
    height: 48px;
    color: var(--red);
    background-color: transparent;
    border: 2px solid var(--red);
    transition: 0.25s;

    &:hover,
    &:focus {
      background-color: #ffefef;
    }

    &.success {
      color: #fff;
      background-color: var(--green);
      border-color: var(--green);
    }

    &-hint {
      font-size: 16px;
      color: var(--hint);
      cursor: default;
    }
  }
}
</style>