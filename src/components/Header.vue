<script>
export default {
    methods: {
        toogleDarkTheme(){
            document.body.classList.toggle('dark-theme');
        }
    }
};
</script>
<template>
    <header>
        <router-link :to="'/'">
            <h1>Where in the world?</h1>
        </router-link>
        <button @click="toogleDarkTheme">
            <i class="fa-solid fa-moon"></i>
            <span>Dark Mode</span>
        </button>
    </header>
</template>
<style scoped>
    header{
        display: flex;
        justify-content: space-between;
        padding: 2rem 1rem;
        background-color: var(--elements);
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }
    header > button{
        align-self: center;
        background-color: initial;
        cursor: pointer;
        padding: 0.3rem;
        border: none;
        display: flex;
        align-items: center;
        gap: 0.3rem;
    }
    @media screen and (min-width: 1024px) {
        header{
            padding: 2rem;
        }
    }
</style>