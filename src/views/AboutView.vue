<template>
  <main>

    <section class="section-about flex-center-center">
      <h1>About us</h1>
      <p class="index">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius repudiandae eveniet nisi ad voluptatum ullam inventore odit. Quaerat voluptatem aperiam eveniet ad vero quo labore possimus nostrum rem fugiat. Pariatur quaerat harum consectetur soluta animi, quas laudantium deserunt ipsum labore nihil saepe quisquam magnam possimus accusantium cupiditate at sit repellat eum officiis molestias aliquam dolore itaque! Similique sit adipisci quam facilis voluptas fugiat rem accusantium! Aliquam sit quis velit impedit molestiae aspernatur reprehenderit odio voluptatem minima sequi iure nulla provident, error commodi repudiandae dolor deleniti, quas repellat architecto tempora. Illum dignissimos perferendis fuga autem ad earum id. Adipisci, dicta ad.</p>
      <div class="about-text-container flex-center-center">
          <div class="column">
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
          
          </div>
      </div>
    </section>

    <section class="section-two-divs flex-center-center ">
      <div class="form-container">
        <h1>Meet our team</h1>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt atque recusandae explicabo animi eius ipsum, delectus illo nam praesentium placeat maxime suscipit reprehenderit voluptates aliquid aliquam quo excepturi deleniti adipisci? Nostrum eaque similique, laborum incidunt eligendi repellat consequuntur reprehenderit perferendis esse voluptatibus placeat veritatis eveniet in at sit delectus minima!</p>
      </div>
      <div>
        <img src="../assets/images/img4.jpg" alt="" srcset="">
      </div>
  </section>

    <section class="section-two-divs flex-center-center ">
        <div>
          <img src="../assets/images/img3.jpg" alt="" srcset="">
        </div>
        <div class="form-container">
          <h1>Visit us</h1>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt atque recusandae explicabo animi eius ipsum, delectus illo nam praesentium placeat maxime suscipit reprehenderit voluptates aliquid aliquam quo excepturi deleniti adipisci? Nostrum eaque similique, laborum incidunt eligendi repellat consequuntur reprehenderit perferendis esse voluptatibus placeat veritatis eveniet in at sit delectus minima!</p>
        </div>
    </section>

  </main>
</template>

<script lang="ts" setup>
</script>


<style lang="scss">
main {
  .section-two-divs {
    flex-wrap: wrap;
    div {
      max-width:400px;
      width:50%;
      min-width:350px;
      img {
        width:100%;
        object-fit: cover;
      }

    }
  }
  .section-about {
    justify-content: space-around;
    padding-top:3rem;
    padding-bottom:5rem;
    flex-direction: column;
    .index {
      padding:3rem;
      max-width:1000px;
    }
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
        }
      }
    }
  }
 
}
</style>
