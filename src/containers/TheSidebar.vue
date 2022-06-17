<template>
  <CSidebar
    fixed
    :minimize="minimize"
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand class="d-md-down-none" to="/">
      <CIcon
        class="c-sidebar-brand-full"
        name="logo"
        size="custom-size"
        :height="35"
        viewBox="0 0 556 134"
      />
      <CIcon
        class="c-sidebar-brand-minimized"
        name="logo"
        size="custom-size"
        :height="35"
        viewBox="0 0 110 134"
      />
    </CSidebarBrand>

    <!-- <CRenderFunction flat :content-to-render="$options.nav" /> -->
    <CRenderFunction flat :content-to-render="nav" />
    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
  </CSidebar>
</template>

<script>
//import nav from "./_nav";
import axios from "axios";
import store from "../store";

var URL_GetByUserName = store.getters.URL + "/api/Menu/getbyusername";

export default {
  name: "TheSidebar",
  //nav,
  data() {
    return {
      nav: [],
    };
  },
  computed: {
    show() {
      return this.$store.state.sidebarShow;
    },
    minimize() {
      return this.$store.state.sidebarMinimize;
    },
  },
  methods: {
    LoadMenuByUser() {
      var username = sessionStorage.getItem("username") || "";
      console.log("username", username);
      axios
        .get(URL_GetByUserName, {
          params: {
            User: username,
          },
        })
        .then((res) => {
          console.log("LoadMenuByUser", res);

          if (res.status === 200) {
            console.log("Menu = ", this.ConvertMenuJSon(res.data));
            this.nav = this.ConvertMenuJSon(res.data);
          }
        })
        .catch((err) => {
          this.$_toast_Noti("error", "error", err);
        });
    },
    ConvertMenuJSon(list) {
      var resultList = [];

      list.forEach(function (menu) {
        var resultItems = [];

        menu.Detail.forEach(function (detail) {
          var resultDetail = {
            name: detail.MenuName,
            to: detail.MenuPath,
          };
          resultItems.push(resultDetail);
        });

        var resultObj = {
          icon: menu.MenuIcon,
          name: menu.MenuName,
          route: menu.MenuPath,
          _name: menu.MenuType,
          items: resultItems,
        };

        resultList.push(resultObj);
      });

      return [
        {
          _name: "CSidebarNav",
          _children: resultList,
        },
      ];
    },
  },
  mounted() {
    this.LoadMenuByUser();
  },
};
</script>
