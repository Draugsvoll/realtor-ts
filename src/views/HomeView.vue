<template>
  <main>
    
    <section class="section-welcome fullscreen-box bg-fullscreen flex-center-center">
      <h1 v-if="startAnimation" class="welcome-txt fade-in">Buy real estate in the US</h1>
      <div class="overlay" />
      <SearchBar v-if="startAnimation" class="search-bar" />
      <img src="@/assets/images/bg2.jpg" alt="" @load="imageLoaded">
    </section>

    <!-- <section class="section-about flex-center-center">
      <h1>About us</h1>
      <div class="about-text-container flex-center-center">
          <div class="column">
            <div class="about-text">
              <h2>Our Mission</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias distinctio, non hic ab nisi nemo nobis mollitia veritatis. Sapiente natus aperiam commodi expedita ex explicabo eius sunt maxime a perspiciatis. </p>
            </div>
            <div class="about-text">
              <h2>Our Expertise</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias distinctio, non hic ab nisi nemo nobis mollitia veritatis. Sapiente natus aperiam commodi expedita ex explicabo eius sunt maxime a perspiciatis. </p>
            </div>
          </div>
          <div class="column">
            <div class="about-text">
              <h2>Performance</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias distinctio, non hic ab nisi nemo nobis mollitia veritatis. Sapiente natus aperiam commodi expedita ex explicabo eius sunt maxime a perspiciatis. </p>
            </div>
            <div class="about-text">
              <h2>Industry Leading</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias distinctio, non hic ab nisi nemo nobis mollitia veritatis. Sapiente natus aperiam commodi expedita ex explicabo eius sunt maxime a perspiciatis. </p>
            </div>
          </div>
      </div>
    </section> -->

    <section class="section-services">
      <h1>Services</h1>
      <div class="services">
        <router-link  to="/finance">
          <div class="service">
            <div class="overlay"></div>
            <img class="radius-small" src="../assets/images/img5.jpg" alt="" srcset="">
            <h3 class="head">Financing</h3>
            <!-- <p>Lorem ipsum dolor sit amet, consectetur adipisicing</p> -->
          </div>
          
        </router-link>
        <!-- <a href="https://ove-realtor.netlify.app/finance">
        </a> -->
        <div class="service">
          <div class="overlay"></div>
          <img class="radius-small" src="../assets/images/bg5.jpg" alt="" srcset="">
          <h3 class="head">Lorem Ipsum</h3>
          <!-- <p>Lorem ipsum dolor sit amet, consectetur adipisicing</p> -->
        </div>
        <div class="service">
          <div class="overlay"></div>
          <img class="radius-small" src="../assets/images/img2.jpg" alt="" srcset="">
          <h3 class="head">Lorem Ipsum</h3>
          <!-- <p>Lorem ipsum dolor sit amet, consectetur adipisicing</p> -->
        </div>
      </div>

      <div class="services">
        <div class="service">
          <div class="overlay"></div>
          <img class="radius-small" src="../assets/images/img3.jpg" alt="" srcset="">
          <h3 class="head">Lorem Ipsum</h3>
          <!-- <p>Lorem ipsum dolor sit amet, consectetur adipisicing</p> -->
        </div>
        <div class="service">
          <div class="overlay"></div>
          <img class="radius-small" src="../assets/images/img5.jpg" alt="" srcset="">
          <h3 class="head">Lorem Ipsum</h3>
          <!-- <p>Lorem ipsum dolor sit amet, consectetur adipisicing</p> -->
        </div>
        <div class="service">
          <div class="overlay"></div>
          <img class="radius-small" src="../assets/images/bg5.jpg" alt="" srcset="">
          <h3 class="head">Lorem Ipsum</h3>
          <!-- <p>Lorem ipsum dolor sit amet, consectetur adipisicing</p> -->
        </div>
        
      </div>
    </section>

   

      <section id="contact" class="section-contact bg-fullscreen">
        <div class="overlay"></div>
        <div class="information-container flex-center-center">
          <div class="information ">
            <h1 class="big-txt">Find the perfect investment for you</h1>
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
import { defineComponent, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import SearchBar from "../components/SearchBar.vue";

export default defineComponent ({
  components: {
    SearchBar
  },
  setup(){
    const route = useRoute()
    const startAnimation = ref(false)

    function imageLoaded () {
      startAnimation.value = true
    }

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

    return {route, imageLoaded, startAnimation}
  }
  
})

</script>

<style lang="scss" scoped>
main {
  .section-welcome {
    color:var(--color-white);
    display: flex;
    flex-direction: column;
    img {
      object-fit: cover;
      position: absolute;      
      width:100%;
      height:100%;
    }
    .welcome-txt {
      color:white;
      position: relative;
      z-index: 3;
      width:fit-content;
      margin-bottom:5rem;
      font-size: 2.2rem;
      font-weight: 400;
      text-shadow: 2px 2px 3px #00000013;
      @media screen and (max-width: 600px) {
        font-size: 2.2rem;
      }
    }
    .overlay {
      background:rgba(0, 0, 0, 0.32);
      z-index:2;
    }
    .search-bar{
      position:relative;
      z-index:2;
    }
  }

  .section-about {
    justify-content: space-around;
    padding-bottom:0rem;
    flex-direction: column;
    h1{
      padding-top:3rem;
      margin-bottom:1rem;
    }
    .about-text-container {
      flex-wrap: wrap;
      flex-grow:1;
      
      .column{
        display:block;
        width:max(40vw, 500px);
        width:32rem;
      }
      .about-text{
        padding:3rem;
        h2,h3 {
          text-align:left;
        }
        p {
        }
      }
    }
  }

  .section-services {
    background:var(--color-background-light-2);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding:2.5rem;
    padding-top:5rem;
    padding-bottom:9rem;
    h1 {
      margin-bottom:2rem;
      letter-spacing: var(--letter-spacing-large);
    }
    .services {
      display:flex;
      flex-wrap: wrap;
      width:fit-content;
      margin-left:auto;
      margin-right:auto;
      justify-content: center;
      .service {
        border-radius: var(--border-radius-medium);
        color:var(--color-white);
        position: relative;
        margin: 0.45rem 0.55rem;
        overflow: hidden;
        width:26rem;
        height:17rem;
        @media screen and (max-width: 460px) {
          width:15rem;
        }
        .overlay {
          background:rgba(0,0,0,0.30);
          transition: all 0.5s;
          &:hover {
            background:rgba(0,0,0,0.22);
          }
        }
        .head {
          position: absolute;
          letter-spacing: var(--letter-spacing-large);
          bottom:1.2rem;
          font-weight: 500;
          font-size:1.4rem;
          width: 100%;
          z-index:3;
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
        background: rgba(0,0,0,0.42);
      }
      .information-container, .form-container {
        letter-spacing: var(--letter-spacing-medium);
        line-height: var(--line-height-medium);
        color:var(--color-white);
        z-index:2;
        max-width:40rem;
        margin:auto;
        .information {
          display:flex;
          flex-direction: column;
          gap:1.5rem;
          .big-txt{
            font-size:2.8rem;
          }
          p {
            line-height:var(--line-height-medium);
            letter-spacing: var(--letter-spacing-smedium);
            text-shadow: 2px 2px 3px #00000010;
          }
          h1,h2,h3,h4 {
              text-align:left;
              font-weight: 500;
          }
        }
      }
    }
  }

  /* FORM */ 
  form {
    background-color: rgba(0, 0, 0, 0.42);
    padding:2rem;
    max-width:25rem;
    margin:3rem auto;
    .feedback-input {
      color:white;
      font-family: Helvetica, Arial, sans-serif;
      font-weight:500;
      font-size: var(--font-size-xsmall);
      letter-spacing: var(--letter-spacing-smedium);
      line-height: 1.8rem;
      background-color: transparent;
      border:2px solid var(--color-primary);
      transition: all 0.2s;
      padding: 0.5rem;
      margin-bottom: 1rem;
      width:100%;
      box-sizing: border-box;
      outline:0;
      &:focus{
        border:2px solid var(--color-primary-hover);
      }
      &:hover{
        background-color: rgba(0, 0, 0, 0.17);
        border:2px solid var(--color-primary-hover);
      }
      &::placeholder{
        color:rgb(171, 171, 171);
      } 
    }
    
    textarea {
      height: 10rem;;
      line-height: 150%;
      resize:vertical;
      &:focus{
        border:2px solid var(--color-primary-hover);
      }
      &:hover{
        background-color: rgba(0, 0, 0, 0.17);
        border:2px solid var(--color-primary-hover);
      }
    }
    
    [type="submit"] {
      font-family: 'Montserrat', Arial, Helvetica, sans-serif;
      width: 100%;
      background:var(--color-primary);
      border:0;
      cursor:pointer;
      color:white;
      font-size:var(--font-size-small);
      padding-top:0.8rem;
      padding-bottom:0.8rem;
      transition: all 0.2s;
      font-weight:600;
      &:hover {
        background:var(--color-primary-hover);
      }
    }
  }
  /* FORM END */
</style>