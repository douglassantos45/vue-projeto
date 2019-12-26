<template>
  <div>
    <Header />
    <br>
    <Content />
    <Footer />
  </div>
</template>

<script>
import Header from "./template/ComponentHeader";
import Footer from "./template/ComponentFooter";
import Content from "./template/Content";
export default {
  name: "AlunoPage",
  components: { Header, Footer, Content }
};
</script>

<style>
</style>