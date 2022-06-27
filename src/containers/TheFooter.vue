<template>
  <CFooter :fixed="false">
    <div>
      <a href="https://www.scgpackaging.com/" target="_blank">SCGP</a>
      <span class="ml-1">&copy; {{new Date().getFullYear()}} SCGP - IT</span>
    </div>
    <div class="mfs-auto">
      <span class="mr-1" target="_blank">Powered by</span>
      <a href="https://visyproductmaster.scg.com">SCGP - IT</a>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>
