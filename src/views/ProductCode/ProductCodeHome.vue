<template>
  <div>
    <CCard>
      <CCardHeader>
        <CRow>
          <CCol sm="4"
            ><CInput
              label="Product Code"
              placeholder=""
              horizontal
              v-model="InputProductCode"
          /></CCol>
          <CCol sm="6"
            ><CInput
              label="Product Description"
              placeholder=""
              horizontal
              v-model="InputProductDescription"
          /></CCol>
          <CCol sm="1"
            ><CButton color="info" @click.prevent="SearchData()"
              >Search</CButton
            ></CCol
          >
        </CRow>
      </CCardHeader>
      <CCardBody>
        <CRow>
          <CCol col="auto">
            <CButton
              color="success"
              @click="IsProductCodeModalOpen = !IsProductCodeModalOpen"
              ><CIcon class="m-0 mb-1" name="cil-plus" />Add New</CButton
            >
            <CDataTable
              :items="ProductData"
              :fields="fields"
              items-per-page-select
              :items-per-page="10"
              hover
              sorter
              pagination
              :loading="IsLoading"
            >
              <template #manage="data">
                <td class="text-center text-nowrap">
                  <template v-if="data.item.editMode">
                    <CButton
                      @click.prevent="SaveRow(data.index)"
                      color="success"
                      size="sm"
                      class="mr-1"
                    >
                      <CIcon name="cil-check" width="24" />
                    </CButton>
                    <CButton
                      @click.prevent="endEditRowHandler(data.index)"
                      color="danger"
                      size="sm"
                    >
                      <CIcon name="cil-x" width="24" />
                    </CButton>
                  </template>
                  <template v-else>
                    <CButton
                      @click.prevent="EditRow(data.index)"
                      color="warning"
                      size="sm"
                      class="mr-1"
                    >
                      <CIcon name="cil-pencil" width="24" />
                    </CButton>
                    <CButton
                      @click.prevent="DeleteItem(data.item)"
                      color="danger"
                      size="sm"
                    >
                      <CIcon name="cil-trash" width="24" />
                    </CButton>
                  </template>
                </td>
              </template>
              <template #ProductDescription="data">
                <td class="text-left text-nowrap px-3">
                  <template v-if="data.item.editMode">
                    <CInput
                      type="text"
                      v-model.trim="data.item.ProductDescription"
                      class="edit-mode-input mb-0"
                      required
                    >
                    </CInput>
                  </template>
                  <template v-else>
                    <template v-if="data.item.ProductDescription">
                      {{ data.item.ProductDescription }}
                    </template>
                  </template>
                </td>
              </template>
              <template #CupStack="data">
                <td class="text-left text-nowrap px-3">
                  <template v-if="data.item.editMode">
                    <CInput
                      type="number"
                      v-model.trim="data.item.CupStack"
                      class="edit-mode-input mb-0"
                      required
                    >
                    </CInput>
                  </template>
                  <template v-else>
                    <template v-if="data.item.CupStack">
                      {{ data.item.CupStack }}
                    </template>
                  </template>
                </td>
              </template>
              <template #StackBox="data">
                <td class="text-left text-nowrap px-3">
                  <template v-if="data.item.editMode">
                    <CInput
                      type="number"
                      v-model.trim="data.item.StackBox"
                      class="edit-mode-input mb-0"
                      required
                    >
                    </CInput>
                  </template>
                  <template v-else>
                    <template v-if="data.item.StackBox">
                      {{ data.item.StackBox }}
                    </template>
                  </template>
                </td>
              </template>
              <template #CupBox="data">
                <td class="text-left text-nowrap px-3">
                  <template v-if="data.item.editMode">
                    <CInput
                      type="number"
                      v-model.trim="data.item.CupBox"
                      class="edit-mode-input mb-0"
                      required
                    >
                    </CInput>
                  </template>
                  <template v-else>
                    <template v-if="data.item.CupBox">
                      {{ data.item.CupBox }}
                    </template>
                  </template>
                </td>
              </template>
              <template #CupPallet="data">
                <td class="text-left text-nowrap px-3">
                  <template v-if="data.item.editMode">
                    <CInput
                      type="number"
                      v-model.trim="data.item.CupPallet"
                      class="edit-mode-input mb-0"
                      required
                    >
                    </CInput>
                  </template>
                  <template v-else>
                    <template v-if="data.item.CupPallet">
                      {{ data.item.CupPallet }}
                    </template>
                  </template>
                </td>
              </template>
              <template #CupCon="data">
                <td class="text-left text-nowrap px-3">
                  <template v-if="data.item.editMode">
                    <CInput
                      type="number"
                      v-model.trim="data.item.CupCon"
                      class="edit-mode-input mb-0"
                      required
                    >
                    </CInput>
                  </template>
                  <template v-else>
                    <template v-if="data.item.CupCon">
                      {{ data.item.CupCon }}
                    </template>
                  </template>
                </td>
              </template>
              <template #PalletizerPattern="data">
                <td class="text-left text-nowrap px-3">
                  <template v-if="data.item.editMode">
                    <CInput
                      type="text"
                      v-model.trim="data.item.PalletizerPattern"
                      class="edit-mode-input mb-0"
                      required
                    >
                    </CInput>
                  </template>
                  <template v-else>
                    <template v-if="data.item.PalletizerPattern">
                      {{ data.item.PalletizerPattern }}
                    </template>
                  </template>
                </td>
              </template>
            </CDataTable>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
    <ProductCodeModal
      :showModal.sync="IsProductCodeModalOpen"
      @ProductCodeModal-updated="IsProductCodeModalOpen = $event"
      @IsSave-updated="CheckIsSaveSuccess"
    />
  </div>
