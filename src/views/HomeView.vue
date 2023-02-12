
<template>
  <main>
    <h1>/Home</h1>

    <section class="section-welcome fullscreen-box bg-fullscreen flex-center-center-content">
      <div class="overlay" />
      <SearchBar class="search-bar" />
    </section>

    <section class="section-about section flex-center-center-content">
      <h1>About us</h1>
      <div class="about-text-container flex-center-center-content">
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

      <section class="section-contact bg-fullscreen">
        <div class="overlay"></div>
        <div class="information-container flex-center-center-content">
          <div class="information ">
            <h1>Talk to our real estate experts to find the perfect investment for you</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipernatur porro iste repellat! Veniam obcaecati tenetur perspiciatis magni debitis corporis, nemo dolorum repellat aspernatur sit id voluptatibus eius doloribus, accusamus officiis ducimus neque delectus qui doloremque voluptatum. Delectus aliquam culpa, voluptates quas reprehenderit optio.</p>
          </div>
        </div>
        <div class="form-container flex-center-center-content">
          <form>      
            <input name="name" type="text" class="feedback-input" placeholder="Name" />   
            <input name="email" type="text" class="feedback-input" placeholder="Email" />
            <input name="email" type="tel" class="feedback-input" placeholder="Phone" />
            <textarea name="text" class="feedback-input" placeholder="Comment"></textarea>
            <input type="submit" value="SUBMIT"/>
          </form>
        </div>
      </section>

      <Footer />

  </main>
</template>

<script setup lang="ts">
  import SearchBar from "../components/SearchBar.vue";
  import Footer from '@/components/Footer.vue'

</script>

<style lang="scss" scoped>
  main {
    .section-welcome {
      background-image: url('@/assets/images/img1.jpg');
      .search-bar{
        position:relative;
        z-index:2;
      }
    }

    .section-about {
      align-content: space-around;
      padding-top:3rem;
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
            min-width:300px;
          }
          .about-text{
            padding:10vh 5vw;
            h3 {
            text-align:left;
          }
          p {
            padding-top:0.5rem;
            line-height:1.2;
          }
        }
      }
    }

    .section-contact {
      position:relative;
      background-image: url('@/assets/images/img2.jpg');
      display:grid;
      padding:2rem;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      .information-container, .form-container {
        z-index:2;
        .information {
            display:flex;
            flex-direction: column;
            gap:clamp(5vh, 8vw, 10vh);
            h1,h2,h3,h4 {
              line-height:1.4;
              text-align:left;
            }
            p {
              line-height: 1.7;
            }
        .form-container {
          
        }
        }
      }
    }
  }

  /* FORM */ 
  form {
    background-color: rgba(0, 0, 0, 0.4);
    padding:3rem 4rem;
    border-radius:8px;
    max-width:420px;
    margin:50px auto;
    .feedback-input {
      color:white;
      font-family: Helvetica, Arial, sans-serif;
      font-weight:500;
      font-size: 0.9rem;
      border-radius: 5px;
      line-height: 22px;
      background-color: transparent;
      border:2px solid #CC6666;
      transition: all 0.3s;
      padding: 13px;
      margin-bottom: 15px;
      width:100%;
      box-sizing: border-box;
      outline:0;
    }
    
    .feedback-input:focus { border:2px solid #CC4949; }
    
    textarea {
      height: 150px;
      line-height: 150%;
      resize:vertical;
    }
    
    [type="submit"] {
      font-family: 'Montserrat', Arial, Helvetica, sans-serif;
      width: 100%;
      background:#CC6666;
      border-radius:5px;
      border:0;
      cursor:pointer;
      color:white;
      font-size:0.9rem;
      padding-top:10px;
      padding-bottom:10px;
      transition: all 0.3s;
      margin-top:-4px;
      font-weight:700;
    }
    [type="submit"]:hover {
       background:#CC4949; }
  }
  /* FORM END */

</style>