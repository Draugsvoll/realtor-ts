
<template>
  <main>
    
    <section class="section-welcome fullscreen-box bg-fullscreen flex-center-center">
      <div class="overlay" />
      <SearchBar class="search-bar" />
    </section>

    <section class="section-services">
      <h1>Services we offer</h1>
      <div class="services">
        <div class="service">
          <div class="overlay"></div>
          <img class="radius-small" src="../assets/images/img3.jpg" alt="" srcset="">
          <h3 class="head">Buy property</h3>
          <!-- <p>Lorem ipsum dolor sit amet, consectetur adipisicing</p> -->
        </div>
        <div class="service">
          <div class="overlay"></div>
          <img class="radius-small" src="../assets/images/img5.jpg" alt="" srcset="">
          <h3 class="head">Rent a home</h3>
          <!-- <p>Lorem ipsum dolor sit amet, consectetur adipisicing</p> -->
        </div>
      </div>
      <div class="services">
        <div class="service">
          <div class="overlay"></div>
          <img class="radius-small" src="../assets/images/img3.jpg" alt="" srcset="">
          <h3 class="head">Financial Advice</h3>
          <!-- <p>Lorem ipsum dolor sit amet, consectetur adipisicing</p> -->
        </div>
        <div class="service">
          <div class="overlay"></div>
          <img class="radius-small" src="../assets/images/img3.jpg" alt="" srcset="">
          <h3 class="head">Refinancing</h3>
          <!-- <p>Lorem ipsum dolor sit amet, consectetur adipisicing</p> -->
        </div>
      </div>
    </section>

    <section class="section-about flex-center-center">
      <h1>About us</h1>
      <div class="about-text-container flex-center-center">
          <div class="column">
            <div class="about-text">
              <h3>Our mission</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias distinctio, non hic ab nisi nemo nobis mollitia veritatis. Sapiente natus aperiam commodi expedita ex explicabo eius sunt maxime a perspiciatis. </p>
            </div>
            <div class="about-text">
              <h3>Our mission</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias distinctio, non hic ab nisi nemo nobis mollitia veritatis. Sapiente natus aperiam commodi expedita ex explicabo eius sunt maxime a perspiciatis. </p>
            </div>
          </div>
          <div class="column">
            <div class="about-text">
              <h3 >Our mission</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias distinctio, non hic ab nisi nemo nobis mollitia veritatis. Sapiente natus aperiam commodi expedita ex explicabo eius sunt maxime a perspiciatis. </p>
            </div>
            <div class="about-text">
              <h3>Our mission</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias distinctio, non hic ab nisi nemo nobis mollitia veritatis. Sapiente natus aperiam commodi expedita ex explicabo eius sunt maxime a perspiciatis. </p>
            </div>
          </div>
      </div>
    </section>

      <section id="contact" class="section-contact bg-fullscreen">
        <div class="overlay"></div>
        <div class="information-container flex-center-center">
          <div class="information ">
            <h1>Talk to our real estate experts to find the perfect investment for you</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipernatur porro iste repellat! Veniam obcaecati tenetur perspiciatis magni debitis corporis, nemo dolorum repellat aspernatur sit id voluptatibus eius doloribus, accusamus officiis ducimus neque delectus qui doloremque voluptatum. Delectus aliquam culpa, voluptates quas reprehenderit optio.</p>
          </div>
        </div>
        <div class="form-container flex-center-center">
          <form class="radius-medium">      
            <input name="name" type="text" class="feedback-input radius-medium" placeholder="Name" />   
            <input name="email" type="text" class="feedback-input" placeholder="Email" />
            <input name="email" type="tel" class="feedback-input" placeholder="Phone" />
            <textarea name="text" class="feedback-input" placeholder="Questions"></textarea>
            <input type="submit" class="radius-medium" value="Submit"/>
          </form>
        </div>
      </section>

    </main>
  </template>
  
