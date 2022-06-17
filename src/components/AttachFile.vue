<template>
  <div>
    <label class="">Attach files</label><br />
    <CInputFile
      multiple
      custom
      label="Attach files"      
      :ref="'inputfile'"
      v-on:change="fileChange($event)"
    />

    <div
      class="cpl-10"
      v-for="ExistsFile in ExistsFiles"
      :key="ExistsFile.AttachmentName"
    >

      <div v-if="!ExistsFile.IsDelete">
        <CLink
          class="text-primary"
          @click="OpenFile(ExistsFile.AttachmentName)"
        >
          {{ ExistsFile.AttachmentName }}
        </CLink>
        <CButton
          color="danger"
          size="sm"
          @click="ConfirmDeleteFile(ExistsFile)"
        >
          <CIcon name="cil-ban" /> 
          Delete
        </CButton>
      </div>
    </div>

    <div class="cpl-10" v-for="(Newfile, key) in Newfiles" :key="Newfile.name">
      {{ Newfile.name }}
      <CButton
        color="danger"
        size="sm"
        @click="ConfirmDeleteFileBeforeSave(key)"
      >
        <CIcon name="cil-ban" /> 
        Delete
      </CButton>
    </div>

  </div>
</template>

<script>

import store from "../store";
var URL_OpenFile = store.getters.URL + "/api/Attachment/openfile";

export default {
  name: "AttachFile",
  components: {},
  data() {
      return {
      Newfiles : []
    };
  },
  props: {
    ExistsFiles: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  methods: {

      fileChange(fileList) {

      var IsValidate = true;

      fileList.forEach(function (file) {
          if(file.size > 5242880){
            this.$_toast_Noti("error", "error", "Cannot upload file more than 5 MB");
            IsValidate = false;
          }
      }.bind(this));

      if (IsValidate) {
        // this.files = fileList;
        fileList.forEach((file) => {
          if (this.Newfiles.findIndex((f) => f.name == file.name) === -1) {
            this.Newfiles.push(file);
          }
        });
        
        document.getElementById(this.$refs['inputfile'].safeId).value = null;
      }

    },
    ConfirmDeleteFileBeforeSave(key) {
      if (confirm("Do you want to delete?")) {
        this.Newfiles.splice(key, 1);
      }
    },
    ConfirmDeleteFile(attachment) {
      if (confirm("Do you want to delete?")) {
        attachment.IsDelete = true;
      }
    },
    OpenFile(filename) {
      window.open(URL_OpenFile + "?filename=" + filename);
    },

  },
  watch : {
    Newfiles: function (newVal, oldVal) {
      //console.log('Prop changed: ', newVal, ' | was: ', oldVal);
      this.CpNewFiles = newVal;
    },
    ExistsFiles: function (newVal, oldVal) {
      //console.log('Prop changed: ', newVal, ' | was: ', oldVal);
      this.CpExistsFiles = newVal;
    }
  },
  computed: {
    
    CpNewFiles: {
      get() {
        return this.Newfiles;
      },
      set(v) {
        //console.log("Newfiles-updated",v);
        this.$emit("Newfiles-updated", v);
      }

    },
    CpExistsFiles: {
      get() {
        return this.ExistsFiles;
      },
      set(v) {
        //console.log("ExistsFiles-updated",v);
        this.$emit("ExistsFiles-updated", v);
      }

    },
    
  },
};
</script>