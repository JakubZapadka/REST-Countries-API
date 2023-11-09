<script>
import { markRaw } from 'vue'
export default {
    data(){
        return{
            ccn: this.$route.params.ccn,
            data: null,
            error: null,
        }
    },
    created() {
        this.fetchData(); // Call fetchData when the component is created
    },
    methods: {
        fetchData() {
            fetch('https://restcountries.com/v3.1/alpha/' + this.ccn).then((response) => {
                if(response.ok){
                    response.json().then((data) => {
                        this.data = markRaw(data[0])
                        //console.log(this.data)
                    })
                }else{
                    //console.log(response)
                    this.error = response
                }
            })
        },
        formattedData(prop) {
            const entries = Object.entries(prop);
            return entries
                .map(([key, value]) => `${value}`)
                .join(', ');
        },
        formattedCurrencies(prop) {
            const entries = Object.entries(prop);
            return entries
                .map(([key, value]) => `${value.name}`)
                .join(', ');
        },
    },
}
</script>
<template>
    <main>
        <div v-if="data" class="container">
            <div class="container__box">
                <div class="container__box__img">
                    <button @click="this.$router.back()"><i class="fa-solid fa-arrow-left"></i> Back</button>
                    <img :src='data.flags.svg' alt="Flag"> 
                </div>
                <div class="container__box__details">
                    <h2>
                        {{ data.name.common }}
                    </h2>
                    <div>
                        <p>
                            <label>
                                Native Name: 
                            </label>
                            <span>
                                {{ data.name.common }}
                            </span>
                        </p>
                        <p>
                            <label>
                                Population: 
                            </label>
                            <span>
                                {{ data.population }}
                            </span>
                        </p>
                        <p>
                            <label>
                                Region: 
                            </label>
                            <span>
                                {{ data.region }}
                            </span>
                        </p>
                        <p>
                            <label>
                                Sub Region: 
                            </label>
                            <span>
                                {{ data.subregion }}
                            </span>
                        </p>
                        <p>
                            <label>
                                Capital: 
                            </label>
                            <span>
                                {{ formattedData(data.capital) }}
                            </span>
                        </p>
                    </div>
                    <div>
                        <p>
                            <label>
                                Top Level Domain: 
                            </label>
                            <span>
                                {{ formattedData(data.tld) }}
                            </span>
                        </p>
                        <p>
                            <label>
                                Currencies: 
                            </label>
                            <span>
                                {{ formattedCurrencies(data.currencies) }}
                            </span>
                        </p>
                        <p>
                            <label>
                                Languages: 
                            </label>
                            <span>
                                {{ formattedData(data.languages) }}
                            </span>
                        </p>
                    </div>
                    <div>
                        <label v-if="data.borders"><h3>Border Countries:</h3></label>
                        <div class="block_box">
                            <a v-for="country in data.borders" class="block_box__block">
                                {{ country }}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="error" id="error">
            <p>Error Code: {{ error.status }}</p>
            <p>Error Description: {{ error.statusText }}</p>
        </div>
    </main>
</template>
<style scoped>
    main{
        padding: 1.5rem;
    }
    button{
        display: flex;
        background-color: var(--elements);
        border: none;
        padding: 0.5rem 1rem;
        gap: 1rem;
        width: min-content;
        cursor: pointer;
    }
    img{
        margin-top: 1rem;
        aspect-ratio: 16 / 9;
        object-fit: cover;
        max-width: 100%;
    }
    #error{
        text-align: center;
    }
    .block_box__block{
        min-width: 5rem;
        text-align: center;
        background-color: var(--elements);
    }
    .block_box {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
    }
    .container{
        align-items: center;
    }
    .container__box{
        justify-content: center;
        max-width: fit-content;
    }
    .container, .container__box, .container__box__details{
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    .container__box__img{
        max-width: 512px;
    }
    .container__box__details{
        width: fit-content;
    }
    h3, label{
        margin-bottom: 1rem;
        font-weight: 600;
    }

    button, .block_box__block{
        box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 8px 0px;
    }
    @media screen and (min-width: 1024px) {
        main{
            display: flex;
            justify-content: center;
            flex-grow: 1;
        }
        .container{
            max-width: 1024px;
            align-self: center;
        }
        .container__box{
            flex-direction: row;
        }
        .container__box__details{
            margin-top: 3rem;
        }
    }
</style>