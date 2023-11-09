<script>
export default {
  data() {
    return {
      data: null,
      dataFiltered: null,
      search: "",
      timer: null,
    };
  },
  created() {
    this.fetchData(); // Call fetchData when the component is created
  },
  methods: {
    fetchData() {
        fetch('https://restcountries.com/v3.1/all').then((response) => {
            response.json().then((data) => {
                //console.log(data)
                this.data = data;
            })
        })
    },
    filtrData() {
        const input = document.querySelector("#countryInput").value.toLowerCase()
        const selectValue = document.querySelector("#region").value
        this.dataFiltered = this.data.filter((object) => (object.name.common.toLowerCase().includes(input) && object.region.includes(selectValue)) || (object.name.official.toLowerCase().includes(input) && object.region.includes(selectValue)))
    },
    handleKeyPress(){
        window.clearTimeout(this.timer);
    },
  },
  computed: {
    combinedObject() {
      return this.dataFiltered || this.data; // Jeśli object1 jest null lub undefined, użyj object2
    }
  },
  watch: {
      search: function (val) {
        window.clearTimeout(this.timer);
        this.timer = window.setTimeout(() => {
            this.filtrData();
        }, 300);
      },
    },
};
</script>
<template>
    <main v-if="data">
        <div class="input_a_select">
            <div class="input">
                <button @click="filtrData" aria-label="Search">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
                <input @keyup.enter="filtrData" @keypress="handleKeyPress" v-model="search" label="Search" type="text" name="" id="countryInput" placeholder="Search for a country...">
            </div>
            <select name="region" id="region" @change="filtrData" aria-label="chose a region">
                <option value="" style="display: none;">Filter by Region</option>
                <option value="Africa">Africa</option>
                <option value="America">America</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
            </select>
        </div>
        <ul>
            <li v-for='object in combinedObject'>
                <router-link :to="'/details/' + object.cca2">
                    <img :src='object.flags.svg' alt="Flag" loading="lazy"> 
                    <div>
                        <h2>{{ object.name.common }}</h2>
                        <div>
                            <p>
                                <span class="label">Population: </span><span>{{ object.population }}</span>
                            </p>
                            <p>
                                <span class="label">Region: </span><span>{{ object.region }}</span>
                            </p>
                            <p>
                                <span class="label">Capital: </span><span v-for="capital in object.capital">{{ capital }}</span>
                            </p>
                        </div>
                    </div>
                </router-link>
            </li>
            <p v-if="combinedObject.length == 0">no countries found matching the filters 😞</p>
        </ul>
    </main>
</template>
<style scoped>
    main{
        margin: 2rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    ul{
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        justify-content: center;
    }

    li{
        display: flex;
        flex-direction: column;
        border-radius: 0.5rem;
        overflow: hidden;
        width: 300px;
        background-color: var(--elements-hover);
        transition: background-color 0.1s ease-in-out;
    }
    li:hover{
        background-color: var(--elements);
    }

    li > a{
        text-decoration: none;
        color: var(--text);
        height: 100%;
    }

    li > a > img{
        width: 100%;
        aspect-ratio: 16 / 9;
        object-fit: cover;
    }
    
    li > a > div{
        display: flex;
        gap: 1rem;
        flex-direction: column;
        padding: 2rem;
    }
    .input_a_select{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 2rem;
    }
    .input{
        display: flex;
        min-height: 3rem;
        width: 100%;
    }
    .input * {
        background-color: inherit;
        border: none;
        background-color: var(--elements);
    }
    .input button{
        padding: 0.5rem 1rem;
        cursor: pointer;
        border-radius: 0.5rem 0rem 0rem 0.5rem;
    }
    .input [type="text"]{
        flex-grow: 1;
        border-radius: 0rem 0.5rem 0.5rem 0rem;
    }
    .input [type="text"]::placeholder{
        color: var(--text);
    }

    ul > p{
        text-align: center;
    }

    #region{
        max-width: 10rem;
        background-color: var(--elements);
        border: none;
        padding: 1rem;
        border-radius: 0.5rem;
    }
    #region::after{
        margin-right: 1rem;
    }
    .label{
        font-weight: 600;
    }
    .input, select, ul > li{
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    }
    select{
        cursor: pointer;
    }
    @media screen and (min-width: 1024px) {
        .input{
            max-width: 400px;
        }
    }
</style>