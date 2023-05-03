<template>
  <main>
    
    <div class="intro">
      <h1>About Us</h1>
      <div class="index line-height-medium">
        <p>
          Lorem ipsum dolor sit amet consec animi, natusum dolor? Te eligendi incidunt? Praesentium eos optio vel corrupti eum, adipisci provident fugit ullam ducimus sint, cumque suscipit voluptas voluptatem non atque? voluptate ipsa eos, repellat, qui neque amet illum, illo doloribus tempore ab doloremque recusandae asperiores fugit nulla beatae! Ut enim nulla eaque 
        </p>
      </div>
      <div class="columns-container">
        <div class="column">
            <h2>Our mission</h2>
            <p class="line-height-medium">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias distinctio, non hic ab nisi nemo nobis mollitia veritatis. Sapiente natus aperiam commodi expedita ex explicabo eius sunt maxime a perspiciatis. 
            </p>
        </div>
        <div class="column">
          <h2>Our mission</h2>
          <p class="line-height-medium">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias distinctio, non hic ab nisi nemo nobis mollitia veritatis. Sapiente natus aperiam commodi expedita ex explicabo eius sunt maxime a perspiciatis. 
          </p>
        </div>
      </div>
    </div>

    <section class="card card1">
      <div >
        <h2>Meet our team</h2>
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
          <h2>Visit us</h2>
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
  padding-left:1rem;
  padding-right:1rem;
  p {
    font-size:var(--font-size-small);
  }
  .intro {
    display:flex;
    flex-direction:column;
    margin:auto;
    margin-bottom:5rem;
    max-width:var(--page-width-medium);
    padding-top:var(--page-padding-top);
    @media screen and (max-width:500px) {
      padding-top:var(--page-padding-top-mobile);
    }
    h1 {
      margin-bottom:2.5rem;
    }
    .index {
      margin:auto;
      display:flex;
      max-width:50rem;
    }
    .columns-container {
      display:flex;
      flex-direction:row;
      flex-wrap:wrap;
      justify-content:space-between;
      margin:auto;
      margin-top:4rem;
      gap:2rem;
      .column {
        flex:1;
        min-width:18rem;
        h2,h3 {
          text-align:left;
        }
      }
    }
  }
  .card {
    max-width:var(--page-width-medium);
    flex-wrap:wrap-reverse;
    margin:auto;
    margin-bottom:5rem;
    display: flex;
    align-items: stretch;
    gap:2rem;
    justify-content: space-between;
    @media screen and (max-width:848px){
      justify-content:center;
    }
    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 48%;
      max-width: 31rem;
      min-width: 21rem;
      img {
        max-width: 100%;
        max-width: 35rem;
        height: 85%;
        object-fit: cover;
      }
    }
    
  }
  .card1{
    flex-wrap:wrap;
  }
}
</style>