</template>
<script>
import axios from "axios";
import store from "../../store";
import ProductCodeModal from "../ProductCode/ProductCodeModal.vue";

var URLGetAll =
  store.getters.URL + "/api/ProductSpecification/Get-All-Product-Code";
var URLSearch =
  store.getters.URL + "/api/ProductSpecification/Search-Product-Code";
var URLUpdate =
  store.getters.URL + "/api/ProductSpecification/Update-Product-Code-Old";
var URLDelete = store.getters.URL + "/api/ProductSpecification/Delete-Data";
var Key = store.getters.ApiKey;

const fields = [
  {
    key: "manage",
    label: "Manage",
    sorter: false,
    filter: false,
  },
  { key: "ProductCode", label: "Product Code" },
  { key: "ProductDescription", label: "Product Description", with: "30%" },
  { key: "CupStack", label: "Cup Stack" },
  { key: "StackBox", label: "Stack Box" },
  { key: "CupBox", label: "Cup Box" },
  { key: "CupPallet", label: "Cup Pallet" },
  { key: "CupCon", label: "Cup Con" },
  { key: "PalletizerPattern", label: "Palletizer Pattern" },
  { key: "UpdateDate", label: "Update Date" },
];

export default {
  name: "ProductCodeHome",
  components: {
    ProductCodeModal,
  },
  data() {
    return {
      fields,
      ProductData: [],
      IsLoading: true,
      IsProductCodeModalOpen: false,
      editMode: false,
      InputProductCode: "",
      InputProductDescription: "",
      isSave: false,
    };
  },
  methods: {
    GetAll() {
      //console.log(xApiKey);
      axios
        .get(URLGetAll, {
          headers: {
            xapikey: Key,
          },
        }) //เอาข้อมูลใน URL(หลังบ้าน) มาแสดงหน้าเว็บ
        .then((res) => {
          //console.log("res", res.data.data.data);

          var resultObj = res.data.data.data.map((obj) => ({
            ...obj,
            editMode: false,
          }));

          this.ProductData = resultObj;
          this.IsLoading = false;
          //console.log("pdata", this.ProductData);
        })
        .catch((error) => {
          //เช็ค Error
          this.IsLoading = false;
          this.$_toast_Noti("error", "error", error);
        });
    },
    SearchData() {
      axios
        .get(URLSearch, {
          params: {
            ProductCode: this.InputProductCode,
            ProductDescription: this.InputProductDescription,
          },
          headers: {
            xapikey: Key,
          },
        })
        .then((res) => {
          this.ProductData = res.data.data.data;
          //console.log("search", this.ProductData);
          this.IsLoading = false;
        })
        .catch((error) => {
          this.$_toast_Noti("error", "error", error);
        });
    },
    endEditRowHandler(index) {
      this.ProductData[index].editMode = false;
    },
    EditRow(index) {
      this.ProductData[index].editMode = true;
    },
    SaveRow(index) {
      var data = this.ProductData[index];
      axios
        .post(URLUpdate, data, {
          headers: {
            xapikey: Key,
          },
        })
        .then((res) => {
          console.log("res", res.data);
          if (res.data.Success) {
            this.$_toast_Noti("success", "success", "Save Success");
            this.GetAll();
          }
        })
        .catch((error) => {
          this.$_toast_Noti("error", "error", error);
        });
    },
    DeleteItem(item) {
      if (confirm("Are you sure you want to delete this item?")) {
        //this.IsLoading = true;
        //console.log("Delete", item);
        axios
          .post(URLDelete, null, {
            headers: {
              XApiKey: Key,
              "Content-Type": "application/json",
            },
            params: {
              Id: item.Id,
            },
          })
          .then((res) => {
            console.log("res", res);
            this.$_toast_Noti("success", "success", "Delete Success");
            this.GetAll();
          })
          .catch((error) => {
            this.$_toast_Noti("error", "error", error);
          });
      }
    },
    CheckIsSaveSuccess(value) {
      //console.log(value);
      if (value) {
        this.GetAll();
      }
    },
  },
  mounted() {
    this.GetAll();
  },
};
</script>
