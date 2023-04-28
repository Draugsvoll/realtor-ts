<template>
  <main>
    <section class="section-about flex-center-center">
      <h1>About us</h1>
      <p class="index line-height-large">
        Lorem ipsum dolor sit amet consec animi, natusum dolor? Te eligendi incidunt? Praesentium eos optio vel corrupti eum, adipisci provident fugit ullam ducimus sint, cumque suscipit voluptas voluptatem non atque? voluptate ipsa eos, repellat, qui neque amet illum, illo doloribus tempore ab doloremque recusandae asperiores fugit nulla beatae! Ut enim nulla eaque <br><br> nesciunt rerum ident odio illum necessitatibus autem. Voluptas blanditiis alias ullam inventore cumque saepe fugit, repudiandae quo quaerat eveniet beatae error delectus nisi voluptatum sapiente, possimus atque provident nobis ipsa cupiditate, temporibus eaque consequatur! Soluta laboriosam necessitatibus inventore expedita vitae consequatur corporis, assumenda repellat numquam quod aliquid.
      </p>
      
      <div class="about-text-container flex-center-center">
          <div class="column">
            <div class="about-text">
              <h2>Our mission</h2>
              <p class="line-height-medium">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias distinctio, non hic ab nisi nemo nobis mollitia veritatis. Sapiente natus aperiam commodi expedita ex explicabo eius sunt maxime a perspiciatis. 
              </p>
            </div>
           
          </div>
          <div class="column">
            <div class="about-text">
              <h2 >Our mission</h2>
              <p class="line-height-medium">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias distinctio, non hic ab nisi nemo nobis mollitia veritatis. Sapiente natus aperiam commodi expedita ex explicabo eius sunt maxime a perspiciatis. 
              </p>
            </div>
          
          </div>
      </div>
    </section>

    <section class="card card1">
      <div >
        <h1>Meet our team</h1>
        <p class="line-height-medium">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt atque recusandae explicabo animi eius ipsum, delectus illo nam praesentium placeat maxime suscipit reprehenderit voluptates aliquid aliquam quo excepturi deleniti adipisci? Nostrum eaque similique, laborum incidunt eligendi repellat consequuntur reprehenderit perferendis esse voluptatibus placeat veritatis eveniet in at sit delectus minima!
        </p>
      </div>
      <div>
        <img class="radius-medium" src="../assets/images/img4.jpg" alt="" srcset="">
      </div>
  </section>

    <section class="card">
        <div>
          <img class="radius-medium" src="../assets/images/img3.jpg" alt="" srcset="">
        </div>
        <div class="form-container">
          <h1>Visit us</h1>
          <p class="line-height-medium">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt atque recusandae explicabo animi eius ipsum, delectus illo nam praesentium placeat maxime suscipit reprehenderit voluptates aliquid aliquam quo excepturi deleniti adipisci? Nostrum eaque similique, laborum incidunt eligendi repellat consequuntur reprehenderit perferendis esse voluptatibus placeat veritatis eveniet in at sit delectus minima!
          </p>
        </div>
    </section>

  </main>
</template>

<script lang="ts" setup>
</script>


<style lang="scss" scoped>
main {
  .card {
    width:var(--page-width-large);
    margin:auto;
    margin-bottom:5rem;
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    gap:2rem;
    flex-wrap: wrap-reverse;
    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 50%;
      max-width: 31rem;
      min-width: 21rem;
      h1, p{
      }
      img {
        max-width: 100%;
        height: 80%;
        object-fit: cover;
      }
    }
    
  }
  .card1{
    flex-wrap: wrap;
  }
  .section-about {
    justify-content: space-around;
    padding-top:var(--page-padding-top);
    width:var(--page-width-large);
    margin:auto;
    flex-direction: column;
    .index {
      max-width: 45rem;
      margin-top:1rem;
    }
    .about-text-container {
      flex-wrap: wrap;
      flex-grow:1;
      margin-top:3rem;
      width:var(--page-width-large);
      justify-content: space-between;
      .column{
          display:block;
          width:10rem;
          min-width:23rem;
        }
        .about-text{
          h2 {
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