<script lang="ts">
import { defineComponent, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import SearchBar from "../components/SearchBar.vue";

export default defineComponent ({
  components: {
    SearchBar
  },
  setup(){
    const route = useRoute()

    watch(()=> route.query.view, (newValue) =>{
      if (newValue === 'contact') {
        const contact = document.querySelector("#contact");
        if (contact) {
          contact.scrollIntoView({ behavior: "smooth" });
        }

      }
    }),
  
    onMounted(() => {
      if (route.query.view === 'contact') {
        const contact = document.querySelector("#contact");
        if (contact) {
          contact.scrollIntoView({ behavior: "smooth" });
        }
      }
    })

    return {route}
  }
  
})

</script>

<style lang="scss" scoped>
main {
  --form-color:var(--color-primary);
  --form-color-focus:#d44848;
  
  .section-welcome {
    background-image: url('@/assets/images/bg.jpg');
    .overlay {
      background:rgba(0, 0, 0, 0.3);
    }
    .search-bar{
      position:relative;
      z-index:2;
    }
  }

  .section-about {
    justify-content: space-around;
    padding-top:var(--page-padding-top);
    padding-bottom:5rem;
    flex-direction: column;
    h1{
      padding-top:6vh;
    }
    .about-text-container {
      flex-wrap: wrap;
      flex-grow:1;
      
      .column{
        display:block;
        max-width:max(40vw, 500px);
        min-width:22rem;
      }
      .about-text{
        padding:10vh 5vw;
        h3 {
          text-align:left;
        }
        p {
          padding-top:0.5rem;
        }
      }
    }
  }

  .section-services {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding:3rem;
    .services {
      display:flex;
      flex-wrap: wrap;
      margin:auto;
      width:fit-content;
      justify-content: center;
      .service {
        position: relative;
        /* flex: 1 0 100%; */    /* to fill the entire width */
        margin: 0.3rem;
        overflow: hidden;
        width:clamp(300px, 20vw, 480px);
        height:clamp(320px, 22vw, 520px);
        .overlay {
          background:rgba(0,0,0,0.43);
          transition: all 0.5s;
          &:hover {
            background:rgba(0,0,0,0.30);
          }
        }
        .head {
          position: absolute;
          bottom:8%;
          width: 100%;
          z-index:3;
          /* font-family: 'Roboto'; */
        }
        img {
          width: 100%; /* to make the image fill its container */
          height: 100%; /* to make the image fill its container */
            object-fit: cover;
          }
        }
      }
    }

    .section-contact {
      position:relative;
      background-image: url('@/assets/images/img2.jpg');
      display:grid;
      padding:2rem;
      min-height:100vh;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      .overlay {
        background: rgba(0,0,0,0.45);
      }
      .information-container, .form-container {
        z-index:2;
        max-width:40rem;
        margin:auto;
        .information {
          display:flex;
          flex-direction: column;
          gap:3vh;
          h1,h2,h3,h4 {
              text-align:left;
          }
        }
      }
    }
  }

  /* FORM */ 
  form {
    background-color: rgba(0, 0, 0, 0.4);
    padding:2rem;
    max-width:27rem;
    margin:3rem auto;
    .feedback-input {
      color:white;
      font-family: Helvetica, Arial, sans-serif;
      font-weight:500;
      font-size: 0.9rem;
      letter-spacing: 0.04rem;
      line-height: 1.8rem;
      background-color: transparent;
      border:2px solid var(--form-color);
      transition: all 0.2s;
      padding: 0.5rem;
      margin-bottom: 1rem;
      width:100%;
      box-sizing: border-box;
      outline:0;
      &:focus{
        border:2px solid var(--form-color-focus);
      }
    }
    
    textarea {
      height: 10rem;;
      line-height: 150%;
      resize:vertical;
    }
    
    [type="submit"] {
      font-family: 'Montserrat', Arial, Helvetica, sans-serif;
      width: 100%;
      background:var(--form-color);
      border:0;
      cursor:pointer;
      color:white;
      font-size:0.9rem;
      padding-top:0.8rem;
      padding-bottom:0.8rem;
      transition: all 0.2s;
      font-weight:600;
      &:hover {
        background:var(--form-color-focus);
      }
    }
  }
  /* FORM END */
</style>