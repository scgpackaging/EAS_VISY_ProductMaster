<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink>
        <CIcon name="cil-user" />
      </CHeaderNavLink>
    </template>

    <!-- <CDropdownItem>
      <CIcon name="cil-user" /> {{username}}
    </CDropdownItem> -->

    <CDropdownItem> <CIcon name="cil-user" /> {{ username }} </CDropdownItem>

    <CDropdownItem @click="Logout()">
      <CIcon name="cil-lock-locked" /> Logout
    </CDropdownItem>
  </CDropdown>
</template>

<script>
export default {
  name: "TheHeaderDropdownAccnt",
  data() {
    return {
      username: "",
      //displayName: ""
    };
  },
  mounted() {
    // let userProfile = JSON.parse(localStorage.getItem("userprofile"));
    var usernameStorage = sessionStorage.getItem("username");
    //console.log("usernameStorage",usernameStorage);
    var username = usernameStorage;
    this.username = username;
  },
  methods: {
    Logout() {
      // localStorage.removeItem("IdeationToken");
      sessionStorage.removeItem("UserToken");
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style scoped>
.c-icon {
  margin-right: 0.3rem;
}
</style>