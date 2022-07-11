<template>
  <div>
    <CModal
      :show.sync="showModal"
      :close-on-backdrop="false"
      size="xl"
      color="primary"
    >
      <template #header>
        <h6 class="modal-title">Add Product Code</h6>
        <CButtonClose @click="ChangeModal()" class="text-white" />
      </template>
      <CCard>
        <CCardBody>
          <CForm>
            <CRow>
              <CCol sm="4"
                ><CInput
                  label="Product Code (Old)"
                  v-model="productCodeModel.ProductCode"
                  required
                  invalid-feedback="Please provide a required input."
                  @input="CheckDuplicate($event)"
                ></CInput>
                <span class="error text-danger" v-if="IsDuplicate"
                  >Product Code (Old) is duplicate</span
                >
              </CCol>
              <CCol sm="6">
                <CInput
                  label="Product Description"
                  v-model="productCodeModel.ProductDescription"
                  required
                  invalid-feedback="Please provide a required input."
                ></CInput>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="2">
                <CInput
                  label="Cup Stack"
                  type="number"
                  v-model="productCodeModel.CupStack"
                  required
                  invalid-feedback="Please provide a required input."
                ></CInput>
              </CCol>
              <CCol sm="2">
                <CInput
                  label="Stack Box"
                  type="number"
                  v-model="productCodeModel.StackBox"
                  required
                  invalid-feedback="Please provide a required input."
                ></CInput>
              </CCol>
              <CCol sm="2">
                <CInput
                  label="Cup Box"
                  type="number"
                  v-model="productCodeModel.CupBox"
                  required
                  invalid-feedback="Please provide a required input."
                ></CInput>
              </CCol>
              <CCol sm="2">
                <CInput
                  label="Cup Pallet"
                  type="number"
                  v-model="productCodeModel.CupPallet"
                  required
                  invalid-feedback="Please provide a required input."
                ></CInput>
              </CCol>
              <CCol sm="2">
                <CInput
                  label="Cup Con"
                  type="number"
                  v-model="productCodeModel.CupCon"
                  required
                  invalid-feedback="Please provide a required input."
                ></CInput>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="3">
                      <CSelect
          label="Palletizer Pattern"
          required
          :options="['','Cup-2','Cup-3','JAR','Lid-1','Lid-2']"
          :value.sync="productCodeModel.PalletizerPattern"
        />
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
      <template #footer>
        <CButton @click="SaveData()" color="primary" type="submit">
          Save
        </CButton>
        <CButton @click="ChangeModal()" id="btnCancel" color="secondary"
          >Cancel</CButton
        >
      </template>
    </CModal>
  </div>
</template>

<script>
import store from "../../store";
import axios from "axios";
import { xApiKey } from "../../utils/Constants.util";

var URLSaveData =
  store.getters.URL + "/api/ProductSpecification/Save-Product-Code-Old";
var URLCheckDuplicate =
  store.getters.URL + "/api/ProductSpecification/Check-Duplicate-Product-Code";

export default {
  name: "ProductCodeModal",
  data() {
    return {
      IsDuplicate: false,
    };
  },
  props: {
    showModal: Boolean,
    isSaveSuccess: Boolean,
    productCodeModel: {
      type: Object,
      default: function() {
        return {
          Id: 0,
          SapCode: "",
          ProductCode: "",
          ProductDescription: "",
          CupStack: "",
          StackBox: "",
          CupBox: "",
          CupPallet: "",
          CupCon: "",
          PalletizerPattern: "",
          UpdateDate: "",
        };
      },
      item: Object,
    },
  },
  computed: {
    isshow: {
      get() {
        return this.showModal;
      },
      set(v) {
        this.$emit("ProductCodeModal-updated", v);
      },
    },
    isSave: {
      get() {
        return this.isSaveSuccess;
      },
      set(v) {
        this.$emit("IsSave-updated", v);
      },
    },
  },
  methods: {
    ChangeModal() {   
      this.NewProductCodeModel();
      this.IsDuplicate = false
      this.isshow = !this.isshow;      
      // window.location.reload();
      //console.log("OpenO")
    },
    SaveData() {
      if (this.ValidateInput()) return false;
      //console.log("model", this.productCodeModel);
      axios
        .post(URLSaveData, this.productCodeModel, {
          headers: {
            xapikey: xApiKey,
          },
        })
        .then((res) => {
          if (res.data.Success) {
            //console.log("resData", res);
            this.$_toast_Noti("success", "success", "Save Success");
            this.isSave = !this.isSave;
            this.isshow = !this.isshow;
            this.NewProductCodeModel();
          } else {
            this.$_toast_Noti("success", "success", res);
          }
        })
        .catch((error) => {
          console.log(error);
          this.$_toast_Noti("error", "error", error);
        });
    },
    ValidateInput() {
      if (!this.productCodeModel.ProductCode)
        return this.$_toast_Noti(
          "error",
          "Error",
          "Please provide Product Code (Old) input."
        );

      if (!this.productCodeModel.ProductDescription)
        return this.$_toast_Noti(
          "error",
          "Error",
          "Please provide Product Description input."
        );

      if (!this.productCodeModel.CupStack)
        return this.$_toast_Noti(
          "error",
          "Error",
          "Please provide Cup Stack input."
        );

      if (!this.productCodeModel.StackBox)
        return this.$_toast_Noti(
          "error",
          "Error",
          "Please provide Stack Box input."
        );

      if (!this.productCodeModel.CupBox)
        return this.$_toast_Noti(
          "error",
          "Error",
          "Please provide Cup Box input."
        );

      if (!this.productCodeModel.CupPallet)
        return this.$_toast_Noti(
          "error",
          "Error",
          "Please provide Cup Pallet input."
        );

      if (!this.productCodeModel.CupCon)
        return this.$_toast_Noti(
          "error",
          "Error",
          "Please provide Cup Con input."
        );

      if (!this.productCodeModel.PalletizerPattern)
        return this.$_toast_Noti(
          "error",
          "Error",
          "Please provide Palletizer Pattern input."
        );

      if (this.IsDuplicate)
        return this.$_toast_Noti(
          "error",
          "Error",
          "Please check Product Code input."
        );
      return false;
    },
    CheckDuplicate(value) {
      //console.log("PC",value)
      axios
        .get(URLCheckDuplicate, {
          params: {
            ProductCode: value,
          },
          headers: {
            xapikey: xApiKey,
          },
        })
        .then((res) => {
          //console.log(res.data.data)
          this.IsDuplicate = res.data.data;
        })
        .catch((error) => {
          this.$_toast_Noti("error", "error", error);
        });
    },
    NewProductCodeModel() {
      this.productCodeModel.SapCode = "";
      this.productCodeModel.ProductCode = "";
      this.productCodeModel.ProductDescription = "";
      this.productCodeModel.CupStack = "";
      this.productCodeModel.StackBox = "";
      this.productCodeModel.CupBox = "";
      this.productCodeModel.CupPallet = "";
      this.productCodeModel.CupCon = "";
      this.productCodeModel.PalletizerPattern = "";
      this.productCodeModel.UpdateDate = "";
    },
  },
};
</script>
