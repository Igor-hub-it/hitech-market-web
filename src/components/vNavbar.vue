<template>
    <div class="navbar">
        <div class="accessories">
            <router-link class="accessories__CPU acsr" :to="{ name: 'shop' }">Процессор</router-link>
            <router-link class="accessories__cooler acsr" :to="{ name: 'shop' }">Кулер</router-link>
            <router-link class="accessories__MB acsr" :to="{ name: 'shop' }">Материнская плата</router-link>
            <router-link class="accessories__mem acsr" :to="{ name: 'shop' }">Оперативная память</router-link>
            <router-link class="accessories__hdd acsr" :to="{ name: 'shop' }">HDD</router-link>
            <router-link class="accessories__ssd acsr" :to="{ name: 'shop' }">SSD</router-link>
            <router-link class="accessories__gpu acsr" :to="{ name: 'shop' }">Видеопамять</router-link>
            <router-link class="accessories__frame acsr" :to="{ name: 'shop' }">Корпус</router-link>
            <router-link class="accessories__power acsr" :to="{ name: 'shop' }">Блок питания</router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .accessories {
        padding: 0 35px;
        height: 36px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: rgb(95, 95, 95);
        background-color: white;
    }

    .acsr {
        height: 100%;
        display: flex;
        align-items: center;
        cursor: pointer;
        position: relative;
        color: #4d4d4d;

        &:hover::after {
            width: 100%;
        }

        &::after {
            content: '';
            display: block;
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            height: 2px;
            width: 0;
            background-color: rgb(0, 0, 80);
            transition: 0.2s ease;
        }
    }
</style>