<template>
	<footer class="footer">
		<div class="container">
			<div class="row">
				<div class="footer-col">
					<h4 class="col-title">company</h4>
					<ul>
						<li><a class="link" >about us</a></li>
						<li><a class="link" >our services</a></li>
						<li><a class="link" >privacy policy</a></li>
						<li><a class="link" >affiliate program</a></li>
					</ul>
				</div>
				<div class="footer-col">
					<h4 class="col-title">get help</h4>
					<ul>
						<li><a class="link" >Call us</a></li>
						<li><a class="link" >FAQ</a></li>
						<li><a class="link" >Lorem</a></li>
						<li><a class="link" >Ipsum</a></li>
					</ul>
				</div>
				<div class="footer-col">
					<h4 class="col-title">Discover</h4>
					<ul>
						<li><a class="link" >Design</a></li>
						<li><a class="link" >Areas</a></li>
						<li><a class="link" >Prospects</a></li>
						<li><a class="link" >Lorem</a></li>
					</ul>
				</div>
				<div class="footer-col">
					<h4 class="col-title">follow us</h4>
					<div class="social-links">
						<!-- <a class="link" ><i class="fab fa-facebook-f"></i></a>
						<a class="link" ><i class="fab fa-twitter"></i></a>
						<a class="link" ><i class="fab fa-instagram"></i></a>
						<a class="link" ><i class="fab fa-linkedin-in"></i></a> -->
						<div class="icon-container">
							<div class="icon">
								<font-awesome-icon :icon="['fa-brands', 'fa-twitter']" />
							</div>
							<div class="icon">
								<font-awesome-icon :icon="['fa-brands', 'fa-facebook']" />
							</div>
							<div class="icon">
								<font-awesome-icon :icon="['fa-brands', 'fa-instagram']" />
							</div>
							<div class="icon">
								<font-awesome-icon :icon="['fa-brands', 'fa-youtube']" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
   </footer>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
h1,h2,h3,h4,h5,h6 {
	text-align: left;
}
.container{
	margin:auto;
	padding-left:3rem;
	padding-right:3rem;
}
.row{
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
}
ul{
	list-style: none;
}
.footer{
	background-color: #24262b;
	background-color: white;
    padding: 2.4rem 1rem;
}
.footer-col{
   width: 20%;
   padding: 0 15px;
}
.col-title {
	font-size: var(--font-size-medium) !important;
	color: var(--color-font-dark) !important;
	text-transform: capitalize;
	margin-bottom: 35px;
	font-weight: 400;
	position: relative;
}

.footer-col h4{
}
.footer-col h4::before{
	content: '';
	position: absolute;
	left:0;
	bottom: -10px;
	background-color: var(--color-primary);
	height: 2px;
	box-sizing: border-box;
	width: 50px;
}
.footer-col ul li:not(:last-child){
	margin-bottom: 8px;
}
.footer-col ul li a{
	font-size: var(--font-size-small);
	text-transform: capitalize;
	color: #ffffff;
	text-decoration: none;
	font-weight: 400;
	color: var(--color-font-dark);
	display: block;
	transition: all 0.3s ease;
}
.footer-col ul li a:hover{
}
.footer-col .social-links a{
	display: inline-block;
	height: 40px;
	width: 40px;
	background-color: rgba(255,255,255,0.2);
	margin:0 10px 10px 0;
	text-align: center;
	line-height: 40px;
	border-radius: 50%;
	transition: all 0.5s ease;
}
.footer-col .social-links a:hover{
}
.icon-container {
	display:flex;
	gap:1rem;
	.icon {
		font-size: 1.9rem;
		color: var(--color-primary);
	}
}
/*responsive*/
@media(max-width: 767px){
  .footer-col{
    width: 50%;
    margin-bottom: 30px;
}
}
@media(max-width: 574px){
  .footer-col{
    width: 100%;
}
}
</style>